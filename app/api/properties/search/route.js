import Property from "@/models/Property"
import connectDB from "@/config/database"

//GET /api/properties/search
export const GET = async (request) => {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)

    const location = searchParams.get("location")
    const propertyType = searchParams.get("propertyType")

    const locationPattern = new RegExp(location, "i")

    //Math location pattern against database fields
    let query = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    }

    //Only check for property if it's not all
    if (propertyType && propertyType !== "All") {
      const propertyTypePattern = new RegExp(propertyType, "i")
      query.type = propertyTypePattern
    }

    const properties = await Property.find(query)

    return new Response(JSON.stringify(properties), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong", { status: 500 })
  }
}
