"use client"
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button, Input } from "../ui";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

//Types
import { LoginFormInput } from "@/server/user/input/user.input";

//Trpc
import { trpc } from "@/trpc/client";

const Login = () => {
    //State
    const [passType, setPassType] = useState<"password" | "text">("password");

    //Tanstack
    const { isPending, mutate } = trpc.users.login.useMutation({
        onSuccess: (data) => {
            toast.success(data.message);
            window.location.href = "/";
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    //Form Initialize
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormInput>();

    //On Submit
    const onSubmit: SubmitHandler<LoginFormInput> = (value) => {
        mutate(value)
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white shadow-3xl rounded-3xl p-6 w-[32%] 4xl:w-[25%] 3xl:w-[32%] 2xl:w-[30%] xl:w-[35%] lg:w-[40%] md:w-[60%] lsm:w-[80%] xxs:w-[90%]">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-1">Welcome Back</h2>
                    <p className="text-lg opacity-80">Login to your account for access.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email"
                        id="email"
                        placeholder="Email Address"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Enter a valid email address"
                            }
                        })}
                        errorMessage={errors.email?.message}
                    />
                    <Input
                        label="Password"
                        id="password"
                        type={passType}
                        placeholder="Password"
                        {...register("password", { required: "Password is required" })}
                        errorMessage={errors.password?.message}
                        suffixIcon={<button type="button" className="text-grayed" onClick={() => setPassType(prev => prev === "text" ? "password" : "text")}>
                            {passType === "password" && <IconEye />}
                            {passType === "text" && <IconEyeOff />}
                        </button>}
                    />
                    <Button
                        isPending={isPending}
                        type="submit"
                        className="mt-2 w-full"
                    >
                        Login
                    </Button>
                    <div className="text-center mt-2.5">
                        <p>Don&apos;t have account? <Link href="/account/registration" className="text-base underline text-c-purple">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;