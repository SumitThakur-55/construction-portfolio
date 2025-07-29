'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push('/login');
        } else {
          setUser(currentUser);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, setUser]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-lg">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Admin Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">Welcome, {user?.username || 'Admin'}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-lg font-medium text-gray-300">Total Projects</h3>
            <p className="mt-2 text-3xl font-bold">12</p>
            <p className="mt-2 text-sm text-green-400">+2 from last month</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-lg font-medium text-gray-300">Active Users</h3>
            <p className="mt-2 text-3xl font-bold">156</p>
            <p className="mt-2 text-sm text-green-400">+12 from last week</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <h3 className="text-lg font-medium text-gray-300">Messages</h3>
            <p className="mt-2 text-3xl font-bold">8</p>
            <p className="mt-2 text-sm text-yellow-400">3 unread</p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <ul className="space-y-4">
              {[
                { id: 1, action: 'New project added', time: '2 hours ago', user: 'John Doe' },
                { id: 2, action: 'User registration', time: '5 hours ago', user: 'Jane Smith' },
                { id: 3, action: 'Project updated', time: '1 day ago', user: 'Mike Johnson' },
                { id: 4, action: 'New message received', time: '2 days ago', user: 'Sarah Williams' },
              ].map((item) => (
                <li key={item.id} className="border-b border-gray-700 pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-gray-400">by {item.user}</p>
                    </div>
                    <span className="text-sm text-gray-500">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;