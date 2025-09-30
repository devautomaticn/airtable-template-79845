
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { requestTemplateAccess } from '@/services/templateService';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmailFormProps {
  onSuccess: () => void;
  templateName: string;
}

const EmailForm = ({ onSuccess, templateName }: EmailFormProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset any previous error state
    setErrorMessage(null);
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (!id) {
      toast.error('Template ID is missing');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Requesting template access for:', { email, templateId: id });
      
      // Call the service function that handles both database entry and webhook
      await requestTemplateAccess(email, id);
      
      // If we get here, at least the database entry was successful
      // Show success message after a slight delay for better UX
      setTimeout(() => {
        onSuccess();
        setIsSubmitting(false);
        toast.success('Template access request submitted successfully');
        console.log('Success toast displayed.');
      }, 1000);
      
    } catch (error) {
      console.error('Error requesting template access:', error);
      setErrorMessage('There was a problem processing your request. Please try again later.');
      toast.error('Failed to save your request. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-gray-600 text-sm">
        Enter your email to get access to the <span className="font-medium">{templateName}</span> template
      </p>
      
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="youremail@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
        <p className="text-xs text-gray-500">
          We'll send you a link to access this template.
        </p>
      </div>
      
      {errorMessage && (
        <Alert variant="destructive" className="my-2">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <Button 
        type="submit"
        className="w-full bg-airtable-blue hover:bg-airtable-blue/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Get This Template'
        )}
      </Button>
    </form>
  );
};

export default EmailForm;
