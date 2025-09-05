import { LucideArrowRight } from "lucide-react";
import { BrandSlider, HeroSwiper, ContentsSlider } from "./components";
import { type Movie } from "./types";

const movies: Movie[] = [
    {
        id: 1,
        title: "Inception",
        category: "Sci-Fi",
        thumbnail:
            "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRRyuWmayVBvqjd1MxTKpRgauq2cCtUzb7Q9QvaFTkAuxAU_EYMoCE3wBuJeftxIzf0grreIw",
        imdbRating: 8.8,
        siteRating: 9.2,
    },
    {
        id: 2,
        title: "The Dark Knight",
        category: "Action",
        thumbnail:
            "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA",
        imdbRating: 9.0,
        siteRating: 9.5,
    },
    {
        id: 3,
        title: "Interstellar",
        category: "Sci-Fi",
        thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSngBJ0B7UDrLUkDlp6DCQLsEYuWR-DiHwbnxFFCniB3HiP3f3NZmR1-lKSC34ge6YXu4LX",
        imdbRating: 8.6,
        siteRating: 9.0,
    },
    {
        id: 4,
        title: "Parasite",
        category: "Thriller",
        thumbnail:
            "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTTRGm5Vxt-AKoe72ASaC0F1w58TkuIQTuYrjrzhHkAcZYXXUS9WQdAuaikkuRMX50MWN01lw",
        imdbRating: 8.5,
        siteRating: 8.9,
    },
    {
        id: 5,
        title: "Avengers: Endgame",
        category: "Superhero",
        thumbnail:
            "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRnXEwQlva93WuBdWDK6LlOSf4f96CB5OxToqcdkHiWBnn2p5WOjaOGKo_t6i9F-gQ2tYUp",
        imdbRating: 8.4,
        siteRating: 8.7,
    },
    {
        id: 6,
        title: "Joker",
        category: "Drama",
        thumbnail:
            "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRkNeYGwWeQEwOoPhxW93QIeNUWnLmEvMPwTw9AlDBGN4uXjIAcOEwz2z2yZL8BpXHp3ZYyjQ",
        imdbRating: 8.4,
        siteRating: 9.1,
    },
    {
        id: 7,
        title: "Spider-Man: Across the Spider-Verse",
        category: "Animation",
        thumbnail:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDDvJ0zhGxVySz3RjLa35ukjpctxW41KzD3VQ56VzSEX2lB5WHZ0le10IjuI8ZJ9cd5CeZpA",
        imdbRating: 8.9,
        siteRating: 9.3,
    },
    {
        id: 8,
        title: "Oppenheimer",
        category: "Biography",
        thumbnail:
            "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ8FFJNBaIXvhEwqXXw40rYYDci8jPlYxWfy9082flliYoZ-SqqZjy0az-G5rIWuSJp2pn7xQ",
        imdbRating: 8.7,
        siteRating: 9.0,
    },
];

export const Home = () => {
    return (
        <section className="pt-[50px] pb-[140px] flex flex-col gap-[80px] md:gap-[150px]">
            <HeroSwiper />
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-[40px] sm:gap-[50px]">
                    <div className="flex flex-col gap-[15px] sm:gap-[25px]">
                        <button className="text-start flex text-2xl sm:text-3xl font-bold items-center gap-[8px] sm:gap-[10px] cursor-pointer">
                            Top movies
                            <LucideArrowRight size={24} />
                        </button>
                        <ContentsSlider items={movies} slidesPerView={5} />
                    </div>
                    <div className="flex flex-col gap-[15px] sm:gap-[25px]">
                        <button className="text-start flex text-2xl sm:text-3xl font-bold items-center gap-[8px] sm:gap-[10px] cursor-pointer">
                            TV-Series to watch with family
                            <LucideArrowRight size={24} />
                        </button>
                        <ContentsSlider items={movies} slidesPerView={5} />
                    </div>
                </div>
            </div>
            <BrandSlider />
            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-[15px] sm:gap-[25px]">
                    <button className="text-start flex text-2xl sm:text-3xl font-bold items-center gap-[8px] sm:gap-[10px] cursor-pointer">
                        Cartoons for kids
                        <LucideArrowRight size={24} />
                    </button>
                    <ContentsSlider items={movies} slidesPerView={5} />
                </div>
            </div>
        </section>
    );
};
