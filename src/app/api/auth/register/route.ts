import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      password,
      role,
      nid_number,
      services_offered,
      experience,
      hourly_rate,
      bio,
      nid_document_url,
      certificate_urls,
      profile_image_url,
    } = body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .insert({
        name,
        email,
        phone,
        nid_number,
        password: hashedPassword,
        role,
        status: "ACTIVE",
      })
      .select()
      .single();

    if (userError) {
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 },
      );
    }

    // If caregiver, create caregiver profile
    if (role === "CAREGIVER") {
      const { error: profileError } = await supabaseAdmin
        .from("caregiver_profiles")
        .insert({
          user_id: user.id,
          bio: bio || "",
          experience: experience || 0,
          hourly_rate: hourly_rate || 15,
          services_offered: services_offered || [],
          verification_status: "PENDING",
          nid_document_url: nid_document_url || null,
          certificate_urls: certificate_urls || [],
          profile_image_url: profile_image_url || null,
        });

      if (profileError) {
        // Don't fail the registration, just log the error
      }
    }

    // Update user profile image if provided
    if (profile_image_url) {
      await supabaseAdmin
        .from("users")
        .update({ profile_image_url })
        .eq("id", user.id);
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(email, name, role);
    } catch (emailError) {
      // Don't fail registration if email fails
    }

    return NextResponse.json(
      { message: "Registration successful", userId: user.id },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
