import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    console.log("=== RESEND DIAGNOSTIC ===");
    console.log("API Key exists:", !!apiKey);
    console.log("API Key starts with 're_':", apiKey?.startsWith("re_"));
    console.log("API Key length:", apiKey?.length);

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "RESEND_API_KEY not found in environment variables",
          solution: "Add RESEND_API_KEY to your .env file",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    // Try to send a test email
    const { data, error } = await resend.emails.send({
      from: "Care XYZ <onboarding@resend.dev>",
      to: "delivered@resend.dev", // Resend's test email
      subject: "Test Email from Care XYZ",
      html: "<p>This is a test email to verify Resend is working!</p>",
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          success: false,
          error: error,
          message: "Failed to send test email",
        },
        { status: 500 },
      );
    }

    console.log("Email sent successfully:", data);

    return NextResponse.json({
      success: true,
      message: "Resend is working correctly!",
      emailId: data?.id,
      instructions: "Check https://resend.com/emails to see the email",
    });
  } catch (error: any) {
    console.error("Test error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    );
  }
}
