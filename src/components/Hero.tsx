
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            Build Anything with <span className="text-airtable-blue">Airtable</span> Templates
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Kickstart your workflow with our curated collection of premium Airtable templates.
            Save time, stay organized, and accomplish more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-airtable-blue hover:bg-airtable-blue/90 text-white px-8 py-6 rounded-md text-base"
              onClick={scrollToTemplates}
            >
              Browse Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href="https://automaticnation.com/book-a-call" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-airtable-blue text-airtable-blue hover:bg-airtable-blue/5 px-8 py-6 rounded-md text-base">
                Learn More
              </Button>
            </a>
          </div>
          
          <div className="flex items-center mt-12">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/100?img=${i+10}`} 
                    alt="User avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">500+ downloads</p>
              <p className="text-xs text-gray-500">Trusted by hundreds</p>
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
              Popular
            </div>
            <div className="absolute top-6 left-6 bg-airtable-blue text-white text-xs font-bold px-3 py-1 rounded-full">
              Project Management
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
