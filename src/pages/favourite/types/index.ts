import type { Movie } from "@/pages/home/types";

export interface FavouriteResponseI {
    id: string;
    userId: string;
    movieId: string;
    createdAt: Date;
    movie: Movie;
}
