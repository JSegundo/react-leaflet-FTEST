import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import Swal from "sweetalert2"
import Map from "@/components/ui/AreaSelector/Map"
import * as z from "zod"

const AreaSelectorScreen = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const [radius, setradius] = useState<number>(200)
  const [errors, seterrors] = useState({ lat: "", lng: "" })

  useEffect(() => {
    if (!navigator.geolocation) {
      showError("Geolocation is not supported by your browser.")
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        showError(error.message)
      }
    )
  }, [])

  const showError = (message: string) => {
    Swal.fire({
      title: "Error!",
      text: message,
      icon: "error",
      confirmButtonText: "Cool",
    })
  }

  const formSchema = z.object({
    lat: z
      .number()
      .min(-90, "Latitude must be between -90 and 90.")
      .max(90, "Latitude must be between -90 and 90."),
    lng: z
      .number()
      .min(-180, "Longitude must be between -180 and 180.")
      .max(180, "Longitude must be between -180 and 180."),
  })

  const validateLocation = () => {
    const result = formSchema.safeParse(location)
    console.log("result", result)
    console.log("formSchema: ", formSchema)
    if (!result.success) {
      seterrors({
        lat:
          result.error.errors.find((e) => e.path[0] === "lat")?.message || "",
        lng:
          result.error.errors.find((e) => e.path[0] === "lng")?.message || "",
      })
    } else {
      seterrors({ lat: "", lng: "" })
    }
  }

  return (
    <>
      <div className="flex flex-col gap-3 ">
        <section className="text-center">
          <h1>Area Selector</h1>
        </section>
        <section className="max-w-xs">
          <h2 className="title-container">Location</h2>
          <div className="flex">
            <article className="flex flex-col w-1/2">
              <p className="helper-text subtitle-container ">Latitude</p>
              <Input
                type="number"
                value={location.lat || ""}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    lat: parseFloat(e.target.value),
                  }))
                }
                onBlur={validateLocation}
              />
              {errors.lat && (
                <div style={{ color: "red" }} className="my-1">
                  {errors.lat}
                </div>
              )}
            </article>

            <article className="flex flex-col w-1/2">
              <p className="helper-text subtitle-container">Longitude</p>
              <Input
                type="number"
                value={location.lng || ""}
                onChange={(e) =>
                  setLocation((prev) => ({
                    ...prev,
                    lng: parseFloat(e.target.value),
                  }))
                }
                onBlur={validateLocation}
              />

              {errors.lng && (
                <div style={{ color: "red" }} className="my-1">
                  {errors.lng}
                </div>
              )}
            </article>
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <div className="flex justify-between align-center ">
            <h2>Area</h2>
            <p className="helper-text">Max 20 km</p>
          </div>
          <input
            type="range"
            min="100"
            max="5000"
            value={radius}
            onChange={(e) => setradius(Number(e.target.value))}
          />

          <Map lat={location.lat} lng={location.lng} radiusInput={radius} />
        </section>
      </div>

      {/* {error && ( */}

      {/* )} */}
    </>
  )
}

export default AreaSelectorScreen
