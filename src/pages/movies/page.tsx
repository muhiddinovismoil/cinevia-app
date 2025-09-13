import { useState, useEffect } from "react";
import { useFetchCategories, useFetchMovies } from "@/service";
import { MovieTypes, SortEnum } from "@/types";
import { MovieCard, BlockLoader } from "../home/components";
import type { Movie } from "../home/types";
import { ChevronDown, X } from "lucide-react";
import type { CategoriesResponseData } from "@/types";
import { BottomSheet, NotFound, renderDropdown } from "@/components";

export const Movies = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Movie[]>([]);

    const [categoryId, setCategoryId] = useState<string>("");
    const [sort, setSort] = useState<SortEnum | "">("");
    const [releaseYear, setReleaseYear] = useState<number | null>(null);

    const { data, isLoading } = useFetchMovies({
        movieType: MovieTypes.CARTOON,
        pageNumber: page,
        pageSize: 20,
        categoryId: categoryId || undefined,
        sort: sort || undefined,
        releaseYear:
            releaseYear && Number(releaseYear) > 0
                ? Number(releaseYear)
                : undefined,
    });

    const { data: categoriesResponse } = useFetchCategories();
    const categories: CategoriesResponseData[] = categoriesResponse?.data || [];

    useEffect(() => {
        if (data?.data) {
            setMovies((prev) =>
                page === 1 ? data.data : [...prev, ...data.data]
            );
        }
    }, [data, page]);

    const years = Array.from({ length: 20 }, (_, i) => `${2025 - i}`);

    const [openCategory, setOpenCategory] = useState(false);
    const [openSort, setOpenSort] = useState(false);
    const [openYear, setOpenYear] = useState(false);

    const sortOptions: { label: string; value: SortEnum }[] = [
        { label: "Most Popular", value: SortEnum.DATE_ASC },
        { label: "Top Rated", value: SortEnum.DATE_DESC },
        { label: "Latest", value: SortEnum.TITLE_ASC },
        { label: "Oldest", value: SortEnum.TITLE_DESC },
    ];

    const getSortLabel = (val: SortEnum | "") =>
        sortOptions.find((s) => s.value === val)?.label || "Select Sort";

    return (
        <div className="container">
            <div className="pt-[100px] flex flex-col">
                <div className="flex flex-col md:flex-row justify-between gap-4 items-center mt-6">
                    <p className="hidden md:block text-xl font-semibold text-white">
                        Filter by ...
                    </p>
                    <div className="relative flex w-full md:w-auto gap-4 md:gap-[30px] overflow-x-auto md:overflow-visible scrollbar-hide pb-2">
                        <div className="relative flex-shrink-0 w-[200px]">
                            <button
                                onClick={() => {
                                    setOpenCategory((o) => !o);
                                    setOpenSort(false);
                                    setOpenYear(false);
                                }}
                                className="w-full flex justify-between items-center bg-gray-900 text-white rounded-xl px-4 py-3 text-lg shadow-lg hover:bg-gray-800 transition"
                            >
                                {categories.find((c) => c.id === categoryId)
                                    ?.name || "Select Category"}
                                {categoryId && (
                                    <X
                                        className="ml-2 h-4 w-4 cursor-pointer hover:text-red-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCategoryId("");
                                            setPage(1);
                                        }}
                                    />
                                )}
                                <ChevronDown
                                    className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                                        openCategory ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {renderDropdown(
                                openCategory,
                                () => setOpenCategory(false),
                                categories.map((c) => ({
                                    label: c.name,
                                    value: c.id,
                                })),
                                (val) => {
                                    setCategoryId(val);
                                    setPage(1);
                                }
                            )}
                        </div>

                        <div className="relative flex-shrink-0 w-[200px]">
                            <button
                                onClick={() => {
                                    setOpenSort((o) => !o);
                                    setOpenCategory(false);
                                    setOpenYear(false);
                                }}
                                className="w-full flex justify-between items-center bg-gray-900 text-white rounded-xl px-4 py-3 text-lg shadow-lg hover:bg-gray-800 transition"
                            >
                                {getSortLabel(sort)}
                                {sort && (
                                    <X
                                        className="ml-2 h-4 w-4 cursor-pointer hover:text-red-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSort("");
                                            setPage(1);
                                        }}
                                    />
                                )}
                                <ChevronDown
                                    className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                                        openSort ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {renderDropdown(
                                openSort,
                                () => setOpenSort(false),
                                sortOptions.map((s) => ({
                                    label: s.label,
                                    value: s.value,
                                })),
                                (val) => {
                                    setSort(val as SortEnum);
                                    setPage(1);
                                }
                            )}
                        </div>

                        <div className="relative flex-shrink-0 w-[200px]">
                            <button
                                onClick={() => {
                                    setOpenYear((o) => !o);
                                    setOpenCategory(false);
                                    setOpenSort(false);
                                }}
                                className="w-full flex justify-between items-center bg-gray-900 text-white rounded-xl px-4 py-3 text-lg shadow-lg hover:bg-gray-800 transition"
                            >
                                {releaseYear || "Select Year"}
                                {releaseYear && (
                                    <X
                                        className="ml-2 h-4 w-4 cursor-pointer hover:text-red-400"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setReleaseYear(null);
                                            setPage(1);
                                        }}
                                    />
                                )}
                                <ChevronDown
                                    className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                                        openYear ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                            {renderDropdown(
                                openYear,
                                () => setOpenYear(false),
                                years.map((y) => ({ label: y, value: y })),
                                (val) => {
                                    setReleaseYear(Number(val));
                                    setPage(1);
                                }
                            )}
                        </div>
                    </div>
                </div>

                {openCategory && (
                    <BottomSheet
                        title="Select Category"
                        options={categories.map((c) => ({
                            label: c.name,
                            value: c.id,
                        }))}
                        onSelect={(val) => {
                            setCategoryId(val);
                            setPage(1);
                        }}
                        onClose={() => setOpenCategory(false)}
                    />
                )}
                {openSort && (
                    <BottomSheet
                        title="Select Sort"
                        options={sortOptions.map((s) => ({
                            label: s.label,
                            value: s.value,
                        }))}
                        onSelect={(val) => {
                            setSort(val as SortEnum);
                            setPage(1);
                        }}
                        onClose={() => setOpenSort(false)}
                    />
                )}
                {openYear && (
                    <BottomSheet
                        title="Select Year"
                        options={years.map((y) => ({ label: y, value: y }))}
                        onSelect={(val) => {
                            setReleaseYear(Number(val));
                            setPage(1);
                        }}
                        onClose={() => setOpenYear(false)}
                    />
                )}

                <div className="pt-[40px] grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard
                                isNavigatable={true}
                                key={movie.id}
                                movie={movie}
                            />
                        ))
                    ) : isLoading ? (
                        <div className="col-span-full">
                            <BlockLoader />
                        </div>
                    ) : (
                        <NotFound movieType={MovieTypes.MOVIE} />
                    )}
                </div>

                <div className="flex justify-center mt-8 pb-[100px]">
                    {movies.length >= 20 && (
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            className="px-6 py-3 text-lg rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                        >
                            Load More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
