export interface MoviePlayerProps {
    src: string;
    poster?: string;
    imdbRating: number;
}

export type BottomSheetProps = {
    title: string;
    options: { label: string; value: string }[];
    onSelect: (val: string) => void;
    onClose: () => void;
    withOverlay?: boolean;
};
