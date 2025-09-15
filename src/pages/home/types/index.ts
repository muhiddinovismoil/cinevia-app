import type { Season, WatchStatus } from "@/pages/details/types";
import type { MovieTypes, UploadTypes } from "@/types";

export type Movie = {
    id: string;

    title: string;

    description?: string;

    slug?: string;

    thumbnail: string;

    type?: MovieTypes;

    uploadType?: UploadTypes;

    source?: string;

    duration?: number;

    releaseYear?: number;

    country?: string;

    director?: string;

    cast?: string;

    imdbRating: number;

    viewCount?: number;

    averageRating: number;

    categoryId?: string;

    createdAt?: Date;

    updatedAt?: Date;

    category?: CategoryI;

    favorites: FavouriteI[];

    seasons: Season[];

    watchHistory: WatchHistoryI[];
};

export interface CategoryI {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface WatchHistoryI {
    id: string;
    movieId: string;
    userId: string;
    episodeId?: string;
    progress: number;
    duration: number;
    status: WatchStatus;
}

export interface FavouriteI {
    id: string;
    userId: string;
    movieId: string;
    createdAt: Date;
}

export type ContentsSliderProps = {
    items: Movie[];
    slidesPerView?: number;
    spaceBetween?: number;
};

export interface MainMoviesTvSeriesCartoonsResponseI {
    data: MainResponseDataI;
}
export interface MainResponseDataI {
    movies: Movie[];
    cartoons: Movie[];
    tvseries: Movie[];
}
