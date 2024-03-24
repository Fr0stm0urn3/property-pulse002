"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Spinner from "@/components/Spinner"
import Message from "./Message"

const Messages = () => {
  const { data: session } = useSession()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) return

    const getMessages = async () => {
      try {
        const res = await fetch("/api/messages")

        if (res.status === 200) {
          const data = await res.json()
          setMessages(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getMessages()
  }, [session])

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4 my-4">
            {!loading && session && messages.length === 0 ? (
              <p>You have no messages yet.</p>
            ) : (
              messages.map((message, i) => <Message message={message} key={i} />)
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Messages
