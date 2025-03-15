
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageTransition from "@/components/PageTransition";
import { ArrowLeft, Upload, User, Settings } from "lucide-react";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  bio: z.string().max(160, "Bio must not exceed 160 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const mockUserData = {
  id: "user123",
  name: "John Doe",
  username: "johndoe",
  bio: "Video creator and editor. Love to share my creative work!",
  email: "john.doe@example.com",
  avatarUrl: "",
  createdAt: "2023-01-15T00:00:00.000Z",
  videosCount: 12,
  subscribersCount: 256,
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: mockUserData.name,
      username: mockUserData.username,
      bio: mockUserData.bio,
      email: mockUserData.email,
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to update profile
      console.log("Updating profile with:", values);
      
      // Simulate successful update after delay
      setTimeout(() => {
        toast.success("Profile updated successfully!");
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    // Simulate sign out
    toast.success("Signed out successfully!");
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-12">
        <div className="container max-w-4xl py-8 px-4 md:px-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")} 
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={mockUserData.avatarUrl} />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {mockUserData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">{mockUserData.name}</h1>
                <p className="text-muted-foreground">@{mockUserData.username}</p>
                <div className="flex gap-4 text-sm">
                  <span><strong>{mockUserData.videosCount}</strong> videos</span>
                  <span><strong>{mockUserData.subscribersCount}</strong> subscribers</span>
                  <span>Joined {formatDate(mockUserData.createdAt)}</span>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="videos">My Videos</TabsTrigger>
                <TabsTrigger value="edit-profile">Edit Profile</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="videos" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">My Videos</h2>
                  <Button onClick={() => navigate("/upload")}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New
                  </Button>
                </div>
                
                {mockUserData.videosCount > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* This is just a placeholder for demonstration */}
                    <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                      <p className="text-muted-foreground">Video content would appear here</p>
                    </div>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <User className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No videos yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Upload your first video to start sharing your content.
                      </p>
                      <Button onClick={() => navigate("/upload")}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Video
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="edit-profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>
                      Update your profile information and how others see you on the platform.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                  <Input {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} disabled={isLoading} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea 
                                  {...field} 
                                  rows={3} 
                                  placeholder="Tell us about yourself" 
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account settings and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">
                        Update your password to keep your account secure.
                      </p>
                      <Button variant="outline">Change Password</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Privacy</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage who can see your content and activities.
                      </p>
                      <Button variant="outline">Manage Privacy</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Account</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Sign out from your account or delete your account permanently.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" onClick={handleSignOut}>
                          Sign Out
                        </Button>
                        <Button variant="destructive">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProfilePage;
