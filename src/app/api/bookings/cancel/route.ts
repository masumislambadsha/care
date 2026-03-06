import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { sendBookingCancellationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { bookingId, reason } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID required" },
        { status: 400 },
      );
    }

    // Check if booking exists and belongs to user
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .eq("client_id", session.user.id)
      .single();

    if (bookingError || !booking) {
      console.error("Booking not found error:", bookingError);
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Check if booking can be cancelled
    if (booking.status === "COMPLETED" || booking.status === "CANCELLED") {
      return NextResponse.json(
        { error: "Cannot cancel this booking" },
        { status: 400 },
      );
    }

    // Calculate refund amount
    const startDate = new Date(booking.start_date);
    const now = new Date();
    const hoursUntilStart = (startDate.getTime() - now.getTime()) / 3600000;

    let refundAmount = 0;
    if (hoursUntilStart > 24) {
      refundAmount = parseFloat(booking.total_amount); // Full refund
    } else if (hoursUntilStart > 12) {
      refundAmount = parseFloat(booking.total_amount) * 0.5; // 50% refund
    }

    // Update booking status
    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({
        status: "CANCELLED",
        cancel_reason: reason || null,
        cancelled_at: new Date().toISOString(),
      })
      .eq("id", bookingId);

    if (updateError) {
      console.error("Booking cancellation error:", updateError);
      return NextResponse.json(
        { error: "Failed to cancel booking" },
        { status: 500 },
      );
    }

    // Get user email and service details for email
    const { data: userData } = await supabaseAdmin
      .from("users")
      .select("email")
      .eq("id", session.user.id)
      .single();

    const { data: serviceData } = await supabaseAdmin
      .from("services")
      .select("name")
      .eq("id", booking.service_id)
      .single();

    // Send cancellation email
    if (userData?.email && serviceData?.name) {
      try {
        await sendBookingCancellationEmail(userData.email, {
          bookingNumber: booking.booking_number,
          serviceName: serviceData.name,
          refundAmount,
        });
      } catch (emailError) {
        console.error("Cancellation email error:", emailError);
        // Don't fail the cancellation if email fails
      }
    }

    // Create notification for caregiver
    await supabaseAdmin.from("notifications").insert({
      user_id: booking.caregiver_id,
      type: "BOOKING_CANCELLED",
      title: "Booking Cancelled",
      message: `A booking has been cancelled by the client.`,
      related_id: bookingId,
    });

    // Create notification for client
    await supabaseAdmin.from("notifications").insert({
      user_id: session.user.id,
      type: "BOOKING_CANCELLED",
      title: "Booking Cancelled",
      message: `Your booking has been cancelled. Refund amount: $${refundAmount.toFixed(2)}`,
      related_id: bookingId,
    });

    return NextResponse.json({
      message: "Booking cancelled successfully",
      refundAmount,
    });
  } catch (error) {
    console.error("Booking cancellation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
