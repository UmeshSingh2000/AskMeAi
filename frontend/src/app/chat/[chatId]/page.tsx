"use client";

import { useEffect, useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import { ScrollArea } from "@/components/ui/scroll-area";


export default function Page() {
    
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi there! Ask me anything about your document." },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: "user", content: input }]);
        setInput("");
    };

    return (
        <div className="h-full w-full overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="h-full border">
                {/* LEFT SIDE: PDF Viewer */}
                <ResizablePanel defaultSize={50} minSize={30} className="bg-gray-100 flex items-center justify-center p-2">
                    <iframe
                        src="/sample.pdf"
                        className="w-full h-full rounded-lg shadow-md border"
                    />

                </ResizablePanel>

                {/* Divider Handle */}
                <ResizableHandle withHandle />

                {/* RIGHT SIDE: Chatbox */}
                <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col bg-white">
                    <Card className="flex flex-col h-full rounded-none border-none shadow-none">
                        {/* <CardHeader>
                            <CardTitle className="text-xl font-semibold">Chat with Document</CardTitle>
                        </CardHeader> */}
                        <CardContent className="flex flex-col grow overflow-hidden p-0">
                            <ScrollArea className="grow p-4 space-y-4">
                                {messages.map((m, i) => (
                                    <div
                                        key={i}
                                        className={`p-3 rounded-2xl max-w-[80%] ${m.role === "user"
                                            ? "bg-primary text-primary-foreground self-end ml-auto"
                                            : "bg-muted"
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                ))}
                            </ScrollArea>

                            {/* Chat Input */}
                            <div className="p-4 border-t flex gap-2">
                                <Input
                                    placeholder="Type your message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                />
                                <Button onClick={handleSend}>Send</Button>
                            </div>
                        </CardContent>
                    </Card>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
