import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Tailwind, Hr } from "@react-email/components";

//Interface props
interface Props {
    name: string;
}

const EmailPasswordResetNotify = ({ name }: Props) => {
    return (
        <Html lang="en" dir="ltr">
            <Head />
            <Preview>Your password has been successfully changed</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto px-[40px] py-[40px]">
                        <Section className="text-center mb-[32px]">
                            <Heading className="text-[28px] font-bold text-gray-900 mb-[8px] mt-0">
                                Password Changed Successfully
                            </Heading>
                            <Text className="text-[16px] text-gray-600 mt-0 mb-0">
                                Your account security has been updated
                            </Text>
                        </Section>
                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] mt-0">
                                Hello {name},
                            </Text>

                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] mt-0">
                                This email confirms that your password has been successfully changed on <strong>{new Date().toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true })}</strong>.
                            </Text>

                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px] mt-0">
                                If you made this change, no further action is required. Your account remains secure and you can continue using our services with your new password.
                            </Text>
                        </Section>

                        <Section className="bg-red-50 border-l-4 border-red-400 px-[20px] py-[16px] mb-[32px] rounded-r-[4px]">
                            <Heading className="text-[18px] font-semibold text-red-800 mt-0 mb-[8px]">
                                Didn&apos;t change your password?
                            </Heading>
                            <Text className="text-[14px] text-red-700 leading-[20px] mb-[12px] mt-0">
                                If you did not make this change, your account may have been compromised. Please take immediate action:
                            </Text>
                            <Text className="text-[14px] text-red-700 leading-[20px] mb-[8px] mt-0">
                                • Contact our support team immediately
                            </Text>
                            <Text className="text-[14px] text-red-700 leading-[20px] mb-[8px] mt-0">
                                • Reset your password again using a secure device
                            </Text>
                            <Text className="text-[14px] text-red-700 leading-[20px] mb-0 mt-0">
                                • Review your recent account activity
                            </Text>
                        </Section>
                        <Section className="bg-blue-50 px-[20px] py-[16px] mb-[32px] rounded-[4px]">
                            <Heading className="text-[16px] font-semibold text-blue-800 mt-0 mb-[12px]">
                                Security Tips
                            </Heading>
                            <Text className="text-[14px] text-blue-700 leading-[20px] mb-[8px] mt-0">
                                • Use a unique, strong password for your account
                            </Text>
                            <Text className="text-[14px] text-blue-700 leading-[20px] mb-[8px] mt-0">
                                • Enable two-factor authentication for extra security
                            </Text>
                            <Text className="text-[14px] text-blue-700 leading-[20px] mb-0 mt-0">
                                • Never share your password with anyone
                            </Text>
                        </Section>
                        <Section className="text-center mb-[32px]">
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] mt-0">
                                Need help? Our support team is here for you.
                            </Text>
                            <Link
                                href="mailto:support@company.com"
                                className="bg-blue-600 text-white px-[24px] py-[12px] rounded-[6px] text-[16px] font-medium no-underline inline-block box-border"
                            >
                                Contact Support
                            </Link>
                        </Section>
                        <Hr className="border-[#e6e6e6] my-[26px]" />
                        <Section className="max-w-[600px] mx-auto mt-[32px] text-center">
                            <Text className="text-[12px] text-[#8898aa] m-0">
                                410 Matters, Inc.
                            </Text>
                            <Text className="text-[12px] text-[#8898aa] m-0">
                                London, United Kingdom
                            </Text>
                            <Text className="text-[12px] text-[#8898aa] m-0">
                                © {new Date().getFullYear()} 410 Matters. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default EmailPasswordResetNotify;