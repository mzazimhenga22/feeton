"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStyleRecommendation, type StyleAssistantOutput } from "@/ai/flows/style-assistant-flow";

export const StyleAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<StyleAssistantOutput | null>(null);

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await getStyleRecommendation({ userPreference: input });
      setResponse(res);
    } catch (error) {
      console.error(error);
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
            className="mb-6 w-[350px] md:w-[400px]"
          >
            <Card className="glass border-primary/20 overflow-hidden">
              <CardHeader className="bg-primary/10 border-b border-primary/10 flex flex-row items-center justify-between py-4">
                <CardTitle className="text-sm font-headline font-bold tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  STYLE CONCIERGE
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 hover:bg-white/5">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {!response ? (
                  <div className="space-y-4">
                    <p className="text-xs text-foreground/60 leading-relaxed uppercase tracking-wider">
                      Describe your aesthetic or intended environment. Our AI will curate your perfect Feeton vessel.
                    </p>
                    <form onSubmit={handleConsult} className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. Minimalist Tokyo Night"
                        className="bg-white/5 border-white/10 text-xs uppercase tracking-widest"
                      />
                      <Button size="icon" disabled={loading} className="bg-primary hover:bg-primary/80">
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </Button>
                    </form>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <h4 className="text-primary font-bold text-lg font-headline tracking-tight uppercase">{response.recommendation}</h4>
                      <p className="text-xs text-foreground/80 leading-relaxed italic">"{response.reasoning}"</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1 block">Concierge Tip</span>
                      <p className="text-[11px] text-foreground/60">{response.stylingTip}</p>
                    </div>
                    <Button 
                      onClick={() => setResponse(null)} 
                      variant="outline" 
                      className="w-full text-[10px] h-8 tracking-[0.2em]"
                    >
                      NEW CONSULTATION
                    </Button>
                  </motion.div>
                )}
              </CardContent>
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
        <MessageSquare className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center animate-bounce">
          <Sparkles className="w-2.5 h-2.5 text-primary" />
        </div>
      </motion.button>
    </div>
  );
};
