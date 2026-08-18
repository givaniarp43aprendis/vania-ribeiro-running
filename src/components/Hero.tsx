import React from 'react';
import { ArrowRight, Sparkles, MapPin, CheckCircle, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenEnrollment: () => void;
  onOpenSheets: () => void;
  onOpenAiAssistant: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenEnrollment,
  onOpenSheets,
  onOpenAiAssistant,
}) => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4 sm:px-6"
    >
      {/* Background Image & Dramatic Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-gradient z-10" />
        <div
          className="w-full h-full bg-cover bg-center scale-105 animate-pulse-slow"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDtIqAiG3Xb1QflIhBAx5pyJQA5w-QA5zYJt_9RHcrbzhHwuFN2klA7e-w7zkDULVTPFOZweUidHUGJ0ou8JFQ21c-43VU7boMsF99cggO-2Uzu4E_b_6Dh3oDlbW4En2_2M36g-HvwCt-rjMxWKsWk2dvfxPgcOvPJNg0D4XpB8sDwcA2fMW6ODv960pgP-cztky_fteLJH84YEVqnVta69tsoHxL1veGxYfA3c8SyQF-J8YxFwaE')`,
          }}
          role="img"
          aria-label="Corredora em asfalto com vista ao amanhecer em Vinhedo"
        />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-20 text-center max-w-5xl mx-auto flex flex-col items-center">
        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 sm:mb-8 bg-[#ff5f1f]/20 border border-[#ff5f1f]/40 text-[#ffb59c] rounded-full text-xs font-mono-tag uppercase tracking-[0.2em] backdrop-blur-md shadow-lg"
        >
          <MapPin className="w-3.5 h-3.5 text-[#ff5f1f]" />
          <span>Vinhedo, SP &amp; Online</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white font-headline-lg text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold mb-6 leading-[1.1] tracking-tight drop-shadow-2xl"
        >
          Supere seus limites nas ruas de{' '}
          <span className="text-[#ff5f1f] drop-shadow-[0_4px_24px_rgba(255,95,31,0.6)]">
            Vinhedo
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white/90 text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 max-w-3xl mx-auto font-body-md leading-relaxed font-normal"
        >
          Treinamento personalizado para corredores amadores que buscam performance,
          saúde e o prazer de cada quilômetro.
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center w-full max-w-md sm:max-w-none"
        >
          <button
            id="hero-start-now-btn"
            onClick={onOpenEnrollment}
            className="group bg-[#ff5f1f] hover:bg-[#ab3600] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:translate-y-[-2px] active:translate-y-0 transition-all shadow-xl shadow-[#ff5f1f]/30 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Começar Agora</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="hero-view-sheets-btn"
            onClick={onOpenSheets}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 hover:border-white/50 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Ver Planilhas</span>
          </button>
        </motion.div>

        {/* Running Assistant AI Callout Pill */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          onClick={onOpenAiAssistant}
          className="mt-8 sm:mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 hover:border-[#ff5f1f]/60 backdrop-blur-md text-white/90 text-xs sm:text-sm transition-all group cursor-pointer"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5f1f] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5f1f]"></span>
          </span>
          <Sparkles className="w-4 h-4 text-[#ff5f1f]" />
          <span>Quer uma sugestão de treino agora? <strong>Teste a IA de Corrida</strong></span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
        </motion.button>

        {/* Feature Micro-Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mt-12 sm:mt-16 pt-8 border-t border-white/10 w-full max-w-4xl text-left"
        >
          <div className="flex items-center gap-2.5 text-white/80 text-xs sm:text-sm">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5f1f] flex-shrink-0" />
            <span>Treinos Presenciais &amp; App Online</span>
          </div>
          <div className="flex items-center gap-2.5 text-white/80 text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5f1f] flex-shrink-0" />
            <span>Fisiologia &amp; Biomecânica</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex items-center justify-center md:justify-start gap-2.5 text-white/80 text-xs sm:text-sm">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5f1f] flex-shrink-0" />
            <span>Comunidade Ativa em Vinhedo</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
