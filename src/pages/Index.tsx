
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Onboarding from '@/components/Onboarding';
import FoodAnalyzer from '@/components/FoodAnalyzer';

type UserRole = 'provider' | 'volunteer' | 'receiver' | null;

const Index = () => {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  
  const handleOnboardingComplete = (role: UserRole) => {
    setUserRole(role);
    setOnboardingComplete(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-reserve-neutral/30 dark:from-reserve-dark dark:to-black">
      <Header />
      
      <main className="flex-1 pt-24 pb-6 px-4 flex items-center justify-center">
        <div className="w-full max-w-screen-lg mx-auto">
          {!onboardingComplete ? (
            <Onboarding onComplete={handleOnboardingComplete} />
          ) : (
            <FoodAnalyzer />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
