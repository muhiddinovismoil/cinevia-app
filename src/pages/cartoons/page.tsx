import { useState, useEffect } from "react";
import { useFetchMovies } from "@/service";
import { MovieTypes } from "@/types";
import { MovieCard, BlockLoader } from "../home/components";
import type { Movie } from "../home/types";

export const Cartoons = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Movie[]>([]);

    const { data, isLoading } = useFetchMovies({
        movieType: MovieTypes.CARTOON as MovieTypes,
        pageNumber: page,
        pageSize: 20,
    });

    useEffect(() => {
        if (data?.data) {
            setMovies((prev) =>
                page === 1 ? data.data : [...prev, ...data.data]
            );
        }
    }, [data, page]);

    return (
        <div className="container">
            <div className="pt-[100px] grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <MovieCard
                        isNavigatable={true}
                        key={movie.id}
                        movie={movie}
                    />
                ))}

                {movies.length === 0 && isLoading && (
                    <div className="col-span-full">
                        <BlockLoader />
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-8 pb-[100px]">
                {movies.length >= 20 && (
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};
