import { request } from "@/config";
import { useQuery } from "@tanstack/react-query";
import type { MainMoviesTvSeriesCartoonsResponseI } from "../../types";

export const useFetchMainMovieTvSeriesCartoons = () => {
    return useQuery({
        queryKey: ["tv-series_movies_cartoons"],
        queryFn: async () => {
            const { data }: { data: MainMoviesTvSeriesCartoonsResponseI } =
                await request.get("/movie/main");
            return data;
        },
    });
};
