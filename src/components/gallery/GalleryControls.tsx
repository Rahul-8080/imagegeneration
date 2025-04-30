import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Grid, Loader } from 'lucide-react';
import { useImage } from '../../contexts/ImageContext';

const GalleryControls: React.FC = () => {
  const { galleryState, filterFavorites, resetFilter, getUserImages } = useImage();
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'favorites'>('all');
  const [refreshing, setRefreshing] = React.useState(false);

  const handleFilterFavorites = () => {
    filterFavorites();
    setActiveFilter('favorites');
  };

  const handleResetFilter = () => {
    resetFilter();
    setActiveFilter('all');
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getUserImages();
    setRefreshing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap items-center justify-between gap-4 mb-6"
    >
      <h2 className="text-2xl font-bold text-white">Your Gallery</h2>
      
      <div className="flex space-x-2">
        <button
          onClick={handleResetFilter}
          className={`btn ${
            activeFilter === 'all'
              ? 'btn-primary'
              : 'btn-outline'
          }`}
        >
          <Grid className="h-4 w-4 mr-1" />
          All
        </button>
        
        <button
          onClick={handleFilterFavorites}
          className={`btn ${
            activeFilter === 'favorites'
              ? 'btn-primary'
              : 'btn-outline'
          }`}
        >
          <Heart className="h-4 w-4 mr-1" />
          Favorites
        </button>
        
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="btn btn-outline"
        >
          {refreshing ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 2v6h-6"></path>
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
              <path d="M3 22v-6h6"></path>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
            </svg>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default GalleryControls;