
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFAQ = () => {
    if (location.pathname === '/') {
      const faqSection = document.getElementById('faq-section');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#faq-section';
    }
  };

  return (
    <header className={cn(
      'fixed w-full top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative h-9 w-9">
            <div className="absolute top-0 left-0 h-4 w-4 bg-airtable-yellow rounded-sm transform rotate-45" />
            <div className="absolute bottom-0 left-0 h-4 w-4 bg-airtable-pink rounded-sm" />
            <div className="absolute bottom-0 right-0 h-4 w-4 bg-airtable-blue rounded-sm" />
          </div>
          <span className="font-bold text-xl text-airtable-black">AT Hackathon</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-airtable-blue transition-colors">
            Home
          </Link>
          <button 
            onClick={scrollToFAQ}
            className="text-sm font-medium text-gray-700 hover:text-airtable-blue transition-colors"
          >
            FAQs
          </button>
          <Link to="/weird-ideas" className="text-sm font-medium text-gray-700 hover:text-airtable-blue transition-colors">
            Weird Ideas
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                className="bg-airtable-pink hover:bg-airtable-pink/90 text-white border-none"
              >
                Check Out Submissions
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
              <DropdownMenuItem asChild>
                <Link to="/march-2026" className="cursor-pointer">
                  March 2026
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/november-2025" className="cursor-pointer">
                  November 2025
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-airtable-blue transition-colors py-2">
              Home
            </Link>
            <button 
              onClick={() => {
                scrollToFAQ();
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium text-gray-700 hover:text-airtable-blue transition-colors py-2 text-left"
            >
              FAQs
            </button>
            <Link 
              to="/weird-ideas" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-airtable-blue transition-colors py-2"
            >
              Weird Ideas
            </Link>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Submissions</p>
              <Link 
                to="/march-2026" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-gray-700 hover:text-airtable-blue transition-colors py-2"
              >
                March 2026
              </Link>
              <Link 
                to="/november-2025" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-gray-700 hover:text-airtable-blue transition-colors py-2"
              >
                November 2025
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
