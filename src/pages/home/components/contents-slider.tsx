import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { ContentsSliderProps } from "../types";
import { MovieCard } from "./movie-card";
import { useNavigate } from "react-router-dom";

export const ContentsSlider: React.FC<ContentsSliderProps> = ({
    items,
    slidesPerView = 3,
    spaceBetween = 30,
}) => {
    const navigate = useNavigate();
    return (
        <div>
            <Swiper
                className="cursor-grab"
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                breakpoints={{
                    320: { slidesPerView: 1.5 },
                    480: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
            >
                {items.map((item) => (
                    <SwiperSlide
                        key={item.id}
                        onClick={() => navigate(`movies/${item.id}`)}
                    >
                        <MovieCard movie={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
