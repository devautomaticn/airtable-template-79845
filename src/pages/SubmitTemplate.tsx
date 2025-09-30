
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createTemplateFromSubmission } from '@/services/templateService';

const SubmitTemplate = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    templateName: '',
    category: '',
    description: '',
    builderDescription: '',
    airtableBaseUrl: '',
    walkthroughVideoUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting template data:', formData);
      
      // Create template from submission
      await createTemplateFromSubmission({
        id: crypto.randomUUID(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        templateName: formData.templateName,
        category: formData.category,
        description: formData.description,
        builderDescription: formData.builderDescription,
        airtableBaseUrl: formData.airtableBaseUrl,
        walkthroughVideoUrl: formData.walkthroughVideoUrl,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });

      toast.success('Your template has been submitted successfully!');
      
      // Reset form and redirect to home
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        templateName: '',
        category: '',
        description: '',
        builderDescription: '',
        airtableBaseUrl: '',
        walkthroughVideoUrl: '',
      });
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error submitting template:', error);
      if (error instanceof Error) {
        toast.error(`Submission error: ${error.message}`);
      } else {
        toast.error('There was an error submitting your template. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 px-6 md:px-12 mb-20">
        <div className="max-w-3xl mx-auto bg-white shadow-soft rounded-xl overflow-hidden">
          <div className="bg-airtable-blue p-6 text-white">
            <h1 className="text-2xl font-bold">Submit Your Template</h1>
            <p className="opacity-90 mt-2">
              Share your Airtable template with the community
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Your Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500">
                  We'll use this email to contact you about your template submission
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="builderDescription">Brief Description About You</Label>
                <textarea
                  id="builderDescription"
                  name="builderDescription"
                  placeholder="Share a little about yourself, your expertise with Airtable, etc."
                  value={formData.builderDescription}
                  onChange={handleChange}
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-gray-500">
                  This will be displayed alongside your template to help users know more about you
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Template Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                  id="templateName"
                  name="templateName"
                  placeholder="e.g. Project Tracker, Content Calendar"
                  value={formData.templateName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="e.g. Project Management, Marketing, HR"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe your template, what it does, and who it's for..."
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="airtableBaseUrl">Airtable Base URL</Label>
                <Input
                  id="airtableBaseUrl"
                  name="airtableBaseUrl"
                  placeholder="https://airtable.com/app..."
                  value={formData.airtableBaseUrl}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500">
                  The URL to your shared Airtable base (optional)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="walkthroughVideoUrl">Walkthrough Video URL</Label>
                <Input
                  id="walkthroughVideoUrl"
                  name="walkthroughVideoUrl"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.walkthroughVideoUrl}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-500">
                  URL to a video explaining how to use your template (optional)
                </p>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-airtable-blue hover:bg-airtable-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Template'
              )}
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              By submitting, you agree to our terms and privacy policy.
              We'll review your submission and get back to you soon.
            </p>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SubmitTemplate;
