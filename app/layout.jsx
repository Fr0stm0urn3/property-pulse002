import "@/assets/styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
}

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="flex flex-col justify-between min-h-screen">
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

export default MainLayout
