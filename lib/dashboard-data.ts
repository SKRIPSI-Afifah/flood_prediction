import { formatClassLabel, normalizeFloodRiskClass, type FloodRiskClass } from "@/lib/format"

type SupabaseClient = Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>>

export interface KecamatanCentroidRow {
  adm3_pcode: string
  kabupaten: string
  kecamatan: string
  latitude: number | null
  longitude: number | null
  elevasi: number | null
  slope: number | null
  lahan_terbangun: number | null
}

export interface PredictionRow {
  id: number
  user_id: string
  adm3_pcode: string


  rainfall: number | null
  elevation: number | null
  slope: number | null
  built_area: number | null
  predicted_class: FloodRiskClass
  confidence: number | null
  risk_score: number | null
  probability_aman: number | null
  probability_rawan: number | null
  probability_sangat_rawan: number | null
  created_at: string
}

export interface PredictionWithLocation extends PredictionRow {
  kabupaten: string
  kecamatan: string
  latitude: number | null
  longitude: number | null
}

export type HistoryRow = PredictionWithLocation

export interface DashboardSummary {
  totalKecamatan: number
  totalFactorData: number
  totalPredictions: number
  distinctPredictionRegions: number
  classCounts: Record<FloodRiskClass, number>
  latestPredictions: PredictionWithLocation[]
  mapPoints: PredictionWithLocation[]
  latestPredictionByPcode: Record<string, PredictionWithLocation>
}

export interface GisLatestPredictionSummary {
  totalPredictions: number
  distinctPredictionRegions: number
  classCounts: Record<FloodRiskClass, number>
  latestPredictions: PredictionWithLocation[]
  latestPredictionByPcode: Record<string, PredictionWithLocation>
}

export interface HistoryFilters {
  kabupaten: string
  kecamatan: string
  risk: string
  dateFrom: string
  dateTo: string
  page: number
  pageSize: number
}

export interface HistorySummary {
  rows: PredictionWithLocation[]
  total: number
  totalPages: number
  page: number
  pageSize: number
  filters: HistoryFilters
  kabupatenList: string[]
  kecamatanList: string[]
  centroids: KecamatanCentroidRow[]
}

export interface PredictionInsertInput {
  adm3_pcode: string
  hujan_mm: number
  elevasi: number
  slope: number
  lahan_terbangun: number
  predicted_class: FloodRiskClass
  confidence: number | null
  risk_score: number | null
  probabilities: Record<FloodRiskClass, number | null>
}

function toNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (typeof value === "string") {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

function toNonEmptyString(value: unknown, fallback = "-") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback
}

function toProbability(value: unknown) {
  const numberValue = toNumber(value)
  if (numberValue === null) return null
  return numberValue > 1 ? numberValue / 100 : numberValue
}



function mapCentroids(rows: KecamatanCentroidRow[]) {
  return new Map(rows.map((row) => [row.adm3_pcode, row]))
}

function normalizePredictionRow(row: Record<string, unknown>): PredictionRow {
  return {
    id: Number(row.id ?? 0),
    user_id: String(row.user_id ?? ""),
    adm3_pcode: toNonEmptyString(row.adm3_pcode),


    rainfall: toNumber(row.rainfall),
    elevation: toNumber(row.elevation),
    slope: toNumber(row.slope),
    built_area: toNumber(row.built_area),
    predicted_class: formatClassLabel(String(row.predicted_class ?? "")),
    confidence: toProbability(row.confidence),
    risk_score: toNumber(row.risk_score),
    probability_aman: null,
    probability_rawan: null,
    probability_sangat_rawan: null,
    created_at: String(row.created_at ?? ""),
  }
}

function enrichWithCentroid(row: PredictionRow, centroid: KecamatanCentroidRow | undefined): PredictionWithLocation {
  return {
    ...row,
    kabupaten: centroid?.kabupaten ?? "-",
    kecamatan: centroid?.kecamatan ?? "-",
    latitude: centroid?.latitude ?? null,
    longitude: centroid?.longitude ?? null,
  }
}

function normalizePredictedClassCounts(rows: PredictionRow[]) {
  const counts: Record<FloodRiskClass, number> = {
    Aman: 0,
    Rawan: 0,
    "Sangat Rawan": 0,
  }

  rows.forEach((row) => {
    const label = normalizeFloodRiskClass(row.predicted_class)
    counts[label] += 1
  })

  return counts
}

async function loadCentroids(supabase: SupabaseClient) {
  const { data, error } = await supabase
    .from("kecamatan_centroids")
    .select("adm3_pcode,kabupaten,kecamatan,latitude,longitude,elevasi,slope,lahan_terbangun")
    .order("kabupaten", { ascending: true })
    .order("kecamatan", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as KecamatanCentroidRow[]
}

async function loadPredictionsForUser(supabase: SupabaseClient, userId: string, limit?: number) {
  let query = supabase
    .from("predictions")
    .select(
      "id,user_id,adm3_pcode,rainfall,elevation,slope,built_area,predicted_class,confidence,risk_score,created_at"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })

  if (typeof limit === "number") {
    query = query.limit(limit)
  }

  const { data, error } = await query
  if (error) {
    throw new Error(error.message)
  }

  return ((data ?? []) as Record<string, unknown>[]).map((row) => normalizePredictionRow(row))
}

export async function loadDashboardSummary(supabase: SupabaseClient, userId: string): Promise<DashboardSummary> {
  const [centroids, predictions] = await Promise.all([
    loadCentroids(supabase),
    loadPredictionsForUser(supabase, userId, 5_000),
  ])

  const centroidLookup = mapCentroids(centroids)
  const classCounts = normalizePredictedClassCounts(predictions)
  const latestPredictionByPcode: Record<string, PredictionWithLocation> = {}

  for (const row of predictions) {
    if (!latestPredictionByPcode[row.adm3_pcode]) {
      latestPredictionByPcode[row.adm3_pcode] = enrichWithCentroid(row, centroidLookup.get(row.adm3_pcode))
    }
  }

  const latestPredictionList = Object.values(latestPredictionByPcode)
  const distinctPredictionRegions = latestPredictionList.length

  const enriched = predictions.map((row) => enrichWithCentroid(row, centroidLookup.get(row.adm3_pcode)))

  return {
    totalKecamatan: centroids.length,
    totalFactorData: centroids.filter(
      (row) => row.elevasi !== null && row.slope !== null && row.lahan_terbangun !== null
    ).length,
    totalPredictions: predictions.length,
    distinctPredictionRegions,
    classCounts,
    latestPredictions: enriched.slice(0, 5),
    mapPoints: enriched.filter((row) => row.latitude !== null && row.longitude !== null),
    latestPredictionByPcode,
  }
}

export async function loadLatestPredictionSummary(
  supabase: SupabaseClient,
  userId: string
): Promise<GisLatestPredictionSummary> {
  const [centroids, predictions] = await Promise.all([
    loadCentroids(supabase),
    loadPredictionsForUser(supabase, userId),
  ])

  const centroidLookup = mapCentroids(centroids)
  const latestPredictionByPcode: Record<string, PredictionWithLocation> = {}

  for (const row of predictions) {
    const enriched = enrichWithCentroid(row, centroidLookup.get(row.adm3_pcode))
    if (!latestPredictionByPcode[enriched.adm3_pcode]) {
      latestPredictionByPcode[enriched.adm3_pcode] = enriched
    }
  }

  const latestPredictions = Object.values(latestPredictionByPcode)

  return {
    totalPredictions: predictions.length,
    distinctPredictionRegions: latestPredictions.length,
    classCounts: normalizePredictedClassCounts(latestPredictions),
    latestPredictions,
    latestPredictionByPcode,
  }
}

function parseDateRange(dateFrom: string, dateTo: string) {
  const from = dateFrom ? `${dateFrom}T00:00:00.000Z` : null
  const to = dateTo ? `${dateTo}T23:59:59.999Z` : null
  return { from, to }
}



export async function loadHistorySummary(
  supabase: SupabaseClient,
  userId: string,
  filters: HistoryFilters
): Promise<HistorySummary> {
  const centroids = await loadCentroids(supabase)

  const [predictionsResponse] = await Promise.all([
    (async () => {
      const pageSize = filters.pageSize
      const offset = Math.max(0, (filters.page - 1) * pageSize)
      const { from, to } = parseDateRange(filters.dateFrom, filters.dateTo)
      const risk = filters.risk ? normalizeFloodRiskClass(filters.risk) : null

      let query = supabase
        .from("predictions")
        .select(
          "id,user_id,adm3_pcode,rainfall,elevation,slope,built_area,predicted_class,confidence,risk_score,created_at",
          { count: "exact" }
        )
        .eq("user_id", userId)

      // We cannot filter predictions table by kabupaten and kecamatan directly now because those columns don't exist in predictions.
      // But wait! We have the centroids list which maps adm3_pcode to kabupaten/kecamatan. Let's handle filtration locally on the code, or filter by pcode.
      // If filters.kabupaten or filters.kecamatan is set, let's resolve matching adm3_pcodes from centroids.
      const matchingPcodes = centroids
        .filter((c) => {
          if (filters.kabupaten && c.kabupaten !== filters.kabupaten) return false;
          if (filters.kecamatan && c.kecamatan !== filters.kecamatan) return false;
          return true;
        })
        .map((c) => c.adm3_pcode);

      if (filters.kabupaten || filters.kecamatan) {
        if (matchingPcodes.length > 0) {
          query = query.in("adm3_pcode", matchingPcodes);
        } else {
          // force no results
          query = query.eq("adm3_pcode", "non_existent_pcode");
        }
      }

      if (risk) {
        query = query.eq("predicted_class", risk)
      }

      if (from) {
        query = query.gte("created_at", from)
      }

      if (to) {
        query = query.lt("created_at", to)
      }

      const { data, count, error } = await query
        .order("created_at", { ascending: false })
        .range(offset, offset + pageSize - 1)

      if (error) {
        throw new Error(error.message)
      }

      return {
        rows: ((data ?? []) as Record<string, unknown>[]).map((row) => normalizePredictionRow(row)),
        total: count ?? 0,
        pageSize,
      }
    })()
  ])

  const centroidLookup = mapCentroids(centroids)
  const rows = predictionsResponse.rows.map((row) => enrichWithCentroid(row, centroidLookup.get(row.adm3_pcode)))
  const kabupatenList = Array.from(new Set(centroids.map((row) => row.kabupaten))).sort()
  const kecamatanList = filters.kabupaten
    ? centroids.filter((row) => row.kabupaten === filters.kabupaten).map((row) => row.kecamatan).sort()
    : Array.from(new Set(centroids.map((row) => row.kecamatan))).sort()

  return {
    rows,
    total: predictionsResponse.total,
    totalPages: predictionsResponse.total > 0 ? Math.ceil(predictionsResponse.total / predictionsResponse.pageSize) : 0,
    page: filters.page,
    pageSize: predictionsResponse.pageSize,
    filters,
    kabupatenList,
    kecamatanList,
    centroids,
  }
}

export async function loadPredictionDetail(supabase: SupabaseClient, userId: string, id: number) {
  const centroids = await loadCentroids(supabase)
  const centroidLookup = mapCentroids(centroids)

  const { data, error } = await supabase
    .from("predictions")
    .select(
      "id,user_id,adm3_pcode,rainfall,elevation,slope,built_area,predicted_class,confidence,risk_score,created_at"
    )
    .eq("user_id", userId)
    .eq("id", id)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    return null
  }

  const normalized = normalizePredictionRow(data as Record<string, unknown>)
  return enrichWithCentroid(normalized, centroidLookup.get(normalized.adm3_pcode))
}

export async function savePredictionHistory(
  supabase: SupabaseClient,
  userId: string,
  input: PredictionInsertInput
) {
  const { data: centroid, error: centroidError } = await supabase
    .from("kecamatan_centroids")
    .select("adm3_pcode,kabupaten,kecamatan")
    .eq("adm3_pcode", input.adm3_pcode)
    .maybeSingle()

  if (centroidError) {
    throw new Error(centroidError.message)
  }

  if (!centroid) {
    throw new Error("Kecamatan tidak ditemukan pada master wilayah.")
  }

  const record = {
    user_id: userId,
    adm3_pcode: input.adm3_pcode,
    rainfall: input.hujan_mm,
    elevation: input.elevasi,
    slope: input.slope,
    built_area: input.lahan_terbangun,
    predicted_class: input.predicted_class,
    confidence: input.confidence,
    risk_score: input.risk_score,
  }

  const { data, error } = await supabase
    .from("predictions")
    .insert(record)
    .select(
      "id,user_id,adm3_pcode,rainfall,elevation,slope,built_area,predicted_class,confidence,risk_score,created_at"
    )
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return normalizePredictionRow(data as Record<string, unknown>)
}
