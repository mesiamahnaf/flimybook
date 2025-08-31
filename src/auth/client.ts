import { createAuthClient } from "better-auth/react";
import { adminClient, emailOTPClient, inferAdditionalFields } from "better-auth/client/plugins";
import { Auth } from "./server";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        inferAdditionalFields<Auth>(),
        emailOTPClient(),
        adminClient()
    ]
});