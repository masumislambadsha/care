import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);


    // Allow uploads during registration (no session required)
    // We'll use a temporary folder and move files later if needed
    const userId = session?.user?.id || "temp-" + Date.now();

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const documentType = formData.get("type") as string;


    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type - allow images and PDFs for documents
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File must be an image (JPEG, PNG, WebP) or PDF" },
        { status: 400 },
      );
    }

    // Validate file size (max 10MB for documents)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 },
      );
    }

    // Determine folder based on document type
    const folder = `care-xyz/${documentType || "documents"}/${userId}`;


    const url = await uploadToCloudinary(file, folder);


    return NextResponse.json({ url }, { status: 200 });
  } catch (error: any) {
    console.error("Document upload error:", error);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      {
        error:
          "Failed to upload document: " + (error.message || "Unknown error"),
      },
      { status: 500 },
    );
  }
}
