import "@/assets/styles/globals.css"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental,find rentals, find properties",
}

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <div className="flex flex-col justify-between min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}

export default MainLayout
