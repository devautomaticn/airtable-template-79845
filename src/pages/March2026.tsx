import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const March2026 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">March 2026 Submissions!</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Help participants win the Basefulencer award by liking your most favorite submissions on Youtube!
          </p>
          
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <iframe 
              className="airtable-embed w-full" 
              src="https://airtable.com/embed/appdPfhaKZFhHNvoT/shrl6wrRuDBA2VDcf" 
              frameBorder="0" 
              width="100%" 
              height="1000" 
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

export default March2026;
