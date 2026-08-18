import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Flame, Calendar, MessageSquare, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenEnrollment: (programId?: string) => void;
  onOpenSheets: () => void;
  onOpenAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEnrollment,
  onOpenSheets,
  onOpenAiAssistant,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Programas', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Comunidade', href: '#comunidade' },
    { label: 'Depoimentos', href: '#depoimentos' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 md:px-10 py-3 sm:py-4 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#111c2d]/95 text-white backdrop-blur-md shadow-lg border-b border-white/10'
            : 'bg-white/90 text-[#111c2d] backdrop-blur-md border-b border-[#d8e3fb]'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#inicio"
          className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#inicio');
          }}
        >
          <div className="text-[#ff5f1f] w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 transition-transform group-hover:scale-110">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="font-headline-lg font-bold text-base sm:text-lg tracking-tight leading-none">
              Vania Ribeiro <span className="text-[#ff5f1f]">Running</span>
            </h1>
            <span className="text-[10px] tracking-wider uppercase opacity-70 font-mono-tag hidden xs:inline-block">
              Coach em Vinhedo - SP
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className={`text-xs xl:text-sm font-bold uppercase tracking-widest transition-colors hover:text-[#ff5f1f] ${
                isScrolled ? 'text-gray-200' : 'text-[#111c2d]'
              }`}
            >
              {link.label}
            </a>
          ))}
          
          <button
            onClick={onOpenSheets}
            className={`text-xs xl:text-sm font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors hover:text-[#ff5f1f] ${
              isScrolled ? 'text-gray-200' : 'text-[#111c2d]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#ff5f1f]" />
            Planilhas
          </button>

          <button
            onClick={onOpenAiAssistant}
            className="text-xs xl:text-sm font-bold uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ff5f1f]/10 text-[#ff5f1f] border border-[#ff5f1f]/30 hover:bg-[#ff5f1f]/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            Assistente IA
          </button>
        </nav>

        {/* Action Buttons & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="nav-quick-ai-btn"
            onClick={onOpenAiAssistant}
            title="Abrir Assistente de Corrida com IA"
            className="hidden sm:flex lg:hidden items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#ff5f1f] bg-[#ff5f1f]/10 border border-[#ff5f1f]/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            IA Treino
          </button>

          <button
            id="nav-start-button"
            onClick={() => onOpenEnrollment()}
            className="bg-[#ff5f1f] hover:bg-[#ab3600] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-[#ff5f1f]/20 hover:shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Flame className="w-4 h-4 hidden xs:inline-block" />
            COMEÇAR
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu de navegação"
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-white hover:bg-white/10' : 'text-[#111c2d] hover:bg-gray-100'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-[#111c2d] text-white p-6 shadow-2xl flex flex-col justify-between border-l border-white/10 lg:hidden"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="text-[#ff5f1f] w-7 h-7">
                      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path
                          d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <span className="font-headline-lg font-bold text-base">
                      Vania Ribeiro <span className="text-[#ff5f1f]">Running</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Mobile Links List */}
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-base font-semibold text-gray-200 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSheets();
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-base font-semibold text-gray-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#ff5f1f]" />
                      Exemplos de Planilhas
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAiAssistant();
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-left text-base font-semibold bg-[#ff5f1f]/15 text-[#ff5f1f] border border-[#ff5f1f]/30 hover:bg-[#ff5f1f]/25 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Assistente de Treino com IA
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnrollment();
                  }}
                  className="w-full bg-[#ff5f1f] hover:bg-[#ab3600] text-white py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#ff5f1f]/20"
                >
                  <Flame className="w-4 h-4" />
                  Quero Começar Agora
                </button>
                <div className="text-center text-xs text-gray-400 pt-2">
                  <span>Vinhedo, SP &bull; Atendimento Online</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
