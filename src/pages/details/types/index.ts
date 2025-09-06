import type { MovieTypes } from "@/types";

export interface RecommendedsPropsI {
    imdbRating?: number;
    movieType?: MovieTypes;
    categoryId?: string;
    movieId: string;
}
