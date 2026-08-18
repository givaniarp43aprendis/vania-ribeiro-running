import React from 'react';
import { MapPin, Phone, Mail, Instagram, ArrowUp, Flame, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenEnrollment: () => void;
  onOpenSheets: () => void;
  onOpenAiAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEnrollment,
  onOpenSheets,
  onOpenAiAssistant,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b121e] text-gray-400 text-sm border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="text-[#ff5f1f] w-8 h-8 flex-shrink-0">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path
                    d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-headline-lg font-bold text-xl tracking-tight">
                Vania Ribeiro <span className="text-[#ff5f1f]">Running</span>
              </span>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Assessoria e consultoria de corrida de rua em Vinhedo - SP. Metodologia baseada em fisiologia do
              exercício, biomecânica e evolução sustentável para corredores amadores.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#ff5f1f] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram da Coach Vania"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenAiAssistant}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#ff5f1f]/20 border border-white/10 text-xs text-gray-300 hover:text-[#ff5f1f] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ff5f1f]" />
                <span>Assistente IA</span>
              </button>
            </div>
          </div>

          {/* Col 3: Links */}
          <div className="space-y-3">
            <h5 className="font-headline-lg font-bold text-white text-sm uppercase tracking-wider">
              Navegação
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-[#ff5f1f] transition-colors">Início</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#ff5f1f] transition-colors">Programas de Treino</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#ff5f1f] transition-colors">A Treinadora</a>
              </li>
              <li>
                <a href="#comunidade" className="hover:text-[#ff5f1f] transition-colors">Locais em Vinhedo</a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-[#ff5f1f] transition-colors">Depoimentos de Alunos</a>
              </li>
              <li>
                <button onClick={onOpenSheets} className="hover:text-[#ff5f1f] transition-colors text-left cursor-pointer">
                  Exemplos de Planilhas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Programs */}
          <div className="space-y-3">
            <h5 className="font-headline-lg font-bold text-white text-sm uppercase tracking-wider">
              Metodologias
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onOpenEnrollment()} className="hover:text-[#ff5f1f] transition-colors text-left cursor-pointer">
                  Iniciante 5k
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnrollment()} className="hover:text-[#ff5f1f] transition-colors text-left cursor-pointer">
                  Intermediário 10k
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnrollment()} className="hover:text-[#ff5f1f] transition-colors text-left cursor-pointer">
                  Meia Maratona 21k
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnrollment()} className="hover:text-[#ff5f1f] transition-colors text-left cursor-pointer">
                  Análise de Biomecânica
                </button>
              </li>
              <li>
                <button onClick={() => onOpenEnrollment()} className="hover:text-[#ff5f1f] transition-colors text-left cursor-pointer">
                  Acompanhamento no App
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Local & Contact */}
          <div className="space-y-3">
            <h5 className="font-headline-lg font-bold text-white text-sm uppercase tracking-wider">
              Localização
            </h5>
            <div className="space-y-2 text-xs">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ff5f1f] flex-shrink-0 mt-0.5" />
                <span>Vinhedo - SP &bull; Treinos na Represa I, Observatório e Pista Municipal</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ff5f1f] flex-shrink-0" />
                <span>(19) 99999-9999</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ff5f1f] flex-shrink-0" />
                <span>contato@vaniarunning.com.br</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Vania Ribeiro Running Coach. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
