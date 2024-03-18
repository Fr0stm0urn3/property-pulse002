import connectDB from "@/config/database"
import { getSessionUser } from "@/utils/getSessionUser"
import Message from "@/models/Message"

export const dynamic = "force-dynamic"

//GET /api/messages
export const GET = async (request) => {
  try {
    await connectDB()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.user) {
      return new Response(JSON.stringify({ messages: "User ID is required" }), {
        status: 401,
      })
    }

    const { userId } = sessionUser

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 }) //Sort read messages in ascending order
      .populate("sender", "username")
      .populate("property", "name")

    const unreadMessages = await Message.find({ recipient: userId, read: false })
      .sort({ createdAt: -1 }) //Sort unread messages in ascending order
      .populate("sender", "username")
      .populate("property", "name")

    const messages = [...unreadMessages, ...readMessages]

    return new Response(JSON.stringify(messages), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong", { status: 500 })
  }
}

//POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB()

    const { email, phone, name, message, recipient, property } = await request.json()

    const sessionUser = await getSessionUser()

    if (!sessionUser || !sessionUser.user) {
      return new Response("User ID is required", { status: 401 })
    }

    const { user } = sessionUser

    //Can not send message to self
    if (user.id === recipient) {
      return new Response(
        JSON.stringify({ message: "You must be logged in to send a message" }),
        { status: 401 }
      )
    }

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    })

    await newMessage.save()

    return new Response(JSON.stringify({ message: "Message Sent" }), { status: 200 })
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong", { status: 500 })
  }
}
