export const PREDICTION_INPUT_RANGES = {
  hujan_mm: {
    label: "curah hujan",
    min: 0,
    max: 1000,
    unit: "mm",
  },
  elevasi: {
    label: "elevasi",
    min: 0,
    max: 3000,
    unit: "m",
  },
  slope: {
    label: "kemiringan lereng",
    min: 0,
    max: 45,
    unit: "%",
  },
  lahan_terbangun: {
    label: "lahan terbangun",
    min: 0,
    max: 1,
    unit: "proporsi 0-1",
  },
} as const

export type PredictionInputField = keyof typeof PREDICTION_INPUT_RANGES

export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value)
}

function formatLimit(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2)
}

export function validatePredictionInputField(field: PredictionInputField, value: unknown) {
  if (!isFiniteNumber(value)) {
    return `${PREDICTION_INPUT_RANGES[field].label} harus berupa angka yang valid.`
  }

  const range = PREDICTION_INPUT_RANGES[field]
  if (value < range.min || value > range.max) {
    return `${range.label} harus berada pada rentang ${formatLimit(range.min)} sampai ${formatLimit(range.max)} ${range.unit}.`
  }

  return null
}

export function validatePredictionInput(payload: Record<PredictionInputField, unknown>) {
  const errors = Object.entries(PREDICTION_INPUT_RANGES)
    .map(([field, _range]) => validatePredictionInputField(field as PredictionInputField, payload[field as PredictionInputField]))
    .filter((value): value is string => value !== null)

  return errors
}
