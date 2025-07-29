"use client";
import { useState } from 'react';
import { signIn, getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    try {
      const { isSignedIn, nextStep } = await signIn({ 
        username: email, 
        password,
      });
      
      if (isSignedIn) {
        try {
          const user = await getCurrentUser();
          setUser({
            username: email,
            email: email,
            ...user
          });
          setShowSuccess(true);
          setTimeout(() => {
            router.push('/chat');
          }, 1500);
        } catch (userError) {
          console.error('User retrieval error:', userError);
          setError('Unable to retrieve user information');
        }
      } else if (nextStep) {
        switch (nextStep.signInStep) {
          case 'CONFIRM_SIGN_UP':
            router.push(`/confirm-signup?email=${encodeURIComponent(email)}`);
            break;
          case 'RESET_PASSWORD':
            router.push(`/reset-password?email=${encodeURIComponent(email)}`);
            break;
          case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED':
            setError('Please set a new password');
            break;
          default:
            setError('Additional authentication steps required');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      
      // Handle specific AWS Cognito errors
      if (error.name === 'NotAuthorizedException') {
        setError('Invalid email or password. Please try again.');
      } else if (error.name === 'UserNotConfirmedException') {
        setError('Please verify your email address before signing in.');
        // Optionally redirect to confirmation page
        setTimeout(() => {
          router.push(`/confirm-signup?email=${encodeURIComponent(email)}`);
        }, 2000);
      } else if (error.name === 'UserNotFoundException') {
        setError('No account found with this email. Please sign up first.');
      } else if (error.name === 'TooManyRequestsException') {
        setError('Too many login attempts. Please try again later.');
      } else if (error.name === 'InvalidParameterException') {
        setError('Please check your email and password format.');
      } else {
        setError(error.message || 'An error occurred during login');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 border border-white/20 backdrop-blur-2xl p-8 rounded-2xl shadow-xl w-[90%] max-w-md relative"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Welcome Back</h2>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-400 mb-4 text-center bg-red-500/10 p-3 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-green-400 mb-4 text-center bg-green-500/10 p-3 rounded-lg"
              >
                Login successful! Redirecting...
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-white/80 text-sm">Email Address</label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full p-3 bg-transparent border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-white/80 text-sm">Password</label>
              <div className="relative">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-3 bg-transparent border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all pr-10"
                  required
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Sign In
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Link href="/sign-up">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Don't have an account? <span className="underline">Sign Up</span>
                </motion.button>
              </Link>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}