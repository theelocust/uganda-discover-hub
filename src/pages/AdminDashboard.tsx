import { useState } from "react";
import { 
  BarChart3, 
  Users, 
  Building, 
  Star, 
  TrendingUp, 
  Plus, 
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const stats = [
    {
      title: "Total Businesses",
      value: "1,234",
      change: "+12.5%",
      icon: Building,
      color: "text-blue-600"
    },
    {
      title: "Active Users",
      value: "5,678",
      change: "+8.2%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Total Reviews",
      value: "3,456",
      change: "+15.3%",
      icon: Star,
      color: "text-yellow-600"
    },
    {
      title: "Monthly Revenue",
      value: "UGX 2.4M",
      change: "+23.1%",
      icon: TrendingUp,
      color: "text-primary"
    }
  ];

  const recentBusinesses = [
    {
      id: 1,
      name: "Pearl Health Clinic",
      category: "Health & Clinics",
      owner: "Dr. Sarah Nakato",
      status: "Active",
      rating: 4.8,
      reviews: 127,
      dateAdded: "2024-01-15"
    },
    {
      id: 2,
      name: "Style Studio Salon",
      category: "Beauty & Salon",
      owner: "Mary Akello",
      status: "Pending",
      rating: 4.9,
      reviews: 89,
      dateAdded: "2024-01-14"
    },
    {
      id: 3,
      name: "Mama Rita's Kitchen",
      category: "Restaurant",
      owner: "Rita Namugga",
      status: "Active",
      rating: 4.7,
      reviews: 156,
      dateAdded: "2024-01-13"
    },
    {
      id: 4,
      name: "AutoCare Garage",
      category: "Auto Services",
      owner: "John Mukasa",
      status: "Inactive",
      rating: 4.6,
      reviews: 73,
      dateAdded: "2024-01-12"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case "Inactive":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">F</span>
                </div>
                <span className="text-xl font-bold text-secondary">FindMeUG Admin</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-primary hover:bg-primary-dark">
                <Plus className="h-4 w-4 mr-2" />
                Add Business
              </Button>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="card-gradient shadow-brand">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-secondary">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted/50`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="businesses">Businesses</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="card-gradient shadow-brand">
                <CardHeader>
                  <CardTitle className="text-secondary">Recent Activity</CardTitle>
                  <CardDescription>Latest updates from your platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New business registered</p>
                      <p className="text-xs text-muted-foreground">Pearl Health Clinic - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New review submitted</p>
                      <p className="text-xs text-muted-foreground">5-star review for Style Studio - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Business needs verification</p>
                      <p className="text-xs text-muted-foreground">AutoCare Garage - 6 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-gradient shadow-brand">
                <CardHeader>
                  <CardTitle className="text-secondary">Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-primary hover:bg-primary-dark">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Business
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Review Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="businesses" className="space-y-6">
            <Card className="card-gradient shadow-brand">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-secondary">Business Management</CardTitle>
                    <CardDescription>Manage all businesses on your platform</CardDescription>
                  </div>
                  <Button className="bg-primary hover:bg-primary-dark">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Business
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search businesses..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                {/* Businesses Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Reviews</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentBusinesses.map((business) => (
                      <TableRow key={business.id}>
                        <TableCell className="font-medium">{business.name}</TableCell>
                        <TableCell>{business.category}</TableCell>
                        <TableCell>{business.owner}</TableCell>
                        <TableCell>{getStatusBadge(business.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            {business.rating}
                          </div>
                        </TableCell>
                        <TableCell>{business.reviews}</TableCell>
                        <TableCell>{business.dateAdded}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="card-gradient shadow-brand">
              <CardHeader>
                <CardTitle className="text-secondary">User Management</CardTitle>
                <CardDescription>Manage platform users and their activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-secondary mb-2">User Management</h3>
                  <p className="text-muted-foreground">User management interface would be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="card-gradient shadow-brand">
              <CardHeader>
                <CardTitle className="text-secondary">Analytics Dashboard</CardTitle>
                <CardDescription>Platform performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-secondary mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground">Detailed analytics and reporting interface would be implemented here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;