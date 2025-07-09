
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Store, 
  Star, 
  LogOut, 
  Users,
  TrendingUp,
  User,
  Key
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StoreOwnerDashboard: React.FC = () => {
  const { logout, user, updatePassword } = useAuth();
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Mock store data
  const storeData = {
    name: 'Best Electronics Store Chain',
    address: '123 Tech Street, Electronics District, Tech City 12345',
    averageRating: 4.2,
    totalRatings: 156,
    totalUsers: 89
  };

  // Mock ratings data
  const recentRatings = [
    { id: '1', userName: 'John Doe Regular User Account', rating: 5, date: '2024-01-15', comment: 'Excellent service and great products!' },
    { id: '2', userName: 'Jane Smith Customer Account', rating: 4, date: '2024-01-14', comment: 'Good selection, helpful staff.' },
    { id: '3', userName: 'Mike Johnson Buyer Account', rating: 3, date: '2024-01-13', comment: 'Average experience, could be better.' },
    { id: '4', userName: 'Sarah Wilson Shopper Account', rating: 5, date: '2024-01-12', comment: 'Outstanding customer service!' },
    { id: '5', userName: 'David Brown Consumer Account', rating: 4, date: '2024-01-11', comment: 'Quality products, reasonable prices.' },
  ];

  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;
    if (!passwordRegex.test(newPassword)) {
      toast({
        title: "Error",
        description: "Password must be 8-16 characters with at least one uppercase letter and one special character",
        variant: "destructive",
      });
      return;
    }

    const success = await updatePassword(newPassword);
    if (success) {
      toast({
        title: "Success",
        description: "Password updated successfully",
      });
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    recentRatings.forEach(rating => {
      distribution[rating.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Store Owner Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
          </div>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Store Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeData.averageRating}</div>
              <p className="text-xs opacity-80">Out of 5 stars</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeData.totalRatings}</div>
              <p className="text-xs opacity-80">Customer reviews</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users Rated</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeData.totalUsers}</div>
              <p className="text-xs opacity-80">Unique customers</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ratings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ratings">Customer Ratings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="ratings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Customer Ratings & Reviews
                </CardTitle>
                <CardDescription>
                  See what customers are saying about your store
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRatings.map((rating) => (
                    <div key={rating.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{rating.userName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {renderStars(rating.rating)}
                            <span className="text-sm text-gray-600">{rating.rating}/5</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{rating.date}</span>
                      </div>
                      {rating.comment && (
                        <p className="text-gray-700 mt-2">{rating.comment}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of customer ratings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium">{rating}</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ 
                              width: `${(ratingDistribution[rating as keyof typeof ratingDistribution] / recentRatings.length) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">
                          {ratingDistribution[rating as keyof typeof ratingDistribution]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>
                    Your store details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Store Name</Label>
                    <div className="p-3 bg-gray-50 rounded-md">{storeData.name}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <div className="p-3 bg-gray-50 rounded-md">{storeData.address}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Current Rating</Label>
                    <div className="p-3 bg-gray-50 rounded-md flex items-center gap-2">
                      {renderStars(Math.round(storeData.averageRating))}
                      <span className="font-medium">{storeData.averageRating}/5</span>
                      <Badge variant="secondary">{storeData.totalRatings} reviews</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                  <CardDescription>
                    Your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <div className="p-3 bg-gray-50 rounded-md">{user?.name}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="p-3 bg-gray-50 rounded-md">{user?.email}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <div className="p-3 bg-gray-50 rounded-md">{user?.address}</div>
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <Badge variant="outline">Store Owner</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Update Password
                  </CardTitle>
                  <CardDescription>
                    Change your account password
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-xs text-gray-600">
                    Password must be 8-16 characters with at least one uppercase letter and one special character.
                  </div>
                  <Button 
                    onClick={handlePasswordUpdate}
                    disabled={!newPassword || !confirmPassword}
                    className="w-full"
                  >
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
