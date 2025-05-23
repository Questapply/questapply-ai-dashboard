
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ApplyWithUsDashboard = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [plan, setPlan] = useState<string>("bronze");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    // Get the plan from location state if available
    const locationState = location.state as { plan?: string } | null;
    if (locationState?.plan) {
      setPlan(locationState.plan);
      
      // Show a welcome toast
      toast({
        title: "Welcome to your custom dashboard!",
        description: `You've selected the ${locationState.plan.charAt(0).toUpperCase() + locationState.plan.slice(1)} plan.`,
      });
    }
  }, [location.state, toast]);

  // Initialize dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  // Get the plan details for display
  const getPlanDetails = () => {
    switch (plan) {
      case 'silver':
        return {
          name: "Silver",
          color: "from-slate-400 to-slate-500",
          description: "Admission + Funding Support",
        };
      case 'gold':
        return {
          name: "Gold",
          color: "from-yellow-400 to-amber-600",
          description: "Admission + Funding + Visa Assistance",
        };
      default:
        return {
          name: "Bronze",
          color: "from-amber-500 to-orange-500",
          description: "University Admission Only",
        };
    }
  };
  
  const planDetails = getPlanDetails();

  return (
    <DashboardLayout 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="w-full max-w-full">
        {/* Plan Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="font-medium">
              {planDetails.name} Plan: {planDetails.description}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Your Application Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Based on your profile information and selected plan, we've customized this dashboard to help you with your application journey.
            </p>

            {/* Next Steps Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Next Steps</h2>
              <ol className="space-y-4">
                <li className="flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium mr-3">1</span>
                  <span className="text-gray-700 dark:text-gray-300">Complete your personal statement</span>
                </li>
                <li className="flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium mr-3">2</span>
                  <span className="text-gray-700 dark:text-gray-300">Request letters of recommendation</span>
                </li>
                <li className="flex items-center">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-sm font-medium mr-3">3</span>
                  <span className="text-gray-700 dark:text-gray-300">Select your target universities</span>
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center space-y-2">
                <span className="font-semibold">Browse Programs</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Find programs matching your profile</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center space-y-2">
                <span className="font-semibold">Create Documents</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">SOPs, CVs, and more</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center space-y-2">
                <span className="font-semibold">Schedule Consultation</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Get expert advice for your journey</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplyWithUsDashboard;
