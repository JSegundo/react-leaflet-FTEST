import "./App.css"
// import { Button } from "@/components/ui/button"
// import React, { useState } from "react"
// import Navbar from "./layouts/Navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import AreaSelectorScreen from "./screens/AreaSelectorScreen"
import WeatherCityScreen from "./screens/WeatherCityScreen"
import { useState } from "react"

function App() {
  // State for selected city's latitude and longitude
  // const [selectedLocation, setSelectedLocation] = useState({
  //   lat: null,
  //   lng: null,
  // })

  const [activeTab, setactiveTab] = useState<string>("area")
  return (
    <div className="app-container">
      <Tabs defaultValue="areaSelector" className="w-full">
        <TabsContent value="areaSelector">
          <AreaSelectorScreen
          // onLocationSelect={setSelectedLocation}
          />
        </TabsContent>

        <TabsContent value="weatherCity">
          <WeatherCityScreen
          // lat={selectedLocation.lat}
          // lng={selectedLocation.lng}
          />
        </TabsContent>
        <TabsList className="mt-2">
          <TabsTrigger
            value="areaSelector"
            onClick={() => setactiveTab("area")}
          >
            {activeTab === "area" ? (
              <img src={"disc.png"} />
            ) : (
              <img src={"disc-light.png"} />
            )}
          </TabsTrigger>
          <TabsTrigger
            value="weatherCity"
            onClick={() => setactiveTab("weather")}
          >
            {activeTab === "weather" ? (
              <img src={"cloud.png"} />
            ) : (
              <img src={"cloud-light.png"} />
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default App
