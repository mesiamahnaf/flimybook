import { betterAuth, BetterAuthOptions } from "better-auth";
import { APIError } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/drizzle";
import { sendVerificationCode, sendResetNotification } from "@/resend";
import * as schema from "@/drizzle/schemas/tables/auth";

const authConfig = {
    appName: "Flimybook",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    advanced: {
        database: {
            generateId: false
        }
    },
    emailVerification: {
        autoSignInAfterVerification: true
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 3 * 5
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        autoSignIn: true,
        onPasswordReset: async ({ user }) => {
            await sendResetNotification({
                name: user.name,
                to: [user.email]
            });
        }
    },
    user: {
        additionalFields: {
            profession: {
                type: "string",
                required: false,
            },
            hobby: {
                type: "string",
                required: false
            },
            favoriteGenre: {
                type: "string",
                required: false,
            },
            favoriteBookCategory: {
                type: "string",
                required: false
            }
        }
    },
    plugins: [
        emailOTP({
            overrideDefaultEmailVerification: true,
            sendVerificationOTP: async ({ email, otp, type }) => {
                if (type === "email-verification" || type === "forget-password") {
                    const { error } = await sendVerificationCode({
                        to: [email],
                        otpCode: otp
                    });
                    if (error) throw new APIError("INTERNAL_SERVER_ERROR", {
                        message: "Failed to send OTP to user email"
                    });
                }
            },
            otpLength: 6,
        }),
        admin(),
        nextCookies()
    ]
} satisfies BetterAuthOptions;


export const auth = betterAuth(authConfig) as ReturnType<typeof betterAuth<typeof authConfig>>;
export type Auth = typeof auth;