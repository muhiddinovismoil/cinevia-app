import { requestWithToken } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveFromFavourites = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (movieId: string) => {
            const response = await requestWithToken.delete(
                `/favourite/${movieId}`
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:[]});
        },
    });
};
