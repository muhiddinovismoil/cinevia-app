import { Edit, KeyRound, LucideArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useFetchProfile, useFetchHistoryForSlide } from "./service/query";
import type { UserProfileDataI, WatchHistoryResponseI } from "./types";
import {
    EditProfileModal,
    PreviewPhoto,
    ResetPasswordModal,
} from "./components";
import { useNavigate } from "react-router-dom";
import { BlockLoader, ContentsSlider } from "../home/components";
import { WatchStatus } from "../details/types";

export const Profile = () => {
    const { data } = useFetchProfile();
    const { data: watchHistoryResponse, isLoading } = useFetchHistoryForSlide({
        pageNumber: 1,
        pageSize: 20,
        status: WatchStatus.WATCHING,
    });
    const watchHistory: WatchHistoryResponseI[] =
        watchHistoryResponse?.data ?? [];

    const navigate = useNavigate();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);

    const defaultAvatar =
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3396.jpg";

    const [avatar, setAvatar] = useState(defaultAvatar);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    useEffect(() => {
        if (data?.photo) {
            setAvatar(data.photo);
            setAvatarFile(null);
        }
    }, [data]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4 sm:px-6 lg:px-12 pt-30">
            <div className="flex flex-col gap-12 sm:gap-20 lg:gap-28">
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-10">
                        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                            <div
                                className="border border-gray-500 rounded-full cursor-pointer shrink-0"
                                onClick={() => setPreviewOpen(true)}
                            >
                                <img
                                    src={data?.photo || avatar}
                                    alt="Profile"
                                    className="rounded-full object-cover w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                                />
                            </div>
                            <div className="flex flex-col gap-1 text-center sm:text-left">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                                    {data?.fullname || "User Fullname"}
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-400 break-words">
                                    {data?.email || "user@email.com"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setEditProfileOpen(true)}
                                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-xl text-sm sm:text-base font-medium shadow-md w-full sm:w-auto"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Profile
                            </button>
                            <button
                                onClick={() => setResetOpen(true)}
                                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-xl text-sm sm:text-base font-medium shadow-md w-full sm:w-auto"
                            >
                                <KeyRound className="w-4 h-4" />
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto">
                    <div className="flex flex-col gap-[15px] sm:gap-[25px] lg:gap-[40px]">
                        <button
                            className="text-start flex text-xl sm:text-3xl font-bold items-center gap-[8px] sm:gap-[10px] cursor-pointer"
                            onClick={() => navigate("/watchhistories")}
                        >
                            Watch History
                            <LucideArrowRight size={24} />
                        </button>
                        {isLoading ? (
                            <BlockLoader />
                        ) : (
                            <ContentsSlider
                                items={watchHistory.map(
                                    (history) => history.movie
                                )}
                                slidesPerView={5}
                            />
                        )}
                    </div>
                </div>
            </div>

            <EditProfileModal
                avatar={avatar}
                avatarFile={avatarFile as File}
                data={data as UserProfileDataI}
                defaultAvatar={defaultAvatar}
                editProfileOpen={editProfileOpen}
                setAvatar={setAvatar}
                setAvatarFile={setAvatarFile}
                setEditProfileOpen={setEditProfileOpen}
            />
            <PreviewPhoto
                setPreviewOpen={setPreviewOpen}
                data={data as UserProfileDataI}
                previewOpen={previewOpen}
                avatar={avatar}
            />

            <ResetPasswordModal
                resetOpen={resetOpen}
                setResetOpen={setResetOpen}
            />
        </div>
    );
};
