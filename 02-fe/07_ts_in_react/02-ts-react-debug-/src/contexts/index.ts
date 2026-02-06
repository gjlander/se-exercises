import { createContext, use } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { default as AuthProvider } from './AuthProvider';
