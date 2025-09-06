import { request } from "@/config";
import { useQuery } from "@tanstack/react-query";
import type { RecommendedsPropsI } from "../../types";

export const useFetchRecommendeds = ({
    categoryId,
    imdbRating,
    movieType,
    movieId,
}: RecommendedsPropsI) => {
    
    return useQuery({
        queryKey: ["recommendeds", categoryId, imdbRating, movieType],
        queryFn: async () => {
            const response = await request.get("/movie/recommendeds", {
                params: { categoryId, imdbRating, movieType, movieId },
            });
            return response.data;
        },
    });
};
