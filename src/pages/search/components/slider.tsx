import { MovieCard } from "@/pages/home/components";
import type { Movie } from "@/pages/home/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SearchedMoviesSlider = ({ data }: { data: Movie[] }) => {
    const navigate = useNavigate();
    return (
        <div className="relative">
            <button className="custom-prev cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300">
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="custom-next cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300">
                <ChevronRight className="w-6 h-6" />
            </button>

            <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={5}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    400: { slidesPerView: 1.2 },
                    480: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
                navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                }}
            >
                {data.map((item: Movie) => (
                    <SwiperSlide
                        key={item.id}
                        onClick={() => navigate(`/details/${item.id}`)}
                    >
                        <MovieCard movie={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
