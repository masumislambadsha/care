import { NextRequest, NextResponse } from "next/server";
import {
  sendWelcomeEmail,
  sendVerificationApprovedEmail,
  sendVerificationRejectedEmail,
  sendBookingConfirmationEmail,
  sendBookingCancellationEmail,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, email, name, reason } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    switch (type) {
      case "welcome":
        await sendWelcomeEmail(email, name || "Test User", "CLIENT");
        break;

      case "approval":
        await sendVerificationApprovedEmail(email, name || "Test Caregiver");
        break;

      case "rejection":
        await sendVerificationRejectedEmail(
          email,
          name || "Test Caregiver",
          reason || "Incomplete documentation provided",
        );
        break;

      case "booking":
        await sendBookingConfirmationEmail(email, {
          bookingNumber: "BK-TEST-12345",
          clientName: "John Doe",
          caregiverName: "Sarah Johnson",
          serviceName: "Baby & Child Care",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          totalAmount: 250,
        });
        break;

      case "cancellation":
        await sendBookingCancellationEmail(email, {
          bookingNumber: "BK-TEST-12345",
          serviceName: "Baby & Child Care",
          refundAmount: 250,
        });
        break;

      default:
        return NextResponse.json(
          { error: "Invalid email type" },
          { status: 400 },
        );
    }

    return NextResponse.json({
      success: true,
      message: `${type} email sent successfully to ${email}`,
    });
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Check server logs for details." },
      { status: 500 },
    );
  }
}
