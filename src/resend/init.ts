import { Resend } from "resend";

//Initializing Resend
export const resend = new Resend(process.env.RESEND_API_KEY);