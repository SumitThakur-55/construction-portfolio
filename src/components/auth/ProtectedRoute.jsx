"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.replace('/login');
      }
    }
  }, [user, isLoading, router]);

  // Prevent rendering of children until authentication state is determined
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render children only if user is authenticated
  return user ? children : null;
}