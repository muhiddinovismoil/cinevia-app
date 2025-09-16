import { requestWithToken } from "@/config";
import { useMutation } from "@tanstack/react-query";
import type { FormValues } from "../../types";

export const useEditRating = () => {
    return useMutation({
        mutationFn: async ({
            id,
            ...payload
        }: FormValues & { movieId: string; id: string }) => {
            const response = await requestWithToken.patch(
                `/rating/${id}`,
                payload
            );
            return response.data;
        },
    });
};
