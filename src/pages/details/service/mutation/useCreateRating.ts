import { requestWithToken } from "@/config";
import { useMutation } from "@tanstack/react-query";
import type { FormValues } from "../../types";

export const useCreateRating = () => {
    return useMutation({
        mutationFn: async (data: FormValues & { movieId: string }) => {
            const response = await requestWithToken.post("/rating", data);
            return response.data;
        },
    });
};
