export type Movie = {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
    imdbRating: number;
    siteRating: number;
};

export type ContentsSliderProps = {
    items: Movie[];
    slidesPerView?: number;
    spaceBetween?: number;
};
