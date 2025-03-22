
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Upload, Video, FolderPlus, Settings, Grid3X3, 
  LayoutDashboard, PlusCircle, FileVideo 
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import VideoGrid from "@/components/dashboard/VideoGrid";
import CategoryManager from "@/components/dashboard/CategoryManager";
import SiteSettings from "@/components/dashboard/SiteSettings";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("videos");
  const [filterCategory, setFilterCategory] = useState("all");
  
  // This would typically come from an API
  const categories = [
    { id: "all", name: "All Videos" },
    { id: "gaming", name: "Gaming" },
    { id: "music", name: "Music" },
    { id: "education", name: "Education" },
    { id: "vlogs", name: "Vlogs" }
  ];
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleUploadClick = () => {
    navigate("/upload");
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar for larger screens */}
        <div className="hidden md:block w-64 border-r">
          <DashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <DashboardHeader />
          
          {/* Mobile navigation drawer */}
          <div className="md:hidden p-4 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Dashboard</h1>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="icon">
                    <LayoutDashboard className="h-4 w-4" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="p-4">
                    <DashboardSidebar activeTab={activeTab} onTabChange={handleTabChange} />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
          
          <div className="p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <div className="hidden md:flex items-center justify-between mb-6">
                <TabsList>
                  <TabsTrigger value="videos" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <span>My Videos</span>
                  </TabsTrigger>
                  <TabsTrigger value="categories" className="flex items-center gap-2">
                    <FolderPlus className="h-4 w-4" />
                    <span>Categories</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Site Settings</span>
                  </TabsTrigger>
                </TabsList>
                
                <Button onClick={handleUploadClick} className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Video</span>
                </Button>
              </div>
              
              {/* Videos Tab Content */}
              <TabsContent value="videos" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold">My Videos</h2>
                    <div className="w-[180px]">
                      <Select value={filterCategory} onValueChange={setFilterCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Grid3X3 className="h-4 w-4 mr-2" />
                      <span>Grid View</span>
                    </Button>
                    <Button onClick={handleUploadClick} className="md:hidden flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                    </Button>
                  </div>
                </div>
                
                <VideoGrid category={filterCategory} />
                
                <div className="hidden sm:flex justify-center mt-8">
                  <Button variant="outline" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    <span>Load More</span>
                  </Button>
                </div>
              </TabsContent>
              
              {/* Categories Tab Content */}
              <TabsContent value="categories">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Manage Categories</h2>
                  <Button className="flex items-center gap-2">
                    <FolderPlus className="h-4 w-4" />
                    <span>New Category</span>
                  </Button>
                </div>
                <CategoryManager />
              </TabsContent>
              
              {/* Settings Tab Content */}
              <TabsContent value="settings">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">Site Settings</h2>
                  <p className="text-muted-foreground">Customize your website appearance and behavior</p>
                </div>
                <SiteSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
