import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function GET() {
  const { data, error } = await supabase
    .from("regions")
    .select("*")
    .order("id", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()

  const { data, error } = await supabase.from("regions").insert([body]).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0], { status: 201 })
}
