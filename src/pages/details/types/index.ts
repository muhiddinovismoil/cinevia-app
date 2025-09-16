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

export interface CreateWatchHistoryPayload {
    movieId: string;
    episodeId?: string | undefined;
    duration: number;
    progress: number;
    status: WatchStatus;
}

export enum WatchStatus {
    WATCHING = "WATCHING",
    COMPLETED = "COMPLETED",
}
export interface RemoveRatingMutationPropsI {
    id: string;
    payload: RemoveRatingPayloadI;
}
interface RemoveRatingPayloadI {
    movieId: string;
}

export type FormValues = {
    rating: number;
    review: string;
};
