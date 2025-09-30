
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Template } from '@/types/template';

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  // Filter out empty use cases
  const nonEmptyUseCases = template.useCases ? template.useCases.filter(u => u && u.trim() !== '') : [];
  
  return (
    <Link to={`/template/${template.id}`}>
      <Card className="overflow-hidden card-hover h-full">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={template.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1674&auto=format&fit=crop'} 
            alt={template.title || 'Template'}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white text-sm font-medium">View Template</span>
          </div>
          {template.category && (
            <Badge className="absolute top-4 right-4 bg-airtable-pink text-white border-none">
              {template.category}
            </Badge>
          )}
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-airtable-black">{template.title || 'Unnamed Template'}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description || ''}</p>
          
          {nonEmptyUseCases.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {nonEmptyUseCases.map((useCase, index) => (
                <Badge key={index} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100">
                  {useCase}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-6 pt-0 flex justify-between items-center">
          <Button variant="ghost" className="p-0 hover:bg-transparent text-airtable-blue hover:text-airtable-blue/90 flex items-center">
            <span>Get Template</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TemplateCard;
