import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="28" height="28" fill="none" stroke="#6C63FF" strokeWidth="3" strokeLinejoin="round">
                            <path d="M32 6C17.64 6 6 16.54 6 29c0 5.59 2.48 10.67 6.58 14.52L10 58l10.75-5.78C24.68 53.24 28.24 54 32 54c14.36 0 26-10.54 26-23S46.36 6 32 6z" />
                        </svg>
                        <span className="text-lg font-semibold">AskAI</span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                        <p className="text-center text-sm text-muted-foreground">
                            © {new Date().getFullYear()} AskAI. All rights reserved.
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-4">
                        <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.09 3.29 9.41 7.86 10.94.58.1.79-.25.79-.56v-2.05c-3.2.69-3.87-1.38-3.87-1.38-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.68.08-.68 1.14.08 1.74 1.18 1.74 1.18 1.01 1.73 2.65 1.23 3.3.94.1-.74.39-1.23.7-1.51-2.55-.29-5.23-1.27-5.23-5.64 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.15 1.18a10.97 10.97 0 0 1 5.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.6.23 2.78.11 3.07.73.8 1.18 1.82 1.18 3.07 0 4.39-2.68 5.34-5.24 5.63.4.34.76 1.02.76 2.06v3.05c0 .31.21.67.79.56A10.53 10.53 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                            </svg>
                        </Link>
                        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.43 4.84c-.81.36-1.68.6-2.6.71a4.52 4.52 0 0 0 1.98-2.49 9.06 9.06 0 0 1-2.86 1.1A4.5 4.5 0 0 0 16.5 3c-2.49 0-4.5 2.03-4.5 4.52 0 .36.04.7.12 1.04A12.82 12.82 0 0 1 3.1 4.1a4.56 4.56 0 0 0-.61 2.27c0 1.56.78 2.94 1.97 3.75a4.44 4.44 0 0 1-2.04-.57v.06c0 2.18 1.55 4 3.61 4.42a4.37 4.37 0 0 1-2.03.08 4.53 4.53 0 0 0 4.23 3.16A9.06 9.06 0 0 1 2 19.55a12.74 12.74 0 0 0 6.92 2.03c8.3 0 12.84-6.9 12.84-12.87 0-.19 0-.38-.01-.57a9.24 9.24 0 0 0 2.68-2.63Z" />
                            </svg>
                        </Link>
                    </div>
                </div>



            </div>
        </footer>
    )
}
