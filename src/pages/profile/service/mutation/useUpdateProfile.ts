import { requestWithToken } from "@/config";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ProfileUpdatePayload } from "../../types";

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: async (data: ProfileUpdatePayload) => {
            const response = await requestWithToken.patch(
                "/user/update/profile",
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Profile updated successfully");
        },
        onError: (err: any) => {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to update profile.";
            toast.error(message);
        },
    });
};
