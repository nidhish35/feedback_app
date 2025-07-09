
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Store, 
  Star, 
  LogOut, 
  Search, 
  MapPin, 
  Edit,
  User,
  Key
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Store {
  id: string;
  name: string;
  address: string;
  rating: number;
  userRating?: number;
}

const UserDashboard: React.FC = () => {
  const { logout, user, updatePassword } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [rating, setRating] = useState(0);

  // Mock store data
  const mockStores: Store[] = [
    { id: '1', name: 'Best Electronics Store Chain', address: '123 Tech Street, Electronics District, Tech City 12345', rating: 4.2, userRating: 4 },
    { id: '2', name: 'Gourmet Food Market Premium', address: '456 Food Avenue, Culinary Quarter, Food City 67890', rating: 4.7 },
    { id: '3', name: 'Fashion Boutique Designer Outlet', address: '789 Style Boulevard, Fashion District, Style City 54321', rating: 4.0, userRating: 5 },
    { id: '4', name: 'Home Improvement Hardware Store', address: '321 Builder Street, Construction Quarter, Build City 98765', rating: 3.8 },
    { id: '5', name: 'Organic Health Food Supermarket', address: '654 Wellness Avenue, Health District, Wellness City 13579', rating: 4.5, userRating: 3 },
  ];

  const filteredStores = mockStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleRatingSubmit = (storeId: string, newRating: number) => {
    toast({
      title: "Rating submitted",
      description: `You rated this store ${newRating} stars`,
    });
    setSelectedStore(null);
    setRating(0);
  };

  const renderStars = (currentRating: number, onStarClick?: (rating: number) => void, size: 'sm' | 'md' = 'md') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= currentRating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            } ${onStarClick ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
          </div>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="stores" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stores">Browse Stores</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="stores">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Store Directory
                </CardTitle>
                <CardDescription>
                  Browse and rate stores on our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="mb-6">
                  <Label htmlFor="search">Search Stores</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Search by store name or address"
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Stores Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStores.map((store) => (
                    <Card key={store.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{store.name}</CardTitle>
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mt-1" />
                          <span>{store.address}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Overall Rating:</span>
                            {renderStars(store.rating, undefined, 'sm')}
                            <span className="text-sm text-gray-600">({store.rating})</span>
                          </div>
                        </div>

                        {store.userRating && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Your Rating:</span>
                            {renderStars(store.userRating, undefined, 'sm')}
                            <Badge variant="secondary">Rated</Badge>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => {
                                  setSelectedStore(store);
                                  setRating(store.userRating || 0);
                                }}
                              >
                                <Star className="h-4 w-4 mr-1" />
                                {store.userRating ? 'Update Rating' : 'Rate Store'}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Rate {selectedStore?.name}</DialogTitle>
                                <DialogDescription>
                                  How would you rate your experience with this store?
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex justify-center">
                                  {renderStars(rating, setRating)}
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    onClick={() => handleRatingSubmit(selectedStore?.id || '', rating)}
                                    disabled={rating === 0}
                                    className="flex-1"
                                  >
                                    Submit Rating
                                  </Button>
                                  <Button variant="outline" onClick={() => setSelectedStore(null)}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredStores.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No stores found matching your search criteria.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
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
                      <Badge variant="outline">Normal User</Badge>
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

export default UserDashboard;
