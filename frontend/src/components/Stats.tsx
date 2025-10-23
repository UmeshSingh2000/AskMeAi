import React from 'react'
import { Trophy, Users, Star } from 'lucide-react'

export default function AskAIStats() {
    return (
        <div className="flex flex-wrap items-center justify-center gap-10 py-6 px-8">
            {/* Chrome Favorites */}
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-500 w-6 h-6" />
                    <p className="text-2xl font-bold text-foreground">2025</p>
                </div>
                <p className="text-sm text-muted-foreground">Chrome Favorites</p>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-10 bg-muted-foreground/30" />

            {/* Users */}
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2">
                    <Users className="text-blue-500 w-6 h-6" />
                    <p className="text-2xl font-bold text-foreground">10M+</p>
                </div>
                <p className="text-sm text-muted-foreground">Users</p>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-10 bg-muted-foreground/30" />

            {/* Rating */}
            <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-foreground">4.9</p>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                        ))}
                    </div>
                </div>
                <p className="text-sm text-muted-foreground">Chrome Store Rating</p>
            </div>
        </div>
    )
}
