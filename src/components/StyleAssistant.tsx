"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, X, Send, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getStyleRecommendation, type StyleAssistantOutput } from "@/ai/flows/style-assistant-flow";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content?: string;
  structuredContent?: StyleAssistantOutput;
}

export const StyleAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: "Welcome to the Feeton Style Concierge. Describe your aesthetic or intended environment, and I will curate your perfect vessel.",
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await getStyleRecommendation({ userPreference: userMsg });
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: "assistant", 
        structuredContent: res 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: "assistant", 
        content: "I apologize, but the network is currently unstable. Please try again." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-6 w-[350px] md:w-[450px]"
          >
            <Card className="glass border-primary/20 overflow-hidden flex flex-col h-[500px]">
              <CardHeader className="bg-primary/10 border-b border-primary/10 flex flex-row items-center justify-between py-4 shrink-0">
                <CardTitle className="text-sm font-headline font-bold tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  STYLE CONCIERGE
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-white/5">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              
              <ScrollArea className="flex-1 p-4" viewportRef={scrollRef}>
                <div className="space-y-6">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "user" ? "bg-white/10" : "bg-primary/20 text-primary"
                      }`}>
                        {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      </div>
                      
                      <div className={`max-w-[80%] space-y-2 ${
                        msg.role === "user" 
                          ? "bg-white/10 rounded-2xl rounded-tr-sm p-3 text-sm" 
                          : "text-sm"
                      }`}>
                        {msg.content && <p className="leading-relaxed">{msg.content}</p>}
                        
                        {msg.structuredContent && (
                          <div className="space-y-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                            <div className="space-y-1">
                              <h4 className="text-primary font-bold font-headline tracking-tight uppercase">
                                {msg.structuredContent.recommendation}
                              </h4>
                              <p className="text-xs text-foreground/80 leading-relaxed italic">
                                "{msg.structuredContent.reasoning}"
                              </p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                              <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1 block">Concierge Tip</span>
                              <p className="text-[11px] text-foreground/60">{msg.structuredContent.stylingTip}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="flex space-x-1 items-center bg-black/40 p-3 rounded-2xl rounded-tl-sm w-16 justify-center">
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              <CardFooter className="p-4 border-t border-white/10 shrink-0">
                <form onSubmit={handleConsult} className="flex gap-2 w-full">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your vibe..."
                    className="bg-white/5 border-white/10 text-xs uppercase tracking-widest flex-1"
                    disabled={loading}
                  />
                  <Button size="icon" disabled={loading || !input.trim()} className="bg-primary hover:bg-primary/80 shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center glow-red shadow-2xl relative"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center animate-bounce">
            <Sparkles className="w-2.5 h-2.5 text-primary" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

