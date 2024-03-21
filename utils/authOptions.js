import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successful signIn
    async signIn({ profile }) {
      // 1.Connect to database
      // 2.Check if the user exists
      // 3.If not then add user to database
      // 4.Return true to allow the signIn
    },
    //Modifies the session object
    async session({ session }) {
      // 1.Get use from database
      // 2.Assign the user id to the session
      // 3.Return that session
    },
  },
}
