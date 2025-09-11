import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SearchComponent = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/search");
    };

    return (
        <button
            onClick={handleClick}
            className="h-9 w-9 sm:h-10 cursor-pointer sm:w-10 rounded-lg bg-gray-900/40 hover:bg-gray-800/60 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center hover:scale-105 active:scale-95"
            aria-label="Go to search"
        >
            <Search className="h-4 w-4" />
        </button>
    );
};
