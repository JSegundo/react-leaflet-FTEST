import React, { Dispatch, SetStateAction } from "react"
import { Input } from "@/components/ui/input"
import * as z from "zod"

interface IErrors {
  lat: string
  lng: string
}

interface ILocation {
  lat: number
  lng: number
}

interface IFormProps {
  errors: IErrors
  location: ILocation
  radius: number
  seterrors: Dispatch<SetStateAction<IErrors>>
  setLocation: Dispatch<SetStateAction<ILocation>>
  setradius: Dispatch<SetStateAction<number>>
}
const FormAreaSelector = ({
  errors,
  location,
  radius,
  seterrors,
  setLocation,
  setradius,
}: IFormProps) => {
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
    <form>
      <section className="max-w-xs">
        <h2 className="title-container">Location</h2>
        <div className="flex">
          <article className="flex flex-col w-1/2">
            <p className="helper-text subtitle-container ">Latitude</p>
            <Input
              id="input-lat"
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
              id="input-lng"
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
      <section className="flex flex-col gap-3 mt-2">
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
      </section>
    </form>
  )
}

export default FormAreaSelector
