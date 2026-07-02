import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (name.trim().length < 2) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    if (message.trim().length < 10) {
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || supabaseUrl === "your-supabase-url" || !supabaseKey) {
      console.log("Demo mode — message received:", { name, email, message });
      return NextResponse.json({ success: true, message: "Message received!" }, { status: 200 });
    }

    // Use service role key if available (bypasses RLS), otherwise use anon key
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const client = createClient(supabaseUrl, serviceKey ?? supabaseKey);

    const { error, data } = await client
      .from("messages")
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          message: message.trim(),
          read: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error.message, error.details);
      return NextResponse.json(
        { error: "Failed to save your message. Please try again." },
        { status: 500 }
      );
    }

    console.log("Message saved:", data?.id);
    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 });

  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
