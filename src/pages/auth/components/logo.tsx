import { Play } from "lucide-react";

export const Logo = () => (
    <div className="flex items-center space-x-2 sm:space-x-3 group justify-center">
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-300 transform group-hover:scale-105">
                <img
                    src="/logo.png"
                    alt="Cinevia"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback = target.nextSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                    }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-red-500 via-purple-600 to-blue-600 items-center justify-center">
                    <Play className="h-5 w-5 text-white fill-white" />
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <span className="font-black text-xl sm:text-2xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
                Cinevia
            </span>
            <span className="text-xs text-gray-400 -mt-0.5 hidden sm:block">
                Stream Unlimited
            </span>
        </div>
    </div>
);
