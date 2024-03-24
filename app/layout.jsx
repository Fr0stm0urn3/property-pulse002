import "@/assets/styles/globals.css"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import AuthProvider from "@/components/AuthProvider"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { GlobalProvider } from "@/context/GlobalContext"

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental,find rentals, find properties",
}

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html>
          <body>
            <div className="flex flex-col justify-between min-h-screen">
              <Navbar />
              {children}
              <Footer />
              <ToastContainer />
            </div>
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  )
}

export default MainLayout
