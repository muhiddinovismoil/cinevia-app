import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { request } from "@/config";
import type { MovieFetchProps } from "@/types";

export const useFetchMovies = (
    {
        movieType,
        pageNumber,
        pageSize,
        categoryId,
        search,
        sort,
        releaseYear,
    }: MovieFetchProps,
    options?: UseQueryOptions<any, Error>
) => {
    console.log(releaseYear);
    return useQuery({
        queryKey: [
            "movie-cartoon-tvseries",
            movieType,
            pageNumber,
            pageSize,
            categoryId,
            search,
            sort,
            releaseYear,
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
                    releaseYear,
                },
            });
            return response.data;
        },
        ...options,
    });
};
