import EmailOtp from "../template/EmailOtp";
import { resend } from "../init";

interface Props {
    otpCode: string;
    to: string[];
}

export const sendVerificationCode = async ({ otpCode, to }: Props) => {
    const { error, data } = await resend.emails.send({
        from: "Flimybook <noreply@siamahnaf.com>",
        to,
        subject: "Verify Your Email Address – Your OTP Code Inside",
        react: EmailOtp({ otpCode })
    });
    return { data, error };
}