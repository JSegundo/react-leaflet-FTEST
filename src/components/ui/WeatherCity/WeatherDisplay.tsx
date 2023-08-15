import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"
import { ICityData } from "@/screens/WeatherCityScreen"
import { showError } from "@/utils/showNotification"
import cities from "../../../utils/cities.json"
import { CiLocationOn } from "react-icons/ci"
import {
  FaCloud,
  FaSun,
  FaBolt,
  FaSnowflake,
  FaSmog,
  FaCloudRain,
} from "react-icons/fa"
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

interface IWeatherDisplay {
  cityIdSelected: number
}

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const WeatherDisplay = ({ cityIdSelected }: IWeatherDisplay) => {
  const [cityWeatherData, setcityWeatherData] = useState<ICityWeatherResponse>()

  useEffect(() => {
    async function getCityWeather(city: ICityData) {
      const [lon, lat] = city.location.coordinates
      console.log("city.location", city.location)
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        )
        if (res.status === 200) {
          setcityWeatherData(res.data)
          console.log(res.data.coord)
        }
      } catch (err) {
        showError(
          "There has been an error fetching the desired data. Please try again later!"
        )
      }
    }

    if (cityIdSelected) {
      const city = cities.find((city) => city.id === cityIdSelected)
      if (city) {
        getCityWeather(city)
        console.log(city.location.coordinates)
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

  const getWeatherIcon = (weatherMain: string) => {
    switch (weatherMain) {
      case "Clear":
        return <FaSun style={{ width: "50%", height: "100%" }} />
      case "Clouds":
        return <FaCloud style={{ width: "50%", height: "100%" }} />
      case "Thunderstorm":
        return <FaBolt style={{ width: "50%", height: "100%" }} />
      case "Snow":
        return <FaSnowflake style={{ width: "50%", height: "100%" }} />
      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
        return <FaSmog style={{ width: "50%", height: "100%" }} />
      case "Rain":
      case "Drizzle":
        return <FaCloudRain style={{ width: "50%", height: "100%" }} />
      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      {cityWeatherData ? (
        <CardContent className="flex flex-col gap-3 pt-3 card-weather ">
          <div className="flex justify-start align-center gap-3">
            <section style={{ width: "20%" }}>
              {getWeatherIcon(cityWeatherData?.weather[0].main)}{" "}
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
              <p className="helper-text">Location</p>
              <a
                href={`https://www.google.com/maps?q=${cityWeatherData?.coord.lat},${cityWeatherData?.coord.lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
              >
                <CiLocationOn style={{ width: "20px" }} />
                <p>{cityWeatherData?.name}</p>
              </a>
            </article>
          </section>

          <section className="flex justify-start align-center gap-3">
            <article className="flex flex-col justify-between">
              <p className="helper-text">Temperature</p>
              <p>
                {cityWeatherData?.main.temp &&
                  kelvinToCelsius(cityWeatherData?.main.temp).toFixed(2) + "°C"}
              </p>
            </article>
            <article className="flex flex-col justify-between">
              <p className="helper-text">Feels like</p>
              <p>
                {cityWeatherData?.main.feels_like &&
                  kelvinToCelsius(cityWeatherData?.main.feels_like).toFixed(2) +
                    "°C"}
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
      ) : null}
    </Card>
  )
}

export default WeatherDisplay
