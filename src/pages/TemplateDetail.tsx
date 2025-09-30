
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EmailForm from '@/components/EmailForm';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchTemplateById } from '@/services/templateService';

const TemplateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [accessGranted, setAccessGranted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { data: template, isLoading, error } = useQuery({
    queryKey: ['template', id],
    queryFn: () => fetchTemplateById(id || ''),
    enabled: !!id
  });
  
  const handleAccessSuccess = () => {
    setAccessGranted(true);
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
      description: "Share this template with your team or colleagues",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
            <p className="mb-6 text-gray-600">The template you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Templates
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const nonEmptyFeatures = template.features ? template.features.filter(f => f && f.trim() !== '') : [];
  const nonEmptyUseCases = template.useCases ? template.useCases.filter(u => u && u.trim() !== '') : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="pl-0 hover:bg-transparent text-gray-600 hover:text-airtable-blue">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Templates
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-airtable-blue/10 text-airtable-blue border-none">
                {template.category}
              </Badge>
              
              <h1 className="text-4xl font-bold text-airtable-black mb-4">
                {template.title}
              </h1>
              
              <p className="text-gray-600 mb-8 text-lg">
                {template.description}
              </p>
              
              {nonEmptyFeatures.length > 0 && (
                <div className="border shadow-sm p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {nonEmptyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-0.5 h-5 w-5 bg-airtable-blue/10 text-airtable-blue rounded-full flex items-center justify-center">
                          <Check className="h-3.5 w-3.5" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {nonEmptyUseCases.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Perfect For</h3>
                  <div className="flex flex-wrap gap-2">
                    {nonEmptyUseCases.map((useCase, index) => (
                      <Badge key={index} className="py-1.5 px-3 bg-gray-100 text-gray-800 hover:bg-gray-200">
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-12 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">
                  {accessGranted ? "Access Granted!" : "Get This Template"}
                </h3>
                
                {accessGranted ? (
                  <div className="animate-fade-in">
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-green-800">Success!</h4>
                          <p className="text-sm text-green-700">Check your email for template access</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center">
                      <Button variant="ghost" onClick={handleCopyLink} className="text-sm text-gray-500">
                        Share this template
                      </Button>
                    </div>
                  </div>
                ) : (
                  <EmailForm onSuccess={handleAccessSuccess} templateName={template.title} />
                )}
              </div>
            </div>
            
            <div className="relative animate-fade-up">
              <div className="sticky top-24">
                <div className="rounded-xl overflow-hidden border border-gray-200 shadow-card">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    className="w-full aspect-video object-cover"
                  />
                </div>
                
                <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6 shadow-soft">
                  <h3 className="text-lg font-semibold mb-4">About the Builder</h3>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm font-bold text-gray-500 col-span-1">Name</span>
                      <span className="text-sm text-gray-700 col-span-2 text-right">{template.creator.name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm font-bold text-gray-500 col-span-1">Description</span>
                      <span className="text-sm text-gray-700 col-span-2 text-right">{template.creator.description || 'Template expert'}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-sm font-bold text-gray-500 col-span-1">Email</span>
                      <span className="text-sm text-gray-700 col-span-2 text-right">{template.creator.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default TemplateDetail;
