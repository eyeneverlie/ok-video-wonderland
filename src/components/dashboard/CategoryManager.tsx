
import { useState } from "react";
import { Edit, Trash, Move, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CategoryManager = () => {
  // Mock category data - in a real app, you would fetch this from an API
  const [categories, setCategories] = useState([
    { id: "1", name: "Gaming", count: 12, icon: "🎮" },
    { id: "2", name: "Music", count: 8, icon: "🎵" },
    { id: "3", name: "Education", count: 15, icon: "📚" },
    { id: "4", name: "Vlogs", count: 6, icon: "📹" },
    { id: "5", name: "Technology", count: 10, icon: "💻" }
  ]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState({ name: "", icon: "" });
  const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
  
  const handleEdit = (id: string, name: string, icon: string) => {
    setEditingId(id);
    setEditValue({ name, icon });
  };
  
  const handleSaveEdit = (id: string) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, name: editValue.name, icon: editValue.icon } : category
    ));
    setEditingId(null);
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  
  const handleDelete = (id: string) => {
    // In a real app, show confirmation dialog and delete
    setCategories(categories.filter(category => category.id !== id));
  };
  
  const handleAddCategory = () => {
    if (newCategory.name.trim() && newCategory.icon.trim()) {
      const newId = (Math.max(...categories.map(c => parseInt(c.id))) + 1).toString();
      setCategories([...categories, { id: newId, name: newCategory.name, count: 0, icon: newCategory.icon }]);
      setNewCategory({ name: "", icon: "" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg border p-4">
        <h3 className="text-lg font-medium mb-4">Add New Category</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input 
            placeholder="Category name" 
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="flex-1"
          />
          <Input 
            placeholder="Category icon (emoji)" 
            value={newCategory.icon}
            onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
            className="w-full sm:w-24"
          />
          <Button onClick={handleAddCategory} disabled={!newCategory.name.trim() || !newCategory.icon.trim()}>
            Add Category
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg border overflow-hidden">
        <div className="bg-muted px-4 py-3 text-sm font-medium grid grid-cols-12 gap-4">
          <div className="col-span-1">Icon</div>
          <div className="col-span-5">Name</div>
          <div className="col-span-3">Videos</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>
        
        <div className="divide-y">
          {categories.map(category => (
            <div key={category.id} className="px-4 py-3 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1 text-lg">
                {editingId === category.id ? (
                  <Input 
                    value={editValue.icon}
                    onChange={(e) => setEditValue({ ...editValue, icon: e.target.value })}
                    className="w-12 h-8 text-center"
                  />
                ) : (
                  category.icon
                )}
              </div>
              
              <div className="col-span-5">
                {editingId === category.id ? (
                  <Input 
                    value={editValue.name}
                    onChange={(e) => setEditValue({ ...editValue, name: e.target.value })}
                  />
                ) : (
                  category.name
                )}
              </div>
              
              <div className="col-span-3 text-muted-foreground">
                {category.count} videos
              </div>
              
              <div className="col-span-3 flex justify-end gap-2">
                {editingId === category.id ? (
                  <>
                    <Button size="sm" variant="ghost" onClick={() => handleSaveEdit(category.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(category.id, category.name, category.icon)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => handleDelete(category.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
