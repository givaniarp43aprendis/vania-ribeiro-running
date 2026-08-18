import React from 'react';
import { VINHEDO_SPOTS } from '../data/runningData';
import { VinhedoSpot } from '../types';
import { MapPin, Info, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CommunitySectionProps {
  onSelectSpot: (spot: VinhedoSpot) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ onSelectSpot }) => {
  return (
    <section id="comunidade" className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-[#ab3600] font-mono-tag uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-3 block">
            Comunidade
          </span>
          <h3 className="text-[#111c2d] font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Nosso Terreno: Vinhedo
          </h3>
          <p className="text-[#5b4138] text-base sm:text-lg leading-relaxed">
            Não treinamos isolados. Somos um time que ocupa os melhores pontos da cidade para treinos coletivos e trocas de experiências.
          </p>
        </div>

        {/* 4 Spots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VINHEDO_SPOTS.map((spot, index) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSelectSpot(spot)}
              className="relative group h-80 sm:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              {/* Background Image with Zoom on Hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url('${spot.image}')` }}
                role="img"
                aria-label={spot.alt}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-6 transition-opacity duration-300 group-hover:from-black/90" />

              {/* Top Details Pill */}
              <div className="relative z-10 flex justify-end">
                <span className="bg-black/40 backdrop-blur-md text-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Captions */}
              <div className="relative z-10 flex flex-col">
                <span className="text-[#ff5f1f] font-mono-tag font-bold text-xs uppercase tracking-widest mb-1.5 drop-shadow">
                  {spot.tag}
                </span>
                <h4 className="text-white font-headline-lg font-bold text-2xl tracking-tight mb-2 group-hover:text-[#ffb59c] transition-colors">
                  {spot.name}
                </h4>
                <p className="text-gray-300 text-xs line-clamp-2 opacity-85 group-hover:opacity-100 transition-opacity">
                  {spot.terrainType} &bull; {spot.elevation}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-[#ff5f1f] text-xs font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Ver detalhes do percurso</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
