
import React, { useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { AuthProvider } from '../components/auth/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import UserDashboard from '../components/dashboard/UserDashboard';
import StoreOwnerDashboard from '../components/dashboard/StoreOwnerDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Users, Star, Shield, UserCheck, Building } from 'lucide-react';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      case 'store_owner':
        return <StoreOwnerDashboard />;
      default:
        return <div>Unknown user role</div>;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
              <Store className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Store Rating Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover, rate, and review stores in your area. Join our community of customers and business owners creating better shopping experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">For Customers</CardTitle>
              <CardDescription>
                Browse stores, read reviews, and share your experiences with the community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Search stores by name and location</li>
                <li>• View ratings and reviews</li>
                <li>• Submit your own ratings</li>
                <li>• Update your reviews anytime</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="mx-auto p-3 bg-green-100 rounded-full w-fit mb-4">
                <Building className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">For Store Owners</CardTitle>
              <CardDescription>
                Monitor your store's reputation and engage with customer feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• View customer ratings</li>
                <li>• Track average store rating</li>
                <li>• See detailed feedback</li>
                <li>• Monitor review trends</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="mx-auto p-3 bg-purple-100 rounded-full w-fit mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">For Administrators</CardTitle>
              <CardDescription>
                Manage the platform with comprehensive admin tools and analytics.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• User and store management</li>
                <li>• Platform analytics dashboard</li>
                <li>• Add new users and stores</li>
                <li>• Monitor system activity</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Authentication Section */}
        <div className="max-w-md mx-auto">
          {isLoginMode ? (
            <LoginForm onToggleForm={() => setIsLoginMode(false)} />
          ) : (
            <SignupForm onToggleForm={() => setIsLoginMode(true)} />
          )}
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/60 backdrop-blur rounded-lg">
            <div className="flex justify-center mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">156+</div>
            <div className="text-gray-600">Registered Users</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur rounded-lg">
            <div className="flex justify-center mb-4">
              <Store className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">42+</div>
            <div className="text-gray-600">Active Stores</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur rounded-lg">
            <div className="flex justify-center mb-4">
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">1,284+</div>
            <div className="text-gray-600">Reviews Submitted</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
