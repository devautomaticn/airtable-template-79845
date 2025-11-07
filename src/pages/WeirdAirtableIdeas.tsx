import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WeirdAirtableIdeas = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            💡 Weird Airtable Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Need inspiration for the hackathon? Check out these creative and unique Airtable project ideas 
            to spark your imagination. From quirky to practical, there's something here for everyone!
          </p>
        </div>
      </section>

      {/* Airtable Embed Section */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <iframe 
              className="airtable-embed w-full" 
              src="https://airtable.com/embed/appdPfhaKZFhHNvoT/shrz6UN38BtEp94YC" 
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

export default WeirdAirtableIdeas;
