
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Onboarding from '@/components/Onboarding';
import FoodAnalyzer from '@/components/FoodAnalyzer';
import ImageGallery from '@/components/ImageGallery';

type UserRole = 'provider' | 'volunteer' | 'receiver' | null;

const Index = () => {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  
  const handleOnboardingComplete = (role: UserRole) => {
    setUserRole(role);
    setOnboardingComplete(true);
  };
  
  const handleOpenMenu = () => {
    setMenuOpen(true);
  };
  
  // Determine which component to show based on user role
  const renderMainContent = () => {
    if (!onboardingComplete) {
      return <Onboarding onComplete={handleOnboardingComplete} />;
    }
    
    switch (userRole) {
      case 'provider':
        return <FoodAnalyzer />;
      case 'volunteer':
      case 'receiver':
        return <ImageGallery />;
      default:
        return <Onboarding onComplete={handleOnboardingComplete} />;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-reserve-neutral/30 dark:from-reserve-dark dark:to-black">
      <Header openMenu={handleOpenMenu} />
      
      <main className="flex-1 pt-24 pb-6 px-4 flex items-center justify-center">
        <div className="w-full max-w-screen-lg mx-auto">
          {renderMainContent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
