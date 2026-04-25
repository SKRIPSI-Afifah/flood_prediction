"use client"

import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Fix for default marker icons in Leaflet with Next.js/Webpack
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface MapLeafletProps {
  center?: [number, number]
  zoom?: number
}

export default function MapLeaflet({ 
  center = [5.5483, 95.3238], 
  zoom = 12 
}: MapLeafletProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <div className="w-full h-full bg-surface-container animate-pulse" />

  return (
    <div className="w-full h-full relative group">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        className="w-full h-full z-0"
        zoomControl={false}
        style={{ background: '#0a0a0a' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Risk Areas (Simulated) */}
        <Circle 
          center={[5.5500, 95.3200]} 
          radius={1200} 
          pathOptions={{ 
            fillColor: '#ef4444', 
            fillOpacity: 0.4, 
            color: '#ef4444', 
            weight: 2 
          }} 
        />
        
        <Circle 
          center={[5.5200, 95.3500]} 
          radius={800} 
          pathOptions={{ 
            fillColor: '#f59e0b', 
            fillOpacity: 0.3, 
            color: '#f59e0b', 
            weight: 2 
          }} 
        />

        <Marker position={center}>
          <Popup className="custom-popup">
            <div className="p-2">
              <h3 className="font-black text-primary uppercase text-[10px] tracking-widest mb-1">Pusat Observasi</h3>
              <p className="text-xs text-on-surface-variant font-medium">Aceh Besar Sentinel-HUD</p>
              <div className="mt-2 pt-2 border-t border-surface-container flex items-center gap-2">
                <div className="size-2 rounded-full bg-secondary animate-pulse"></div>
                <span className="text-[9px] font-black uppercase text-secondary">Status: Sinkron</span>
              </div>
            </div>
          </Popup>
        </Marker>

        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* Map Overlay Vignette for aesthetic (Disabled for light mode) */}
      {/* <div className="absolute inset-0 pointer-events-none shadow-[inner_0_0_150px_rgba(0,0,0,0.6)] z-[5]"></div> */}
      
      <style jsx global>{`
        .leaflet-container {
          font-family: inherit;
          z-index: 0;
        }
        .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 12px;
          border: none;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
          margin-right: 40px !important;
          margin-bottom: 60px !important;
        }
        .leaflet-control-zoom-in, .leaflet-control-zoom-out {
          background: white !important;
          color: #111 !important;
          border: 1px solid #eee !important;
        }
        .leaflet-control-attribution {
          background: rgba(255, 255, 255, 0.7) !important;
          color: #666 !important;
          font-size: 8px !important;
        }
      `}</style>
    </div>
  )
}
