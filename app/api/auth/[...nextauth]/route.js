import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";
// console.log({
//   id:process.env.GOOGLE_ID ,
//   sec: process.env.GOOGLE_CLIENT_SECRET
// })

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        // lambda fn
        await connectToDB();
        // console.log("Profile......&&&&&&&&&&&&&&&&&&&&&&&&&&&&&.." , profile)
        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({

            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    },
    secret: "sakshiwalode28",
    // async jwt({  profile }) {
    //   return profile;
    // }
  }

});

export { handler as GET, handler as POST };
