import { request } from "@/config";
import { useMutation } from "@tanstack/react-query";
import type { SignInPayloadI } from "../../types";
import toast from "react-hot-toast";

export const useSignIn = () => {
    return useMutation({
        mutationFn: async (data: SignInPayloadI) => {
            const response = await request.post("/auth/signin", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Successfully signed in");
        },
        onError: (err: any) => {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to sign in.";
            toast.error(message);
        },
    });
};
