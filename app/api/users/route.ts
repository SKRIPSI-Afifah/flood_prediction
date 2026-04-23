import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // Note: Creating auth user usually requires service role.
  // For simplicity, we just add to profiles here.
  // In real case, you'd call supabase.auth.admin.createUser
  
  const { data, error } = await supabase
    .from("profiles")
    .insert([
      {
        email: body.email,
        role: body.role,
        full_name: body.full_name,
      }
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
