import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Download, Trash2 } from 'lucide-react';
import { Image } from '../../types';

interface ImageCardProps {
  image: Image;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete, onToggleFavorite }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.imageUrl;
    link.download = `pixelmind-${image._id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden group"
    >
      <div className="relative">
        <img
          src={image.imageUrl}
          alt={image.prompt}
          className="w-full h-auto object-cover"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onToggleFavorite(image._id)}
            className="p-2 rounded-full bg-dark-300/80 backdrop-blur-sm hover:bg-primary-600 transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${
                image.isFavorite ? 'fill-primary-500 text-primary-500' : 'text-white'
              }`}
            />
          </button>
          
          <button
            onClick={handleDownload}
            className="p-2 rounded-full bg-dark-300/80 backdrop-blur-sm hover:bg-secondary-600 transition-colors"
          >
            <Download className="h-5 w-5 text-white" />
          </button>
          
          <button
            onClick={() => onDelete(image._id)}
            className="p-2 rounded-full bg-dark-300/80 backdrop-blur-sm hover:bg-red-600 transition-colors"
          >
            <Trash2 className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-300 line-clamp-2">
          {image.prompt}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {new Date(image.createdAt).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
};

export default ImageCard;