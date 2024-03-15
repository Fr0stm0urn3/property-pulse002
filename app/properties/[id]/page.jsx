"use client"

import { useEffect, useState } from "react"
import PropertyCard from "@/components/PropertyCard"
import { useParams } from "next/navigation"
import { fetchProperty } from "@/utils/request"
import Spinner from "@/components/Spinner"

const PropertyPage = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return

      try {
        const property = await fetchProperty(id)

        setProperty(property)
      } catch (error) {
        console.error("Error fetching property: ", error)
      } finally {
        setLoading(false)
      }
    }
    if (property === null) {
      fetchPropertyData()
    }
  }, [id, property])

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <div>
      <h1>PropertyPage</h1>
    </div>
  )
}

export default PropertyPage
