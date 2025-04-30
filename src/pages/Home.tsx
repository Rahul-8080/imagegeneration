import React from 'react';
import { motion } from 'framer-motion';
import PromptForm from '../components/generator/PromptForm';
import ImagePreview from '../components/generator/ImagePreview';
import { Sparkles, ImageIcon, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-500 bg-clip-text text-transparent mb-4">
          Transform Your Ideas Into Images
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Type a prompt, and watch AI bring your imagination to life with stunning visual creations.
        </p>
      </motion.div>

      <PromptForm />
      <ImagePreview />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary-900 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Describe</h3>
            <p className="text-gray-400">
              Enter a detailed description of the image you want to create using natural language.
            </p>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-secondary-900 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-secondary-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Generate</h3>
            <p className="text-gray-400">
              Our AI processes your prompt and creates a unique image matching your description.
            </p>
          </div>
          
          <div className="glass-card p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-accent-900 flex items-center justify-center mb-4">
              <ImageIcon className="h-6 w-6 text-accent-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Download</h3>
            <p className="text-gray-400">
              Save your creation to your gallery or download it directly to your device.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;