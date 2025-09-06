import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "./movie-card";
import type { ContentsSliderProps } from "../types";
import "swiper/css";

export const ContentsSlider: React.FC<ContentsSliderProps> = ({
    items,
    slidesPerView = 3,
    spaceBetween = 30,
}) => {
    const navigate = useNavigate();
    return (
        <div>
            <Swiper
                className="cursor-pointer"
                spaceBetween={spaceBetween}
                modules={[Mousewheel]}
                mousewheel={{ forceToAxis: true }}
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
                        onClick={() => navigate(`details/${item.id}`)}
                    >
                        <MovieCard movie={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
