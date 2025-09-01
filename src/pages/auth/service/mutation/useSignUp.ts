import { request } from "@/config";
import { useMutation } from "@tanstack/react-query";
import type { SignUpPayloadI } from "../../types";
import toast from "react-hot-toast";

export const useSignUp = () => {
    return useMutation({
        mutationFn: async (data: SignUpPayloadI) => {
            const response = await request.post("/auth/signup", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Successfully signed up");
        },
        onError: (err: any) => {
            toast.error(err?.data?.response?.message || "Something went wrong");
        },
    });
};
