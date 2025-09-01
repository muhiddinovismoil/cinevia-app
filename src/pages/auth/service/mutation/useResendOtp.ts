import { request } from "@/config";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ResendOtpPayloadI } from "../../types";

export const useResendOtp = () => {
    return useMutation({
        mutationFn: async (data: ResendOtpPayloadI) => {
            const response = await request.post("/auth/resend-otp", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("New otp sended to your mail");
        },
        onError: (err: any) => {
                       toast.error(err?.data?.response?.message || "Something went wrong");

        },
    });
};
