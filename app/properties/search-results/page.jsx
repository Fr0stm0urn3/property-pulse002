"use client"

import { useState, useEffect } from "react"
import Spinner from "@/components/Spinner"
import { toast } from "react-toastify"
import { useSearchParams } from "next/navigation"
import PropertyCard from "@/components/PropertyCard"

const SearchResultsPage = () => {
  const searchParams = useSearchParams()

  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  console.log(searchParams.get("location"))
  console.log(searchParams.get("propertyType"))
  const location = searchParams.get("location")
  const propertyType = searchParams.get("propertyType")

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        )

        if (res.status === 200) {
          const data = await res.json()
          setProperties(data)
        } else {
          setProperties([])
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchSearchResults()
  }, [location, propertyType])

  if (loading) {
    return <Spinner loading={loading} />
  }

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p className="text-center font-bold text-2xl">No Properties Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchResultsPage
