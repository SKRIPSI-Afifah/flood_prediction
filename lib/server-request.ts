import { cookies, headers } from "next/headers"

export async function getRequestOrigin() {
  const headerList = await headers()
  const protocol = headerList.get("x-forwarded-proto") ?? "http"
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host")

  if (!host) {
    throw new Error("Request host is not available.")
  }

  return `${protocol}://${host}`
}

export async function getCookieHeader() {
  const cookieStore = await cookies()
  const pairs = cookieStore.getAll().map((cookie) => `${cookie.name}=${cookie.value}`)
  return pairs.join("; ")
}
