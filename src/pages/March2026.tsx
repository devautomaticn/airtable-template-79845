import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const March2026 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Coming Soon Section */}
      <section className="flex-1 flex items-center justify-center px-6 md:px-12 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <span className="text-6xl">🚀</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-airtable-blue via-airtable-pink to-airtable-yellow bg-clip-text text-transparent">
            Coming Soon
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The March 2026 Hackathon is in the works! Stay tuned for exciting announcements.
          </p>
          <div className="bg-gradient-to-r from-airtable-blue/10 via-airtable-pink/10 to-airtable-yellow/10 rounded-2xl p-8 inline-block">
            <p className="text-lg font-medium text-gray-700">
              Sign up on our homepage to be notified when registration opens!
            </p>
          </div>
        </div>
      </section>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default March2026;
