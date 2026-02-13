import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    // In Next.js 15, params is a Promise
    const params = await context.params;

    console.log("=== SERVICE DETAIL API ===");
    console.log("Requested slug:", params.slug);

    // First check if ANY services exist
    const { data: allServices, error: allError } = await supabaseAdmin
      .from("services")
      .select("id, name, slug")
      .limit(10);

    console.log("All services in DB:", allServices);
    console.log("All services error:", allError);

    // Now try to find the specific service
    const { data: service, error } = await supabaseAdmin
      .from("services")
      .select("*")
      .eq("slug", params.slug)
      .eq("is_active", true)
      .single();

    console.log("Service found:", service);
    console.log("Error:", error);

    if (error || !service) {
      console.log("Service not found for slug:", params.slug);
      return NextResponse.json(
        {
          error: "Service not found",
          requestedSlug: params.slug,
          availableServices: allServices?.map((s) => s.slug),
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Service API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
