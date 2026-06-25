import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'

  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      const { data: authUser } = await supabase.auth.getUser()
      if (authUser?.user?.id) {
        const fullName =
          authUser.user.user_metadata?.full_name ||
          authUser.user.user_metadata?.name ||
          authUser.user.email?.split("@")[0] ||
          "Pengguna"

        await supabase.rpc("ensure_profile", {
          p_user_id: authUser.user.id,
          p_full_name: fullName,
          p_role: "user",
        })
      }

      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/login?error=Verification failed'
  return NextResponse.redirect(redirectTo)
}
