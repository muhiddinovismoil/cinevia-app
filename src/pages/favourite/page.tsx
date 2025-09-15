import { useState } from "react";
import { useFetchFavourites } from "./service/query";
import { BlockLoader, MovieCard } from "../home/components";
import { NotFound } from "@/components";
import type { FavouriteResponseI } from "./types";
import type { Movie } from "../home/types";

export const Favourite = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useFetchFavourites({
        pageNumber: page,
        pageSize: 20,
    });
    const favourites: FavouriteResponseI[] = data?.data || [];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-[100px] flex justify-center items-center">
                <h3 className="sm:text-2xl md:text-3xl">Favourites</h3>
            </div>

            <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {favourites.length > 0 ? (
                    favourites.map((favourite) => (
                        <MovieCard
                            isNavigatable={true}
                            key={favourite.movie.id}
                            movie={favourite.movie as Movie}
                        />
                    ))
                ) : isLoading ? (
                    <div className="col-span-full flex justify-center py-10">
                        <BlockLoader />
                    </div>
                ) : (
                    <div className="col-span-full flex justify-center py-10">
                        <NotFound movieType={"Favourited Movies"} />
                    </div>
                )}
            </div>

            {favourites.length > 0 && (
                <div className="flex justify-center mt-12 pb-24">
                    {favourites.length >= 20 && (
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
