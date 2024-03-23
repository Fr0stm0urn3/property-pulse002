import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionUser"
import connectDB from "@/config/database"

//POST /api/bookmarks/check
export const POST = async (request) => {
  try {
    await connectDB()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 })
    }

    const { userId } = sessionUser
    const { propertyId } = await request.json()

    const user = await User.findOne({ _id: userId })

    const isBookmarked = user.bookmarks.includes(propertyId)

    return new Response(JSON.stringify({ isBookmarked }), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong", { status: 500 })
  }
}
