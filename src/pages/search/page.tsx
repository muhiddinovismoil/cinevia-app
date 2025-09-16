import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useDebouncedValue } from "@/hook";
import type { FormValues } from "./types";
import { useFetchMovies } from "@/service";
import { SearchedMoviesSlider } from "./components";
import { BlockLoader } from "../home/components";

export const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    const { register, watch, setValue } = useForm<FormValues>({
        defaultValues: {
            query: searchParams.get("q") || "",
        },
    });

    const query = watch("query");
    const [debouncedValue] = useDebouncedValue(query, 500);

    useEffect(() => {
        if (debouncedValue?.trim()) {
            setSearchParams({ q: debouncedValue.trim() });
        } else {
            setSearchParams({});
        }
    }, [debouncedValue, setSearchParams]);

    const { data, isLoading } = useFetchMovies(
        { search: debouncedValue.trim() },
        {
            queryKey: ["movies", debouncedValue.trim()],
            enabled: !!debouncedValue.trim(),
        }
    );

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const clearInput = () => {
        setValue("query", "");
        if (inputRef.current) inputRef.current.focus();
    };

    const results = data?.data || [];

    return (
        <div className="container min-h-screen text-white flex flex-col items-center pt-24 px-4">
            <div className="w-full">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                        {...register("query")}
                        ref={(e) => {
                            register("query").ref(e);
                            inputRef.current = e;
                        }}
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-10 pr-10 py-2 border-b border-gray-800 bg-transparent text-lg placeholder-gray-400 text-white focus:outline-none focus:ring-0 focus:border-gray-600 
                            [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={clearInput}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center w-full">
                {isLoading ? (
                    <>
                        <div>
                            <BlockLoader />
                        </div>
                    </>
                ) : results.length === 0 ? (
                    <div className="flex flex-col items-center text-center text-gray-400 mt-12">
                        <Search className="h-16 w-16 mb-4 text-gray-600" />
                        <p className="text-lg font-medium">
                            No results found for your request
                        </p>
                    </div>
                ) : (
                    <div className="container">
                        <SearchedMoviesSlider data={results} />
                    </div>
                )}
            </div>
        </div>
    );
};
