import { useQuery } from "@tanstack/react-query";
import { request } from "@/config";
import type { MovieFetchProps } from "@/types";

export const useFetchMovies = ({
    movieType,
    pageNumber,
    pageSize,
    categoryId,
    search,
    sort,
}: MovieFetchProps) => {
    return useQuery({
        queryKey: [
            "movie-cartoon-tvseries",
            movieType,
            pageNumber,
            pageSize,
            categoryId,
            search,
            sort,
        ],
        queryFn: async () => {
            const response = await request.get("/movie", {
                params: {
                    movieType,
                    pageNumber,
                    pageSize,
                    categoryId,
                    search,
                    sort,
                },
            });
            return response.data;
        },
    });
};
