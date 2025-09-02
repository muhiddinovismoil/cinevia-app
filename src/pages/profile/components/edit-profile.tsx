import { Camera, X } from "lucide-react";
import type { EditProfileProps } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { usePhotoUpload } from "@/service";
import { useUpdateProfile } from "../service/mutation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const EditProfileModal = ({
    editProfileOpen,
    setEditProfileOpen,
    avatar,
    setAvatar,
    setAvatarFile,
    avatarFile,
    data,
    defaultAvatar,
}: EditProfileProps) => {
    const queryClient = useQueryClient();
    const { mutate: uploadImage, isPending: isImageUploading } =
        usePhotoUpload();
    const { mutate: updateProfile, isPending: isProfileUpdating } =
        useUpdateProfile();
    const handleAvatarChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        formState: { errors: profileErrors },
        reset: resetProfile,
        watch,
    } = useForm<{ fullname: string; email: string }>({
        defaultValues: {
            fullname: data?.fullname || "",
            email: data?.email || "",
        },
    });

    useEffect(() => {
        if (data) {
            resetProfile({
                fullname: data.fullname || "",
                email: data.email || "",
            });
        }
    }, [data, resetProfile]);

    const watchedFullname = watch("fullname");
    const watchedEmail = watch("email");

    const isChanged =
        watchedFullname !== data?.fullname ||
        watchedEmail !== data?.email ||
        avatar !== (data?.photo || defaultAvatar);

    const onSubmitProfile = (values: { fullname: string; email: string }) => {
        const payload = {
            fullname: values.fullname,
            email: values.email,
            photo: avatar,
        };

        if (avatarFile) {
            const formData = new FormData();
            formData.append("file", avatarFile);

            uploadImage(formData, {
                onSuccess: (res) => {
                    updateProfile(
                        {
                            ...payload,
                            photo:
                                `${import.meta.env.VITE_BASE_URL}/uploads/` +
                                res?.data.filename,
                        },
                        {
                            onSuccess: () => {
                                setEditProfileOpen(false);
                                setAvatarFile(null);
                                queryClient.invalidateQueries({
                                    queryKey: ["user", "profile"],
                                });
                            },
                        }
                    );
                },
            });
        } else {
            updateProfile(payload, {
                onSuccess: () => {
                    setEditProfileOpen(false);
                    queryClient.invalidateQueries({
                        queryKey: ["user", "profile"],
                    });
                },
            });
        }
    };
    return (
        <>
            {editProfileOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setEditProfileOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
                            Edit Profile
                        </h2>

                        <form
                            onSubmit={handleProfileSubmit(onSubmitProfile)}
                            className="flex flex-col gap-5 sm:gap-6"
                        >
                            <div className="flex flex-col items-center">
                                <label className="relative cursor-pointer">
                                    <img
                                        src={avatar}
                                        alt="Avatar"
                                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-gray-700 shadow-md"
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
                                {...registerProfile("fullname", {
                                    required: "Full name is required",
                                })}
                                type="text"
                                placeholder="Enter full name ..."
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                            />
                            {profileErrors.fullname && (
                                <p className="text-red-500 text-sm">
                                    {profileErrors.fullname.message}
                                </p>
                            )}

                            <input
                                {...registerProfile("email", {
                                    required: "Email is required",
                                })}
                                type="email"
                                placeholder="Enter email ..."
                                className="bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                            />
                            {profileErrors.email && (
                                <p className="text-red-500 text-sm">
                                    {profileErrors.email.message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    !isChanged ||
                                    isProfileUpdating ||
                                    isImageUploading
                                }
                                className={`rounded-lg px-4 py-3 font-medium shadow-md transition ${
                                    isChanged
                                        ? "bg-indigo-600 hover:bg-indigo-500"
                                        : "bg-gray-600 cursor-not-allowed"
                                }`}
                            >
                                {isProfileUpdating || isImageUploading
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
