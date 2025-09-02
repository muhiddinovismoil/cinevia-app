import { requestWithToken } from "@/config";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ResetPasswordPayload } from "../../types";

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (data: ResetPasswordPayload) => {
            const response = await requestWithToken.post(
                "/auth/change-password",
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Password successfully resetted");
        },
        onError: (err: any) => {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to reset password.";
            toast.error(message);
        },
    });
};
