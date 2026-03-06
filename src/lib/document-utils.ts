// Helper function to convert stored URL to viewable URL
// This is separate from cloudinary.ts to avoid importing server-only code in client components
export function getViewableUrl(storedUrl: string): string {
  if (storedUrl.startsWith("CLOUDINARY_RAW:")) {
    // Extract the public_id and create a proxy URL
    const publicId = storedUrl.replace("CLOUDINARY_RAW:", "");
    // Encode the public_id to handle special characters and slashes
    const encodedId = encodeURIComponent(publicId);
    return `/api/documents/${encodedId}`;
  }
  return storedUrl;
}
