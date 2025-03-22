
import { 
  Video, FolderPlus, Settings, Home, Users, 
  Upload, LogOut, FileVideo, Shield 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { 
      id: "videos", 
      label: "Manage Videos", 
      icon: FileVideo,
      onClick: () => onTabChange("videos")
    },
    { 
      id: "categories", 
      label: "Categories", 
      icon: FolderPlus,
      onClick: () => onTabChange("categories")
    },
    { 
      id: "settings", 
      label: "Site Settings", 
      icon: Settings,
      onClick: () => onTabChange("settings")
    },
    { 
      id: "upload", 
      label: "Upload Video", 
      icon: Upload,
      onClick: () => navigate("/upload"),
      highlight: true
    }
  ];
  
  const bottomMenuItems = [
    { id: "home", label: "Go to Home", icon: Home, onClick: () => navigate("/") },
    { id: "profile", label: "My Profile", icon: Users, onClick: () => navigate("/profile") },
    { id: "signout", label: "Sign Out", icon: LogOut, onClick: () => navigate("/sign-in") }
  ];
  
  return (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 mb-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Admin Dashboard</span>
        </h2>
      </div>
      
      <nav className="space-y-1 px-2 flex-1">
        {menuItems.map(item => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : (item.highlight ? "default" : "ghost")}
            className={`w-full justify-start mb-1 ${item.highlight ? 'mt-6' : ''}`}
            onClick={item.onClick}
          >
            <item.icon className="h-4 w-4 mr-2" />
            <span>{item.label}</span>
          </Button>
        ))}
      </nav>
      
      <div className="px-2 pt-6 mt-auto border-t">
        {bottomMenuItems.map(item => (
          <Button
            key={item.id}
            variant="ghost"
            className="w-full justify-start mb-1"
            onClick={item.onClick}
          >
            <item.icon className="h-4 w-4 mr-2" />
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
