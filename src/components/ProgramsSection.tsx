import React from 'react';
import { PROGRAMS } from '../data/runningData';
import { ArrowRight, CheckCircle2, Zap, Timer, Mountain, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgramsSectionProps {
  onSelectProgram: (programId: string) => void;
  onOpenSheetsForProgram: (programId: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({
  onSelectProgram,
  onOpenSheetsForProgram,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'sprint':
        return <Zap className="w-6 h-6" />;
      case 'timer':
        return <Timer className="w-6 h-6" />;
      case 'terrain':
        return <Mountain className="w-6 h-6" />;
      default:
        return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <section id="servicos" className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#f9f9ff]">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[#ab3600] font-mono-tag uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-3 block">
              Metodologia
            </span>
            <h3 className="text-[#111c2d] font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Programas de Treinamento
            </h3>
          </div>
          <p className="text-[#5b4138] max-w-md text-base sm:text-lg leading-relaxed">
            Planilhas dinâmicas e acompanhamento técnico adaptado à sua rotina e aos seus objetivos pessoais.
          </p>
        </div>

        {/* 3 Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PROGRAMS.map((program, index) => {
            const isFeatured = program.isFeatured;

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`group rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isFeatured
                    ? 'bg-[#111c2d] text-white border-2 border-[#ff5f1f] shadow-2xl shadow-black/20 md:-translate-y-2'
                    : 'bg-white text-[#111c2d] border border-[#d8e3fb] hover:border-[#ab3600] hover:shadow-xl'
                }`}
              >
                {/* Popular Ribbon for Featured */}
                {isFeatured && (
                  <div className="absolute -top-3.5 right-6 bg-[#ff5f1f] text-white px-3 py-1 rounded-full text-xs font-bold font-mono-tag uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Mais Escolhido
                  </div>
                )}

                <div>
                  {/* Icon Circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 sm:mb-8 transition-transform group-hover:scale-110 ${
                      isFeatured
                        ? 'bg-[#ff5f1f] text-white shadow-lg shadow-[#ff5f1f]/30'
                        : 'bg-[#d2e0fe] text-[#515f78]'
                    }`}
                  >
                    {getIcon(program.icon)}
                  </div>

                  {/* Title & Target */}
                  <div className="flex items-baseline justify-between mb-3">
                    <h4
                      className={`font-headline-lg text-2xl sm:text-[26px] font-bold ${
                        isFeatured ? 'text-white' : 'text-[#111c2d]'
                      }`}
                    >
                      {program.title}
                    </h4>
                  </div>

                  {/* Description */}
                  <p
                    className={`mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed ${
                      isFeatured ? 'text-gray-300' : 'text-[#5b4138]'
                    }`}
                  >
                    {program.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8 sm:mb-10 text-xs sm:text-sm font-medium">
                    {program.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 ${
                            isFeatured ? 'text-[#ffb59c]' : 'text-[#ab3600]'
                          }`}
                        />
                        <span className={isFeatured ? 'text-gray-200' : 'text-[#111c2d]'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-4 border-t border-dashed border-gray-200/20 flex flex-col gap-3">
                  {isFeatured ? (
                    <button
                      id={`program-btn-${program.id}`}
                      onClick={() => onSelectProgram(program.id)}
                      className="w-full bg-[#ff5f1f] hover:bg-[#ab3600] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#ff5f1f]/30 hover:shadow-xl transition-all cursor-pointer group-hover:gap-3"
                    >
                      <span>EU QUERO ESTE</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => onOpenSheetsForProgram(program.id)}
                        className="inline-flex items-center gap-2 text-[#ab3600] hover:text-[#ff5f1f] font-bold uppercase text-xs tracking-widest transition-all cursor-pointer hover:gap-3"
                      >
                        <span>SAIBA MAIS</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onSelectProgram(program.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#e7eeff] hover:bg-[#d8e3fb] text-[#111c2d] text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Matricular
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
