import { LucideArrowRight } from "lucide-react";
import {
    BrandSlider,
    HeroSwiper,
    ContentsSlider,
    BlockLoader,
} from "./components";
import { useFetchMainMovieTvSeriesCartoons } from "./service/query";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useFetchMainMovieTvSeriesCartoons();
    return (
        <section className="pt-[50px] pb-[140px] flex flex-col gap-[80px] md:gap-[150px]">
            <HeroSwiper />

            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-[40px] sm:gap-[50px] lg:gap-[120px]">
                    <div className="flex flex-col gap-[15px] sm:gap-[25px] lg:gap-[40px]">
                        <button className="text-start flex text-xl sm:text-3xl font-bold items-center gap-[8px] sm:gap-[10px] cursor-pointer">
                            Top movies
                            <LucideArrowRight size={24} />
                        </button>
                        {isLoading ? (
                            <BlockLoader />
                        ) : (
                            <ContentsSlider
                                items={data?.data?.movies ?? []}
                                slidesPerView={5}
                            />
                        )}
                    </div>

                    <div className="flex flex-col gap-[15px] sm:gap-[25px] lg:gap-[40px]">
                        <button className="text-start flex text-xl sm:text-3xl font-bold items-center gap-[8px] sm:gap-[10px] cursor-pointer">
                            TV-Series to watch with family
                            <LucideArrowRight size={24} />
                        </button>
                        {isLoading ? (
                            <BlockLoader />
                        ) : (
                            <ContentsSlider
                                items={data?.data?.tvseries ?? []}
                                slidesPerView={5}
                            />
                        )}
                    </div>
                </div>
            </div>

            <BrandSlider />

            <div className="container px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-[15px] sm:gap-[25px] lg:gap-[40px]">
                    <button className="text-start flex text-xl sm:text-3xl font-bold items-center gap-[8px] sm:gap-[10px] cursor-pointer" onClick={() => navigate('/cartoons')}>
                        Cartoons for kids
                        <LucideArrowRight size={24} />
                    </button>
                    {isLoading ? (
                        <BlockLoader />
                    ) : (
                        <ContentsSlider
                            items={data?.data?.cartoons ?? []}
                            slidesPerView={5}
                        />
                    )}
                </div>
            </div>
        </section>
    );
};
