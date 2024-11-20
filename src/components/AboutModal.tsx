import React from 'react';
import { X, Flame } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: any;
}

export default function AboutModal({ isOpen, onClose, t }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideIn">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Flame className="h-6 w-6 text-blue-500" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">About IgnitionAI</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300">
              IgnitionAI is at the forefront of artificial intelligence innovation, specializing in creating 
              intelligent solutions that transform how businesses operate. Our expertise spans across RAG systems, 
              chatbots, LLM implementations, and multi-agent systems.
            </p>
            
            <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Our Mission</h4>
            <p className="text-gray-600 dark:text-gray-300">
              We're committed to making advanced AI technology accessible and practical for businesses of all sizes. 
              Our mission is to bridge the gap between cutting-edge AI research and real-world applications, 
              delivering solutions that drive tangible results.
            </p>

            <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Our Expertise</h4>
            <p className="text-gray-600 dark:text-gray-300">
              With a team of experienced AI researchers and engineers, we specialize in developing custom AI 
              solutions that address specific business challenges. Our deep understanding of language models, 
              retrieval systems, and multi-agent architectures allows us to create sophisticated yet user-friendly 
              AI applications.
            </p>

            <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Our Approach</h4>
            <p className="text-gray-600 dark:text-gray-300">
              We believe in a collaborative approach, working closely with our clients to understand their unique 
              needs and challenges. Our solutions are built with scalability, security, and performance in mind, 
              ensuring long-term value for our clients.
            </p>
          </div>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50">
          <button
            onClick={() => {
              onClose();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}