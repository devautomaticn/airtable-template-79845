import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import alexImage from '@/assets/alex-mcdonnell.jpeg';
import benImage from '@/assets/ben-green.jpeg';
import alliImage from '@/assets/alli-allosa.webp';
import kamilleImage from '@/assets/kamille-parks.jpeg';

const November2025 = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-6 md:px-12 bg-gradient-to-b from-airtable-blue/10 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">November 2025 Hackathon</h1>
          <p className="text-lg text-gray-600">November 21st & 22nd, 2025</p>
        </div>
      </section>
      
      {/* 2025 Winners Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            🏆 Our 2025 Winners
          </h2>
          
          <div className="space-y-8">
            {/* Airtable's Official Award */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-airtable-blue/20">
              <h3 className="text-2xl font-bold mb-4 text-airtable-blue">Airtable&apos;s Official Award — AI Focused:</h3>
              <p className="text-lg text-gray-700">
                My Dodgeball Hub — by Erica Pascual (<a href="https://www.youtube.com/watch?v=VLczewfGwEo&t=124s" target="_blank" rel="noopener noreferrer" className="text-airtable-blue hover:underline font-medium">check it out</a>)
              </p>
            </div>

            {/* Basefluencer Award */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-airtable-pink/20">
              <h3 className="text-2xl font-bold mb-4 text-airtable-pink">Basefluencer Award:</h3>
              <p className="text-lg text-gray-700">
                My Dodgeball Hub — by Erica Pascual (<a href="https://www.youtube.com/watch?v=VLczewfGwEo&t=124s" target="_blank" rel="noopener noreferrer" className="text-airtable-pink hover:underline font-medium">check it out</a>)
              </p>
            </div>

            {/* Grand Jury Award */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-airtable-yellow/20">
              <h3 className="text-2xl font-bold mb-4 text-airtable-yellow">Grand Jury Award:</h3>
              <p className="text-lg text-gray-700">
                Benefit Bridge — by Alec Beckham & Katie Hilbert (<a href="https://www.youtube.com/watch?v=btKx2Y1c_BI&t=78s" target="_blank" rel="noopener noreferrer" className="text-airtable-yellow hover:underline font-medium">check it out</a>)
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Submission Form */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">2025 Submissions</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Check out submissions for our 2025 edition. Winners will be announced on Wednesday, November 26.<br/><br/>
            Make sure spread the word, and like your favorite builds! The most liked video will win our Basefluencer Award.
          </p>
          
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <iframe 
              className="airtable-embed w-full" 
              src="https://airtable.com/embed/appdPfhaKZFhHNvoT/shrAVc8PRlPjGa2Jv" 
              frameBorder="0" 
              width="100%" 
              height="900" 
              style={{ background: 'transparent', border: '1px solid #ccc' }}
            />
          </div>
        </div>
      </section>
      
      {/* Awards Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            🏆 Three Awards. 🙌
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
              <p className="text-lg text-gray-700 mb-6">
                Top Airtable Agencies will join forces to crown the community's best overall build. 🧠
              </p>
              
              <div className="space-y-6">
                {/* Alli Allosa */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img 
                    src={alliImage} 
                    alt="Alli Allosa" 
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-airtable-yellow shadow-lg"
                  />
                  <p className="text-lg text-gray-700 flex-1">
                    <strong>Alli Allosa:</strong> Accomplished Airtable Consultant and leading industry expert with thousands of hours experience helping individuals and teams both large and small. Alli's favorite parts about Airtable Consulting are learning about different industries, building intuitive tools, and empowering users to enjoy their work.
                  </p>
                </div>

                {/* Ben Green */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img 
                    src={benImage} 
                    alt="Ben Green" 
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-airtable-yellow shadow-lg"
                  />
                  <p className="text-lg text-gray-700 flex-1">
                    <strong>Ben Green:</strong> Co-founder of Optimize IS, Airtable's Partner of the Year for 2024 & 2025.
                  </p>
                </div>

                {/* Kamille Parks */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img 
                    src={kamilleImage} 
                    alt="Kamille Parks" 
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-airtable-yellow shadow-lg"
                  />
                  <p className="text-lg text-gray-700 flex-1">
                    <strong>Kamille Parks:</strong> Airtable expert, a low-code developer, and podcast host dedicated to providing user-friendly solutions to clients!
                  </p>
                </div>
              </div>
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
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default November2025;
