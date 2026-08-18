import React from 'react';
import { VinhedoSpot } from '../types';
import { X, MapPin, TrendingUp, CheckCircle, Sparkles, Footprints, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LocationDetailsModalProps {
  spot: VinhedoSpot | null;
  onClose: () => void;
  onAskAiAboutSpot: (spotName: string) => void;
}

export const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({
  spot,
  onClose,
  onAskAiAboutSpot,
}) => {
  if (!spot) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#d8e3fb] my-auto"
        >
          {/* Header Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${spot.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 flex flex-col justify-between p-6" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 mt-auto">
              <span className="text-[#ff5f1f] font-mono-tag font-bold text-xs uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                {spot.tag}
              </span>
              <h3 className="text-white font-headline-lg font-bold text-2xl sm:text-3xl mt-2 drop-shadow">
                {spot.name}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#ff5f1f]" />
                <span>Vinhedo - São Paulo</span>
              </p>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-[#5b4138] text-sm sm:text-base leading-relaxed">
              {spot.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-[#f0f3ff] p-4 rounded-2xl border border-[#d8e3fb]">
              <div>
                <span className="text-[11px] font-mono-tag uppercase text-gray-500 font-bold block mb-0.5">
                  Tipo de Terreno
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#111c2d]">
                  {spot.terrainType}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono-tag uppercase text-gray-500 font-bold block mb-0.5">
                  Altimetria Estimada
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#ab3600] flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {spot.elevation}
                </span>
              </div>
            </div>

            {/* Highlights List */}
            <div>
              <h5 className="font-bold text-xs uppercase tracking-wider text-[#111c2d] font-mono-tag mb-3">
                Destaques do Local
              </h5>
              <ul className="space-y-2">
                {spot.highlights.map((hl, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#5b4138]">
                    <CheckCircle className="w-4 h-4 text-[#ab3600] flex-shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coach Recommendation */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                Recomendação da Treinadora:
              </span>
              <p className="text-xs text-amber-800">
                {spot.recommendedFor}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onAskAiAboutSpot(spot.name);
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#111c2d] hover:bg-[#162033] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#ff5f1f]" />
                <span>Pedir Treino para este Local na IA</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#d8e3fb] hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
