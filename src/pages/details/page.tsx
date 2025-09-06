import { useRef } from "react";
import { MoviePlayer } from "@/pages/movies/components";
import { BlockLoader } from "@/pages/home/components";
import { Clock, Film, Globe, User, Users, Eye, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import type { Movie } from "../home/types";
import { useFetchMediaById } from "./service/query";

export const MovieDetail = () => {
    const params = useParams();
    const playerRef = useRef<HTMLDivElement | null>(null);
    const { data, isLoading } = useFetchMediaById({ id: params.id as string });
    const movie: Movie = data?.data;

    const handleWatchNow = () => {
        playerRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black text-white">
                <BlockLoader />
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex justify-center items-center min-h-screen text-white">
                <p>Movie not found</p>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="flex flex-col gap-[50px] py-[100px] text-white">
                <div className="flex flex-col md:flex-row gap-[40px]">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="w-[200px] md:w-[285px] border-2 border-white rounded-xl overflow-hidden">
                            <img
                                src={movie.thumbnail}
                                alt={movie.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <button
                            onClick={handleWatchNow}
                            className="mt-4 px-4 py-2 cursor-pointer bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                        >
                            Watch Now
                        </button>
                    </div>

                    <div className="flex flex-col justify-center mt-6 md:mt-0 max-w-3xl">
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {movie.title}
                        </h1>
                        <p className="mt-4 text-base md:text-lg text-gray-300">
                            {movie.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-300 text-sm">
                            <div className="flex items-center gap-2">
                                <Clock size={16} /> {movie.duration} min
                            </div>
                            <div className="flex items-center gap-2">
                                <Film size={16} /> {movie.releaseYear} •{" "}
                                {movie.category?.title}
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe size={16} /> {movie.country}
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={16} /> {movie.director}
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={16} /> {movie.cast}
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye size={16} />{" "}
                                {(movie.viewCount as number).toLocaleString()}{" "}
                                views
                            </div>
                            <div className="flex items-center gap-2 text-yellow-400">
                                <img
                                    src="/imdb.png"
                                    alt="imdb"
                                    width={25}
                                    height={25}
                                />{" "}
                                IMDB {movie.imdbRating}
                            </div>
                            <div className="flex items-center gap-2 text-green-400">
                                <Star size={16} /> Users {movie.averageRating}
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={playerRef} className="pt-[100px]">
                    <MoviePlayer
                        src={movie.source as string}
                        poster={movie.thumbnail}
                        imdbRating={movie.imdbRating}
                    />
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Recommended movies
                    </h2>
                    <p className="text-gray-400">Coming soon...</p>
                </div>
            </div>
        </div>
    );
};
