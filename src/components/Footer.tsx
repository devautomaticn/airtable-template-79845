
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

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
              Premium Airtable templates to streamline your workflow, increase productivity, and organize your data effectively.
            </p>
            <div className="flex space-x-4">
              <a href="https://ar.linkedin.com/in/simmonsm" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-airtable-blue hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm text-airtable-black uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://automaticnation.com/blog" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-airtable-blue text-sm">Blog</a>
              </li>
              <li>
                <a href="https://automaticnation.com/book-a-call" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-airtable-blue text-sm">Contact</a>
              </li>
              <li>
                <Link to="/submit-template" className="text-gray-600 hover:text-airtable-blue text-sm">Submit Template</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Airtable Template. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="text-xs text-gray-500 hover:text-airtable-blue">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs text-gray-500 hover:text-airtable-blue">
              Terms of Service
            </Link>
            <Link to="/" className="text-xs text-gray-500 hover:text-airtable-blue">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
