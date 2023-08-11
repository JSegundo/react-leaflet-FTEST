import React, { useEffect, useRef } from "react"
import L from "leaflet"

interface MapProps {
  lat: number
  lng: number
  radiusInput: number
}

const Map = ({ lat, lng, radiusInput }: MapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const circleRef = useRef<L.Circle | null>(null)

  useEffect(() => {
    if (lat && lng) {
      const map = L.map("map").setView([lat, lng], 13)

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map)

      // Add a marker for the user's location
      L.marker([lat, lng]).addTo(map)

      const circle = L.circle([lat, lng], {
        color: "#42c3ee",
        fillColor: "#ecf9fd",
        fillOpacity: 0.5,
        radius: radiusInput,
      }).addTo(map)

      circleRef.current = circle // Store the circle reference

      // Cleanup on component unmount
      return () => {
        map.remove()
      }
    }
  }, [lat, lng])

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(radiusInput)
      // Adjust the map's viewport to fit the circle's bounds
      const mapInstance = circleRef.current._map // Use type assertion
      if (mapInstance) {
        mapInstance.fitBounds(circleRef.current.getBounds())
      }
    }
  }, [radiusInput])

  return <div ref={mapRef} id="map"></div>
}

export default Map
