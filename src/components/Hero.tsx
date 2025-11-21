import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import avatar1 from '@/assets/avatar-1.png';
import avatar2 from '@/assets/avatar-2.png';
import avatar3 from '@/assets/avatar-3.png';
import avatar4 from '@/assets/avatar-4.png';
import avatar5 from '@/assets/avatar-5.png';

const Hero = () => {
  const scrollToTemplates = () => {
    const templatesSection = document.getElementById('browse-templates');
    if (templatesSection) {
      templatesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[85vh] w-full overflow-hidden hero-gradient pt-24 px-6 md:px-12">
      {/* Animated background shapes */}
      <div className="hero-shape w-80 h-80 bg-airtable-pink/10 top-20 left-[10%] animate-pulse-soft" />
      <div className="hero-shape w-96 h-96 bg-airtable-yellow/10 bottom-10 right-[5%] animate-pulse-soft animation-delay-[1s]" />
      <div className="hero-shape w-60 h-60 bg-airtable-blue/10 bottom-40 left-[20%] animate-pulse-soft animation-delay-[2s]" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 pt-12 lg:pt-20 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-airtable-black leading-tight tracking-tight mb-6">
            The First <span className="text-airtable-blue">Airtable</span> Community Led Hackathon!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            November 21st & 22nd (Friday - Saturday). Join innovators, builders, and creators from around the world to push the boundaries 
            of what's possible with Airtable. Build, learn, and win exciting rewards!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-airtable-blue hover:bg-airtable-blue/90 text-white px-8 py-6 rounded-md text-base"
              onClick={scrollToTemplates}
            >
              Submit your Build
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="border-airtable-blue text-airtable-blue hover:bg-airtable-blue/5 px-8 py-6 rounded-md text-base"
              onClick={() => {
                const detailsSection = document.getElementById('hackathon-details');
                if (detailsSection) {
                  detailsSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Learn More
            </Button>
          </div>
          
          <div className="flex items-center mt-12">
            <div className="flex -space-x-2">
              {[avatar1, avatar2, avatar3, avatar4, avatar5].map((avatar, i) => (
                <div key={i} className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                  <img 
                    src={avatar} 
                    alt="Participant avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">+100 Signups</p>
              <p className="text-xs text-gray-500">Join the community</p>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="relative z-10 bg-white p-3 rounded-2xl shadow-card overflow-hidden animate-fade-up">
            <img 
              src="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Woman working on laptop" 
              className="rounded-xl w-full h-auto object-cover"
            />
            <div className="absolute top-6 right-6 bg-airtable-pink text-white text-xs font-bold px-3 py-1 rounded-full">
              48h Challenge
            </div>
            <div className="absolute top-6 left-6 bg-airtable-blue text-white text-xs font-bold px-3 py-1 rounded-full">
              Build & Win
            </div>
          </div>
          
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-airtable-yellow/20 rounded-full blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-airtable-blue/20 rounded-full blur-xl" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
