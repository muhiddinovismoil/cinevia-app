import type { MovieTypes } from "@/types";

export interface MoviePlayerProps {
    src: string;
    poster?: string;
    imdbRating: number;
    movieId: string;
    episodeId?: string | undefined;
    movieType: MovieTypes;
}

export type BottomSheetProps = {
    title: string;
    options: { label: string; value: string }[];
    onSelect: (val: string) => void;
    onClose: () => void;
    withOverlay?: boolean;
};
