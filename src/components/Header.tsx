
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
  openMenu?: () => void;
}

const Header: React.FC<HeaderProps> = ({ openMenu }) => {
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
        
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={openMenu}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
