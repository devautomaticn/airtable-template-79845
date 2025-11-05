import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Zap, Gift, Code } from 'lucide-react';
import alexImage from '@/assets/alex-mcdonnell.jpeg';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Awards Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            🏆 Three winners. 🙌
          </h2>
          
          <div className="space-y-12">
            {/* Airtable's Official Award */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-airtable-blue/20">
              <h3 className="text-2xl font-bold mb-4 text-airtable-blue">Airtable's Official Award — AI Focused</h3>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <img 
                  src={alexImage} 
                  alt="Alex McDonnell" 
                  className="w-32 h-32 rounded-2xl object-cover border-4 border-airtable-blue shadow-lg"
                />
                <p className="text-lg text-gray-700 flex-1">
                  Alex McDonnell, Director of Product Marketing at Airtable, will be picking the base that best shows off Airtable's AI superpowers. 🤖
                </p>
              </div>
            </div>

            <div className="border-t border-gray-300 my-8"></div>

            {/* Basefluencer Award */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-airtable-pink/20">
              <h3 className="text-2xl font-bold mb-4 text-airtable-pink">Basefluencer Award</h3>
              <p className="text-lg text-gray-700">
                For the builder who make everyone go "wait, you built that in Airtable?!"<br/>
                The most liked, submission takes it. 💥
              </p>
            </div>

            <div className="border-t border-gray-300 my-8"></div>

            {/* Grand Jury Award */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-airtable-yellow/20">
              <h3 className="text-2xl font-bold mb-4 text-airtable-yellow">Grand Jury Award</h3>
              <p className="text-lg text-gray-700">
                Top Airtable Agencies will join forces to crown the community's best overall build. 🧠
              </p>
            </div>

            <div className="border-t border-gray-300 my-8"></div>

            {/* Prizes */}
            <div className="bg-gradient-to-r from-airtable-blue/10 via-airtable-pink/10 to-airtable-yellow/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">🎁 Prizes for the winners:</h3>
              <ul className="space-y-2 text-lg text-gray-700 mb-4">
                <li>• <strong>Airtable swag!!</strong><sup className="text-xs">*</sup></li>
                <li>• <strong>Get featured on Airtable's Change Makers spotlight</strong></li>
                <li>• <strong>Get a free consultation session</strong></li>
              </ul>
              <p className="text-sm text-gray-600 italic">
                *To be eligible for swag, winners must be located in North America, EMEA, or Latin America.
              </p>
            </div>
          </div>
        </div>
      </section>
      
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
                <h3 className="text-xl font-bold mb-2">48-Hour Hack: November 21 & 22</h3>
                <p className="text-gray-600">Build your project! Office hours, mentorship, and support available throughout.</p>
                <p className="text-sm text-airtable-pink font-medium mt-2">November - Stay tuned</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-blue flex items-center justify-center text-white font-bold">
                3
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
