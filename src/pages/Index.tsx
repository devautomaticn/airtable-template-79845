import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Zap, Gift, Code } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Registration Form */}
      <section id="browse-templates" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Register Now</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Secure your spot in the first Airtable Community Led Hackathon!
          </p>
          
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <iframe 
              className="airtable-embed w-full" 
              src="https://airtable.com/embed/appdPfhaKZFhHNvoT/paggcOIRyaIdjOLkY/form" 
              frameBorder="0" 
              width="100%" 
              height="533" 
              style={{ background: 'transparent', border: '1px solid #ccc' }}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="hackathon-details" className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Why Join the Hackathon?</h2>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            This is your chance to showcase your creativity, learn new skills, and connect with 
            the global Airtable community. Whether you're a beginner or expert, there's a place for you!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-airtable-blue/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Trophy className="h-10 w-10 text-airtable-blue mb-2" />
                <CardTitle>Fun Prizes</CardTitle>
                <CardDescription>Exciting rewards for outstanding projects</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-airtable-pink/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-10 w-10 text-airtable-pink mb-2" />
                <CardTitle>Community</CardTitle>
                <CardDescription>Connect with builders and innovators worldwide</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-airtable-yellow/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="h-10 w-10 text-airtable-yellow mb-2" />
                <CardTitle>Learn & Build</CardTitle>
                <CardDescription>Expand your skills and create something amazing</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Event Timeline</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-blue flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Registration Opens</h3>
                <p className="text-gray-600">Sign up and receive all details. Get ready to Hack!</p>
                <p className="text-sm text-airtable-blue font-medium mt-2">Now</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-pink flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Kickoff Event</h3>
                <p className="text-gray-600">Virtual kickoff with workshop, Q&A, and challenge announcement. Hacking begins!</p>
                <p className="text-sm text-airtable-pink font-medium mt-2">November - Stay tuned</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-yellow flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">48-Hour Hack</h3>
                <p className="text-gray-600">Build your project! Office hours, mentorship, and support available throughout.</p>
                <p className="text-sm text-airtable-yellow font-medium mt-2">November - Stay tuned</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-blue flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Submission and Show Off</h3>
                <p className="text-gray-600">Submit your project and share it with the world to get your deserved upvotes!</p>
                <p className="text-sm text-airtable-blue font-medium mt-2">Winners will be publicly announced</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
