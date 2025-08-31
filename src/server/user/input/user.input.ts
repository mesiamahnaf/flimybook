import { z } from "zod";

export interface RegisterFormInput {
    name: string;
    email: string;
    password: string;
}

export interface LoginFormInput {
    email: string;
    password: string;
}

export interface UserUpdateFormInput {
    name: string;
    image: string;
    profession: string;
    hobby: string;
    favoriteGenre: string;
    favoriteBookCategory: string;
}

export const registerInput = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
});

export const loginInput = z.object({
    email: z.string(),
    password: z.string()
})

export const verifyEmailInput = z.object({
    email: z.string(),
    otp: z.string()
})

export const userUpdateInput = z.object({
    name: z.string(),
    image: z.string().optional(),
    profession: z.string().nullish(),
    hobby: z.string().nullish(),
    favoriteGenre: z.string().nullish(),
    favoriteBookCategory: z.string().nullish()
})

export type RegisterInput = z.infer<typeof registerInput>;
export type LoginInput = z.infer<typeof loginInput>;
export type VerifyEmailInput = z.infer<typeof verifyEmailInput>;
export type UserUpdateInput = z.infer<typeof userUpdateInput>;
