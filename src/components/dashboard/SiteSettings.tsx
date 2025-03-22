
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SiteSettings = () => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "VideoShare",
    siteTagline: "Share your videos with the world",
    siteDescription: "A platform for creators to share their video content with a global audience.",
    logoUrl: "/logo.svg",
    faviconUrl: "/favicon.ico",
    accentColor: "#3b82f6",
    brandColor: "#8b5cf6"
  });
  
  const [advancedSettings, setAdvancedSettings] = useState({
    maxUploadSize: "500",
    allowedFileTypes: "mp4,avi,mov",
    defaultPrivacy: "public",
    customCss: ""
  });
  
  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSiteSettings({
      ...siteSettings,
      [e.target.name]: e.target.value
    });
  };
  
  const handleAdvancedSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAdvancedSettings({
      ...advancedSettings,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSave = () => {
    // In a real app, save to backend
    console.log("Saving settings:", { siteSettings, advancedSettings });
    toast.success("Site settings saved successfully");
  };
  
  return (
    <Tabs defaultValue="appearance" className="space-y-6">
      <TabsList>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <TabsContent value="appearance" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Accent Color</label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                name="accentColor"
                value={siteSettings.accentColor} 
                onChange={handleSiteSettingsChange} 
                className="w-12 h-10 p-1"
              />
              <Input 
                type="text" 
                name="accentColor"
                value={siteSettings.accentColor} 
                onChange={handleSiteSettingsChange} 
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Used for buttons, links, and interactive elements
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Brand Color</label>
            <div className="flex gap-2">
              <Input 
                type="color" 
                name="brandColor"
                value={siteSettings.brandColor} 
                onChange={handleSiteSettingsChange} 
                className="w-12 h-10 p-1"
              />
              <Input 
                type="text" 
                name="brandColor"
                value={siteSettings.brandColor} 
                onChange={handleSiteSettingsChange} 
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Used for header backgrounds and branding elements
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </TabsContent>
      
      <TabsContent value="branding" className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Site Name</label>
            <Input 
              name="siteName"
              value={siteSettings.siteName} 
              onChange={handleSiteSettingsChange} 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Site Tagline</label>
            <Input 
              name="siteTagline"
              value={siteSettings.siteTagline} 
              onChange={handleSiteSettingsChange} 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Site Description</label>
            <Textarea 
              name="siteDescription"
              value={siteSettings.siteDescription} 
              onChange={handleSiteSettingsChange} 
              rows={3}
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Logo URL</label>
              <Input 
                name="logoUrl"
                value={siteSettings.logoUrl} 
                onChange={handleSiteSettingsChange} 
              />
              <p className="text-xs text-muted-foreground">
                Enter URL or upload a new logo
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Favicon URL</label>
              <Input 
                name="faviconUrl"
                value={siteSettings.faviconUrl} 
                onChange={handleSiteSettingsChange} 
              />
              <p className="text-xs text-muted-foreground">
                Enter URL or upload a new favicon
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </TabsContent>
      
      <TabsContent value="advanced" className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Upload Size (MB)</label>
              <Input 
                name="maxUploadSize"
                value={advancedSettings.maxUploadSize} 
                onChange={handleAdvancedSettingsChange} 
                type="number"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Allowed File Types</label>
              <Input 
                name="allowedFileTypes"
                value={advancedSettings.allowedFileTypes} 
                onChange={handleAdvancedSettingsChange} 
                placeholder="Comma separated (e.g., mp4,avi,mov)"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Default Privacy Setting</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="defaultPrivacy"
                  value="public"
                  checked={advancedSettings.defaultPrivacy === "public"}
                  onChange={handleAdvancedSettingsChange}
                  className="h-4 w-4"
                />
                <span>Public</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="defaultPrivacy"
                  value="unlisted"
                  checked={advancedSettings.defaultPrivacy === "unlisted"}
                  onChange={handleAdvancedSettingsChange}
                  className="h-4 w-4"
                />
                <span>Unlisted</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="defaultPrivacy"
                  value="private"
                  checked={advancedSettings.defaultPrivacy === "private"}
                  onChange={handleAdvancedSettingsChange}
                  className="h-4 w-4"
                />
                <span>Private</span>
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Custom CSS</label>
            <Textarea 
              name="customCss"
              value={advancedSettings.customCss} 
              onChange={handleAdvancedSettingsChange} 
              rows={5}
              placeholder=":root { --custom-color: #abcdef; }"
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Add custom CSS to customize your site's appearance beyond the built-in options
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default SiteSettings;
