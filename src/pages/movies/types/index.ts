import type { WatchHistoryI } from "@/pages/home/types";
import type { MovieTypes } from "@/types";

export interface MoviePlayerProps {
    src: string;
    poster?: string;
    imdbRating: number;
    movieId: string;
    episodeId?: string | undefined;
    movieType: MovieTypes;
    watchHistory: WatchHistoryI[];
}

export type BottomSheetProps = {
    title: string;
    options: { label: string; value: string }[];
    onSelect: (val: string) => void;
    onClose: () => void;
    withOverlay?: boolean;
};
