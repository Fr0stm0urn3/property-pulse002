import connectDB from "@/config/database"
import User from "@/models/User"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionUser"

export const dynamic = "force-dynamic"

//POST /api/bookmarks
export const POST = async (request) => {
  try {
    await connectDB()

    const { propertyId } = await request.json()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 })
    }

    const { userId } = sessionUser

    //Find user in database
    const user = await User.findOne({ _id: userId })

    //Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId)

    let message

    //If already bookmarked remove it
    if (isBookmarked) {
      user.bookmarks.pull(propertyId)
      message = "Bookmark Removed Successfully."
      isBookmarked = false
    } else {
      //If not bookmarked added it
      user.bookmarks.push(propertyId)
      message = "Bookmark Added Successfully."
      isBookmarked = true
    }

    await user.save()

    return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong", { status: 500 })
  }
}
