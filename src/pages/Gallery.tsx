import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useImage } from '../contexts/ImageContext';
import GalleryControls from '../components/gallery/GalleryControls';
import ImageGrid from '../components/gallery/ImageGrid';

const Gallery: React.FC = () => {
  const { authState } = useAuth();
  const { getUserImages } = useImage();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isAuthenticated && !authState.isLoading) {
      navigate('/login');
    }

    if (authState.isAuthenticated) {
      getUserImages();
    }
  }, [authState.isAuthenticated, authState.isLoading, navigate]);

  if (authState.isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <GalleryControls />
      <ImageGrid />
    </div>
  );
};

export default Gallery;