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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export default MainLayout
