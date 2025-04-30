import React from 'react';
import { Link } from 'react-router-dom';
import { FolderX } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <FolderX className="h-24 w-24 text-primary-500 mb-6" />
      <h1 className="text-4xl font-bold text-white mb-2">404</h1>
      <p className="text-xl text-gray-400 mb-8">Page not found</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </p>
      <Link to="/" className="btn-primary">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;