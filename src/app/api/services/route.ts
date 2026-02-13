import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: services, error } = await supabaseAdmin
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("name");

    if (error) {
      console.error("Error fetching services:", error);
      return NextResponse.json(
        { error: "Failed to fetch services" },
        { status: 500 },
      );
    }

    return NextResponse.json({ services });
  } catch (error) {
    console.error("Services API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

