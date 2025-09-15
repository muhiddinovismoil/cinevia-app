import { useRef, useState } from "react";
import { MoviePlayer, TrailerPlayer } from "@/pages/details/components";
import { BlockLoader, ContentsSlider } from "@/pages/home/components";
import {
    Clock,
    Film,
    Globe,
    User,
    Users,
    Eye,
    Star,
    LucideArrowRight,
    Play,
    LogIn,
} from "lucide-react";
import { useParams } from "react-router-dom";
import type { Movie } from "../home/types";
import { useFetchMediaById, useFetchRecommendeds } from "./service/query";
import Cookies from "js-cookie";
import { SeasonsBlock } from "./components";
import { getStreamSrc } from "@/service";
import { MovieTypes, UploadTypes } from "@/types";
import type { Episode } from "./types";

export const MovieDetail = () => {
    const params = useParams();
    const playerRef = useRef<HTMLDivElement | null>(null);
    const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);

    const { data: movieData, isLoading: isMoiveFetching } = useFetchMediaById({
        id: params.id as string,
    });
    const movie: Movie = movieData?.data;

    console.log(movie);

    const { data: recommendedData, isLoading: isRecommendedsFetching } =
        useFetchRecommendeds({
            categoryId: movie?.categoryId,
            imdbRating: movie?.imdbRating,
            movieType: movie?.type,
            movieId: params.id as string,
        });
    const recommendeds = recommendedData?.data;

    const token = Cookies.get("token");

    const handleWatchNow = () => {
        playerRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    if (isMoiveFetching || isRecommendedsFetching) {
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
            <div className="flex flex-col gap-[50px] py-[100px] text-white lg:gap-[100px]">
                <div className="flex flex-col md:flex-row gap-[40px] lg:pb-[50px]">
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
                            disabled={!token}
                            className={`mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg w-[200px] md:w-[285px] ${
                                token
                                    ? "bg-gray-800 text-white hover:bg-gray-700"
                                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {token ? (
                                <>
                                    <Play className="w-4 h-4" />
                                    Watch Now
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4" />
                                    Login to Watch
                                </>
                            )}
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

                <div ref={playerRef} className="pt-[100px] lg:pb-[60px]">
                    {(movie.type === MovieTypes.SERIES ||
                        movie.type === MovieTypes.CARTOON_SERIES) &&
                        movie?.seasons?.length > 0 && (
                            <div className="py-[60px] flex flex-col gap-[20px] sm:gap-[30px] lg:gap-[45px]">
                                <h2 className="text-2xl md:text-3xl">
                                    Seasons
                                </h2>
                                <SeasonsBlock
                                    onEpisodeSelect={(ep) =>
                                        setActiveEpisode(ep)
                                    }
                                    seasons={movie.seasons}
                                />
                            </div>
                        )}
                    {token ? (
                        <>
                            {activeEpisode ? (
                                <MoviePlayer
                                    src={getStreamSrc(
                                        activeEpisode?.source || movie?.source,
                                        movie?.uploadType as UploadTypes
                                    )}
                                    poster={
                                        activeEpisode?.thumbnail ||
                                        movie?.thumbnail
                                    }
                                    imdbRating={movie.imdbRating}
                                    movieId={movie.id}
                                    episodeId={activeEpisode?.id}
                                    movieType={movie.type as MovieTypes}
                                    watchHistory={movie.watchHistory}
                                />
                            ) : movie.source?.startsWith(
                                  "https://www.youtube.com"
                              ) ? (
                                <TrailerPlayer url={movie.source} />
                            ) : (
                                <MoviePlayer
                                    src={movie.source as string}
                                    poster={movie.thumbnail}
                                    imdbRating={movie.imdbRating}
                                    movieId={movie.id}
                                    movieType={movie.type as MovieTypes}
                                    watchHistory={movie.watchHistory}
                                />
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col justify-center items-center w-full h-[700px] bg-gray-900 rounded-xl">
                            <p className="text-gray-400 mb-4">
                                You must be logged in to watch this movie
                            </p>
                            <button
                                onClick={() =>
                                    (window.location.href = "/signin")
                                }
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                            >
                                Go to Login
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-[25px] sm:gap-[35px] lg:gap-[50px] lg:pt-[50px]">
                    <button className="text-start flex text-xl sm:text-3xl font-bold items-center gap-[8px] sm:gap-[10px] cursor-pointer">
                        Recommended movies
                        <LucideArrowRight size={24} />
                    </button>
                    <div>
                        <ContentsSlider
                            items={recommendeds}
                            slidesPerView={5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
