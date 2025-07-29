"use client";
import SignUpForm from '@/components/auth/SignUpForm';
import { useEffect, useState } from 'react';

export default function SignUpPage() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Function to check if screen height is small
    const checkScreenHeight = () => {
      // Consider a screen small if it's less than 700px in height
      setIsSmallScreen(window.innerHeight < 700);
    };

    // Check on initial load
    checkScreenHeight();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenHeight);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenHeight);
  }, []);

  return (
    <div className={`min-h-screen ${isSmallScreen ? 'overflow-auto' : 'mt-5'}`}>
      <SignUpForm />
    </div>
  );
}