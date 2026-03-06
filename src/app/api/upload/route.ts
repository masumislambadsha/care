import { NextRequest, NextResponse } from "next/server";

const IMGBB_API_KEY = "0a5e75ce0f28f520ab6d292e5f9a08cb";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 },
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 },
      );
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // Upload to imgbb
    const imgbbFormData = new FormData();
    imgbbFormData.append("image", base64Image);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: imgbbFormData,
      },
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("imgbb upload error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Failed to upload image" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: data.data.url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
