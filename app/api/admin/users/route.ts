import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single()

  if (error || profile?.role !== "admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) }
  }

  return { user, profile }
}

function getAdminClient() {
  try {
    return { client: createAdminClient(), error: null as string | null }
  } catch (error) {
    return {
      client: null,
      error: error instanceof Error ? error.message : "Supabase service role key is not configured.",
    }
  }
}

export async function GET() {
  const access = await requireAdmin()
  if ("error" in access) return access.error

  const supabase = await createClient()
  const { data, error } = await supabase.rpc("admin_list_profiles")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: data ?? [] })
}

export async function POST(request: Request) {
  const access = await requireAdmin()
  if ("error" in access) return access.error

  const body = await request.json().catch(() => null)
  const full_name = String(body?.full_name || "").trim()
  const email = String(body?.email || "").trim()
  const password = String(body?.password || "")
  const role = body?.role === "admin" ? "admin" : "user"

  if (!full_name || !email || password.length < 6) {
    return NextResponse.json(
      { error: "Nama, email, dan password minimal 6 karakter wajib diisi." },
      { status: 400 }
    )
  }

  const adminState = getAdminClient()
  if (!adminState.client) {
    return NextResponse.json({ error: adminState.error }, { status: 500 })
  }

  const admin = adminState.client
  const { data: createdUser, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name, role },
  })

  if (createError || !createdUser.user) {
    return NextResponse.json(
      { error: createError?.message || "Gagal membuat user auth." },
      { status: 500 }
    )
  }

  const { error: profileError } = await admin.rpc("ensure_profile", {
    p_user_id: createdUser.user.id,
    p_full_name: full_name,
    p_role: role,
  })

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data: createdUser.user })
}

export async function PATCH(request: Request) {
  const access = await requireAdmin()
  if ("error" in access) return access.error

  const body = await request.json().catch(() => null)
  const id = String(body?.id || "").trim()
  const full_name = String(body?.full_name || "").trim()
  const role = body?.role === "admin" ? "admin" : "user"

  if (!id || !full_name) {
    return NextResponse.json({ error: "ID dan nama wajib diisi." }, { status: 400 })
  }

  const adminState = getAdminClient()
  if (!adminState.client) {
    return NextResponse.json({ error: adminState.error }, { status: 500 })
  }

  const admin = adminState.client
  const { error } = await admin
    .from("profiles")
    .update({
      full_name,
      role,
    })
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const access = await requireAdmin()
  if ("error" in access) return access.error

  const body = await request.json().catch(() => null)
  const id = String(body?.id || "").trim()

  if (!id) {
    return NextResponse.json({ error: "ID wajib diisi." }, { status: 400 })
  }

  const adminState = getAdminClient()
  if (!adminState.client) {
    return NextResponse.json({ error: adminState.error }, { status: 500 })
  }

  const admin = adminState.client
  const { error } = await admin.auth.admin.deleteUser(id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
