import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function POST(request: Request) {
  const body = await request.json()

  // Simple dummy prediction logic
  const rain = parseFloat(body.rain) || 0
  const tide = parseFloat(body.tide) || 0

  let status = "Safe State"
  let statusVariant = "default"

  if (rain > 50 || tide > 2.0) {
    status = "Critical Flood Risk"
    statusVariant = "error"
  } else if (rain > 20 || tide > 1.5) {
    status = "Moderate Risk"
    statusVariant = "tertiary"
  } else if (rain > 10 || tide > 1.0) {
    status = "Low Risk"
    statusVariant = "secondary"
  }

  const now = new Date()

  const newRecord = {
    date: now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: now.toLocaleTimeString("id-ID", { hour12: false }) + " WIB",
    params: {
      rain: `${body.rain || 0}mm`,
      tide: `${body.tide || 0}m`,
      soil: `${body.soil || 0}%`,
      region: body.region || "Unknown",
    },
    status,
    statusVariant,
    authority: "SA",
    authorityName: "SysAdmin",
  }

  const { data, error } = await supabase
    .from("history")
    .insert([newRecord])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data[0])
}
