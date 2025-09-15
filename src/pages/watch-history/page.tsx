import { useState } from "react";
import { BlockLoader, MovieCard } from "@/pages/home/components";
import { NotFound } from "@/components";
import { MovieTypes } from "@/types";
import { useFetchHistoryForSlide } from "../profile/service/query";
import type { Movie } from "../home/types";
import type { WatchHistoryResponseI } from "@/pages/profile/types";
import { WatchStatus } from "@/pages/details/types";

export const WatchHistory = () => {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<WatchStatus>(WatchStatus.WATCHING);

    const { data, isLoading } = useFetchHistoryForSlide({
        pageNumber: page,
        pageSize: 20,
        status,
    });

    const watchHistories: WatchHistoryResponseI[] = data?.data || [];

    const handleStatusChange = (newStatus: WatchStatus) => {
        console.log(newStatus);
        setStatus(newStatus);
        setPage(1);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-24 flex justify-between items-center max-w-md mx-auto text-lg font-semibold">
                <button
                    className={`relative pb-2 transition-colors duration-300 cursor-pointer ${
                        status === WatchStatus.WATCHING
                            ? "text-gray-300"
                            : "text-gray-700 hover:text-gray-600"
                    }`}
                    onClick={() => handleStatusChange(WatchStatus.WATCHING)}
                >
                    Watching
                    <span
                        className={`absolute left-0 bottom-0 h-[2px] rounded-full transition-all duration-300
        ${
            status === WatchStatus.WATCHING
                ? "w-full bg-blue-600"
                : "w-0 bg-gray-200"
        }
        ${status !== WatchStatus.WATCHING ? "hover:w-full" : ""}
      `}
                    />
                </button>

                <button
                    className={`relative pb-2 transition-colors duration-300 cursor-pointer ${
                        status === WatchStatus.COMPLETED
                            ? "text-gray-300"
                            : "text-gray-700 hover:text-gray-600"
                    }`}
                    onClick={() => handleStatusChange(WatchStatus.COMPLETED)}
                >
                    Completed
                    <span
                        className={`absolute left-0 bottom-0 h-[2px] rounded-full transition-all duration-300
        ${
            status === WatchStatus.COMPLETED
                ? "w-full bg-blue-600"
                : "w-0 bg-gray-200"
        }
        ${status !== WatchStatus.COMPLETED ? "hover:w-full" : ""}
      `}
                    />
                </button>
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
