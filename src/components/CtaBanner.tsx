import React from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface CtaBannerProps {
  onOpenEnrollment: () => void;
  onOpenAiAssistant: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({
  onOpenEnrollment,
  onOpenAiAssistant,
}) => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#111c2d] text-white relative overflow-hidden">
      {/* Background Gradient Accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ab3600]/20 via-transparent to-[#515f78]/20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ff5f1f]/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5f1f]/20 border border-[#ff5f1f]/40 text-[#ffb59c] text-xs font-mono-tag uppercase tracking-[0.2em] mb-6"
        >
          <Flame className="w-4 h-4 text-[#ff5f1f]" />
          <span>Dê o Primeiro Passo</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-headline-lg text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
        >
          Pronto para sua <span className="text-[#ff5f1f]">melhor versão</span>?
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Não importa onde você está hoje, o importante é o primeiro passo que você dará amanhã.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
        >
          <button
            onClick={onOpenEnrollment}
            className="w-full sm:w-auto bg-[#ff5f1f] hover:bg-[#ab3600] text-white px-10 py-5 rounded-2xl font-bold text-base sm:text-lg tracking-wider uppercase flex items-center justify-center gap-3 shadow-2xl shadow-[#ff5f1f]/40 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <span>QUERO COMEÇAR AGORA</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenAiAssistant}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-5 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 backdrop-blur-md transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#ff5f1f]" />
            <span>Testar Assistente IA</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
