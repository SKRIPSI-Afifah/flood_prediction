"use client"

import { MapContainer, TileLayer, ZoomControl, GeoJSON, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import type { FeatureCollection } from "geojson"
import L from "leaflet"
import { formatPercent } from "@/lib/format"

interface PredictionMapProps {
  center?: [number, number]
  markerPosition?: [number, number] | null
  zoom?: number
  selectedPcode?: string | null
  predictedClass?: string | null
  popupInfo?: {
    kabupaten: string
    kecamatan: string
    rainfall: number
    elevation: number
    slope: number
    built_area: number
    predicted_class: string
    confidence: number
    description?: string
  } | null
}

// Helper component to change map center and zoom dynamically
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1 })
  }, [center, zoom, map])
  return null
}

export default function PredictionMap({
  center = [4.7, 96.8],
  markerPosition = null,
  zoom = 8,
  selectedPcode = null,
  predictedClass = null,
  popupInfo = null,
}: PredictionMapProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null)
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.trim()
  const tileUrl = mapboxToken
    ? `https://api.mapbox.com/styles/v1/mapbox/light-v11/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  const tileAttribution = mapboxToken
    ? '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    : "&copy; OpenStreetMap contributors"

  useEffect(() => {
    setIsMounted(true)

    fetch("/data/data_banjir.geojson")
      .then((res) => res.json())
      .then((data) => {
        // Filter features only for Aceh province
        const acehOnly = {
          ...data,
          features: data.features.filter(
            (feature: any) =>
              feature.properties.ADM1_EN?.toLowerCase() === "aceh"
          ),
        }
        setGeoData(acehOnly)
      })
      .catch((err) => console.error("Gagal memuat GeoJSON wilayah:", err))
  }, [])

  const getColor = (label: string | null) => {
    if (!label) return "#9ca3af" // Default gray
    const clean = label.trim().toLowerCase()
    if (clean === "aman") return "#22c55e"         // Green
    if (clean === "rawan") return "#f59e0b"        // Orange/Yellow
    if (clean === "sangat rawan") return "#ef4444" // Red
    return "#9ca3af"
  }

  // GeoJSON style handler
  const geoJsonStyle = (feature: any) => {
    const featurePcode = feature.properties.ADM3_PCODE
    const isSelected = selectedPcode && featurePcode && featurePcode.toLowerCase() === selectedPcode.toLowerCase()

    if (isSelected && !predictedClass) {
      return {
        fillColor: "#bfdbfe",
        color: "#2563eb",
        weight: 2.5,
        fillOpacity: 0.55,
      }
    }

    return {
      fillColor: isSelected ? getColor(predictedClass) : "#e5e7eb",
      color: isSelected ? "#111827" : "#cbd5e1",
      weight: isSelected ? 2.5 : 1,
      fillOpacity: isSelected ? 0.75 : 0.2,
    }
  }

  // Custom marker pulsing dot using Leaflet divIcon to bypass default asset path issues
  const getCustomMarkerIcon = (label: string | null) => {
    const color = getColor(label)
    return L.divIcon({
      html: `
        <div class="relative flex items-center justify-center" style="width: 36px; height: 36px;">
          <div class="absolute rounded-full animate-ping opacity-25" style="width: 100%; height: 100%; background-color: ${color};"></div>
          <div class="absolute rounded-full" style="width: 16px; height: 16px; background-color: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);"></div>
        </div>
      `,
      className: "custom-pulsing-marker",
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    })
  }

  if (!isMounted) {
    return <div className="w-full h-[400px] rounded-xl bg-surface-container animate-pulse" />
  }

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm border border-surface-container relative">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution={tileAttribution}
          url={tileUrl}
        />

        <ChangeView center={center} zoom={zoom} />

        {geoData && (
          <GeoJSON
            key={selectedPcode ? `${selectedPcode}-${predictedClass}` : "default"}
            data={geoData}
            style={geoJsonStyle}
          />
        )}

        {selectedPcode && popupInfo && markerPosition && (
          <Marker
            position={markerPosition}
            icon={getCustomMarkerIcon(predictedClass)}
          >
            <Popup className="custom-leaflet-popup">
              <div className="p-3 font-sans min-w-[220px]">
                <h4 className="font-heading font-black text-sm uppercase text-primary border-b pb-1.5 mb-2">
                  Detail Lokasi
                </h4>
                <div className="space-y-1 text-xs font-semibold text-on-surface">
                  <div className="flex justify-between">
                    <span className="opacity-50">KABUPATEN:</span>
                    <span>{popupInfo.kabupaten}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-50">KECAMATAN:</span>
                    <span>{popupInfo.kecamatan}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1.5 mt-1.5">
                    <span className="opacity-50">CURAH HUJAN:</span>
                    <span>{popupInfo.rainfall} mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-50">ELEVASI:</span>
                    <span>{popupInfo.elevation} m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-50">SLOPE:</span>
                    <span>{popupInfo.slope} %</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-50">LAHAN TERBANGUN:</span>
                    <span>{formatPercent(popupInfo.built_area)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1.5 mt-1.5">
                    <span className="opacity-50">PREDIKSI:</span>
                    <span 
                      className="px-2 py-0.5 rounded font-black text-[10px] uppercase text-white"
                      style={{ backgroundColor: getColor(predictedClass) }}
                    >
                      {popupInfo.predicted_class}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-50">CONFIDENCE:</span>
                    <span>{(popupInfo.confidence * 100).toFixed(1)}%</span>
                  </div>
                  {popupInfo.description && (
                    <div className="pt-2 border-t mt-2 text-[11px] leading-relaxed opacity-80">
                      {popupInfo.description}
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  )
}
