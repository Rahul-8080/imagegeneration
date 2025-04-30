import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Save, RefreshCw } from 'lucide-react';
import { useImage } from '../../contexts/ImageContext';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const ImagePreview: React.FC = () => {
  const { generationState, saveGeneratedImage, clearGeneratedImage } = useImage();
  const { authState } = useAuth();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleDownload = () => {
    if (!generationState.generatedImage) return;
    
    const link = document.createElement('a');
    link.href = generationState.generatedImage;
    link.download = `pixelmind-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = async () => {
    if (!generationState.generatedImage || !authState.isAuthenticated) return;
    
    setSaving(true);
    try {
      await saveGeneratedImage();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error('Failed to save image:', error);
    } finally {
      setSaving(false);
    }
  };

  if (generationState.isGenerating) {
    return (
      <div className="w-full max-w-xl mx-auto mt-8">
        <div className="glass-card p-8 flex items-center justify-center" style={{ minHeight: '300px' }}>
          <div className="text-center">
            <LoadingSpinner size="lg" text="Creating your masterpiece..." />
            <p className="mt-4 text-sm text-gray-400 max-w-md">
              Our AI is crafting your image. This might take a moment as we're generating a unique creation just for you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {generationState.generatedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl mx-auto mt-8"
        >
          <div className="glass-card p-4 overflow-hidden">
            <div className="relative">
              <img
                src={generationState.generatedImage}
                alt={generationState.prompt}
                className="w-full h-auto rounded"
              />
              
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-full bg-dark-300/80 backdrop-blur-sm hover:bg-secondary-600 transition-colors"
                  title="Download image"
                >
                  <Download className="h-5 w-5 text-white" />
                </button>
                
                {authState.isAuthenticated && (
                  <button
                    onClick={handleSave}
                    disabled={saving || saved}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                      saved 
                        ? 'bg-green-600' 
                        : 'bg-dark-300/80 hover:bg-primary-600'
                    }`}
                    title="Save to gallery"
                  >
                    {saving ? (
                      <RefreshCw className="h-5 w-5 text-white animate-spin" />
                    ) : (
                      <Save className="h-5 w-5 text-white" />
                    )}
                  </button>
                )}
                
                <button
                  onClick={clearGeneratedImage}
                  className="p-2 rounded-full bg-dark-300/80 backdrop-blur-sm hover:bg-accent-600 transition-colors"
                  title="Generate new image"
                >
                  <RefreshCw className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
            
            <div className="p-2 mt-2">
              <p className="text-sm text-gray-300">
                {generationState.prompt}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreview;