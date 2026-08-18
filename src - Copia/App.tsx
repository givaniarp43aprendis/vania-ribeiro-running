import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProgramsSection } from './components/ProgramsSection';
import { AboutSection } from './components/AboutSection';
import { CommunitySection } from './components/CommunitySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GeminiRunningAssistant } from './components/GeminiRunningAssistant';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { FloatingAiButton } from './components/FloatingAiButton';
import { TrainingSheetsModal } from './components/TrainingSheetsModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { LocationDetailsModal } from './components/LocationDetailsModal';
import { VinhedoSpot } from './types';

export function App() {
  // Modal states
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [enrollmentProgramId, setEnrollmentProgramId] = useState<string | undefined>(undefined);
  const [enrollmentGoalText, setEnrollmentGoalText] = useState<string | undefined>(undefined);

  const [isSheetsOpen, setIsSheetsOpen] = useState(false);
  const [selectedSheetId, setSelectedSheetId] = useState<string>('sheet-5k');

  const [selectedLocationSpot, setSelectedLocationSpot] = useState<VinhedoSpot | null>(null);

  // Open pre-enrollment / consulting form
  const handleOpenEnrollment = (programId?: string, goalText?: string) => {
    setEnrollmentProgramId(programId);
    setEnrollmentGoalText(goalText);
    setIsEnrollmentOpen(true);
  };

  // Open training sheets modal
  const handleOpenSheets = (programId?: string) => {
    if (programId === 'iniciante-5k') {
      setSelectedSheetId('sheet-5k');
    } else if (programId === 'intermediario-10k') {
      setSelectedSheetId('sheet-10k');
    } else if (programId === 'meia-maratona-21k') {
      setSelectedSheetId('sheet-21k');
    } else {
      setSelectedSheetId('sheet-5k');
    }
    setIsSheetsOpen(true);
  };

  // Scroll to AI Running Assistant
  const handleOpenAiAssistant = () => {
    const aiSection = document.getElementById('assistente-ia');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Triggered when user asks for AI workout on a specific spot
  const handleAskAiAboutSpot = (spotName: string) => {
    handleOpenAiAssistant();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9ff] text-[#111c2d] selection:bg-[#ff5f1f] selection:text-white">
      {/* Header Navigation */}
      <Navbar
        onOpenEnrollment={handleOpenEnrollment}
        onOpenSheets={() => handleOpenSheets()}
        onOpenAiAssistant={handleOpenAiAssistant}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenEnrollment={() => handleOpenEnrollment()}
          onOpenSheets={() => handleOpenSheets()}
          onOpenAiAssistant={handleOpenAiAssistant}
        />

        {/* 2. Programs / Methodology */}
        <ProgramsSection
          onSelectProgram={(programId) => handleOpenEnrollment(programId)}
          onOpenSheetsForProgram={(programId) => handleOpenSheets(programId)}
        />

        {/* 3. About the Coach */}
        <AboutSection
          onOpenEnrollment={() => handleOpenEnrollment()}
        />

        {/* 4. Community / Vinhedo Locations */}
        <CommunitySection
          onSelectSpot={(spot) => setSelectedLocationSpot(spot)}
        />

        {/* 5. Testimonials */}
        <TestimonialsSection />

        {/* 6. Gemini AI Running Assistant */}
        <GeminiRunningAssistant
          onOpenEnrollment={(goalText) => handleOpenEnrollment(undefined, goalText)}
        />

        {/* 7. Final Call to Action */}
        <CtaBanner
          onOpenEnrollment={() => handleOpenEnrollment()}
          onOpenAiAssistant={handleOpenAiAssistant}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenEnrollment={() => handleOpenEnrollment()}
        onOpenSheets={() => handleOpenSheets()}
        onOpenAiAssistant={handleOpenAiAssistant}
      />

      {/* Quick Floating AI Button */}
      <FloatingAiButton onClick={handleOpenAiAssistant} />

      {/* Modals & Dialogs */}
      <TrainingSheetsModal
        isOpen={isSheetsOpen}
        initialSheetId={selectedSheetId}
        onClose={() => setIsSheetsOpen(false)}
        onSelectProgramForEnrollment={(programId) => {
          setIsSheetsOpen(false);
          handleOpenEnrollment(programId);
        }}
      />

      <EnrollmentModal
        isOpen={isEnrollmentOpen}
        initialProgramId={enrollmentProgramId}
        initialGoalText={enrollmentGoalText}
        onClose={() => setIsEnrollmentOpen(false)}
      />

      <LocationDetailsModal
        spot={selectedLocationSpot}
        onClose={() => setSelectedLocationSpot(null)}
        onAskAiAboutSpot={handleAskAiAboutSpot}
      />
    </div>
  );
}

export default App;
