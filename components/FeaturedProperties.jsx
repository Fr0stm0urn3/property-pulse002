import FeaturedProperty from "./FeaturedProperty"
import { fetchProperties } from "@/utils/requests"

const FeaturedProperties = async () => {
  const featuredProperties = await fetchProperties({ showFeatured: true })

  return (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProperties.length === 0 ? (
            <p>Properties are yet to be featured.</p>
          ) : (
            featuredProperties.map((property) => (
              <FeaturedProperty property={property} key={property._id} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties
