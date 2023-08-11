import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Navbar = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsList>
        <TabsTrigger value="account">
          <img src={"disc.png"} style={{ color: "black" }} />
        </TabsTrigger>
        <TabsTrigger value="password">
          <img src="cloud.png" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default Navbar
