import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/');
    }
  }, [authState.isAuthenticated, navigate]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
        <p className="text-gray-400">Sign up to save and share your AI-generated images</p>
      </div>
      <AuthForm type="register" />
    </div>
  );
};

export default Register;