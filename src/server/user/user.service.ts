import { db, movies, books, user } from "@/drizzle";
import { eq } from "@/drizzle/orm";
import { auth } from "@/auth/server";
import { headers } from "next/headers";

//Essentials
import { ReqUser } from "../trpc/req";

//Input
import { RegisterInput, LoginInput, VerifyEmailInput, UserUpdateInput } from "./input/user.input";

export class UserService {
    async getUser() {
        const data = await auth.api.getSession({
            headers: await headers()
        });
        return data || null;
    }

    async register(input: RegisterInput) {
        await auth.api.signUpEmail({
            body: input,
            headers: await headers()
        });
        return {
            message: "Email verification code sent"
        }
    }

    async verifyEmail(input: VerifyEmailInput) {
        await auth.api.verifyEmailOTP({
            body: input,
            headers: await headers()
        })
        return {
            message: "Email verified successfully"
        }
    }

    async login(input: LoginInput) {
        await auth.api.signInEmail({
            body: input,
            headers: await headers()
        });
        return {
            message: "User logged in successfully"
        }
    }

    async count(reqUser: ReqUser) {
        const bookCount = await db.$count(books, eq(books.userId, reqUser.user.id));
        const movieCount = await db.$count(movies, eq(movies.userId, reqUser.user.id));
        return {
            bookCount,
            movieCount
        }
    }

    async update(input: UserUpdateInput, reqUser: ReqUser) {
        await db.update(user).set(input).where(eq(user.id, reqUser.user.id))
        return {
            message: "User updated successfully"
        }
    }
}