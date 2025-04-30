import React from 'react';
import { motion } from 'framer-motion';

interface PromptSuggestionProps {
  onSelect: (prompt: string) => void;
}

const PromptSuggestions: React.FC<PromptSuggestionProps> = ({ onSelect }) => {
  const suggestions = [
    "A futuristic city with flying cars and neon lights",
    "A serene forest lake with mountains in the background at sunset",
    "An astronaut riding a horse on the moon",
    "A fantasy castle on a floating island in the clouds",
    "A cyberpunk cafe with robot baristas in Tokyo",
    "A surreal underwater city with merfolk",
  ];

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-400 mb-3">Try these prompts:</h3>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="text-xs bg-dark-100 hover:bg-primary-900/50 border border-gray-700 rounded-full px-3 py-1 text-gray-300 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            {suggestion.length > 30 ? suggestion.substring(0, 30) + '...' : suggestion}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestions;