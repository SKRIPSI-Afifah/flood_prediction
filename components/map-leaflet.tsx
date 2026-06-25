"use client"

import { MapContainer, TileLayer, ZoomControl, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import type { FeatureCollection } from "geojson"

import { formatDateTime, formatNumber, normalizeFloodRiskClass } from "@/lib/format"

interface LatestPrediction {
  adm3_pcode: string
  kabupaten: string
  kecamatan: string
  rainfall: number | null
  predicted_class: string
  created_at: string
}

interface MapLeafletProps {
  center?: [number, number]
  zoom?: number
  selectedFeature?: any
  onSelectFeature?: (feature: any) => void
  onDataLoaded?: (features: any[]) => void
  activeFactorFilter?: string | null
  latestPredictionByPcode?: Record<string, LatestPrediction>
  popupMode?: "full" | "prediction-only"
}

export default function MapLeaflet({
  center = [4.7, 96.8],
  zoom = 8,
  selectedFeature,
  onSelectFeature,
  onDataLoaded,
  activeFactorFilter = null,
  latestPredictionByPcode = {},
  popupMode = "full",
}: MapLeafletProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null)

  useEffect(() => {
    setIsMounted(true)

    fetch("/data/data_banjir.geojson")
      .then((res) => res.json())
      .then((data) => {
        const acehOnly = {
          ...data,
          features: data.features.filter(
            (feature: any) => feature.properties.ADM1_EN?.toLowerCase() === "aceh"
          ),
        }

        setGeoData(acehOnly)
        if (onDataLoaded && acehOnly.features.length > 0) {
          onDataLoaded(acehOnly.features)
        }
      })
      .catch((err) => console.error("Gagal load GeoJSON:", err))
  }, [onDataLoaded])

  const getStatus = (props: any) => {
    const key = Object.keys(props || {}).find((k) => k.toLowerCase().includes("label_statistik"))
    return key ? props[key] : "-"
  }

  const getColor = (label: string = "") => {
    const clean = label.trim()
    if (clean === "Aman") return "#22c55e"
    if (clean === "Rawan") return "#f59e0b"
    if (clean === "Sangat Rawan") return "#ef4444"
    return "#9ca3af"
  }

  const getLatestPrediction = (pcode: string) => latestPredictionByPcode[pcode] || null

  const checkFilterMatch = (props: any, filter: string | null) => {
    if (!filter) return true
    const hujan = props["klasifikasi banjir perkecamatan_rata_hujan_mm"] || 0
    const elevasi = props["klasifikasi banjir perkecamatan_rata_elevasi"] || 0
    const slope = props["klasifikasi banjir perkecamatan_rata_slope"] || 0
    const lahan = props["klasifikasi banjir perkecamatan_rata_lahan_terbangun"] || 0
    const ndvi = props["klasifikasi banjir perkecamatan_rata_ndvi"] || 0

    switch (filter) {
      case "hujan":
        return hujan > 220
      case "elevasi":
        return elevasi < 75
      case "slope":
        return slope < 12
      case "lahan":
        return lahan > 0.01
      case "ndvi":
        return ndvi < 0.65
      default:
        return true
    }
  }

  const geoJsonStyle = (feature: any) => {
    const props = feature.properties
    const isSelected = selectedFeature && selectedFeature.properties.ADM3_PCODE === props.ADM3_PCODE
    const matchesFilter = checkFilterMatch(props, activeFactorFilter)
    const latestPrediction = getLatestPrediction(props.ADM3_PCODE)
    const label = latestPrediction ? normalizeFloodRiskClass(latestPrediction.predicted_class) : getStatus(props)
    const hasPrediction = Boolean(latestPrediction)
    const hasAnyPrediction = Object.keys(latestPredictionByPcode).length > 0

    if (activeFactorFilter && !matchesFilter) {
      return {
        fillColor: "#9ca3af",
        color: "#d1d5db",
        weight: 1,
        fillOpacity: 0.05,
        opacity: 0.1,
      }
    }

    if (popupMode === "prediction-only") {
      return {
        fillColor: hasPrediction ? getColor(label) : hasAnyPrediction ? "#f3f4f6" : getColor(label),
        color: isSelected ? "#ffffff" : "#111827",
        weight: isSelected ? 3 : 1,
        fillOpacity: hasPrediction ? (isSelected ? 0.85 : 0.72) : hasAnyPrediction ? 0.08 : 0.18,
      }
    }

    return {
      fillColor: getColor(label),
      color: isSelected ? "#ffffff" : "#111827",
      weight: isSelected ? 3 : 1,
      fillOpacity: isSelected ? 0.85 : 0.65,
    }
  }

  const onEachFeature = (feature: any, layer: any) => {
    const props = feature.properties
    const latestPrediction = getLatestPrediction(props.ADM3_PCODE)
    if (popupMode === "prediction-only" && !latestPrediction) {
      const nameOnly = props.ADM3_EN || props.kecamatan || "-"
      layer.bindPopup(`
        <div style="font-family: inherit; min-width: 220px; padding: 4px;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 2px;">
            ${props.ADM2_EN || "-"}
          </div>
          <div style="font-size: 16px; font-weight: 900; text-transform: uppercase; color: #111827;">
            ${nameOnly}
          </div>
        </div>
      `)
    } else {
      const label = latestPrediction ? normalizeFloodRiskClass(latestPrediction.predicted_class) : getStatus(props)
      const badgeColor = getColor(label)
      const rainfall = latestPrediction?.rainfall ?? props["klasifikasi banjir perkecamatan_rata_hujan_mm"] ?? 0
      const latestDate = latestPrediction?.created_at ? formatDateTime(latestPrediction.created_at) : "-"
      const kabupaten = latestPrediction?.kabupaten || props.ADM2_EN || "-"
      const kecamatan = latestPrediction?.kecamatan || props.ADM3_EN || props.kecamatan || "-"

      layer.bindPopup(`
        <div style="font-family: inherit; min-width: 240px; padding: 4px;">
          <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; margin-bottom: 2px;">
            ${kabupaten}
          </div>
          <div style="font-size: 16px; font-weight: 900; text-transform: uppercase; color: #111827; margin-bottom: 8px;">
            ${kecamatan}
          </div>
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 12px;">
            <span style="background-color: ${badgeColor}; color: white; font-size: 9px; font-weight: 900; text-transform: uppercase; padding: 2px 8px; border-radius: 99px; letter-spacing: 0.05em;">
              ${label}
            </span>
            <span style="font-size: 11px; color: #4b5563; font-weight: 700;">Prediksi Terbaru</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr; gap: 8px; font-size: 11px; border-top: 1px solid #e5e7eb; padding-top: 8px;">
            <div>
              <span style="color: #9ca3af; font-size: 9px; text-transform: uppercase; font-weight: 700;">Curah Hujan</span>
              <div style="font-weight: 800; color: #1f2937;">${formatNumber(rainfall, 1)} mm</div>
            </div>
            <div>
              <span style="color: #9ca3af; font-size: 9px; text-transform: uppercase; font-weight: 700;">Hasil Prediksi Terbaru</span>
              <div style="font-weight: 800; color: #1f2937;">${label}</div>
            </div>
            <div>
              <span style="color: #9ca3af; font-size: 9px; text-transform: uppercase; font-weight: 700;">Tanggal Prediksi Terbaru</span>
              <div style="font-weight: 800; color: #1f2937;">${latestDate}</div>
            </div>
          </div>
        </div>
      `)
    }

    layer.on({
      click: () => {
        if (onSelectFeature) {
          onSelectFeature(feature)
        }
      },
      mouseover: (e: any) => {
        const lyr = e.target
        lyr.setStyle({
          weight: 3,
          color: "#ffffff",
          fillOpacity: 0.85,
        })
      },
      mouseout: (e: any) => {
        const lyr = e.target
        lyr.setStyle(geoJsonStyle(feature))
      },
    })
  }

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-surface-container flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-primary/70 animate-pulse">Memuat Peta GIS Aceh...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative group">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {geoData && (
          <GeoJSON
            key={`${activeFactorFilter || "default"}-${selectedFeature?.properties?.ADM3_PCODE || "none"}-${Object.keys(latestPredictionByPcode).length}`}
            data={geoData}
            style={geoJsonStyle}
            onEachFeature={onEachFeature}
          />
        )}

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  )
}
