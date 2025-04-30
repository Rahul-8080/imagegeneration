export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  _id: string;
  prompt: string;
  imageUrl: string;
  creator: string | User;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface GenerationState {
  prompt: string;
  isGenerating: boolean;
  generatedImage: string | null;
  error: string | null;
}

export interface GalleryState {
  images: Image[];
  filteredImages: Image[];
  isLoading: boolean;
  error: string | null;
}