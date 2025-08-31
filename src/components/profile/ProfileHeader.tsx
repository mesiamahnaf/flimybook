"use client"
import Image from "next/image";
import { Container } from "../ui";

//Trpc
import { trpc } from "@/trpc/client";

const ProfileHeader = () => {
    //State
    const [data] = trpc.users.getUser.useSuspenseQuery();

    return (
        <Container>
            <div className="bg-[url(/profile-bg.svg)] bg-cover bg-no-repeat bg-[center_left] bg-c-purple flex gap-4 py-10 items-center relative rounded-xl px-16">
                <div className="basis-[10%] shrink-0">
                    {data?.user.image ?
                        <Image
                            src={data?.user.image}
                            alt={data.user.name as string}
                            width={400}
                            height={400}
                            className="rounded-full h-full w-full"
                        /> :
                        <Image
                            src="/profile.jpg"
                            alt={data?.user.name as string}
                            width={400}
                            height={400}
                            className="rounded-full h-full w-full"
                        />
                    }
                </div>
                <div className="text-white">
                    <h5 className="text-3xl font-bold mb-1">{data?.user.name || "No name set"}</h5>
                    <p className="text-base font-medium">{data?.user.email}</p>
                </div>
            </div>
        </Container>
    );
};

export default ProfileHeader;