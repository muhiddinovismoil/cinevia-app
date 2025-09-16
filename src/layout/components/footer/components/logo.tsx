import { Link } from "react-router-dom";
import type { SocialLink } from "../types";
import { Play } from "lucide-react";

export const Logo = ({ SOCIAL_LINKS }: { SOCIAL_LINKS: SocialLink[] }) => (
    <div className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-300 transform group-hover:scale-105">
                    <img
                        src="/logo.png"
                        alt="Cinevia"
                        className="w-full h-full object-cover"
                        onError={(
                            e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
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
                <span className="font-black text-2xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Cinevia
                </span>
                <span className="text-sm text-gray-400 -mt-1">
                    Stream Unlimited
                </span>
            </div>
        </Link>

        <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Your ultimate destination for movies, TV series, and cartoons.
            Stream unlimited entertainment with the best quality and experience.
        </p>

        <div className="flex items-center space-x-4">
            {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 ${social.color} transition-all duration-200 transform hover:scale-110`}
                        aria-label={social.label}
                    >
                        <Icon className="h-4 w-4" />
                    </a>
                );
            })}
        </div>
    </div>
);
