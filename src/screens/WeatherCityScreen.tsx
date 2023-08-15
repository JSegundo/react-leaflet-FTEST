import CitySelector from "@/components/ui/WeatherCity/CitySelector"
import WeatherDisplay from "@/components/ui/WeatherCity/WeatherDisplay"
import { useState } from "react"

export interface ICityData {
  id: number
  city: string
  timezone: string
  location: {
    type: string
    coordinates: number[]
  }
}

const WeatherCityScreen = () => {
  const [cityIdSelected, setcityIdSelected] = useState<number>(1724654701)

  return (
    <div className="flex flex-col gap-3 w-full">
      <section className="text-center">
        <h1>Weather city</h1>
      </section>
      <CitySelector setcityIdSelected={setcityIdSelected} />
      <WeatherDisplay cityIdSelected={cityIdSelected} />
    </div>
  )
}

export default WeatherCityScreen
