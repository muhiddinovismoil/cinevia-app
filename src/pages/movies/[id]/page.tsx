import { useRef } from "react";
import { MoviePlayer } from "../components";
import { Clock, Film, Globe, User, Users, Eye, Star } from "lucide-react";

export const MovieDetail = () => {
    const playerRef = useRef<HTMLDivElement | null>(null);
    

    const movie = {
        id: "1",
        title: "Interstellar",
        description:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        slug: "interstellar",
        thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngBJ0B7UDrLUkDlp6DCQLsEYuWR-DiHwbnxFFCniB3HiP3f3NZmR1-lKSC34ge6YXu4LX",
        type: "Movie",
        uploadType: "Url",
        source: "https://xstreamx.films365.org/movie/c1ce1a2c-79b3-40b7-a9bb-5670cb0deae7/Interstellar",
        duration: 169,
        releaseYear: 2014,
        country: "USA",
        director: "Christopher Nolan",
        cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        imdbRating: 8.6,
        viewCount: 129384,
        averageRating: 9.2,
        category: "Sci-Fi",
    };

    const handleWatchNow = () => {
        playerRef.current?.scrollIntoView({ behavior: "smooth" });
    };

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
                                {movie.category}
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
                                {movie.viewCount.toLocaleString()} views
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
                        src={movie.source}
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
