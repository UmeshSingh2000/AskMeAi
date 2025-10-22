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
import { BookOpen, ChevronDown, Search, SquarePen } from "lucide-react"
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
                <SidebarGroup >
                    <SidebarGroupLabel className=""><BookOpen />Chats<ChevronDown /></SidebarGroupLabel>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}


