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
      
      {/* About Section */}
      <section id="hackathon-details" className="py-20 px-6 md:px-12 bg-white">
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
                <CardTitle>Amazing Prizes</CardTitle>
                <CardDescription>Win cash prizes, swag, and exclusive opportunities</CardDescription>
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
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Event Timeline</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-blue flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Registration Opens</h3>
                <p className="text-gray-600">Sign up and join our community Discord server. Get ready to meet your teammates!</p>
                <p className="text-sm text-airtable-blue font-medium mt-2">Now - February 15th</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-pink flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Kickoff Event</h3>
                <p className="text-gray-600">Virtual kickoff with workshop, Q&A, and challenge announcement. Hacking begins!</p>
                <p className="text-sm text-airtable-pink font-medium mt-2">February 16th, 10:00 AM EST</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-yellow flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">48-Hour Hack</h3>
                <p className="text-gray-600">Build your project! Office hours, mentorship, and support available throughout.</p>
                <p className="text-sm text-airtable-yellow font-medium mt-2">February 16-18th</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-blue flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Submissions & Demo Day</h3>
                <p className="text-gray-600">Submit your project and present to judges. Winners announced live!</p>
                <p className="text-sm text-airtable-blue font-medium mt-2">February 18th, 6:00 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Prizes & Awards</h2>
          <p className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Over $10,000 in prizes and swag for winners across multiple categories!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-airtable-blue bg-gradient-to-br from-airtable-blue/5 to-transparent">
              <CardHeader className="text-center">
                <Trophy className="h-16 w-16 text-airtable-blue mx-auto mb-4" />
                <CardTitle className="text-2xl">🥇 Grand Prize</CardTitle>
                <CardDescription className="text-xl font-bold text-airtable-blue mt-2">$3,000</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">Best overall project</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-airtable-pink bg-gradient-to-br from-airtable-pink/5 to-transparent">
              <CardHeader className="text-center">
                <Gift className="h-16 w-16 text-airtable-pink mx-auto mb-4" />
                <CardTitle className="text-2xl">🥈 Runner Up</CardTitle>
                <CardDescription className="text-xl font-bold text-airtable-pink mt-2">$2,000</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">Second place winner</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-airtable-yellow bg-gradient-to-br from-airtable-yellow/5 to-transparent">
              <CardHeader className="text-center">
                <Zap className="h-16 w-16 text-airtable-yellow mx-auto mb-4" />
                <CardTitle className="text-2xl">🥉 Third Place</CardTitle>
                <CardDescription className="text-xl font-bold text-airtable-yellow mt-2">$1,000</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">Third place winner</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-center text-gray-600 mt-12">
            Plus special category prizes for Best Design, Most Innovative, and Community Favorite!
          </p>
        </div>
      </section>
      
      {/* Registration Form */}
      <section id="browse-templates" className="py-20 px-6 md:px-12 bg-gray-50">
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
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
