import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const session = await getServerSession(authOptions);
    const { path } = await params;

    // Only allow authenticated users (especially admins) to view documents
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // The path is a single encoded public_id
    const publicId = decodeURIComponent(path.join("/"));

    // Cloudinary raw files: the public_id from upload already includes extension
    // So we should NOT add .pdf if it's already there
    const publicIdForUrl = publicId;

    // Reconstruct the Cloudinary URL
    const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/${publicIdForUrl}`;

    // Fetch the document from Cloudinary
    const response = await fetch(cloudinaryUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }

    // Get the file content
    const buffer = await response.arrayBuffer();

    // Determine content type - assume PDF for raw files
    const contentType = "application/pdf";

    // Return the file with proper headers for inline viewing
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": "inline",
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error serving document:", error);
    return NextResponse.json(
      { error: "Failed to serve document" },
      { status: 500 },
    );
  }
}
