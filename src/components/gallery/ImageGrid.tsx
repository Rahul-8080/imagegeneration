import React from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { useImage } from '../../contexts/ImageContext';
import ImageCard from '../ui/ImageCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Image } from 'lucide-react';

const ImageGrid: React.FC = () => {
  const { galleryState, deleteImage, toggleFavorite } = useImage();

  const breakpointColumns = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  if (galleryState.isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" text="Loading your images..." />
      </div>
    );
  }

  if (galleryState.filteredImages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="glass-card p-8 text-center"
      >
        <Image className="h-16 w-16 mx-auto text-gray-600 mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">No images found</h3>
        <p className="text-gray-400 mb-6">
          You haven't created any images yet. Head to the create page to generate some amazing visuals!
        </p>
        <a href="/" className="btn-primary inline-block">
          Create an Image
        </a>
      </motion.div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {galleryState.filteredImages.map((image) => (
        <ImageCard
          key={image._id}
          image={image}
          onDelete={deleteImage}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </Masonry>
  );
};

export default ImageGrid;