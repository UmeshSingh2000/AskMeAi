'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenu,
} from "@/components/ui/sidebar"
import axios from "axios"
import { BookOpen, ChevronDown, Search, SquarePen } from "lucide-react"
import { useEffect, useState } from "react"

const items = [
    {
        title: "New Chat",
        url: "#",
        icon: SquarePen,
    },
    {
        title: "Search Chats",
        url: "#",
        icon: Search,
    },
]

export function AppSidebar() {
    const [chats, setChats] = useState<any[]>([])

    const getMyChats = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getChats`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setChats(response.data.chats);  // Just store the chats from the response
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    }

    useEffect(() => {
        getMyChats();
    }, [])

    return (
        <Sidebar>
            <SidebarHeader className="flex items-center gap-2 text-2xl font-bold">
                <header className="flex items-center justify-between gap-2">
                    AskAI
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                        width="28"
                        height="28"
                        fill="none"
                        stroke="#6C63FF"
                        strokeWidth="3"
                        strokeLinejoin="round"
                    >
                        <path d="M32 6C17.64 6 6 16.54 6 29c0 5.59 2.48 10.67 6.58 14.52L10 58l10.75-5.78C24.68 53.24 28.24 54 32 54c14.36 0 26-10.54 26-23S46.36 6 32 6z" />
                    </svg>
                </header>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="flex items-center gap-2">
                        <BookOpen />
                        Chats
                        <ChevronDown />
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {chats.map((chat, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild>
                                        <a href={`#chat-${index}`}>
                                            <span>{chat.name || `Chat ${index + 1}`}</span> {/* Render chat name or a fallback */}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter />
        </Sidebar>
    )
}
