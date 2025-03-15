
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-reserve-neutral/30 dark:from-reserve-dark dark:to-black p-6">
      <div className="text-center max-w-md animate-fade-in">
        <div className="h-20 w-20 rounded-full bg-reserve-neutral mx-auto mb-6 flex items-center justify-center">
          <span className="text-reserve-dark font-bold text-3xl">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="rounded-full px-6">
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
