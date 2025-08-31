import EmailPasswordResetNotify from "../template/EmailPasswordResetNotify";
import { resend } from "../init";

interface Props {
    name: string;
    to: string[];
}

export const sendResetNotification = async ({ name, to }: Props) => {
    const { error, data } = await resend.emails.send({
        from: "Flimybook <noreply@siamahnaf.com>",
        to,
        subject: "Your Password Has Been Reset Successfully",
        react: EmailPasswordResetNotify({ name })
    });
    return { data, error };
}