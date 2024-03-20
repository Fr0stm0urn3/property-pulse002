import React from "react"
import InfoBox from "./InfoBox"

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            header="For Renters"
            buttonInfo={{
              backgroundColor: "bg-black",
              text: "Browse Properties",
              link: "/properties",
              bgHover: "hover:bg-gray-700",
            }}
          >
            Find your dream rental property. Bookmark properties and contact owners.
          </InfoBox>
          <InfoBox
            header="For Property Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              backgroundColor: "bg-blue-500",
              text: "Add Property",
              link: "/properties/add",
              bgHover: "hover:bg-blue-600",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb or long
            term.
          </InfoBox>
        </div>
      </div>
    </section>
  )
}

export default InfoBoxes
