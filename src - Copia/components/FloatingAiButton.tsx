import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface FloatingAiButtonProps {
  onClick: () => void;
}

export const FloatingAiButton: React.FC<FloatingAiButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label="Abrir Assistente de Treino IA"
      className="fixed bottom-6 right-6 z-30 bg-[#ff5f1f] hover:bg-[#ab3600] text-white p-4 rounded-full shadow-2xl shadow-[#ff5f1f]/50 border-2 border-white/20 flex items-center gap-2.5 group cursor-pointer"
    >
      <Sparkles className="w-5 h-5 animate-pulse" />
      <span className="text-xs font-bold uppercase tracking-wider font-mono-tag hidden sm:inline-block pr-1">
        IA Treino
      </span>
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500"></span>
      </span>
    </motion.button>
  );
};
