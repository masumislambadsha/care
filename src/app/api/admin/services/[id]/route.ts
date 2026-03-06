import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id } = await params;

    const { data: service, error } = await supabaseAdmin
      .from("services")
      .update(body)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Service update error:", error);
      return NextResponse.json(
        { error: "Failed to update service" },
        { status: 500 },
      );
    }

    return NextResponse.json({ service });
  } catch (error) {
    console.error("Service update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const { error } = await supabaseAdmin
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Service delete error:", error);
      return NextResponse.json(
        { error: "Failed to delete service" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Service delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
