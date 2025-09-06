import { Star } from "lucide-react";
import type { Movie } from "../types";

export const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
    return (
        <div className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer">
            <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />

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
