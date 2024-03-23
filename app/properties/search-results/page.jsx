"use client"

import { useState, useEffect } from "react"
import Spinner from "@/components/Spinner"
import { useSearchParams } from "next/navigation"
import PropertyCard from "@/components/PropertyCard"
import Link from "next/link"
import { FaArrowAltCircleLeft } from "react-icons/fa"
import PropertySearchForm from "@/components/PropertySearchForm"

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

  return (
    <>
      <section className="bg-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/properties"
              className="flex items-center hover:text-gray-500 hover:underline mb-4"
            >
              <FaArrowAltCircleLeft className="mb-0.5 mr-2" /> Back To Properties
            </Link>
            <h1 className="text-2xl font-bold mb-4 text-center">Search Results</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.length === 0 ? (
                <p className="font-bold text-xl mt-10 mx-auto">
                  No search results found.
                </p>
              ) : (
                properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default SearchResultsPage
