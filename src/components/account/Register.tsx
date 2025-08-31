"use client"
import { Fragment, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { Input, Button } from "../ui";
import { OtpTimer, OtpInput } from "@siamf/otp-timer";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

//Types
import { RegisterFormInput } from "@/server/user/input/user.input";

//Trpc
import { trpc } from "@/trpc/client";
import { authClient } from "@/auth/client";

const Register = () => {
    //State
    const [step, setStep] = useState<"register" | "verify">("register");
    const [otp, setOtp] = useState<string>("");
    const [passType, setPassType] = useState<"password" | "text">("password");

    //Trpc
    const registration = trpc.users.register.useMutation({
        onSuccess: (data) => {
            toast.success(data.message);
            setStep("verify");
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });
    const verify = trpc.users.verifyEmail.useMutation({
        onSuccess: (data) => {
            toast.success(data.message);
            window.location.href = "/"
        },
        onError: (error) => {
            toast.error(error.message)
        }
    });

    //Form Initialize
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<RegisterFormInput>();

    //On Submit
    const onSubmit: SubmitHandler<RegisterFormInput> = (value) => {
        registration.mutate(value)
    }

    const handleResend = async () => {
        await authClient.emailOtp.sendVerificationOtp({
            email: getValues("email"),
            type: "email-verification"
        });
    }

    const onVerify = () => {
        if (otp.length === 6) verify.mutate({
            email: getValues("email"),
            otp,
        });
    }


    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white shadow-3xl rounded-3xl p-7 w-[32%] 4xl:w-[25%] 3xl:w-[32%] 2xl:w-[30%] xl:w-[35%] lg:w-[40%] md:w-[60%] lsm:w-[80%] xxs:w-[90%]">
                {step === "register" &&
                    <Fragment>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-1">Create Account</h2>
                            <p className="text-lg opacity-80">Please register your account for free!</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                id="name"
                                label="Name"
                                placeholder="Name"
                                {...register("name", { required: "Name is required" })}
                                errorMessage={errors.name?.message}
                            />
                            <Input
                                id="email"
                                label="Email"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Enter a valid email address"
                                    }
                                })}
                                errorMessage={errors.email?.message}
                            />
                            <Input
                                id="password"
                                label="Password"
                                type={passType}
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    validate: {
                                        min8: (v) =>
                                            v.length >= 8 || "Password must be at least 8 characters",
                                        upper: (v) =>
                                            /[A-Z]/.test(v) || "Must contain at least one uppercase letter",
                                        lower: (v) =>
                                            /[a-z]/.test(v) || "Must contain at least one lowercase letter",
                                        special: (v) =>
                                            /[^A-Za-z0-9]/.test(v) || "Must contain at least one special character",
                                    },
                                })}
                                errorMessage={errors.password?.message}
                                suffixIcon={<button type="button" className="text-grayed" onClick={() => setPassType(prev => prev === "text" ? "password" : "text")}>
                                    {passType === "password" && <IconEye />}
                                    {passType === "text" && <IconEyeOff />}
                                </button>}
                            />
                            <Button
                                isPending={registration.isPending}
                                type="submit"
                                className="mt-2 w-full"
                            >
                                Create Account
                            </Button>
                            <div className="text-center mt-2.5">
                                <p>Already have account? <Link href="/account/login" className="text-base underline text-c-purple">Login</Link></p>
                            </div>
                        </form>
                    </Fragment>
                }
                {step === "verify" &&
                    <Fragment>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-1">Verify Your Email</h2>
                            <p className="text-lg opacity-80">We sent one time code to your email</p>
                        </div>
                        <div className="mt-5 w-[90%] mx-auto mb-7">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                                inputStyle="border border-solid border-gray-300 h-[50px] flex-1 mx-1 rounded-md focus:outline-main"
                            />
                        </div>
                        <OtpTimer
                            minutes={0}
                            seconds={59}
                            onResend={handleResend}
                            renderText={(props) => <p className="text-gray-600 text-center">Resend code in {props.seconds} seconds</p>}
                            renderButton={(props) => <button {...props} className="justify-center flex  gap-2 w-full">
                                <span>Didn&apos;t receive yet?{" "}</span>
                                <span className="text-strong font-semibold">Resend</span>
                            </button>}
                        />
                        <Button
                            isPending={verify.isPending}
                            type="submit"
                            className="mt-4 w-full"
                            onClick={onVerify}
                        >
                            Verify Email
                        </Button>
                    </Fragment>
                }
            </div>
        </div>
    );
};

export default Register;