import type { MovieTypes } from "@/types";

export interface RecommendedsPropsI {
    imdbRating?: number;
    movieType?: MovieTypes;
    categoryId?: string;
    movieId: string;
}

export interface Episode {
    id: string;
    title: string;
    thumbnail: string;
    source: string;
    duration: number;
}

export interface Season {
    id: string;
    title: string;
    episodes: Episode[];
}
