import { useEffect, useState } from "react";

const brands = [
    "/brands-logo/sony.png",
    "/brands-logo/dreamworks.png",
    "/brands-logo/marvel.png",
    "/brands-logo/disney.png",
    "/brands-logo/dc.png",
    "/brands-logo/pixar.png",
    "/brands-logo/warnerbros.png",
];

export const BrandSlider = () => {
    const [repeatCount, setRepeatCount] = useState(2);

    useEffect(() => {
        const updateRepeat = () => {
            const screenWidth = window.innerWidth;
            const logoWidth = 150;
            const needed = Math.ceil(screenWidth / logoWidth) + 2;
            setRepeatCount(needed);
        };

        updateRepeat();
        window.addEventListener("resize", updateRepeat);
        return () => window.removeEventListener("resize", updateRepeat);
    }, []);

    return (
        <div className="relative overflow-hidden py-6">
            <div className="flex animate-scroll space-x-16">
                {Array.from({ length: repeatCount }, () => brands)
                    .flat()
                    .map((logo, i) => (
                        <img
                            key={i}
                            src={logo}
                            alt="brand logo"
                            className="h-15 w-auto object-contain opacity-60 hover:opacity-100 transition"
                        />
                    ))}
            </div>
        </div>
    );
};
