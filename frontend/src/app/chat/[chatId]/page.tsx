"use client";

import { useEffect, useState, useRef } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import { Send, Bot, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { toast } from "sonner";


type pdfData = {
  pdfUrl: string;
  pdfId: string;
  boost: boolean;
};

export default function Page() {
  const { chatId } = useParams();
  const [pdfData, setPdfData] = useState<pdfData | null>(null);
  const [loading, setLoading] = useState(true); // PDF loader
  const [aiThinking, setAiThinking] = useState(false); // AI response loader
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there! Ask me anything about your document." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [boostLoading, setBoostLoading] = useState(false);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, aiThinking]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAiThinking(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/ask/ai`,
        {
          question: input,
          namespace: pdfData?.pdfId,
          boost: pdfData?.boost || false
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.answer },
      ]);
    } catch (error) {
      console.error("Error chatting with PDF:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Could not fetch AI response." },
      ]);
    } finally {
      setAiThinking(false);
    }
  };

  const fetchPdf = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/getpdf/${chatId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPdfData(response.data);
    } catch (err) {
      console.error("Error fetching PDF data:", err);
    } finally {
      setLoading(false);
    }
  };
  const toggleBoost = async () => {
    if (boostLoading) return;
    try {
      setBoostLoading(true);
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/enableBoost/${chatId}`,
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPdfData((prev) => prev ? { ...prev, boost: response.data.boost } : null);
      toast(`Boost ${response.data.boost ? "enabled" : "disabled"} successfully!`);
    }
    catch (err) {
      console.error("Error toggling boost:", err);
    } finally {
      setBoostLoading(false);
    }
  }

  useEffect(() => {
    fetchPdf();
  }, []);

  return (
    <div className="h-full w-full overflow-hidden bg-linear-to-br from-slate-50 to-slate-100">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {/* LEFT SIDE: PDF Viewer */}
        <ResizablePanel defaultSize={40} minSize={30} className="bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
          {(!pdfData || loading) && (
            <div className="flex items-center justify-center h-full w-full">
              <Spinner className="h-12 w-12 text-primary" />
            </div>
          )}
          {pdfData && (
            <iframe
              src={pdfData.pdfUrl}
              className={`w-full h-full rounded-xl shadow-2xl border border-gray-200 ${loading ? "hidden" : "block"}`}
              onLoad={() => setLoading(false)}
            />
          )}
        </ResizablePanel>

        {/* Divider Handle */}
        <ResizableHandle withHandle className="bg-linear-to-br from-slate-200 to-slate-300" />

        {/* RIGHT SIDE: Chatbox */}
        <ResizablePanel defaultSize={60} minSize={30} className="flex flex-col bg-white">
          <Card className="flex flex-col h-full rounded-none border-none shadow-none py-0">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b bg-linear-to-br from-primary/5 to-primary/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-gray-900">AI Assistant</h2>
                    <p className="text-sm text-gray-500">Ask questions about your document</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Boost</span>
                  {
                    boostLoading ? <Spinner className="h-5 w-5 text-primary" /> :
                      <Switch checked={pdfData?.boost} onCheckedChange={toggleBoost} />
                  }
                </div>
              </div>
            </div>

            <CardContent className="flex flex-col grow overflow-hidden p-0">
              {/* Scrollable chat messages */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-6 py-4 space-y-6"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === "user"
                          ? "bg-primary text-white"
                          : "bg-linear-to-br from-purple-100 to-blue-100 text-primary"
                        }`}
                    >
                      {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-2xl max-w-[75%] shadow-sm ${m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-linear-to-br from-gray-50 to-gray-100 text-gray-900 rounded-tl-sm border border-gray-200"
                        }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                ))}

                {aiThinking && (
                  <div className="flex gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-purple-100 to-blue-100 text-primary flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 flex items-center gap-2 shadow-sm">
                      <Spinner className="h-4 w-4 text-primary" />
                      <span className="text-sm text-gray-600">AI is thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t bg-linear-to-br from-gray-50/50 to-white">
                <div className="flex gap-3 max-w-4xl mx-auto">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      className="pr-12 h-12 rounded-xl border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                    />
                  </div>
                  <Button
                    onClick={handleSend}
                    className="h-12 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 gap-2"
                    disabled={!input.trim()}
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </Button>
                </div>
              </div>
            </CardContent>


          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}