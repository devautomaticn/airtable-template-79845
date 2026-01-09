import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Trophy, Users, Zap, Gift, Code } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      
      {/* Sign Up Section */}
      <section id="signup-section" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Sign Up for March 2026</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Be the first to know when registration opens and get exclusive updates about the hackathon!
          </p>
          
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <iframe 
              className="airtable-embed w-full" 
              src="https://airtable.com/embed/appdPfhaKZFhHNvoT/paggcOIRyaIdjOLkY/form" 
              frameBorder="0" 
              width="100%" 
              height="1227" 
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

      {/* FAQ Section */}
      <section id="faq-section" className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">🧠 FAQ — Airtable Hackathon 2026</h2>
          
          <Accordion type="single" collapsible className="w-full mt-12">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-semibold">
                When and where will this thing be happening?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base">
                Participants can start building as from signup. Submissions are due March 17, 2026.<br/>
                It's fully online and async — so no excuses, you can join from anywhere!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                But I'm no Airtable expert… can I still join?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base">
                Of course! The hackathon is all about having fun, learning, and discovering cool new use cases. All skill levels are welcome — from total beginners to seasoned Airtable nerds.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-semibold">
                When are submissions due?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base">
                March 17, 2026.<br/>
                Just make sure to hit that "submit" button before the deadline! The submission form will be right here on this site.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What do we need to submit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base">
                You'll need to fill out a short form with:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Participant name(s) & email(s)</li>
                  <li>Project name</li>
                  <li>Brief project description</li>
                  <li>Short demo video (max 8 min — Loom, YouTube, or similar)</li>
                </ul>
                <p className="mt-2">You can also include a longer version if you want — just note that only the short one will be reviewed.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Is this a solo or team event?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base">
                Either! You can go solo or team up with friends. If it's a team project, include everyone's info on the form.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Do we need to follow a specific theme?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base">
                Yes! Updates on this matter to follow shortly.<br/>
                Need inspo? Check out our Weird Airtable Ideas gallery for fun prompts.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left text-lg font-semibold">
                How will winners be chosen?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base">
                There'll be three awards:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li><strong>Airtable's Official AI Award:</strong> Chosen by Alex McDonnell (Airtable's Director of Product Marketing) for the best use of Airtable's AI features.</li>
                  <li><strong>Basefluencer Award:</strong> Goes to the demo that racks up the most YouTube likes.</li>
                  <li><strong>Grand Jury Award:</strong> Picked by top Airtable agencies for best overall build.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left text-lg font-semibold">
                What about prizes?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base">
                Winners will score Airtable swag (available in North America, EMEA & LATAM), a feature in Airtable's Change Makers spotlight, and a free consultation session.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="text-center text-lg text-gray-700 mt-12 font-medium">
            Ready? Grab your snacks, open Airtable, and get ready for a 48-hour build-a-thon of creativity!
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Event Timeline</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-yellow flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Registrations are OPEN</h3>
                <p className="text-gray-600">Sign up and receive all details. Get ready to Hack!</p>
                <p className="text-sm text-airtable-yellow font-medium mt-2">Now</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-red flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Builder Mode: ON</h3>
                <p className="text-gray-600">Once registered, you can start working on your buildout. Get creative and build something amazing!</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-blue flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Submission</h3>
                <p className="text-gray-600">Submit your project before the deadline.</p>
                <p className="text-sm text-airtable-blue font-medium mt-2">Due: March 17, 2026</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-yellow flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Show Off</h3>
                <p className="text-gray-600">Share your demo and celebrate all participants!</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-airtable-red flex items-center justify-center text-white font-bold">
                5
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Winners Announced</h3>
                <p className="text-gray-600">The winners will be announced and celebrated!</p>
                <p className="text-sm text-airtable-red font-medium mt-2">March 30, 2026</p>
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
