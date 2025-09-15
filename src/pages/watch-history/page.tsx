import { useState } from "react";
import { BlockLoader, MovieCard } from "@/pages/home/components";
import { NotFound } from "@/components";
import { MovieTypes } from "@/types";
import { useFetchHistoryForSlide } from "../profile/service/query";
import type { Movie } from "../home/types";
import type { WatchHistoryResponseI } from "../profile/types";

export const WatchHistory = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useFetchHistoryForSlide({
        pageNumber: page,
        pageSize: 20,
    });
    const watchHistories: WatchHistoryResponseI[] = data?.data || [];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-24 text-2xl font-semibold text-center sm:text-left">
                Watch History
            </div>

            <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {watchHistories.length > 0 ? (
                    watchHistories.map((watchHistory) => (
                        <MovieCard
                            isNavigatable={true}
                            key={watchHistory.movie.id}
                            movie={watchHistory.movie as Movie}
                        />
                    ))
                ) : isLoading ? (
                    <div className="col-span-full flex justify-center py-10">
                        <BlockLoader />
                    </div>
                ) : (
                    <div className="col-span-full flex justify-center py-10">
                        <NotFound movieType={MovieTypes.MOVIE} />
                    </div>
                )}
            </div>

            {watchHistories.length > 0 && (
                <div className="flex justify-center mt-12 pb-24">
                    {watchHistories.length >= 20 && (
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            className="px-6 py-3 text-lg font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                        >
                            Load More
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
