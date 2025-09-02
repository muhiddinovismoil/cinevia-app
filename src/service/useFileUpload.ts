import { useMutation } from "@tanstack/react-query";
import type { BaseResponseI, UploadData } from "@/types";
import { requestWithToken } from "@/config";
import { toast } from "react-hot-toast";

export type PhotoUploadPayload = FormData;

export const usePhotoUpload = () => {
    return useMutation<BaseResponseI<UploadData>, any, PhotoUploadPayload>({
        mutationFn: async (formData) => {
            const response = await requestWithToken.post(
                "/file/upload/photo",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Photo successfully uploaded");
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message || "Failed to upload photo."
            );
        },
    });
};
