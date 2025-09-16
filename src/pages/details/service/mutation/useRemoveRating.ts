import { requestWithToken } from "@/config";
import { useMutation } from "@tanstack/react-query";
import type { RemoveRatingMutationPropsI } from "../../types";

export const useRemoveRating = () => {
    return useMutation({
        mutationFn: async ({ id, payload }: RemoveRatingMutationPropsI) => {
            const response = await requestWithToken.delete(`/rating/${id}`, {
                data: payload,
            });
            return response.data;
        },
    });
};
