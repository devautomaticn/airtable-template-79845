
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative h-8 w-8">
                <div className="absolute top-0 left-0 h-3.5 w-3.5 bg-airtable-yellow rounded-sm transform rotate-45" />
                <div className="absolute bottom-0 left-0 h-3.5 w-3.5 bg-airtable-pink rounded-sm" />
                <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-airtable-blue rounded-sm" />
              </div>
              <span className="font-bold text-lg text-airtable-black">Airtable Template</span>
            </div>
            <p className="text-gray-600 text-sm mb-6 max-w-md">
              Join innovators, builders, and creators from around the world to push the boundaries of what's possible with Airtable. Build, learn, and win amazing prizes!
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Airtable Template. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
