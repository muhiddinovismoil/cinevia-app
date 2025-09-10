import { Link } from "react-router-dom";
import { Film, Home, LucideTv } from "lucide-react";

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white text-center px-4 py-8">
            <Film className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-red-600 animate-bounce mb-6 drop-shadow-lg" />

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2">
                404
            </h1>

            <p className="flex flex-col sm:flex-row items-center justify-center text-lg sm:text-xl text-gray-400 mb-6 gap-2 max-w-xs sm:max-w-md">
                <span>Oops! The movie you’re looking for is not here</span>
                <LucideTv className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </p>

            <Link
                to="/"
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:opacity-90 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl transition duration-300"
            >
                <Home size={18} className="sm:w-5 sm:h-5" />
                Back to Home
            </Link>
        </div>
    );
};
