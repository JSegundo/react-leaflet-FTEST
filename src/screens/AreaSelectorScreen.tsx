import React, { useEffect, useState } from "react"
import Map from "@/components/ui/AreaSelector/Map"
import FormAreaSelector from "@/components/ui/AreaSelector/FormAreaSelector"
import { showError } from "@/utils/showNotification"

const AreaSelectorScreen = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const [radius, setradius] = useState<number>(200)
  const [errors, seterrors] = useState({ lat: "", lng: "" })

  const [resetLocationTrigger, setResetLocationTrigger] = useState(0) // This will act as our trigger

  useEffect(() => {
    const storedLocation = localStorage.getItem("location")

    if (storedLocation) {
      const { lat, lng } = JSON.parse(storedLocation)
      setLocation({ lat, lng })
    } else {
      if (!navigator.geolocation) {
        showError("Geolocation is not supported by your browser.")
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude

          setLocation({ lat, lng })

          localStorage.setItem("location", JSON.stringify({ lat, lng }))
        },
        (error) => {
          showError(error.message)
        }
      )
    }
  }, [resetLocationTrigger])

  const handleUseSavedLocation = () => {
    setResetLocationTrigger((prev) => prev + 1)
  }

  return (
    <>
      <div className="flex flex-col gap-3 ">
        <section className="text-center">
          <h1>Area Selector</h1>
        </section>

        <FormAreaSelector
          errors={errors}
          location={location}
          radius={radius}
          seterrors={seterrors}
          setLocation={setLocation}
          setradius={setradius}
        />
        <Map lat={location.lat} lng={location.lng} radiusInput={radius} />
        <a onClick={handleUseSavedLocation} className="link-btn">
          Use My Saved Location
        </a>
      </div>
    </>
  )
}

export default AreaSelectorScreen
