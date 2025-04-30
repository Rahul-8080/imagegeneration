import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User, AuthState } from '../types';

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const loadUser = async () => {
      if (authState.token) {
        try {
          const res = await axios.get(`${API_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          });
          
          setAuthState({
            ...authState,
            user: res.data,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          localStorage.removeItem('token');
          setAuthState({
            ...authState,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setAuthState({
          ...authState,
          isLoading: false,
        });
      }
    };

    loadUser();
  }, [authState.token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setAuthState({
        ...authState,
        token: res.data.token,
        user: res.data.user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        ...authState,
        error: error.response?.data?.message || 'Login failed',
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      setAuthState({
        ...authState,
        token: res.data.token,
        user: res.data.user,
        isAuthenticated: true,
        error: null,
      });
    } catch (error: any) {
      setAuthState({
        ...authState,
        error: error.response?.data?.message || 'Registration failed',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setAuthState({ ...authState, error: null });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};