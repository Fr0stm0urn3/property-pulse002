"use client"

import { useState, useEffect } from "react"
import Spinner from "@/components/Spinner"
import PropertyCard from "@/components/PropertyCard"
import { toast } from "react-toastify"

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarkedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks")

        if (res.status === 200) {
          const data = await res.json()
          setProperties(data)
        } else {
          console.log(res.statusText)
          toast.error("Failed to fetch saved properties.")
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to fetch saved properties.")
      } finally {
        setLoading(false)
      }
    }
    fetchBookmarkedProperties()
  }, [])

  if (loading) {
    return <Spinner loading={loading} />
  }

  return (
    <section class="px-4 py-6">
      <div class="container-xl lg:container m-auto px-4 py-6">
        <h1 class="text-3xl font-bold mb-6">Your Saved Properties</h1>
        {properties.length === 0 ? (
          <h2 className="font-bold text-lg">You don't have any saved properties.</h2>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard property={property} key={property._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SavedPropertiesPage
