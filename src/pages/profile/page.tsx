import { ArrowRight, Edit, KeyRound, X, Camera } from "lucide-react";
import { useState } from "react";
import { useFetchProfile } from "./service/query";

export const Profile = () => {
    const { data, isLoading } = useFetchProfile();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);
    const [avatar, setAvatar] = useState(
        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3396.jpg"
    );

    const handleAvatarChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4 sm:px-6 lg:px-12 pt-28">
            <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
                <div className="container mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div
                                className="border border-gray-400 rounded-full cursor-pointer"
                                onClick={() => setPreviewOpen(true)}
                            >
                                <img
                                    src={data?.photo || avatar}
                                    alt="Profile Img"
                                    className="rounded-full object-cover"
                                    height={120}
                                    width={120}
                                />
                            </div>

                            <div className="flex flex-col gap-1 text-center sm:text-left">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                                    Muhiddinov Ismoil
                                </h3>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-400">
                                    muhiddinovismoil2@gmail.com
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                            <button
                                onClick={() => setEditProfileOpen(true)}
                                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-5 py-2 rounded-xl text-sm sm:text-base font-medium shadow-md"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Profile
                            </button>
                            <button
                                onClick={() => setResetOpen(true)}
                                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 transition px-5 py-2 rounded-xl text-sm sm:text-base font-medium shadow-md"
                            >
                                <KeyRound className="w-4 h-4" />
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto">
                    <div className="flex items-center justify-between sm:justify-start gap-4">
                        <h2 className="text-2xl sm:text-3xl font-semibold">
                            Watch History
                        </h2>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                </div>
            </div>

            {previewOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="relative max-w-3xl w-full p-4">
                        <button
                            onClick={() => setPreviewOpen(false)}
                            className="absolute top-4 right-4 rounded-[25%] p-2 cursor-pointer"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                        <img
                            src={avatar}
                            alt="Preview"
                            className="rounded-xl w-full h-auto object-contain shadow-lg"
                        />
                    </div>
                </div>
            )}

            {editProfileOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                        <button
                            onClick={() => setEditProfileOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            Edit Profile
                        </h2>

                        <form className="flex flex-col gap-6">
                            <div className="flex flex-col items-center">
                                <label className="relative cursor-pointer">
                                    <img
                                        src={avatar}
                                        alt="Avatar"
                                        className="w-28 h-28 rounded-full object-cover border-4 border-gray-700 shadow-md"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full shadow-lg">
                                        <Camera className="w-4 h-4 text-white" />
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                </label>
                            </div>

                            <input
                                type="text"
                                placeholder="Full Name"
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                            />

                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-500 transition rounded-lg px-4 py-3 font-medium shadow-md"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {resetOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                        <button
                            onClick={() => setResetOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-2xl font-semibold mb-6 text-center">
                            Reset Password
                        </h2>
                        <form className="flex flex-col gap-5">
                            <input
                                type="password"
                                placeholder="Old Password"
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                            />
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-500 transition rounded-lg px-4 py-3 font-medium shadow-md"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
