
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Store, 
  Star, 
  LogOut,
  Search,
  Plus,
  Filter,
  Eye,
  ArrowUpDown
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Mock data
  const stats = {
    totalUsers: 156,
    totalStores: 42,
    totalRatings: 1284
  };

  const mockUsers = [
    { id: '1', name: 'John Doe Regular User Account', email: 'john@example.com', address: '123 Main St, City, State 12345', role: 'user' },
    { id: '2', name: 'Jane Smith Store Owner Business', email: 'jane@store.com', address: '456 Business Ave, City, State 67890', role: 'store_owner', rating: 4.5 },
    { id: '3', name: 'Mike Johnson Administrator Account', email: 'mike@admin.com', address: '789 Admin Blvd, City, State 54321', role: 'admin' },
  ];

  const mockStores = [
    { id: '1', name: 'Best Electronics Store Chain', email: 'contact@electronics.com', address: '123 Tech Street, Electronics District, Tech City 12345', rating: 4.2 },
    { id: '2', name: 'Gourmet Food Market Premium', email: 'info@gourmet.com', address: '456 Food Avenue, Culinary Quarter, Food City 67890', rating: 4.7 },
    { id: '3', name: 'Fashion Boutique Designer', email: 'hello@fashion.com', address: '789 Style Boulevard, Fashion District, Style City 54321', rating: 4.0 },
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage users, stores, and view system statistics</p>
          </div>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs opacity-80">Registered on platform</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
              <Store className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStores}</div>
              <p className="text-xs opacity-80">Active stores</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
              <Star className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRatings}</div>
              <p className="text-xs opacity-80">Submitted ratings</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="stores">Manage Stores</TabsTrigger>
            <TabsTrigger value="add">Add New</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  View and manage all registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <Label htmlFor="search">Search Users</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="search"
                        placeholder="Search by name, email, or address"
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="sm:w-48">
                    <Label htmlFor="role-filter">Filter by Role</Label>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="user">Normal User</SelectItem>
                        <SelectItem value="store_owner">Store Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Users Table */}
                <div className="rounded-md border">
                  <div className="bg-gray-50 px-6 py-3 border-b">
                    <div className="grid grid-cols-12 gap-4 font-medium text-sm">
                      <div className="col-span-3 flex items-center gap-1 cursor-pointer" onClick={() => handleSort('name')}>
                        Name <ArrowUpDown className="h-3 w-3" />
                      </div>
                      <div className="col-span-3 flex items-center gap-1 cursor-pointer" onClick={() => handleSort('email')}>
                        Email <ArrowUpDown className="h-3 w-3" />
                      </div>
                      <div className="col-span-4 flex items-center gap-1 cursor-pointer" onClick={() => handleSort('address')}>
                        Address <ArrowUpDown className="h-3 w-3" />
                      </div>
                      <div className="col-span-1">Role</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {mockUsers.map((user) => (
                      <div key={user.id} className="px-6 py-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3 font-medium">{user.name}</div>
                          <div className="col-span-3 text-gray-600">{user.email}</div>
                          <div className="col-span-4 text-gray-600 text-sm">{user.address}</div>
                          <div className="col-span-1">
                            <Badge variant={user.role === 'admin' ? 'default' : user.role === 'store_owner' ? 'secondary' : 'outline'}>
                              {user.role === 'store_owner' ? 'Store Owner' : user.role === 'admin' ? 'Admin' : 'User'}
                            </Badge>
                          </div>
                          <div className="col-span-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {user.rating && (
                          <div className="mt-2 ml-0">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              Store Rating: {user.rating}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stores">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Store Management
                </CardTitle>
                <CardDescription>
                  View and manage all registered stores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="bg-gray-50 px-6 py-3 border-b">
                    <div className="grid grid-cols-12 gap-4 font-medium text-sm">
                      <div className="col-span-3">Store Name</div>
                      <div className="col-span-3">Email</div>
                      <div className="col-span-4">Address</div>
                      <div className="col-span-1">Rating</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {mockStores.map((store) => (
                      <div key={store.id} className="px-6 py-4">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-3 font-medium">{store.name}</div>
                          <div className="col-span-3 text-gray-600">{store.email}</div>
                          <div className="col-span-4 text-gray-600 text-sm">{store.address}</div>
                          <div className="col-span-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{store.rating}</span>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New User
                  </CardTitle>
                  <CardDescription>
                    Create a new user account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Name</Label>
                    <Input id="user-name" placeholder="Enter full name (20-60 characters)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email</Label>
                    <Input id="user-email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-password">Password</Label>
                    <Input id="user-password" type="password" placeholder="Enter password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-address">Address</Label>
                    <Input id="user-address" placeholder="Enter address (max 400 chars)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Normal User</SelectItem>
                        <SelectItem value="store_owner">Store Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Create User</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Store
                  </CardTitle>
                  <CardDescription>
                    Register a new store
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input id="store-name" placeholder="Enter store name (20-60 characters)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email</Label>
                    <Input id="store-email" type="email" placeholder="Enter store email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-address">Address</Label>
                    <Input id="store-address" placeholder="Enter store address (max 400 chars)" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-password">Owner Password</Label>
                    <Input id="owner-password" type="password" placeholder="Enter owner password" />
                  </div>
                  <Button className="w-full">Create Store</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
