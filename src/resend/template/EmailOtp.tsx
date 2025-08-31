import { Body, Container, Heading, Html, Preview, Section, Text, Tailwind, Hr } from "@react-email/components";

//Interface
interface Props {
    otpCode: string;
}

const EmailOtp = ({ otpCode }: Props) => {
    return (
        <Html>
            <Preview>Your verification code: {otpCode}</Preview>
            <Tailwind>
                <Body className="bg-[#f6f9fc] font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] mx-auto p-[20px] max-w-[465px]">
                        <Heading className="text-[24px] font-bold text-[#333] text-center my-[30px] mx-0">
                            Verification Code
                        </Heading>

                        <Text className="text-[14px] leading-[24px] text-[#333] mb-[12px]">
                            Hello,
                        </Text>

                        <Text className="text-[14px] leading-[24px] text-[#333] mb-[24px]">
                            Please use the verification code below to complete your action:
                        </Text>

                        <Section className="text-center my-[32px]">
                            <Text
                                className="bg-[#f2f3f5] rounded-[8px] text-[24px] px-[24px] py-[16px] font-bold text-[#333] tracking-[4px] border-0 box-border"
                            >
                                {otpCode}
                            </Text>
                        </Section>

                        <Text className="text-[14px] leading-[24px] text-[#333] mb-[24px]">
                            This code will expire in 5 minutes. If you didn&apos;t request this code, you can ignore this email.
                        </Text>

                        <Text className="text-[14px] leading-[24px] text-[#333] mb-[24px]">
                            For security reasons, please do not share this code with anyone.
                        </Text>
                        <Hr className="border-[#e6e6e6] my-[26px]" />
                        <Section className="max-w-[600px] mx-auto mt-[32px] text-center">
                            <Text className="text-[12px] text-[#8898aa] m-0">
                                Flimyboook
                            </Text>
                            <Text className="text-[12px] text-[#8898aa] m-0">
                                Dhaka, Bangladesh
                            </Text>
                            <Text className="text-[12px] text-[#8898aa] m-0">
                                © {new Date().getFullYear()} Flimybook. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default EmailOtp;