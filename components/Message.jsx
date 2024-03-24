"use client"

import { useState } from "react"
import { toast } from "react-toastify"
import { useGlobalContext } from "@/context/GlobalContext"

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read)
  const [isDeleted, setIsDelete] = useState(false)
  const { setUnreadCount } = useGlobalContext()

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, { method: "PUT" })

      if (res.status === 200) {
        const data = await res.json(1)
        setIsRead(data.read)
        if (data.read) {
          toast.success("Marked As Read.")
          setUnreadCount((prev) => prev - 1)
        } else {
          toast.success("Marked As New.")
          setUnreadCount((prev) => prev + 1)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong.")
    }
  }
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, { method: "DELETE" })

      if (res.status === 200) {
        setIsDelete(true)
        toast.success("Message Deleted.")
        setUnreadCount((prev) => (isRead ? prev : prev - 1))
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete the message.")
    }
  }

  if (isDeleted) {
    return null
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {" "}
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}}`} className="text-blue-500">
            {" "}
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 text-white py-1 px-3 rounded-md ${
          isRead ? "bg-gray-300 text-black" : "bg-blue-500"
        }`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>

      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  )
}

export default Message
