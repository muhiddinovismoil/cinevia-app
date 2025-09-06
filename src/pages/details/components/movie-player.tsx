import { useRef, useState, useEffect } from "react";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    Settings,
    FastForward,
    Rewind,
    Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { MoviePlayerProps } from "../../movies/types";

export const MoviePlayer = ({ src, poster, imdbRating }: MoviePlayerProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [showOverlayPlay, setShowOverlayPlay] = useState(true);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [skipDirection, setSkipDirection] = useState<
        "forward" | "backward" | null
    >(null);
    const [showRateOverlay, setShowRateOverlay] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showVolumeOverlay, setShowVolumeOverlay] = useState(false);

    const [showControls, setShowControls] = useState(true);

    // keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!videoRef.current) return;

            switch (e.key) {
                case " ":
                    e.preventDefault();
                    togglePlay();
                    break;
                case "ArrowRight":
                    skip(10, "forward");
                    break;
                case "ArrowLeft":
                    skip(-10, "backward");
                    break;
                case "ArrowUp":
                    setVolume((v) => {
                        const newVol = Math.min(1, v + 0.05);
                        triggerVolumeOverlay();
                        return newVol;
                    });
                    break;
                case "ArrowDown":
                    setVolume((v) => {
                        const newVol = Math.max(0, v - 0.05);
                        triggerVolumeOverlay();
                        return newVol;
                    });
                    break;
                case "f":
                    toggleFullscreen();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // fullscreen listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    // auto-hide controls in fullscreen
    useEffect(() => {
        if (!isFullscreen) {
            setShowControls(true);
            document.body.style.cursor = "default";
            return;
        }

        let timeout: NodeJS.Timeout;

        const handleMouseMove = () => {
            setShowControls(true);
            document.body.style.cursor = "default";
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setShowControls(false);
                document.body.style.cursor = "none";
            }, 2500);
        };

        const container = containerRef.current;
        container?.addEventListener("mousemove", handleMouseMove);

        return () => {
            container?.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(timeout);
            document.body.style.cursor = "default";
        };
    }, [isFullscreen]);

    // volume & speed update
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.playbackRate = playbackRate;
        }
    }, [volume, playbackRate]);

    // listen video events
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const timeUpdate = () => setCurrentTime(video.currentTime);
        const loadedMeta = () => setDuration(video.duration);

        video.addEventListener("timeupdate", timeUpdate);
        video.addEventListener("loadedmetadata", loadedMeta);

        return () => {
            video.removeEventListener("timeupdate", timeUpdate);
            video.removeEventListener("loadedmetadata", loadedMeta);
        };
    }, []);

    // TAP left/right skip
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleDoubleClick = (e: MouseEvent) => {
            if (!isFullscreen || !videoRef.current) return;
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;

            if (x < rect.width / 4) {
                skip(-10, "backward");
            } else {
                skip(10, "forward");
            }
        };

        container.addEventListener("dblclick", handleDoubleClick);
        return () =>
            container.removeEventListener("dblclick", handleDoubleClick);
    }, [isFullscreen]);

    const skip = (seconds: number, dir: "forward" | "backward") => {
        if (!videoRef.current) return;
        videoRef.current.currentTime += seconds;
        triggerSkip(dir);
    };

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
        setShowOverlayPlay(false);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        if (videoRef.current.muted) {
            videoRef.current.muted = false;
            setVolume(videoRef.current.volume || 1);
        } else {
            videoRef.current.muted = true;
            setVolume(0);
        }
        triggerVolumeOverlay();
    };

    const handleRateChange = () => {
        const speeds = [0.25, 0.5, 1, 1.5, 2];
        const currentIndex = speeds.indexOf(playbackRate);
        const nextIndex = (currentIndex + 1) % speeds.length;
        setPlaybackRate(speeds[nextIndex]);
        triggerRateOverlay();
    };

    const triggerSkip = (dir: "forward" | "backward") => {
        setSkipDirection(dir);
        setTimeout(() => setSkipDirection(null), 800);
    };

    const triggerVolumeOverlay = () => {
        setShowVolumeOverlay(true);
        setTimeout(() => setShowVolumeOverlay(false), 800);
    };

    const triggerRateOverlay = () => {
        setShowRateOverlay(true);
        setTimeout(() => setShowRateOverlay(false), 800);
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!videoRef.current) return;
        const newTime = (Number(e.target.value) / 100) * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    return (
        <div
            ref={containerRef}
            className="relative bg-black rounded-2xl overflow-hidden shadow-xl w-full aspect-video min-h-[300px]"
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-cover rounded-2xl"
                onClick={togglePlay}
            />

            {/* Overlay Play */}
            {showOverlayPlay && poster && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
                    <motion.button
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 flex cursor-pointer items-center justify-center bg-gray-800 hover:bg-gray-700 rounded-full shadow-lg transition"
                    >
                        <Play size={36} className="ml-1" />
                    </motion.button>
                </div>
            )}

            {/* Skip Animations */}
            <AnimatePresence>
                {skipDirection === "forward" && (
                    <motion.div
                        key="forward"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="absolute inset-0 flex items-center justify-center text-white text-3xl"
                    >
                        <FastForward size={60} /> +10s
                    </motion.div>
                )}
                {skipDirection === "backward" && (
                    <motion.div
                        key="backward"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="absolute inset-0 flex items-center justify-center text-white text-3xl"
                    >
                        <Rewind size={60} /> -10s
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Volume Overlay */}
            <AnimatePresence>
                {showVolumeOverlay && (
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="absolute top-6 right-6 bg-black/70 px-4 py-2 rounded-xl text-white text-sm flex flex-col items-center"
                    >
                        <div className="w-20 h-2 bg-gray-600 rounded">
                            <div
                                className="h-2 bg-green-400 rounded"
                                style={{ width: `${volume * 100}%` }}
                            />
                        </div>
                        <span>{Math.round(volume * 100)}%</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Rate Overlay */}
            <AnimatePresence>
                {showRateOverlay && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-2 rounded-xl text-white text-sm"
                    >
                        Speed: {playbackRate}x
                    </motion.div>
                )}
            </AnimatePresence>

            {/* IMDB Badge */}
            {imdbRating && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 px-3 py-1 rounded-lg text-yellow-400 text-sm">
                    <Star size={16} className="text-yellow-400" />
                    <span>{imdbRating.toFixed(1)}</span>
                </div>
            )}

            {/* Controls */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col gap-2"
                    >
                        {/* Seek bar */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={
                                duration ? (currentTime / duration) * 100 : 0
                            }
                            onChange={handleSeek}
                            className="w-full accent-green-500 cursor-pointer"
                        />

                        {/* Time */}
                        <div className="flex items-center justify-between text-xs text-gray-300">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={togglePlay}
                                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition cursor-pointer"
                                >
                                    {isPlaying ? (
                                        <Pause size={20} />
                                    ) : (
                                        <Play size={20} />
                                    )}
                                </button>

                                <button
                                    onClick={toggleMute}
                                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition cursor-pointer"
                                >
                                    {volume > 0 ? (
                                        <Volume2 size={20} />
                                    ) : (
                                        <VolumeX size={20} />
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleRateChange}
                                    className="px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition cursor-pointer"
                                >
                                    {playbackRate}x
                                </button>

                                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition cursor-pointer">
                                    <Settings size={18} />
                                </button>

                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition cursor-pointer"
                                >
                                    {isFullscreen ? (
                                        <Minimize size={18} />
                                    ) : (
                                        <Maximize size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
