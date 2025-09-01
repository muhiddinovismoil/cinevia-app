import { request } from "@/config";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { OTPVerifyPayloadI } from "../../types";

export const useOtpVerify = () => {
    return useMutation({
        mutationFn: async (data: OTPVerifyPayloadI) => {
            const response = await request.post("/auth/verify", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("OTP verified successfully");
        },
        onError: (err: any) => {
            toast.error(err?.data?.response?.message || "Something went wrong");
        },
    });
};
