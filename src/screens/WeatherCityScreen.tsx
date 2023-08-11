import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import cities from "../utils/cities.json"
import axios from "axios"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ICityData {
  id: number
  city: string
  timezone: string
  location: {
    type: string
    coordinates: number[]
  }
}

interface ICityWeatherResponse {
  coord: {
    lon: number
    lat: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

const WeatherCityScreen = () => {
  const [cityIdSelected, setcityIdSelected] = useState<number>(1724654701)
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

  // const [loading, setloading] = useState(false)

  const [cityWeatherData, setcityWeatherData] = useState<ICityWeatherResponse>()

  useEffect(() => {
    async function getCityWeather(city: ICityData) {
      // setloading(true)
      const [lat, lon] = city.location.coordinates
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        )
        if (res.status === 200) {
          console.log(res.data)
          setcityWeatherData(res.data)
          // setloading(false)
        }
      } catch (err) {
        console.error(err)
        // setloading(false)
      }
    }

    if (cityIdSelected) {
      const city = cities.find((city) => city.id === cityIdSelected)
      if (city) {
        getCityWeather(city)
      }
    }
  }, [cityIdSelected])

  const formatTime = (date: number) => {
    return new Date(date * 1000).toLocaleTimeString()
  }

  function kelvinToCelsius(kelvin: number) {
    if (kelvin === undefined) return "N/A"
    return kelvin - 273.15
  }

  return (
    <div className="flex flex-col gap-3 ">
      <section className="text-center">
        <h1>Weather city</h1>
      </section>
      <section className="max-w-xs">
        <h2 className="title-container">City</h2>
        <select
          name="select-city"
          id="select-city"
          onChange={(e) => {
            setcityIdSelected(Number(e.target.value))
          }}
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id} className="p-5">
              {city.city}
            </option>
          ))}
        </select>
      </section>
      <section className="">
        <Card>
          {/* <CardHeader>
         
          </CardHeader> */}
          {/* <Separator /> */}
          <CardContent className="flex flex-col gap-3 pt-3 card-weather">
            <div className="flex justify-start align-center gap-3">
              <section className="">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>weather image</AvatarFallback>
                </Avatar>
              </section>
              <section className="flex gap-3">
                <article className="flex flex-col justify-between">
                  <p className="helper-text">Weather</p>
                  <p>{cityWeatherData?.weather[0].main}</p>
                </article>
                <article className="flex flex-col justify-between">
                  <p className="helper-text">Description</p>
                  <p>{cityWeatherData?.weather[0].description}</p>
                </article>
              </section>
            </div>
            <section className="flex justify-between align-center gap-3">
              <article className="flex flex-col justify-between">
                <p className="helper-text">Sunset</p>
                <p>{formatTime(cityWeatherData?.sys.sunset)}</p>
              </article>
              <article className="flex flex-col justify-between">
                <p className="helper-text">Sunrise</p>
                <p>{formatTime(cityWeatherData?.sys.sunrise)}</p>
              </article>
              <article className="flex flex-col justify-between">
                {/* <p className="helper-text">Wind</p> */}
                <p className="helper-text">Location</p>
                <a
                  href={`https://www.google.com/maps?q=${cityWeatherData?.coord.lat},${cityWeatherData?.coord.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p>{cityWeatherData?.name}</p>
                </a>
              </article>
            </section>

            <section className="flex justify-start align-center gap-3">
              <article className="flex flex-col justify-between">
                <p className="helper-text">Temperature</p>
                <p>
                  {cityWeatherData?.main.temp &&
                    kelvinToCelsius(cityWeatherData?.main.temp).toFixed(2) +
                      "°C"}
                </p>
              </article>
              <article className="flex flex-col justify-between">
                <p className="helper-text">Feels like</p>
                <p>
                  {cityWeatherData?.main.feels_like &&
                    kelvinToCelsius(cityWeatherData?.main.feels_like).toFixed(
                      2
                    ) + "°C"}
                </p>
              </article>
            </section>

            <section className="relative mt-1">
              <p className="helper-text humidity-helper">
                Humidity {cityWeatherData?.main.humidity}%
              </p>
              <progress
                className="progress-humidity"
                value={cityWeatherData?.main.humidity}
                max={100}
              ></progress>
            </section>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default WeatherCityScreen
