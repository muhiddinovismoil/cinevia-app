import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import type { SearchProps } from "../types";

export const SearchComponent: React.FC<SearchProps> = ({
    searchOpen,
    setSearchOpen,
    searchRef,
    register,
    onSubmit,
}) => {
    return (
        <div className="relative">
            <AnimatePresence mode="wait">
                {searchOpen ? (
                    <motion.form
                        key="search-form"
                        onSubmit={onSubmit}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="w-fit"
                    >
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white opacity-100 pointer-events-none transition-colors group-focus-within:text-white" />

                            <input
                                ref={searchRef}
                                type="search"
                                {...register}
                                placeholder="Search movies & series..."
                                className="w-46 sm:w-64 lg:w-75 pl-10 pr-10 h-9 sm:h-10 rounded-lg border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                            />

                            <button
                                type="button"
                                className="absolute right-2 top-1/2 h-5 w-5 sm:h-6 sm:w-6 -translate-y-1/2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center"
                                onClick={() => setSearchOpen(false)}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.button
                        key="search-button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-gray-900/40 hover:bg-gray-800/60 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
                        onClick={() => setSearchOpen(true)}
                        aria-label="Open search"
                    >
                        <Search className="h-4 w-4" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
