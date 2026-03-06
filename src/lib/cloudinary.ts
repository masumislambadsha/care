import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: File,
  folder: string = "care-xyz",
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Determine resource type based on file type
  const resourceType = file.type === "application/pdf" ? "raw" : "image";

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            // For PDFs, return the public_id so we can proxy it
            // For images, return the direct secure_url
            if (resourceType === "raw" && result?.public_id) {
              // Store the public_id in a format we can use for proxying
              resolve(`CLOUDINARY_RAW:${result.public_id}`);
            } else {
              resolve(result?.secure_url || "");
            }
          }
        },
      )
      .end(buffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
