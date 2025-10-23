"use client"
import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Maximize, Volume1, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

type VideoDemoProps = {
    src: string; // video source URL (mp4, webm)
    poster?: string; // poster image
    title?: string;
    description?: string;
    className?: string;
    autoplay?: boolean;
    muted?: boolean;
    loop?: boolean;
};

export default function VideoDemoComponent({
    src,
    poster,
    title = "AskAi",
    description,
    className = "",
    autoplay = false,
    muted = true,
    loop = false,
}: VideoDemoProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [isMuted, setIsMuted] = useState(muted);
    const [progress, setProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const p = (videoRef.current.currentTime / videoRef.current.duration) * 100 || 0;
        setProgress(p);
    };

    const handleSeek = (value: number) => {
        if (!videoRef.current) return;
        const time = (value / 100) * (videoRef.current.duration || 0);
        videoRef.current.currentTime = time;
        setProgress(value);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const toggleFullscreen = async () => {
        const node = videoRef.current?.parentElement as HTMLElement | null;
        if (!node) return;
        if (!document.fullscreenElement) {
            await node.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <Card className={`w-full hover:rotate-2 transition-transform duration-500 ${className}`}>
            <CardHeader className="px-4 pt-4">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle className="text-lg">{title}</CardTitle>
                        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge>Demo</Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="relative bg-black/80 rounded-b-xl overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        <div className="relative">
                            {/* video element */}
                            <video
                                ref={videoRef}
                                src={src}
                                poster={poster}
                                onTimeUpdate={handleTimeUpdate}
                                onClick={togglePlay}
                                className="w-full h-[360px] md:h-[480px] object-contain bg-black"
                                autoPlay={autoplay}
                                muted={muted}
                                loop={loop}
                                playsInline
                            />

                            {/* center big play overlay when paused */}
                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <motion.button
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={(e: any) => {
                                            e.stopPropagation();
                                            togglePlay();
                                        }}
                                        className="pointer-events-auto bg-white/90 hover:bg-white rounded-full p-3 shadow-lg"
                                        aria-label="Play"
                                    >
                                        <Play className="w-6 h-6" />
                                    </motion.button>
                                </div>
                            )}

                            {/* Controls bar */}
                            <div className="absolute left-0 right-0 bottom-0 p-3 bg-linear-to-t from-black/70 to-transparent">
                                <div className="flex items-center gap-3">
                                    <Button size="sm" variant="ghost" onClick={togglePlay} className="pointer-events-auto bg-white">
                                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    </Button>

                                    <div className="flex items-center gap-2 pointer-events-auto bg-white rounded-md">
                                        <button onClick={toggleMute} aria-label="Mute toggle" className="p-2 rounded">
                                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                        </button>
                                    </div>

                                    <div className="flex-1">
                                        {/* simple progress slider built with native input to keep dependency light */}
                                        <input
                                            type="range"
                                            min={0}
                                            max={100}
                                            value={Math.round(progress)}
                                            onChange={(e) => handleSeek(Number(e.target.value))}
                                            className="w-full h-1 appearance-none bg-white/30 rounded-lg"
                                            aria-label="Seek"
                                        />
                                    </div>

                                    {/* <div className="flex items-center gap-2">
                                        <Button size="sm" variant="ghost" onClick={toggleFullscreen} className="pointer-events-auto">
                                            <Maximize className="w-4 h-4" />
                                        </Button>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        {/* small caption area */}
                        <div className="p-4">
                            <p className="text-sm text-muted-foreground">Tap the video to play/pause. Use controls for mute, seek, and fullscreen.</p>
                        </div>
                    </motion.div>
                </div>
            </CardContent>
        </Card>
    );
}
