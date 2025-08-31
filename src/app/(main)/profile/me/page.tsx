import type { Metadata } from "next";

//Components
import ProfileHeader from "@/components/profile/ProfileHeader";
import EditProfile from "@/components/profile/EditProfile";

export const metadata: Metadata = {
    title: "Profile"
}

const Page = () => {
    return (
        <div className="mt-[100px]">
            <ProfileHeader />
            <EditProfile />
        </div>
    );
};

export default Page;