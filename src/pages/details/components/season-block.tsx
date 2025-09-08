import { useState } from "react";
import type { Season, Episode } from "../types";
import { ChevronDown } from "lucide-react";

export const SeasonsBlock = ({
    seasons,
    onEpisodeSelect,
}: {
    seasons: Season[];
    onEpisodeSelect: (episode: Episode) => void;
}) => {
    const [activeSeason, setActiveSeason] = useState<string | null>(null);
    const [activeEpisode, setActiveEpisode] = useState<string | null>(null);

    return (
        <div className="flex flex-col gap-6">
            {/* Seasons buttons */}
            <div className="flex gap-3 flex-wrap">
                {seasons.map((season) => (
                    <button
                        key={season.id}
                        onClick={() => {
                            setActiveSeason(season.id);
                            setActiveEpisode(null);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            activeSeason === season.id
                                ? "bg-blue-600 text-white"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                        {season.title}
                    </button>
                ))}
            </div>

            {/* Episodes dropdown */}
            {activeSeason && (
                <div className="max-w-sm relative">
                    <select
                        value={activeEpisode ?? ""}
                        onChange={(e) => {
                            const season = seasons.find(
                                (s) => s.id === activeSeason
                            );
                            const episode = season?.episodes.find(
                                (ep) => ep.id === e.target.value
                            );
                            if (episode) {
                                setActiveEpisode(episode.id);
                                onEpisodeSelect(episode);
                            }
                        }}
                        className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-800 text-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                    >
                        <option value="" disabled>
                            Select episode
                        </option>
                        {seasons
                            .find((s) => s.id === activeSeason)
                            ?.episodes.map((ep) => (
                                <option key={ep.id} value={ep.id}>
                                    {ep.title}
                                </option>
                            ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-300">
                        <ChevronDown size={20} />
                    </div>
                </div>
            )}
        </div>
    );
};
