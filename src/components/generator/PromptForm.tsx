import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Lock } from 'lucide-react';
import { useImage } from '../../contexts/ImageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import PromptSuggestions from '../ui/PromptSuggestions';

const PromptForm: React.FC = () => {
  const { generationState, generateImage, setPrompt } = useImage();
  const { authState } = useAuth();
  const [localPrompt, setLocalPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localPrompt.trim()) return;
    if (!authState.isAuthenticated) {
      // Don't proceed if not authenticated
      return;
    }
    generateImage(localPrompt);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setLocalPrompt(suggestion);
    setPrompt(suggestion);
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-6 text-center"
        >
          <Lock className="h-12 w-12 mx-auto text-primary-500 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-400 mb-4">Please log in or create an account to generate images</p>
          <div className="flex justify-center gap-4">
            <Link to="/login" className="btn-primary">
              Log In
            </Link>
            <Link to="/register" className="btn-outline">
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onSubmit={handleSubmit}
        className="glass-card p-6"
      >
        <div className="space-y-4">
          {generationState.error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded">
              {generationState.error}
            </div>
          )}
          <label htmlFor="prompt" className="block text-lg font-medium text-white">
            Describe your image
          </label>
          <textarea
            id="prompt"
            rows={3}
            className="input w-full resize-none"
            placeholder="A futuristic city with flying cars and neon lights..."
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)}
            disabled={generationState.isGenerating}
            required
          />

          <button
            type="submit"
            disabled={generationState.isGenerating || !localPrompt.trim()}
            className="btn-primary w-full py-3 mt-2"
          >
            {generationState.isGenerating ? (
              <span className="flex items-center justify-center">
                <RefreshCw className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Image
              </span>
            )}
          </button>

          <PromptSuggestions onSelect={handleSuggestionSelect} />
        </div>
      </motion.form>
    </div>
  );
};

export default PromptForm;