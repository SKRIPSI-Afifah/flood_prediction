import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const kabupaten = searchParams.get("kabupaten")
  const adm3_pcode = searchParams.get("adm3_pcode")

  const query = supabase
    .from("kecamatan_centroids")
    .select("adm3_pcode,kabupaten,kecamatan,latitude,longitude,elevasi,slope,lahan_terbangun")
    .order("kabupaten", { ascending: true })
    .order("kecamatan", { ascending: true })

  if (adm3_pcode) {
    const { data, error } = await query.eq("adm3_pcode", adm3_pcode).maybeSingle()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    if (!data) {
      return NextResponse.json({ error: "Wilayah tidak ditemukan." }, { status: 404 })
    }
    return NextResponse.json({ wilayah: data })
  }

  if (kabupaten) {
    const { data, error } = await query.eq("kabupaten", kabupaten)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ wilayah: data ?? [] })
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const kabupatenList = Array.from(
    new Set((data ?? []).map((row: { kabupaten: string }) => row.kabupaten))
  ).sort()

  return NextResponse.json({
    wilayah: data ?? [],
    kabupatenList,
  })
}
