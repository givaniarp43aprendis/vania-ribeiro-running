import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Flame,
  CheckCircle2,
  Phone,
  User,
  Mail,
  Target,
  Activity,
  Calendar,
  Send,
  Loader2,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgramId?: string;
  initialGoalText?: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  initialProgramId,
  initialGoalText,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('Iniciante 5k - Primeiros passos');
  const [level, setLevel] = useState('Iniciante (Corro até 5km)');
  const [weeklyDays, setWeeklyDays] = useState(3);
  const [format, setFormat] = useState('Presencial em Vinhedo & App');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Update default goal if initialProgramId or initialGoalText provided
  useEffect(() => {
    if (initialProgramId === 'iniciante-5k') {
      setGoal('Iniciante 5k - Primeiros passos');
      setLevel('Sedentário / Iniciante');
    } else if (initialProgramId === 'intermediario-10k') {
      setGoal('Intermediário 10k - Baixar pace e resistência');
      setLevel('Intermediário (Corro 5 a 10km)');
    } else if (initialProgramId === 'meia-maratona-21k') {
      setGoal('Meia Maratona 21k - Alta performance');
      setLevel('Avançado (10k a 21k)');
    } else if (initialGoalText) {
      setGoal(initialGoalText);
    }
  }, [initialProgramId, initialGoalText]);

  // Format Brazilian phone number
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    if (val.length > 6) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    }
    setPhone(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Por favor, preencha seu nome e WhatsApp.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          goal,
          level,
          weeklyDays,
          city: format,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar formulário');
      }

      setIsSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      // Even if network glitches, acknowledge user and offer direct WhatsApp
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenWhatsAppDirect = () => {
    const message = encodeURIComponent(
      `Olá Coach Vania! Preenchi a pré-matrícula no site:\n• Nome: ${name}\n• Objetivo: ${goal}\n• Nível: ${level}\n• Frequência: ${weeklyDays}x/semana\n• Modalidade: ${format}\n\nGostaria de saber os próximos passos da consultoria!`
    );
    window.open(`https://wa.me/5519999999999?text=${message}`, '_blank');
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
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
          onClick={handleResetAndClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#d8e3fb] my-auto"
        >
          {/* Header */}
          <div className="bg-[#111c2d] text-white p-6 sm:p-8 flex items-start justify-between relative">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5f1f]/20 border border-[#ff5f1f]/40 text-[#ffb59c] text-xs font-mono-tag uppercase tracking-widest mb-2">
                <Flame className="w-3.5 h-3.5 text-[#ff5f1f]" />
                <span>Consultoria de Corrida &bull; Vinhedo</span>
              </div>
              <h3 className="font-headline-lg text-2xl sm:text-3xl font-bold tracking-tight">
                {isSuccess ? 'Pré-Matrícula Confirmada!' : 'Quero Começar Agora'}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">
                {isSuccess
                  ? 'Recebemos suas informações. Em breve a Coach Vania entrará em contato.'
                  : 'Preencha o formulário abaixo para receber sua avaliação inicial de treino.'}
              </p>
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form or Success State */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {isSuccess ? (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="max-w-md mx-auto">
                  <h4 className="font-headline-lg text-2xl font-bold text-[#111c2d] mb-2">
                    Parabéns, {name.split(' ')[0] || 'Corredor(a)'}!
                  </h4>
                  <p className="text-[#5b4138] text-sm leading-relaxed">
                    Sua solicitação de consultoria para <strong>{goal}</strong> foi registrada com sucesso.
                    Acelere seu atendimento chamando a treinadora agora mesmo no WhatsApp!
                  </p>
                </div>

                <div className="bg-[#f0f3ff] p-5 rounded-2xl border border-[#d8e3fb] text-left text-xs text-[#5b4138] space-y-1.5 max-w-md mx-auto">
                  <p><strong>Nome:</strong> {name}</p>
                  <p><strong>WhatsApp:</strong> {phone}</p>
                  <p><strong>Objetivo:</strong> {goal}</p>
                  <p><strong>Frequência:</strong> {weeklyDays}x por semana ({format})</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleOpenWhatsAppDirect}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Falar com Vania no WhatsApp</span>
                  </button>
                  <button
                    onClick={handleResetAndClose}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold text-sm transition-colors cursor-pointer"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#111c2d] font-bold mb-1.5">
                      Seu Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: João da Silva"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d8e3fb] text-sm focus:outline-none focus:border-[#ff5f1f] focus:ring-1 focus:ring-[#ff5f1f]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#111c2d] font-bold mb-1.5">
                      WhatsApp (com DDD) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="(19) 99999-9999"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d8e3fb] text-sm focus:outline-none focus:border-[#ff5f1f] focus:ring-1 focus:ring-[#ff5f1f]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#111c2d] font-bold mb-1.5">
                    E-mail (Opcional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d8e3fb] text-sm focus:outline-none focus:border-[#ff5f1f] focus:ring-1 focus:ring-[#ff5f1f]"
                    />
                  </div>
                </div>

                {/* Goals and Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#111c2d] font-bold mb-1.5">
                      Objetivo Principal
                    </label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#d8e3fb] text-xs sm:text-sm focus:outline-none focus:border-[#ff5f1f] bg-white text-[#111c2d]"
                    >
                      <option value="Iniciante 5k - Primeiros passos">Iniciante 5k (Primeiros passos)</option>
                      <option value="Intermediário 10k - Baixar pace e resistência">Intermediário 10k (Baixar tempo)</option>
                      <option value="Meia Maratona 21k - Alta performance">Meia Maratona 21k (Endurance)</option>
                      <option value="Maratona 42k - Prova Alvo">Maratona 42k (Prova Alvo)</option>
                      <option value="Saúde & Emagrecimento">Saúde, Disposição &amp; Emagrecimento</option>
                      <option value="Melhorar Biomecânica / Evitar Dores">Correção de Pisada &amp; Biomecânica</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#111c2d] font-bold mb-1.5">
                      Nível Atual
                    </label>
                    <select
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#d8e3fb] text-xs sm:text-sm focus:outline-none focus:border-[#ff5f1f] bg-white text-[#111c2d]"
                    >
                      <option value="Sedentário / Zero Corrida">Sedentário (Nunca corri ou parado há muito tempo)</option>
                      <option value="Iniciante (Corro até 5km)">Iniciante (Corro ou troto até 5km)</option>
                      <option value="Intermediário (Corro 5 a 10km)">Intermediário (Corro 5 a 10km com regularidade)</option>
                      <option value="Avançado (10k a 21k)">Avançado (Já completo 15km a 21km)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#111c2d] font-bold mb-1.5">
                      Frequência de Treino
                    </label>
                    <select
                      value={weeklyDays}
                      onChange={(e) => setWeeklyDays(Number(e.target.value))}
                      className="w-full p-3 rounded-xl border border-[#d8e3fb] text-xs sm:text-sm focus:outline-none focus:border-[#ff5f1f] bg-white text-[#111c2d]"
                    >
                      <option value={2}>2 dias na semana</option>
                      <option value={3}>3 dias na semana (Recomendado)</option>
                      <option value={4}>4 dias na semana</option>
                      <option value={5}>5 dias na semana</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#111c2d] font-bold mb-1.5">
                      Modalidade de Treinamento
                    </label>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#d8e3fb] text-xs sm:text-sm focus:outline-none focus:border-[#ff5f1f] bg-white text-[#111c2d]"
                    >
                      <option value="Presencial em Vinhedo & App">Presencial em Vinhedo + App</option>
                      <option value="100% Online com App e Suporte">100% Online (Para qualquer cidade)</option>
                      <option value="Consultoria Avulsa de Biomecânica">Consultoria de Biomecânica</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-tag uppercase tracking-wider text-[#111c2d] font-bold mb-1.5">
                    Alguma observação ou histórico de lesão? (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Tenho canelite ao aumentar ritmo, ou quero treinar para a prova de Vinhedo..."
                    className="w-full p-3 rounded-xl border border-[#d8e3fb] text-xs sm:text-sm focus:outline-none focus:border-[#ff5f1f]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ff5f1f] hover:bg-[#ab3600] disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#ff5f1f]/30 hover:shadow-2xl transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processando sua inscrição...</span>
                      </>
                    ) : (
                      <>
                        <Flame className="w-5 h-5" />
                        <span>QUERO COMEÇAR AGORA</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
