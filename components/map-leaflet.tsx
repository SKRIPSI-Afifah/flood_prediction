"use client"

import { MapContainer, TileLayer, ZoomControl, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react"
import type { FeatureCollection } from "geojson"

interface MapLeafletProps {
  center?: [number, number]
  zoom?: number
}

export default function MapLeaflet({
  center = [4.7, 96.8],
  zoom = 8,
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
            (feature: any) =>
              feature.properties.ADM1_EN?.toLowerCase() === "aceh"
          ),
        }

        setGeoData(acehOnly)
      })
      .catch((err) => console.error("Gagal load GeoJSON:", err))
  }, [])

  const getStatus = (props: any) => {
    const key = Object.keys(props).find((k) =>
      k.toLowerCase().includes("label_statistik")
    )

    return key ? props[key] : "-"
  }

  const getColor = (label: string = "") => {
    const clean = label.trim()

    if (clean === "Aman") return "#22c55e"
    if (clean === "Rawan") return "#f59e0b"
    if (clean === "Sangat Rawan") return "#ef4444"

    return "#9ca3af"
  }

  const geoJsonStyle = (feature: any) => {
    const label = getStatus(feature.properties)

    return {
      fillColor: getColor(label),
      color: "#111827",
      weight: 1,
      fillOpacity: 0.65,
    }
  }

  const onEachFeature = (feature: any, layer: any) => {
    const props = feature.properties
    const status = getStatus(props)

    layer.bindPopup(`
      <div style="min-width:180px">
        <b>Kecamatan:</b> ${props.ADM3_EN || props.kecamatan || "-"}<br/>
        <b>Kabupaten:</b> ${props.ADM2_EN || "-"}<br/>
        <b>Provinsi:</b> ${props.ADM1_EN || "-"}<br/>
        <b>Status:</b> ${status}
      </div>
    `)
  }

  if (!isMounted) {
    return <div className="w-full h-full bg-surface-container animate-pulse" />
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