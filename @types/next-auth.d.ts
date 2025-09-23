import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"]
    }

    interface JWT extends DefaultJWT {
        role?: string;
    }
}