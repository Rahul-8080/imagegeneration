import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Image as ImageType, GenerationState, GalleryState } from '../types';
import { useAuth } from './AuthContext';

interface ImageContextProps {
  generationState: GenerationState;
  galleryState: GalleryState;
  generateImage: (prompt: string) => Promise<void>;
  saveGeneratedImage: () => Promise<void>;
  getUserImages: () => Promise<void>;
  deleteImage: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  filterFavorites: () => void;
  resetFilter: () => void;
  setPrompt: (prompt: string) => void;
  clearGeneratedImage: () => void;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const useImage = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const { authState } = useAuth();
  const [generationState, setGenerationState] = useState<GenerationState>({
    prompt: '',
    isGenerating: false,
    generatedImage: null,
    error: null,
  });

  const [galleryState, setGalleryState] = useState<GalleryState>({
    images: [] as ImageType[],
    filteredImages: [] as ImageType[],
    isLoading: false,
    error: null,
  });

  const API_URL = 'http://localhost:5000/api';

  const generateImage = async (prompt: string) => {
    if (!authState.isAuthenticated || !authState.token) {
      setGenerationState({
        ...generationState,
        error: 'Please log in to generate images',
        isGenerating: false,
      });
      return;
    }

    if (!prompt.trim()) {
      setGenerationState({
        ...generationState,
        error: 'Please enter a valid prompt',
        isGenerating: false,
      });
      return;
    }

    setGenerationState({
      ...generationState,
      isGenerating: true,
      error: null,
      prompt,
    });

    try {
      console.log('Generating image with prompt:', prompt);
      
      const res = await axios.post(
        `${API_URL}/images/generate`,
        { prompt: prompt.trim() },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
            'Content-Type': 'application/json',
          },
          timeout: 60000,
        }
      );

      if (!res.data?.imageUrl) {
        throw new Error('No image URL in response');
      }

      setGenerationState({
        ...generationState,
        isGenerating: false,
        generatedImage: res.data.imageUrl,
        prompt,
        error: null,
      });

    } catch (error: any) {
      console.error('Image generation failed:', error);
      
      const errorMessage = error.response?.data?.message || 'Failed to generate image';
      const errorDetails = error.response?.data?.details;
      
      setGenerationState({
        ...generationState,
        isGenerating: false,
        error: errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage,
      });
    }
  };

  const saveGeneratedImage = async () => {
    if (!generationState.generatedImage) return;

    try {
      await axios.post(
        `${API_URL}/images`,
        {
          prompt: generationState.prompt,
          imageUrl: generationState.generatedImage,
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      getUserImages();
    } catch (error: any) {
      console.error('Failed to save image:', error);
    }
  };

  const getUserImages = async () => {
    if (!authState.isAuthenticated) return;

    setGalleryState({
      ...galleryState,
      isLoading: true,
    });

    try {
      const res = await axios.get(`${API_URL}/images`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      setGalleryState({
        ...galleryState,
        images: res.data,
        filteredImages: res.data,
        isLoading: false,
      });
    } catch (error: any) {
      setGalleryState({
        ...galleryState,
        isLoading: false,
        error: error.response?.data?.message || 'Failed to fetch images',
      });
    }
  };

  const deleteImage = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/images/${id}`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      setGalleryState({
        ...galleryState,
        images: galleryState.images.filter((image) => image._id !== id),
        filteredImages: galleryState.filteredImages.filter((image) => image._id !== id),
      });
    } catch (error: any) {
      console.error('Failed to delete image:', error);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const res = await axios.put(
        `${API_URL}/images/${id}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      const updatedImage = res.data;

      setGalleryState({
        ...galleryState,
        images: galleryState.images.map((image) =>
          image._id === id ? { ...image, isFavorite: updatedImage.isFavorite } : image
        ),
        filteredImages: galleryState.filteredImages.map((image) =>
          image._id === id ? { ...image, isFavorite: updatedImage.isFavorite } : image
        ),
      });
    } catch (error: any) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const filterFavorites = () => {
    setGalleryState({
      ...galleryState,
      filteredImages: galleryState.images.filter((image) => image.isFavorite),
    });
  };

  const resetFilter = () => {
    setGalleryState({
      ...galleryState,
      filteredImages: galleryState.images,
    });
  };

  const setPrompt = (prompt: string) => {
    setGenerationState({
      ...generationState,
      prompt,
    });
  };

  const clearGeneratedImage = () => {
    setGenerationState({
      ...generationState,
      generatedImage: null,
    });
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      getUserImages();
    }
  }, [authState.isAuthenticated]);

  return (
    <ImageContext.Provider
      value={{
        generationState,
        galleryState,
        generateImage,
        saveGeneratedImage,
        getUserImages,
        deleteImage,
        toggleFavorite,
        filterFavorites,
        resetFilter,
        setPrompt,
        clearGeneratedImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};