import React, { useState } from 'react';
import { SAMPLE_TRAINING_SHEETS } from '../data/runningData';
import {
  X,
  Calendar,
  Zap,
  Activity,
  Flame,
  CheckCircle,
  Copy,
  Check,
  MapPin,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TrainingSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgramForEnrollment: (programId: string) => void;
  initialSheetId?: string;
}

export const TrainingSheetsModal: React.FC<TrainingSheetsModalProps> = ({
  isOpen,
  onClose,
  onSelectProgramForEnrollment,
  initialSheetId = 'sheet-5k',
}) => {
  const [selectedSheetId, setSelectedSheetId] = useState(initialSheetId);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [copied, setCopied] = useState(false);

  const activeSheet =
    SAMPLE_TRAINING_SHEETS.find((s) => s.id === selectedSheetId) || SAMPLE_TRAINING_SHEETS[0];
  const activeWeekData =
    activeSheet.weeks.find((w) => w.weekNumber === selectedWeek) || activeSheet.weeks[0];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'interval':
        return { label: 'Tiro / Velocidade', bg: 'bg-red-500/10 text-red-600 border-red-200' };
      case 'tempo':
        return { label: 'Ritmo / Tempo', bg: 'bg-amber-500/10 text-amber-700 border-amber-200' };
      case 'long':
        return { label: 'Longão de Base', bg: 'bg-purple-500/10 text-purple-700 border-purple-200' };
      case 'strength':
        return { label: 'Fortalecimento / Core', bg: 'bg-blue-500/10 text-blue-700 border-blue-200' };
      case 'rest':
        return { label: 'Descanso Ativo', bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' };
      default:
        return { label: 'Rodagem Leve', bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' };
    }
  };

  const handleCopySheet = () => {
    const text = `Planilha de Treino - Vania Ribeiro Running Coach\n${activeSheet.title}\nSemana ${activeWeekData.weekNumber}: ${activeWeekData.focus}\nVolume: ${activeWeekData.totalVolume}\n\n` +
      activeWeekData.days
        .map((d) => `• ${d.dayName} (${d.workoutTitle}): ${d.distanceOrTime} - ${d.description}`)
        .join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#d8e3fb] my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header */}
          <div className="bg-[#111c2d] text-white p-6 sm:p-8 flex items-start justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#ff5f1f]" />
                <span className="text-xs font-mono-tag font-bold uppercase tracking-widest text-[#ffb59c]">
                  Exemplos de Planilhas de Corrida
                </span>
              </div>
              <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold tracking-tight">
                Estrutura de Periodização &amp; Treinos
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-2xl">
                Veja como organizamos os microciclos com base em ciência esportiva, intensidade e pontos de treino em Vinhedo.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer relative z-10"
              aria-label="Fechar modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Program Selector Tabs */}
          <div className="px-6 sm:px-8 py-3 bg-[#f0f3ff] border-b border-[#d8e3fb] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {SAMPLE_TRAINING_SHEETS.map((sheet) => (
                <button
                  key={sheet.id}
                  onClick={() => {
                    setSelectedSheetId(sheet.id);
                    setSelectedWeek(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedSheetId === sheet.id
                      ? 'bg-[#ff5f1f] text-white shadow-md shadow-[#ff5f1f]/20'
                      : 'bg-white text-[#111c2d] hover:bg-[#d8e3fb]'
                  }`}
                >
                  {sheet.category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySheet}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#d8e3fb] text-xs font-semibold text-[#111c2d] hover:bg-[#e7eeff] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Planilha'}</span>
              </button>
            </div>
          </div>

          {/* Sheet Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {/* Sheet Subtitle & Focus */}
            <div className="bg-[#f9f9ff] border border-[#d8e3fb] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-headline-lg font-bold text-lg sm:text-xl text-[#111c2d]">
                  {activeSheet.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#5b4138] mt-0.5">
                  {activeSheet.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#d8e3fb] text-xs font-mono-tag font-bold text-[#ab3600]">
                  Volume: {activeWeekData.totalVolume}
                </div>
              </div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeWeekData.days.map((day, idx) => {
                const badge = getTypeBadge(day.type);

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-[#d8e3fb] hover:border-[#ab3600] hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs uppercase tracking-wider text-[#ab3600] font-mono-tag">
                          {day.dayName}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}
                        >
                          {badge.label}
                        </span>
                      </div>

                      <h5 className="font-bold text-base text-[#111c2d] mb-1">
                        {day.workoutTitle}
                      </h5>

                      <p className="text-xs text-[#5b4138] leading-relaxed mb-3">
                        {day.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f0f3ff] flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
                      <span className="font-semibold text-[#111c2d]">
                        Meta: {day.distanceOrTime}
                      </span>
                      {day.locationTip && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#ab3600]">
                          <MapPin className="w-3 h-3" />
                          {day.locationTip}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coach Tips Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5">
              <h5 className="font-bold text-sm text-amber-900 flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-[#ff5f1f]" />
                Dicas da Treinadora Vania para esta planilha:
              </h5>
              <ul className="space-y-1.5 text-xs text-amber-800">
                {activeSheet.keyTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#ab3600] font-bold">&bull;</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 bg-[#f9f9ff] border-t border-[#d8e3fb] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#5b4138] text-center sm:text-left">
              Planilhas são ajustadas semanalmente no aplicativo exclusivo para alunos.
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors cursor-pointer flex-1 sm:flex-initial"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  onClose();
                  onSelectProgramForEnrollment(
                    selectedSheetId === 'sheet-5k'
                      ? 'iniciante-5k'
                      : selectedSheetId === 'sheet-10k'
                      ? 'intermediario-10k'
                      : 'meia-maratona-21k'
                  );
                }}
                className="px-6 py-2.5 rounded-xl bg-[#ff5f1f] hover:bg-[#ab3600] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-[#ff5f1f]/30 transition-all cursor-pointer flex-1 sm:flex-initial"
              >
                <span>Quero Minha Planilha Personalizada</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
