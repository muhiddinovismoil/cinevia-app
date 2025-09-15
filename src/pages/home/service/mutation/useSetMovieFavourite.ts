import { getAccessToken, request } from "@/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useSetMovieFavourite = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { accessToken } = getAccessToken();
    return useMutation({
        mutationFn: async (movieId: string) => {
            const response = await request.post(
                "/favourite",
                {
                    movieId: movieId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tv-series_movies_cartoons"],
            });
            queryClient.invalidateQueries({
                queryKey: ["movie-cartoon-tvseries"],
            });
            queryClient.invalidateQueries({ queryKey: ["recommendeds"] });
        },
        onError: (err: any) => {
            if (err.response.data.message == "Unauthorized") {
                navigate("/signin", { replace: true });
                toast.error(err.response.data.message);
            }
        },
    });
};
