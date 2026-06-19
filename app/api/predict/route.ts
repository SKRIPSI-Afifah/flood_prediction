import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"
import { savePredictionHistory } from "@/lib/dashboard-data"
import { type FloodRiskClass } from "@/lib/format"

const predictionApiBaseUrl =
  process.env.PREDICTION_API_URL ??
  process.env.NEXT_PUBLIC_PREDICTION_API_URL ??
  "http://127.0.0.1:8000"

function normalizePayload(payload: Record<string, unknown>) {
  const toNumber = (value: unknown) =>
    typeof value === "number" && Number.isFinite(value) ? value : undefined

  const hujanMm =
    toNumber(payload.hujan_mm) ?? toNumber(payload.rainfall)

  return {
    adm3_pcode: typeof payload.adm3_pcode === "string" ? payload.adm3_pcode : undefined,
    hujan_mm: hujanMm,
    elevasi: toNumber(payload.elevasi),
    slope: toNumber(payload.slope),
    lahan_terbangun: toNumber(payload.lahan_terbangun),
    tahun:
      typeof payload.tahun === "number"
        ? payload.tahun
        : typeof payload.year === "number"
          ? payload.year
          : undefined,
  }
}

function isValidNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
}

function normalizePredictedClass(value: unknown): FloodRiskClass | null {
  if (typeof value !== "string") return null

  const clean = value.trim().toLowerCase()
  if (clean === "aman") return "Aman"
  if (clean === "rawan") return "Rawan"
  if (clean === "sangat rawan") return "Sangat Rawan"
  return null
}

function normalizeProbability(value: unknown) {
  return typeof value === "number" && Number.isFinite(value)
    ? value > 1
      ? value / 100
      : value
    : null
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Anda harus login untuk menyimpan prediksi." }, { status: 401 })
    }

    const rawPayload = (await request.json()) as Record<string, unknown>
    const payload = normalizePayload(rawPayload)

    if (
      !payload.adm3_pcode ||
      !isValidNumber(payload.hujan_mm) ||
      !isValidNumber(payload.elevasi) ||
      !isValidNumber(payload.slope) ||
      !isValidNumber(payload.lahan_terbangun)
    ) {
      return NextResponse.json(
        {
          error:
            "Payload tidak valid. Pastikan adm3_pcode, hujan_mm, elevasi, slope, dan lahan_terbangun berupa nilai yang valid.",
        },
        { status: 400 }
      )
    }

    const response = await fetch(`${predictionApiBaseUrl}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adm3_pcode: payload.adm3_pcode,
        hujan_mm: payload.hujan_mm,
        elevasi: payload.elevasi,
        slope: payload.slope,
        lahan_terbangun: payload.lahan_terbangun,
      }),
    })

    const data = (await response.json().catch(() => null)) as Record<string, unknown> | null

    if (!response.ok) {
      const errMsg =
        data && typeof data.detail === "object"
          ? JSON.stringify(data.detail)
          : (typeof data?.detail === "string" ? data.detail : undefined) ??
            (typeof data?.error === "string" ? data.error : undefined) ??
            "Gagal memproses prediksi."
      return NextResponse.json({ error: errMsg }, { status: response.status })
    }

    const predictedClass = normalizePredictedClass(
      data?.prediksi ?? data?.predicted_class ?? data?.class ?? data?.label
    )

    if (!predictedClass) {
      return NextResponse.json(
        { error: "Hasil prediksi dari FastAPI tidak memiliki kelas yang valid." },
        { status: 502 }
      )
    }

    const probabilities = (data?.probabilities ?? data?.probabilitas ?? null) as Record<string, unknown> | null
    const probabilityMap = {
      Aman: normalizeProbability(probabilities?.Aman),
      Rawan: normalizeProbability(probabilities?.Rawan),
      "Sangat Rawan": normalizeProbability(probabilities?.["Sangat Rawan"]),
    } satisfies Record<FloodRiskClass, number | null>

    const confidence =
      typeof data?.confidence === "number"
        ? normalizeProbability(data.confidence)
        : probabilityMap[predictedClass]

    const riskScore =
      typeof data?.risk_score === "number"
        ? data.risk_score
        : confidence !== null
          ? Math.round(confidence * 100)
          : null

    const hujanMm = payload.hujan_mm as number
    const elevasi = payload.elevasi as number
    const slope = payload.slope as number
    const lahanTerbangun = payload.lahan_terbangun as number

    const savedPrediction = await savePredictionHistory(supabase, user.id, {
      adm3_pcode: payload.adm3_pcode,
      hujan_mm: hujanMm,
      elevasi,
      slope,
      lahan_terbangun: lahanTerbangun,
      predicted_class: predictedClass,
      confidence,
      risk_score: riskScore,
      probabilities: probabilityMap,
    })

    return NextResponse.json({
      predicted_class: predictedClass,
      prediksi: predictedClass,
      confidence,
      probabilities: probabilityMap,
      risk_score: riskScore,
      description: typeof data?.description === "string" ? data.description : null,
      saved: true,
      prediction: savedPrediction,
      raw: data,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Terjadi kesalahan pada API prediksi."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
