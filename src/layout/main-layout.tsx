import { useFetchProfile } from "@/pages/profile/service/query";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import type { UserProfileDataI } from "@/pages/profile/types";

export const MainLayout = () => {
    const { data, isLoading } = useFetchProfile();
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white">
            <div className="flex-1 flex flex-col">
                <Header data={data as UserProfileDataI} isLoading={isLoading} />
                <main className="">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};
