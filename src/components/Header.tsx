
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Home, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  openMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ openMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Only show back button if not on homepage
  const showBackButton = location.pathname !== '/';
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50 py-4 px-6">
      <div className="glass-morphism rounded-full px-4 py-2 max-w-screen-lg mx-auto flex justify-between items-center animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-reserve-green to-reserve-light-green flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <h1 className="text-lg font-semibold">
            <span className="font-bold">Re</span>Serve
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleGoBack}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          {location.pathname !== '/' && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleGoHome}
              aria-label="Go to home page"
            >
              <Home className="h-5 w-5" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={openMenu}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
