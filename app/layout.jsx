import "@/assets/styles/globals.css"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import AuthProvider from "@/components/AuthProvider"

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental,find rentals, find properties",
}

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <div className="flex flex-col justify-between min-h-screen">
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout
