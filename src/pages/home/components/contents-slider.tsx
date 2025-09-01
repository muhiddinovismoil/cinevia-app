import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { ContentsSliderProps } from "../types";
import { MovieCard } from "./movie-card";

export const ContentsSlider: React.FC<ContentsSliderProps> = ({
    items,
    slidesPerView = 3,
    spaceBetween = 30,
}) => {
    return (
        <div className="">
            <Swiper
                className="cursor-grab"
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                modules={[Autoplay]}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: slidesPerView },
                }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <MovieCard movie={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
