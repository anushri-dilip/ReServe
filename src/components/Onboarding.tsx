
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Store, Heart, Leaf } from 'lucide-react';

type UserRole = 'provider' | 'volunteer' | 'receiver' | null;

interface OnboardingProps {
  onComplete: (role: UserRole) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  
  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
  };
  
  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1 && selectedRole) {
      onComplete(selectedRole);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      {step === 0 ? (
        <div className="text-center animate-fade-in">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-reserve-green to-reserve-light-green mx-auto mb-6 flex items-center justify-center">
            <span className="text-white font-bold text-3xl">R</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">Welcome to ReServe</h1>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Connect, analyze, and distribute surplus food to reduce waste and help communities.
          </p>
          <Button 
            className="rounded-full px-6 transition-default"
            onClick={handleNextStep}
          >
            Get Started
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="w-full animate-fade-in">
          <h2 className="text-2xl font-bold mb-2 text-center">Choose your role</h2>
          <p className="text-muted-foreground mb-6 text-center">
            Select how you'll use ReServe
          </p>
          
          <div className="space-y-4 mb-6">
            <Card 
              className={`p-4 cursor-pointer transition-default hover:shadow-md ${
                selectedRole === 'provider' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleRoleSelection('provider')}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Food Provider</h3>
                  <p className="text-sm text-muted-foreground">Restaurants, cafes, bakeries</p>
                </div>
              </div>
            </Card>
            
            <Card 
              className={`p-4 cursor-pointer transition-default hover:shadow-md ${
                selectedRole === 'volunteer' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleRoleSelection('volunteer')}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
                  <Heart className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-medium">Volunteer</h3>
                  <p className="text-sm text-muted-foreground">Food collectors, transporters</p>
                </div>
              </div>
            </Card>
            
            <Card 
              className={`p-4 cursor-pointer transition-default hover:shadow-md ${
                selectedRole === 'receiver' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleRoleSelection('receiver')}
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                  <Leaf className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium">Receiver</h3>
                  <p className="text-sm text-muted-foreground">Shelters, composters</p>
                </div>
              </div>
            </Card>
          </div>
          
          <Button 
            className="w-full rounded-full transition-default"
            disabled={!selectedRole}
            onClick={handleNextStep}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
