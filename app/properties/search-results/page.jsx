"use client"

import { useState, useEffect } from "react"
import Spinner from "@/components/Spinner"
import { useSearchParams } from "next/navigation"
import PropertyCard from "@/components/PropertyCard"

const SearchResultsPage = () => {
  const searchParams = useSearchParams()
  const location = searchParams.get("location")
  const propertyType = searchParams.get("propertyType")

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSearchedProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        )

        if (res.status === 200) {
          const data = await res.json()
          setProperties(data)
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    fetchSearchedProperties()
  }, [location, propertyType])

  return loading ? (
    <Spinner loading={loading} />
  ) : properties.length === 0 ? (
    <h3 className="font-bold text-2xl mt-40 mx-auto">No Properties Found.</h3>
  ) : (
    properties.map((property) => <PropertyCard key={property._id} property={property} />)
  )
}

export default SearchResultsPage
