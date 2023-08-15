import React, { Dispatch, SetStateAction } from "react"
import cities from "../../../utils/cities.json"
interface ICitySelector {
  setcityIdSelected: Dispatch<SetStateAction<number>>
}

const CitySelector = ({ setcityIdSelected }: ICitySelector) => {
  return (
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
  )
}

export default CitySelector
