"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { configureAmplify } from '@/utils/amplifyConfig';
import { useRouter } from 'next/navigation';

// Create the AuthContext
const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  isLoading: true
});

// AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Configure Amplify when the component mounts
    const initializeAuth = async () => {
      try {
        await configureAmplify();
        
        try {
          // Try to get the current authenticated user
          const currentUser = await getCurrentUser();
          setUser(currentUser);

          // If user is authenticated, check current path and redirect to /chat if needed
          const currentPath = window.location.pathname;
          if (currentPath === '/login' || currentPath === '/signup') {
            router.replace('/admin-panel');
          }
        } catch (error) {
          // No authenticated user
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      } catch (configError) {
        console.error('Error configuring Amplify:', configError);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  // Provide values for the context
  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;