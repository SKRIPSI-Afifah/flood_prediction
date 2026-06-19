export type FloodRiskClass = "Aman" | "Rawan" | "Sangat Rawan"

const idIntegerFormatter = new Intl.NumberFormat("id-ID", {
  maximumFractionDigits: 0,
})

const idPercentageFormatter = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const idDateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
})

const idDateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "Asia/Jakarta",
})

export function formatNumber(value: number | null | undefined, digits = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-"
  }

  if (digits === 0) {
    return idIntegerFormatter.format(value)
  }

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)
}

export function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-"
  }

  return `${idPercentageFormatter.format(value)}%`
}

export function formatProbability(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-"
  }

  const normalized = value > 1 ? value : value * 100
  return `${idPercentageFormatter.format(normalized)}%`
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "-"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "-"

  return idDateFormatter.format(date)
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "-"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "-"

  return idDateTimeFormatter.format(date)
}

export function normalizeFloodRiskClass(value: string | null | undefined): FloodRiskClass {
  const clean = (value || "").trim().toLowerCase()

  if (clean === "aman" || clean === "tidak rawan") return "Aman"
  if (clean === "sangat rawan") return "Sangat Rawan"
  return "Rawan"
}

export function getFloodRiskTone(value: FloodRiskClass) {
  if (value === "Aman") {
    return {
      badge: "bg-secondary-container text-on-secondary-container",
      dot: "bg-secondary shadow-secondary/30",
      bar: "bg-secondary",
      text: "text-secondary",
    }
  }

  if (value === "Sangat Rawan") {
    return {
      badge: "bg-error-container text-on-error-container",
      dot: "bg-error shadow-error/30",
      bar: "bg-error",
      text: "text-error",
    }
  }

  return {
    badge: "bg-tertiary-container text-on-tertiary-container",
    dot: "bg-tertiary shadow-tertiary/30",
    bar: "bg-tertiary",
    text: "text-tertiary",
  }
}

export function formatClassLabel(value: string | null | undefined): FloodRiskClass {
  return normalizeFloodRiskClass(value)
}
