import type { Season } from "@/pages/details/types";
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

    seasons: Season[];
};

export interface CategoryI {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
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
