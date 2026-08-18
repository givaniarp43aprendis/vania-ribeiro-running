import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Flame,
  Calendar,
  MapPin,
  ChevronRight,
  MessageCircle,
  Clock,
  Loader2,
  Share2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

interface GeminiRunningAssistantProps {
  onOpenEnrollment: (goalText?: string) => void;
}

const PRESET_GOALS = [
  'Quero correr meus primeiros 5km saindo do sedentarismo',
  'Quero baixar meu tempo nos 10k para sub-50min',
  'Como treinar subidas no Observatório de Vinhedo?',
  'Quero preparar meu primeiro longão de 15km nos condomínios',
  'Como evitar dor na canela (canelite) e melhorar minha cadência?',
];

export const GeminiRunningAssistant: React.FC<GeminiRunningAssistantProps> = ({
  onOpenEnrollment,
}) => {
  const [activeTab, setActiveTab] = useState<'generator' | 'chat'>('generator');

  // Generator State
  const [userGoal, setUserGoal] = useState('Quero correr meus primeiros 5km com fôlego e sem lesões');
  const [currentLevel, setCurrentLevel] = useState('Iniciante');
  const [availableDays, setAvailableDays] = useState(3);
  const [selectedLocation, setSelectedLocation] = useState('Represa I & Pista');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'Olá! Sou o **Assistente Vania Running (IA)**. Treino amadores nas ruas, subidas e pistas de Vinhedo com base na fisiologia e biomecânica. Qual é a sua meta na corrida hoje?',
      timestamp: 'Agora',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Handle Plan Generation via /api/gemini/plan
  const handleGeneratePlan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userGoal.trim()) return;

    setIsGenerating(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/gemini/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userGoal,
          currentLevel,
          availableDays,
          locations: selectedLocation,
        }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Falha ao gerar rotina com IA');
      }

      setGeneratedPlan(data.plan);
    } catch (err: any) {
      console.error('Erro ao gerar rotina:', err);
      setErrorMsg(
        'Não foi possível conectar ao Assistente Gemini no momento. Você ainda pode agendar uma consultoria direta com a Vania!'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Copy Plan
  const handleCopyPlan = () => {
    if (!generatedPlan) return;
    navigator.clipboard.writeText(generatedPlan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Handle WhatsApp Share
  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá Vania! Criei uma meta no Assistente IA: "${userGoal}" (${currentLevel}, ${availableDays}x/semana). Gostaria de fazer a consultoria completa com você!`
    );
    window.open(`https://wa.me/5519999999999?text=${text}`, '_blank');
  };

  // Handle Chat Message Send via /api/gemini/chat
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userText = chatInput.trim();
    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: data.reply || 'Ótima pergunta! Mantenha a constância e consulte a Vania para ajustes finos.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Erro no chat:', err);
      const errorBotMsg: ChatMessage = {
        id: 'err_' + Date.now(),
        sender: 'assistant',
        text: 'Desculpe, tive uma oscilação na resposta. Pode repetir ou falar diretamente com a Vania no WhatsApp!',
        timestamp: 'Agora',
      };
      setChatMessages((prev) => [...prev, errorBotMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <section id="assistente-ia" className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#111c2d] text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff5f1f]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#515f78]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff5f1f]/20 border border-[#ff5f1f]/40 text-[#ffb59c] text-xs font-mono-tag uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5f1f] animate-pulse" />
            <span>Inteligência Artificial &bull; Gemini 3.7</span>
          </div>

          <h3 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Assistente <span className="text-[#ff5f1f]">Vania Running</span>
          </h3>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Receba na hora uma sugestão de rotina semanal de treinos gerada por IA personalizada para sua meta e
            adaptada às ruas e trilhas de Vinhedo.
          </p>

          {/* Toggle Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/10 border border-white/15 mt-8 max-w-md w-full">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-[#ff5f1f] text-white shadow-lg shadow-[#ff5f1f]/30'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Gerador de Rotina</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-[#ff5f1f] text-white shadow-lg shadow-[#ff5f1f]/30'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat com a Coach IA</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Weekly Routine Generator */}
        {activeTab === 'generator' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Form Input Side */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <form onSubmit={handleGeneratePlan} className="space-y-6">
                  {/* Goal Input */}
                  <div>
                    <label className="block text-xs font-mono-tag uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                      Qual é o seu objetivo principal?
                    </label>
                    <textarea
                      rows={3}
                      value={userGoal}
                      onChange={(e) => setUserGoal(e.target.value)}
                      placeholder="Ex: Quero correr meus primeiros 5km sem ficar ofegante..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-[#ff5f1f] focus:ring-1 focus:ring-[#ff5f1f] text-sm transition-all"
                      required
                    />
                  </div>

                  {/* Preset Pills */}
                  <div>
                    <span className="block text-[11px] text-gray-400 mb-2 font-mono-tag">
                      Sugestões rápidas:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_GOALS.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setUserGoal(preset)}
                          className="text-[11px] bg-white/10 hover:bg-[#ff5f1f]/20 border border-white/10 hover:border-[#ff5f1f]/40 text-gray-200 px-3 py-1.5 rounded-full transition-colors text-left cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Level & Days Selectors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-tag uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                        Seu Nível Atual
                      </label>
                      <select
                        value={currentLevel}
                        onChange={(e) => setCurrentLevel(e.target.value)}
                        className="w-full bg-[#162033] border border-white/20 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff5f1f]"
                      >
                        <option value="Sedentário / Zero Corrida">Sedentário (Começando do zero)</option>
                        <option value="Iniciante">Iniciante (Corre 2 a 5km)</option>
                        <option value="Intermediário">Intermediário (Corre 5 a 10km)</option>
                        <option value="Avançado">Avançado (Meia Maratona / 21k)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono-tag uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                        Dias por Semana
                      </label>
                      <select
                        value={availableDays}
                        onChange={(e) => setAvailableDays(Number(e.target.value))}
                        className="w-full bg-[#162033] border border-white/20 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff5f1f]"
                      >
                        <option value={2}>2 dias por semana</option>
                        <option value={3}>3 dias por semana (Ideal)</option>
                        <option value={4}>4 dias por semana</option>
                        <option value={5}>5 dias por semana</option>
                      </select>
                    </div>
                  </div>

                  {/* Vinhedo Location Option */}
                  <div>
                    <label className="block text-xs font-mono-tag uppercase tracking-wider text-gray-300 mb-2 font-semibold">
                      Local em Vinhedo (Opcional)
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-[#162033] border border-white/20 rounded-xl p-3 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff5f1f]"
                    >
                      <option value="Represa I & Pista">Represa I & Pista Municipal (Plano / Misto)</option>
                      <option value="Observatório de Vinhedo">Observatório (Foco em Subidas / Força)</option>
                      <option value="Condomínios de Vinhedo">Condomínios (Longões / Asfalto Seguro)</option>
                      <option value="100% Online / Outra Cidade">Treino 100% Online (Rua / Esteira)</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-[#ff5f1f] hover:bg-[#ab3600] disabled:bg-gray-600 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-[#ff5f1f]/30 hover:shadow-2xl transition-all cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Gerando Rotina Personalizada...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Gerar Minha Rotina Semanal com IA</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Output Display Side */}
              <div className="lg:col-span-7 bg-[#162033] rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between min-h-[420px]">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#ff5f1f]/20 border border-[#ff5f1f] flex items-center justify-center animate-pulse">
                      <Sparkles className="w-8 h-8 text-[#ff5f1f]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white mb-1">
                        Montando sua periodização com a IA Vania Running...
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm max-w-sm">
                        Analisando fisiologia, biomecânica e distribuindo dias de estímulo e descanso ativo.
                      </p>
                    </div>
                  </div>
                ) : generatedPlan ? (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                          <h4 className="font-bold text-base text-white">
                            Sua Rotina Semanal Personalizada
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleCopyPlan}
                            title="Copiar texto da rotina"
                            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Markdown Body */}
                      <div className="prose prose-invert prose-sm max-w-none text-gray-200 overflow-y-auto max-h-[380px] pr-2 space-y-3 leading-relaxed">
                        <ReactMarkdown>{generatedPlan}</ReactMarkdown>
                      </div>
                    </div>

                    {/* Bottom conversion strip */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#111c2d]/60 p-4 rounded-xl">
                      <div className="text-xs text-gray-300">
                        <strong className="text-white">Gostou da rotina?</strong> Transforme em acompanhamento individual com feedbacks no App.
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={handleSendToWhatsApp}
                          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          WhatsApp
                        </button>
                        <button
                          onClick={() => onOpenEnrollment(userGoal)}
                          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-[#ff5f1f] hover:bg-[#ab3600] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Flame className="w-3.5 h-3.5" />
                          Consultoria Completa
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                      <Calendar className="w-7 h-7 text-[#ff5f1f]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-white mb-2">
                        Pronto para dar o primeiro passo?
                      </h4>
                      <p className="text-gray-400 text-sm max-w-md">
                        Digite sua meta ao lado e clique em <strong>"Gerar Minha Rotina Semanal com IA"</strong> para receber um plano sob medida com a metodologia da Coach Vania.
                      </p>
                    </div>
                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs max-w-md">
                        {errorMsg}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Interactive Running Chat */}
        {activeTab === 'chat' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-4xl mx-auto flex flex-col h-[520px]"
          >
            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-[#ff5f1f] text-white flex items-center justify-center flex-shrink-0 shadow-md">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#ff5f1f] text-white rounded-tr-none'
                        : 'bg-[#162033] text-gray-200 border border-white/10 rounded-tl-none prose prose-invert prose-sm'
                    }`}
                  >
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                    <span className="block text-[10px] text-gray-400 mt-1 text-right">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ff5f1f] text-white flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[#162033] border border-white/10 p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin text-[#ff5f1f]" />
                    <span>Assistente Vania Running está pensando...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendChatMessage} className="flex items-center gap-2 pt-3 border-t border-white/10">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Pergunte sobre ritmo, treinos em Vinhedo, alimentação ou recuperação..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#ff5f1f]"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="bg-[#ff5f1f] hover:bg-[#ab3600] disabled:opacity-50 text-white px-5 py-3 rounded-xl font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Enviar</span>
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
};
