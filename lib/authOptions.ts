import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import {compare} from "bcryptjs";

export const authOptions: AuthOptions = {
    session:{
        strategy:"jwt",
    },
    providers: [
        CredentialsProvider({
            type:"credentials",
            credentials:{
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req){
                const {email, password} = credentials as {
                    email: string;
                    password:string
                }

                await connectDB();

                const user = await User.findOne({email});
                console.log(user, email,password)
                if(!user) throw Error("email/password mismatch!")

                const isValid = await compare(password, user.password);

                if (!isValid) {
                  throw new Error("Invalid password");
                }

                return {
                  id: user._id.toString(),
                  email: user.email,
                  name: user.name,
                  role: user.role,
                };


            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log('JWT Callback - Token:', token);
            console.log('JWT Callback - User:', user);
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            console.log('Session Callback - Session:', session);
            console.log('Session Callback - Token:', token);
            if (token) {
                session.user.id = token.sub as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    },
      pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },

};