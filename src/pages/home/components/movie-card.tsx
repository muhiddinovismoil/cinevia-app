import { Star } from "lucide-react";
import type { Movie } from "../types";
import { useNavigate } from "react-router-dom";
import {
    useSetMovieFavourite,
    useRemoveFromFavourites,
} from "../service/mutation";
import { useState, useEffect } from "react";

export const MovieCard = ({
    movie,
    isNavigatable,
}: {
    movie: Movie;
    isNavigatable?: boolean;
}) => {
    const navigate = useNavigate();
    const navigateTo = isNavigatable
        ? () => navigate(`/details/${movie.id}`)
        : undefined;

    const { mutate: setFavourite } = useSetMovieFavourite();
    const { mutate: removeFavourite } = useRemoveFromFavourites();

    const [isFavourite, setIsFavourite] = useState<boolean>(
        movie?.favorites?.length > 0
    );

    useEffect(() => {
        setIsFavourite(movie?.favorites?.length > 0);
    }, [movie.favorites]);

    const toggleFavourite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isFavourite) {
            removeFavourite(movie.id);
            setIsFavourite(false);
        } else {
            setFavourite(movie.id);
            setIsFavourite(true);
        }
    };

    return (
        <div
            onClick={navigateTo}
            className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
        >
            <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div
                onClick={toggleFavourite}
                className="absolute top-2 right-2 p-2 rounded-full 
                   bg-black/50 backdrop-blur-md shadow-md
                   hover:bg-black/70 transition-colors duration-200"
            >
                <Star
                    className={`w-5 h-5 ${
                        isFavourite
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-white"
                    }`}
                />
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 
                   bg-black/60 backdrop-blur-md 
                   opacity-0 group-hover:opacity-100 
                   transition-all duration-300 
                   p-3"
            >
                <h3 className="text-white text-lg font-semibold truncate">
                    {movie.title}
                </h3>
                <p className="text-gray-300 text-sm">{movie.category?.title}</p>

                <div className="flex gap-4 mt-2 text-sm items-center">
                    <div className="flex items-center gap-1">
                        <img
                            src="/imdb.png"
                            alt="IMDb"
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-white">{movie.imdbRating}</span>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-yellow-400" />
                        <span>{movie.averageRating}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
