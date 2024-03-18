import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"
import Message from "@/models/Message"

export const dynamic = "force-dynamic"

//GET /api/messages/unread-count
export const GET = async (request) => {
  try {
    await connectDB()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 })
    }

    const { userId } = sessionUser

    const unreadMessageCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    })

    return new Response(JSON.stringify({ count: unreadMessageCount }), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Request("Something went wrong", { status: 500 })
  }
}