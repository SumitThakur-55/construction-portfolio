"use client";
import { useState, useEffect } from 'react';
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import { configureAmplify } from '@/utils/amplifyConfig';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');
  const [isConfirmationStep, setIsConfirmationStep] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  // Initialize Amplify when component mounts
  useEffect(() => {
    const initAmplify = async () => {
      try {
        await configureAmplify();
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Amplify:', error);
        setError('Failed to initialize authentication service. Please try again later.');
      }
    };

    initAmplify();
  }, []);

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  };

  const validatePassword = (password) => {
    // AWS Cognito password policy: min 8 chars, upper, lower, number, symbol
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isInitialized) {
      setError('Authentication service is still initializing. Please wait...');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, number, and symbol');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email, // Using email as username per your Cognito config
        password,
        options: {
          userAttributes: {
            email,
            name: name.trim(),
            ...(dob && { 'custom:dob': dob }) // Add dob if provided
          }
        }
      });

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setIsConfirmationStep(true);
      } else if (isSignUpComplete) {
        router.push('/admin-panel');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      
      if (error.name === 'UsernameExistsException') {
        setError('An account with this email already exists. Please sign in instead.');
      } else if (error.name === 'InvalidParameterException') {
        setError('Please check your input and try again.');
      } else if (error.name === 'InvalidPasswordException') {
        setError('Password must be at least 8 characters with uppercase, lowercase, number, and symbol.');
      } else {
        setError(error.message || 'An error occurred during sign up');
      }
    }
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setError('');
    
    // Prevent multiple clicks
    if (isVerifying) return;
    
    // Set verifying state to true
    setIsVerifying(true);
  
    try {
      // Verify OTP
      const result = await confirmSignUp({
        username: email, // Using email as username
        confirmationCode
      });
  
      // After successful confirmation, attempt to sign in
      const signInResult = await signIn({
        username: email, // Using email as username
        password
      });
  
      // Update the user in the auth context
      setUser({
        username: email,
        email,
        name
      });
  
      // Redirect to admin-panel
      router.push('/admin-panel');
    } catch (error) {
      console.error('Confirmation error:', error);
      setError(error.message || 'Confirmation failed');
      // Reset verifying state on error
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-2.5rem)] flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />  
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className=" bg-white/10 border border-white/20 backdrop-blur-2xl p-8 rounded-2xl shadow-xl w-[90%] max-w-md relative "
          >
          <AnimatePresence mode="wait">
            {isConfirmationStep ? (
              <motion.form
                key="confirmation"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleConfirmation}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-white text-center mb-6">Verify Your Email</h2>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 mb-4 text-center bg-red-500/10 p-3 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-white/80 text-sm">Confirmation Code</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    className="w-full p-3 bg-transparent border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter the code sent to your email"
                    required
                  />
                </div>

                <div className="text-center text-white/80 text-sm">
                  <p>A verification code has been sent to {email}</p>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsConfirmationStep(false)}
                    className="flex-1 py-3 rounded-md bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: isVerifying ? 1 : 1.02 }}
                    whileTap={{ scale: isVerifying ? 1 : 0.98 }}
                    disabled={isVerifying}
                    className={`flex-1 py-3 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center ${isVerifying ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isVerifying ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying OTP...
                      </>
                    ) : (
                      'Confirm'
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 mb-4 text-center bg-red-500/10 p-3 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Form fields with enhanced styling */}
                <div className="space-y-2">
                  <label className="text-white/80 text-sm">Full Name *</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-transparent border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm">Email *</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-transparent border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email address"
                    required
                  />
                  <p className="text-white/60 text-xs">This will be used as your username</p>
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm">Date of Birth (Optional)</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-3 bg-transparent border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm">Password *</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 bg-transparent border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Create a strong password"
                    required
                  />
                  <p className="text-white/60 text-xs">
                    Must be 8+ characters with uppercase, lowercase, number, and symbol
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-white/80 text-sm">Confirm Password *</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 bg-transparent border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 mt-6 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-all shadow-lg"
                >
                  Create Account
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-6"
                >
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      Already have an account? <span className="underline">Sign In</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
 
      </div>
    </div>
  );
}