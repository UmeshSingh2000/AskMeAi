"use client"

import React, { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
    {
        name: "Aarav Patel",
        role: "Software Engineer",
        text: "AskAI completely changed how I review research papers. Upload, ask, and get precise answers instantly!",
        image: "/avatars/aarav.jpg",
    },
    {
        name: "Sara Khan",
        role: "Student, B.Tech CSE",
        text: "A truly amazing product — I can now talk to my PDFs and summarize lengthy books in seconds!",
        image: "/avatars/sara.jpg",
    },
    {
        name: "Rahul Mehta",
        role: "Data Analyst",
        text: "The smart summarization and Q&A features saved me hours of manual reading and note-taking.",
        image: "/avatars/rahul.jpg",
    },
    {
        name: "Emily Rodriguez",
        role: "Research Scholar",
        text: "AskAI has made understanding dense academic papers so much easier. Absolutely love it!",
        image: "/avatars/emily.jpg",
    },
]

export default function TestimonialCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null)

    // Auto-scroll logic
    useEffect(() => {
        const scrollContainer = scrollRef.current
        if (!scrollContainer) return

        const scrollSpeed = 1 // pixels per frame
        let scrollInterval: any

        const startScroll = () => {
            scrollInterval = setInterval(() => {
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollContainer.scrollLeft = 0
                } else {
                    scrollContainer.scrollLeft += scrollSpeed
                }
            }, 20)
        }

        startScroll()

        // Pause on hover
        scrollContainer.addEventListener("mouseenter", () => clearInterval(scrollInterval))
        scrollContainer.addEventListener("mouseleave", startScroll)

        return () => clearInterval(scrollInterval)
    }, [])

    return (
        <div className="relative w-full overflow-hidden py-10 mt-10 rounded-md ">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">What Our Users Say</h2>

            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-scroll px-6 hide-scrollbar"
            >
                {testimonials.map((t, i) => (
                    <Card key={i} className="min-w-[300px] sm:min-w-[350px] shrink-0 shadow-lg hover:shadow-xl transition-all">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                            <img
                                src={t.image}
                                alt={t.name}
                                className="w-16 h-16 rounded-full mb-4 object-cover"
                            />
                            <p className="text-gray-600 italic mb-4">“{t.text}”</p>
                            <div>
                                <h3 className="font-semibold text-gray-900">{t.name}</h3>
                                <p className="text-sm text-gray-500">{t.role}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .hide-scrollbar {
                  -ms-overflow-style: none; /* IE and Edge */
                  scrollbar-width: none; /* Firefox */
                }
            `}</style>
        </div>
    )
}
