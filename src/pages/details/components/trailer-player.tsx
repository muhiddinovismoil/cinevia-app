export const TrailerPlayer = ({ url }: { url: string }) => {
    const getVideoId = (link: string) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = link.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = getVideoId(url);

    return (
        <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <iframe
                className="aspect-video w-full"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title="Trailer Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
            ></iframe>
        </div>
    );
};
