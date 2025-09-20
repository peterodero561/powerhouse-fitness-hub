// src/pages/Admin.tsx
import { useState, useEffect } from "react";
import { 
  Dumbbell, Menu, X, ChevronLeft, ChevronRight, Star, Users, 
  Target, Award, Phone, MessageSquare, Instagram, Youtube, 
  Plus, Trash2, Edit, Image as ImageIcon, Save, Settings, 
  Home, Calendar, Gift, CreditCard, User, LogOut,
  AwardIcon
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/lib/utils";

interface NewFeature {
  title: string;
  description: string;
  files: File[];
  previews: string[];
}

const Admin = () => {
  // State for admin authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // State for navigation
  const [activeTab, setActiveTab] = useState("features");
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // State for content management
  const [features, setFeatures] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for forms
  const [newFeature, setNewFeature] = useState({
    title: "",
    description: "",
    files: [] as File[],
    previews: [] as string[]
  });
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    status: "upcoming",
    image: "",
    location: "",
    prize: "",
    signupLink: ""
  });
  
  const [newPlan, setNewPlan] = useState({
    type: "",
    price: "",
    period: "month",
    features: [""],
    popular: false
  });
  
  // State for previews
  const [featurePreview, setFeaturePreview] = useState<any>(null);
  const [featureImagePreview, setFeatureImagePreview] = useState(false);
  
  // Login function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call your authentication API
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
      fetchData();
    }
  };
  
  // Fetch existing data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const featuresRes = await axios.get(`${API_BASE_URL}/api/features`);
      const eventsRes = await axios.get(`${API_BASE_URL}/api/events`);
      const plansRes = await axios.get(`${API_BASE_URL}/api/plans`);
      
      // Mock data for demonstration
      setTimeout(() => {
        setFeatures(featuresRes.data);
        console.log(featuresRes.data);
        setEvents(eventsRes.data);
        setPlans(plansRes.data);
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };
  
  // Handle feature image upload
  const handleFeatureImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) return;
    
    const files = Array.from(e.target.files);
    const previews = files.map(f => URL.createObjectURL(f));

    setNewFeature(nf => ({
      ...nf, files: [...nf.files, ...files], previews: [...nf.previews, ...previews],
    }));
  };

  //helper upload images
  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);

      const {data} = await axios.post(`${API_BASE_URL}/api/upload`, formData, { headers: { 'Content-Type': 'multipart/form' } });
      console.log(data);
      uploadedUrls.push(data.url);
    }
    return uploadedUrls;
  }
  
  // Save feature to database
  const saveFeature = async () => {
    try {
      // upload images first
      const uploadedImages = await uploadImages(newFeature.files);
      
      const response = await axios.post(`${API_BASE_URL}/api/features`, {title: newFeature.title, description: newFeature.description, images: uploadedImages});
      
      setFeatures(feats => [...feats, response.data]);
      
      // cleanup previews and files
      newFeature.previews.forEach(URL.revokeObjectURL);
      setNewFeature({
        title: "",
        description: "",
        files: [],
        previews: []
      });
    } catch (error) {
      console.error("Error saving feature: ", error);
    }
  };
  
  // Delete feature
  const deleteFeature = async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/features/${id}`);
      setFeatures(features.filter(f => f.id !== id));
    } catch (error) {console.error('Error deleting feature', error);}
  };
  
  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };
  
  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F1108] flex items-center justify-center p-4">
        <div className="bg-[#1A1D13] rounded-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Dumbbell className="h-8 w-8 text-[#E2C044]" />
            <span className="text-2xl font-bold text-[#E2C044]">PowerHouse Admin</span>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#CAD8DE] mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F1108] border border-[#637074] rounded-lg text-white placeholder-[#637074] focus:outline-none focus:ring-2 focus:ring-[#E2C044]"
                placeholder="Enter username"
              />
            </div>
            
            <div>
              <label className="block text-[#CAD8DE] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0F1108] border border-[#637074] rounded-lg text-white placeholder-[#637074] focus:outline-none focus:ring-2 focus:ring-[#E2C044]"
                placeholder="Enter password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#E2C044] text-[#0F1108] font-bold py-3 rounded-lg hover:bg-[#E2C044]/90 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0F1108] text-white flex">
      {/* Sidebar */}
      <div className={`bg-[#1A1D13] w-64 min-h-screen p-4 flex flex-col transition-all duration-300 ${mobileOpen ? "absolute inset-y-0 left-0 z-50" : "hidden md:block"}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Dumbbell className="h-8 w-8 text-[#E2C044]" />
            <span className="text-xl font-bold text-[#E2C044]">Admin Dashboard</span>
          </div>
          <button 
            className="md:hidden text-[#CAD8DE]"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${activeTab === "dashboard" ? "bg-[#0F1108] text-[#E2C044]" : "text-[#CAD8DE] hover:bg-[#0F1108]/50"}`}
              >
                <Home className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("features")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${activeTab === "features" ? "bg-[#0F1108] text-[#E2C044]" : "text-[#CAD8DE] hover:bg-[#0F1108]/50"}`}
              >
                <Settings className="w-5 h-5" />
                <span>Why Choose Us</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("events")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${activeTab === "events" ? "bg-[#0F1108] text-[#E2C044]" : "text-[#CAD8DE] hover:bg-[#0F1108]/50"}`}
              >
                <Calendar className="w-5 h-5" />
                <span>Events</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("plans")}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 ${activeTab === "plans" ? "bg-[#0F1108] text-[#E2C044]" : "text-[#CAD8DE] hover:bg-[#0F1108]/50"}`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Membership Plans</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <button
          onClick={handleLogout}
          className="mt-auto px-4 py-3 rounded-lg flex items-center space-x-3 text-[#CAD8DE] hover:bg-[#0F1108]/50"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <button 
            className="md:hidden text-[#CAD8DE]"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-[#E2C044]">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "features" && "Why Choose Us Management"}
            {activeTab === "events" && "Events Management"}
            {activeTab === "plans" && "Membership Plans Management"}
          </h1>
          <div></div> {/* Spacer */}
        </div>
        
        {/* Dashboard Content */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1A1D13] rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-8 h-8 text-[#E2C044]" />
                <h2 className="text-xl font-bold">Why Choose Us</h2>
              </div>
              <p className="text-[#CAD8DE]">
                Manage the features that highlight what makes PowerHouse Gym unique.
              </p>
              <button
                onClick={() => setActiveTab("features")}
                className="mt-4 bg-[#E2C044] text-[#0F1108] px-4 py-2 rounded-lg font-medium"
              >
                Manage Features
              </button>
            </div>
            
            <div className="bg-[#1A1D13] rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-8 h-8 text-[#E2C044]" />
                <h2 className="text-xl font-bold">Events & Challenges</h2>
              </div>
              <p className="text-[#CAD8DE]">
                Create and manage gym challenges and events to engage members.
              </p>
              <button
                onClick={() => setActiveTab("events")}
                className="mt-4 bg-[#E2C044] text-[#0F1108] px-4 py-2 rounded-lg font-medium"
              >
                Manage Events
              </button>
            </div>
            
            <div className="bg-[#1A1D13] rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CreditCard className="w-8 h-8 text-[#E2C044]" />
                <h2 className="text-xl font-bold">Membership Plans</h2>
              </div>
              <p className="text-[#CAD8DE]">
                Create and manage membership plans and pricing options.
              </p>
              <button
                onClick={() => setActiveTab("plans")}
                className="mt-4 bg-[#E2C044] text-[#0F1108] px-4 py-2 rounded-lg font-medium"
              >
                Manage Plans
              </button>
            </div>
          </div>
        )}
        
        {/* Features Management */}
        {activeTab === "features" && (
          <div className="space-y-8">
            <div className="bg-[#1A1D13] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#E2C044] mb-4">Add New Feature</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#CAD8DE] mb-2">Title</label>
                  <input
                    type="text"
                    value={newFeature.title}
                    onChange={(e) => setNewFeature({...newFeature, title: e.target.value})}
                    className="w-full px-4 py-3 bg-[#0F1108] border border-[#637074] rounded-lg text-white placeholder-[#637074] focus:outline-none focus:ring-2 focus:ring-[#E2C044]"
                    placeholder="Best Equipment"
                  />
                </div>
                
                <div>
                  <label className="block text-[#CAD8DE] mb-2">Description</label>
                  <textarea
                    value={newFeature.description}
                    onChange={(e) => setNewFeature({...newFeature, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#0F1108] border border-[#637074] rounded-lg text-white placeholder-[#637074] focus:outline-none focus:ring-2 focus:ring-[#E2C044]"
                    placeholder="Describe this feature..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-[#CAD8DE] mb-2">Images</label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {newFeature.previews.map((img, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={img} 
                          alt={`Preview ${index}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <button 
                          onClick={() => {
                            const updatedImages = [...newFeature.previews];
                            updatedImages.splice(index, 1);
                            setNewFeature({...newFeature, previews: updatedImages});
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <label className="bg-[#E2C044] text-[#0F1108] px-4 py-2 rounded-lg font-medium cursor-pointer inline-flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2" />
                    <span>Upload Images</span>
                    <input 
                      type="file" 
                      multiple 
                      className="hidden"
                      onChange={handleFeatureImageUpload}
                    />
                  </label>
                </div>
                
                <button
                  onClick={saveFeature}
                  className="bg-[#E2C044] text-[#0F1108] px-6 py-3 rounded-lg font-bold flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Save Feature
                </button>
              </div>
            </div>
            
            <div className="bg-[#1A1D13] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#E2C044] mb-4">Existing Features</h2>
              
              {isLoading ? (
                <div className="text-center py-8 text-[#CAD8DE]">Loading features...</div>
              ) : features.length === 0 ? (
                <div className="text-center py-8 text-[#CAD8DE]">No features added yet</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature) => (
                    <div key={feature.id} className="bg-[#0F1108] rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-[#E2C044]">{feature.title}</h3>
                        <button 
                          onClick={() => deleteFeature(feature.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <p className="text-[#CAD8DE] mb-4">{feature.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {feature.images.slice(0, 3).map((img: string, index: number) => (
                          <div 
                            key={index} 
                            className="relative cursor-pointer"
                            onClick={() => {
                              setFeaturePreview(feature);
                              setFeatureImagePreview(true);
                            }}
                          >
                            <img 
                              src={img} 
                              alt={`${feature.title} ${index+1}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                            {feature.images.length > 3 && index === 2 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded">
                                <span className="text-white text-xs">+{feature.images.length - 3}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Events Management */}
        {activeTab === "events" && (
          <div className="space-y-8">
            <div className="bg-[#1A1D13] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#E2C044] mb-4">Add New Event</h2>
              {/* Event form similar to feature form */}
            </div>
            
            <div className="bg-[#1A1D13] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#E2C044] mb-4">Existing Events</h2>
              {/* Events list with edit/delete options */}
            </div>
          </div>
        )}
        
        {/* Plans Management */}
        {activeTab === "plans" && (
          <div className="space-y-8">
            <div className="bg-[#1A1D13] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#E2C044] mb-4">Add New Plan</h2>
              {/* Plan form similar to feature form */}
            </div>
            
            <div className="bg-[#1A1D13] rounded-xl p-6">
              <h2 className="text-xl font-bold text-[#E2C044] mb-4">Existing Plans</h2>
              {/* Plans list with edit/delete options */}
            </div>
          </div>
        )}
      </div>
      
      {/* Feature Image Preview Modal */}
      {featurePreview && featureImagePreview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0F1108] rounded-xl max-w-4xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#E2C044]">{featurePreview.title}</h3>
                <button 
                  onClick={() => setFeatureImagePreview(false)}
                  className="text-[#CAD8DE] hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {featurePreview.images.map((img: string, index: number) => (
                  <div key={index}>
                    <img 
                      src={img} 
                      alt={`${featurePreview.title} ${index+1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;