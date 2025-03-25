
import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    // Check user's theme preference or default to light
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Don't show navbar on login page
  const showNavbar = location.pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {showNavbar && <Navbar />}
      <main className="flex-1 flex flex-col">
        <div className={`w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 ${showNavbar ? 'pt-24 pb-12' : ''}`}>
          {children}
        </div>
      </main>
      <footer className="py-3 text-center text-xs text-muted-foreground/80 border-t border-border">
        <span>© FunhasInovattion2025</span>
      </footer>
    </div>
  );
}
