import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const slides = [
    {
        id: 1,
        title: "Movies",
        description:
            "Enjoy the latest blockbusters in Full HD. Stream anywhere, anytime.",
        image: "/hero-images/movies.png",
        buttonText: "Watch Movies",
        navigationLink: "/movies",
    },
    {
        id: 2,
        title: "TV-Series",
        description:
            "Binge your favorite shows without limits. All episodes in one place.",
        image: "/hero-images/tv-series.png",
        buttonText: "Watch TV-Series",
        navigationLink: "/series",
    },
    {
        id: 3,
        title: "Cartoons",
        description:
            "Fun adventures for kids and adults alike. Family entertainment reimagined.",
        image: "/hero-images/cartoons.png",
        buttonText: "Watch Cartoons",
        navigationLink: "/cartoons",
    },
];

export const HeroSwiper = () => {
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-[70vh] cursor-grab">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop
                pagination={{ clickable: true }}
                className="w-full h-[100%]"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative w-full h-full">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

                            <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-24 pb-20 text-white">
                                <div className="max-w-2xl">
                                    <h1 className="text-3xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                                        {slide.title}
                                    </h1>
                                    <p className="text-base md:text-xl mb-6 opacity-90 leading-relaxed">
                                        {slide.description}
                                    </p>
                                </div>

                                <div className="flex justify-end w-full">
                                    <button
                                        onClick={() =>
                                            navigate(slide.navigationLink)
                                        }
                                        className="group relative flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-base md:text-lg text-white bg-gray-800/80 backdrop-blur-sm shadow-md hover:bg-gray-700 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                                    >
                                        {slide.buttonText}
                                        <ArrowUpRightFromSquareIcon className="w-0 group-hover:w-5 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
