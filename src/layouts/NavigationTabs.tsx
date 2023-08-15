import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AreaSelectorScreen from "../screens/AreaSelectorScreen"
import WeatherCityScreen from "../screens/WeatherCityScreen"

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("areaSelector")

  return (
    <Tabs
      className="flex flex-col h-full"
      defaultValue="areaSelector"
      key={activeTab}
      onValueChange={(tab) => setActiveTab(tab)}
    >
      <TabsContent value="areaSelector" className="flex-1">
        <AreaSelectorScreen />
      </TabsContent>

      <TabsContent value="weatherCity" className="flex-1">
        <WeatherCityScreen />
      </TabsContent>

      <TabsList className="mt-4 w-full ">
        <TabsTrigger value="areaSelector">
          <img
            src="disc.png"
            width={"100%"}
            className={
              activeTab === "areaSelector" ? "active-icon" : "inactive-icon"
            }
          />
        </TabsTrigger>
        <TabsTrigger value="weatherCity" className="mw-3">
          <img
            src="cloud.png"
            width={"100%"}
            className={
              activeTab === "weatherCity" ? "active-icon" : "inactive-icon"
            }
          />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default NavigationTabs
