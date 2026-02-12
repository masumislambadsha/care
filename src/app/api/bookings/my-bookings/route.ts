import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    console.log("=== MY BOOKINGS API ===");
    console.log("Session:", JSON.stringify(session, null, 2));

    if (!session?.user) {
      console.log("No session found - returning 401");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const isCaregiver = session.user.role === "CAREGIVER";

    console.log("User ID:", userId);
    console.log("Is Caregiver:", isCaregiver);
    console.log("Querying field:", isCaregiver ? "caregiver_id" : "client_id");

    // First, check if ANY bookings exist for this user (simple query)
    const { data: simpleBookings, error: simpleError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq(isCaregiver ? "caregiver_id" : "client_id", userId);

    console.log("Simple query error:", simpleError);
    console.log("Simple bookings found:", simpleBookings?.length || 0);
    if (simpleBookings && simpleBookings.length > 0) {
      console.log("First booking:", JSON.stringify(simpleBookings[0], null, 2));
    }

    // Fetch bookings based on user role with joins
    const { data: bookings, error } = await supabaseAdmin
      .from("bookings")
      .select(
        `
        *,
        client:users!bookings_client_id_fkey(id, name, email),
        caregiver:users!bookings_caregiver_id_fkey(id, name, email),
        service:services(id, name)
      `,
      )
      .eq(isCaregiver ? "caregiver_id" : "client_id", userId)
      .order("created_at", { ascending: false });

    console.log("Supabase query error:", error);
    console.log("Bookings found:", bookings?.length || 0);
    console.log("Bookings data:", JSON.stringify(bookings, null, 2));

    if (error) {
      console.error("Error fetching bookings:", error);
      return NextResponse.json(
        { error: "Failed to fetch bookings", details: error },
        { status: 500 },
      );
    }

    // Transform the data to match the frontend format
    const transformedBookings = bookings.map((booking: any) => ({
      id: booking.id,
      booking_number: booking.booking_number,
      service_name: booking.service?.name || "Unknown Service",
      caregiver_name: booking.caregiver?.name || "Unknown Caregiver",
      client_name: booking.client?.name || "Unknown Client",
      start_date: booking.start_date,
      duration_type: booking.duration_type,
      duration_value: booking.duration_value,
      total_amount: booking.total_amount,
      status: booking.status,
      payment_status: booking.payment_status,
    }));

    console.log("Transformed bookings:", transformedBookings.length);
    console.log("=== END MY BOOKINGS API ===");

    return NextResponse.json({ bookings: transformedBookings });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Bookings API error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
