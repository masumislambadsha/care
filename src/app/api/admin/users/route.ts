import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: users, error } = await supabaseAdmin
      .from("users")
      .select("id, name, email, role, status, phone, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Users fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch users" },
        { status: 500 },
      );
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Users fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, status } = body;

    if (!userId || !status) {
      return NextResponse.json(
        { error: "User ID and status are required" },
        { status: 400 },
      );
    }

    // Prevent admin from suspending themselves
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "You cannot change your own status" },
        { status: 400 },
      );
    }

    const { error } = await supabaseAdmin
      .from("users")
      .update({ status })
      .eq("id", userId);

    if (error) {
      console.error("User status update error:", error);
      return NextResponse.json(
        { error: "Failed to update user status" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "User status updated successfully" });
  } catch (error) {
    console.error("User status update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Prevent admin from deleting themselves
    if (userId === session.user.id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 },
      );
    }

    // Hard delete - permanently remove from database
    // Delete all related records first (in order)

    console.log("=== Starting user deletion process ===");
    console.log("User ID:", userId);

    // 1. First, check what bookings exist
    const { data: existingBookings } = await supabaseAdmin
      .from("bookings")
      .select("id, client_id, caregiver_id")
      .or(`client_id.eq.${userId},caregiver_id.eq.${userId}`);

    console.log("Found bookings:", existingBookings);

    // 2. Delete payments for these bookings
    if (existingBookings && existingBookings.length > 0) {
      const bookingIds = existingBookings.map((b) => b.id);
      const { error: paymentsError } = await supabaseAdmin
        .from("payments")
        .delete()
        .in("booking_id", bookingIds);

      console.log("Payments deleted:", paymentsError ? "ERROR" : "SUCCESS");
      if (paymentsError) console.error("Payments error:", paymentsError);
    }

    // 3. Delete reviews where user is author or target
    const { error: reviewsError } = await supabaseAdmin
      .from("reviews")
      .delete()
      .or(`author_id.eq.${userId},target_id.eq.${userId}`);

    console.log("Reviews deleted:", reviewsError ? "ERROR" : "SUCCESS");
    if (reviewsError) console.error("Reviews error:", reviewsError);

    // 4. Delete ALL bookings for this user (both as client and caregiver)
    const { data: deletedBookings, error: bookingsError } = await supabaseAdmin
      .from("bookings")
      .delete()
      .or(`client_id.eq.${userId},caregiver_id.eq.${userId}`)
      .select();

    console.log("Bookings deleted:", deletedBookings);
    console.log("Bookings deletion:", bookingsError ? "ERROR" : "SUCCESS");
    if (bookingsError) {
      console.error("Bookings error:", bookingsError);
      return NextResponse.json(
        { error: "Failed to delete bookings: " + bookingsError.message },
        { status: 500 },
      );
    }

    // 5. Delete addresses
    const { error: addressesError } = await supabaseAdmin
      .from("addresses")
      .delete()
      .eq("user_id", userId);

    console.log("Addresses deleted:", addressesError ? "ERROR" : "SUCCESS");

    // 6. Delete family members
    const { error: familyError } = await supabaseAdmin
      .from("family_members")
      .delete()
      .eq("user_id", userId);

    console.log("Family members deleted:", familyError ? "ERROR" : "SUCCESS");

    // 7. Delete caregiver profile
    const { error: profileError } = await supabaseAdmin
      .from("caregiver_profiles")
      .delete()
      .eq("user_id", userId);

    console.log(
      "Caregiver profile deleted:",
      profileError ? "ERROR" : "SUCCESS",
    );

    // 8. Delete notifications
    const { error: notificationsError } = await supabaseAdmin
      .from("notifications")
      .delete()
      .eq("user_id", userId);

    console.log(
      "Notifications deleted:",
      notificationsError ? "ERROR" : "SUCCESS",
    );

    // 9. Finally delete the user
    const { error } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("id", userId);

    if (error) {
      console.error("User delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete user: " + error.message },
        { status: 500 },
      );
    }

    console.log("=== User deleted successfully ===");

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("User delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
