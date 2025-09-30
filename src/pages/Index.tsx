import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import { fetchPublishedTemplates } from '@/services/templateService';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Template } from '@/types/template';

const Index = () => {
  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['publishedTemplates'],
    queryFn: fetchPublishedTemplates,
    retry: 2
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);

  useEffect(() => {
    if (templates) {
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(templates.map(t => t.category)));
      setCategories(uniqueCategories);

      // Filter templates based on selected category
      if (selectedCategory) {
        setFilteredTemplates(templates.filter(t => t.category === selectedCategory));
      } else {
        setFilteredTemplates(templates);
      }
    }
  }, [templates, selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  if (error) {
    console.error("Error loading templates:", error);
    toast.error("Failed to load templates. Please try again later.");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      <section id="browse-templates" className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Browse All Templates</h2>
          
          {/* Category Filters */}
          {!isLoading && templates && templates.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`px-3 py-1 text-xs cursor-pointer hover:bg-airtable-blue/90 transition-all ${
                    selectedCategory === category 
                      ? 'bg-airtable-blue text-white' 
                      : 'bg-white text-gray-700 hover:text-white'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
              {selectedCategory && (
                <Badge 
                  variant="outline"
                  className="px-2 py-1 text-xs cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => setSelectedCategory(null)}
                >
                  Clear Filter
                </Badge>
              )}
            </div>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-soft h-[380px] animate-pulse">
                  <div className="w-full h-40 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex justify-between mt-4">
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Failed to load templates</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-airtable-blue text-white px-6 py-2 rounded-lg"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates && filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <TemplateCard 
                    key={template.id} 
                    template={template}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">
                    {selectedCategory 
                      ? `No templates found in the "${selectedCategory}" category.` 
                      : "No published templates available at this time."}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
