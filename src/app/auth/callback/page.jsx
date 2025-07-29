"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from 'aws-amplify/auth';
import { useAuth } from '@/components/auth/AuthContext';

export default function AuthCallback() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the current authenticated user after redirect
        const currentUser = await getCurrentUser();
        
        // Update the auth context
        setUser(currentUser);
        
        // Redirect to the admin-panel page
        router.replace('/admin-panel');
      } catch (error) {
        console.error('Error during authentication callback:', error);
        setError('Authentication failed. Please try again.');
        
        // Redirect to login page after a delay if there's an error
        setTimeout(() => {
          router.replace('/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [router, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />

        <div className="bg-white/10 border border-white/20 backdrop-blur-2xl p-8 rounded-2xl shadow-xl w-[90%] max-w-md relative">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            {error ? 'Authentication Failed' : 'Completing Sign In...'}
          </h2>
          
          {error ? (
            <div className="text-red-400 mb-4 text-center bg-red-500/10 p-3 rounded-lg">
              {error}
              <p className="mt-2 text-sm">Redirecting to login page...</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
