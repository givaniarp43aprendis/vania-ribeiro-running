import React from 'react';
import { Award, GraduationCap, MapPin, Sparkles, HeartHandshake, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AboutSectionProps {
  onOpenEnrollment: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEnrollment }) => {
  return (
    <section id="sobre" className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#e7eeff]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Column: Portrait & Floating Badge */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 relative"
        >
          {/* Subtle Ambient Blur Orbs */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#ff5f1f]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#515f78]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Photo Frame */}
          <div
            className="relative z-10 w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl bg-cover bg-center shadow-2xl border border-white/60 overflow-hidden"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUCU7ESWwEE0_Vs0gz4Xqlb-Fr8ZNDpuE8vd9-qe5m937AgnjRiGA2Uf8yodZFf4itsnZ5CMLx5kJvszCqD8HP5jwTgtmNWtRExConCHm7sh80WnT72fr9rV-84hGlsQZjIVXMy_yCjuzn5ZRkyW-kyh56Pv_ctYcPQxbo0TIEDZb6WBXE_Jl3WLyfkNzqCy4mqlUliUu2bVGGSLIy4BqhmK-ibX9uvJCMC_PYIXlpqufPs7EGm7U')`,
            }}
            role="img"
            aria-label="Vania Ribeiro - Running Coach em Vinhedo"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
          </div>

          {/* Floating Experience Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute bottom-6 -right-2 sm:-right-6 md:-right-8 bg-white p-5 sm:p-6 rounded-2xl shadow-2xl border border-[#d8e3fb] z-20 flex flex-col items-start"
          >
            <div className="flex items-center gap-1.5 text-[#ab3600] mb-1">
              <Award className="w-5 h-5" />
              <span className="text-[11px] font-bold tracking-widest uppercase font-mono-tag">Experiência</span>
            </div>
            <p className="text-[#ab3600] font-headline-lg text-3xl sm:text-4xl font-extrabold leading-none">
              10+
            </p>
            <p className="text-[#5b4138] font-bold text-xs uppercase tracking-widest mt-1">
              Anos de Pista
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column: Bio & Methodology Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2"
        >
          <span className="text-[#ab3600] font-mono-tag uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-4 block">
            A Treinadora
          </span>
          
          <h3 className="text-[#111c2d] font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Vania Ribeiro: Paixão em cada passada
          </h3>

          <div className="space-y-4 sm:space-y-5 text-[#5b4138] text-base sm:text-lg leading-relaxed">
            <p>
              Correr é mais do que movimento, é autoconhecimento. Como coach em Vinhedo, minha missão é
              transformar a vida de corredores amadores através de uma metodologia que respeita a
              individualidade biológica e a rotina de cada um.
            </p>
            <p>
              Acredito que a técnica correta aliada à constância pode levar qualquer pessoa a cruzar a
              linha de chegada de seus sonhos, seja um trotinho na Represa ou uma maratona internacional.
            </p>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 sm:mt-10 border-t border-[#d8e3fb] pt-8">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white text-[#ab3600] shadow-sm border border-[#d8e3fb] flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h6 className="font-bold text-[#111c2d] text-base mb-1">
                  Especialista
                </h6>
                <p className="text-xs sm:text-sm text-[#5b4138]">
                  Pós-graduada em Fisiologia do Exercício e Biomecânica.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white text-[#ab3600] shadow-sm border border-[#d8e3fb] flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h6 className="font-bold text-[#111c2d] text-base mb-1">
                  Foco Local
                </h6>
                <p className="text-xs sm:text-sm text-[#5b4138]">
                  Conhecimento profundo das trilhas e asfalto de Vinhedo.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive CTA to start assessment */}
          <div className="mt-8 pt-4">
            <button
              onClick={onOpenEnrollment}
              className="inline-flex items-center gap-2.5 bg-[#111c2d] hover:bg-[#ab3600] text-white px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-[#ff5f1f]" />
              <span>Agendar Anamnese com Vania</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
