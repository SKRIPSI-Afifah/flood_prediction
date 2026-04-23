import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 })
  }

  // Ambil role dari tabel profiles
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", authData.user.id)
    .single()

  if (profileError) {
    console.error("Profile fetch error:", profileError)
  }

  return NextResponse.json({
    ...authData,
    user: {
      ...authData.user,
      role: profileData?.role || "user",
    },
  })
}

