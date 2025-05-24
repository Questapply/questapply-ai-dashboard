
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Sparkles, CheckCircle, Clock, FileText, Upload, Users, Send, Trophy, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ApplyWithUsDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [plan, setPlan] = useState<string>("bronze");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeRoadmapTab, setActiveRoadmapTab] = useState<"before" | "after">("before");
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

  const handleApplyYourself = () => {
    navigate("/dashboard");
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

  // Application Roadmap Steps
  const roadmapSteps = {
    before: [
      { id: "upload-docs", title: "Upload Documents", icon: <Upload className="h-4 w-4" />, status: "pending", description: "Upload your transcripts, certificates, and ID" },
      { id: "select-programs", title: "Program Selected", icon: <Users className="h-4 w-4" />, status: "pending", description: "Choose your target universities and programs" },
      { id: "create-docs", title: "Create Documents", icon: <FileText className="h-4 w-4" />, status: "pending", description: "Generate SOPs, CVs, and recommendation letters" },
      { id: "list-professors", title: "List Professors", icon: <Users className="h-4 w-4" />, status: "pending", description: "Find and contact potential supervisors" },
      { id: "prepare-app", title: "Prepare Application", icon: <CheckCircle className="h-4 w-4" />, status: "pending", description: "Finalize all application materials" }
    ],
    after: [
      { id: "submission", title: "Submission", icon: <Send className="h-4 w-4" />, status: "pending", description: "Submit applications to universities" },
      { id: "decision", title: "Decision", icon: <Trophy className="h-4 w-4" />, status: "pending", description: "Receive admission decisions" },
      { id: "post-decision", title: "Post-Decision Requirements", icon: <FileText className="h-4 w-4" />, status: "pending", description: "Complete any additional requirements" },
      { id: "enrollment", title: "Enrollment Confirmation", icon: <GraduationCap className="h-4 w-4" />, status: "pending", description: "Confirm your enrollment and prepare for departure" }
    ]
  };

  return (
    <DashboardLayout 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="w-full max-w-full">
        {/* Welcome Section - Moved to top and made more visually appealing */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Welcome to Your Application Dashboard
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Based on your profile information and selected plan, we've customized this dashboard to help you with your application journey. Follow the roadmap below to track your progress.
                </p>
                
                {/* Plan Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-md mb-6">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    {planDetails.name} Plan: {planDetails.description}
                  </span>
                </div>
              </div>
              
              {/* Apply Yourself Button - Moved to replace original Apply With Us button position */}
              <div className="flex-shrink-0 ml-6">
                <Button 
                  onClick={handleApplyYourself}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                >
                  Apply Yourself
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center space-y-2 border-2 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <span className="font-semibold">Start Application</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Begin your university applications</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center space-y-2 border-2 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <span className="font-semibold">Upload Documents</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Add your academic documents</span>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center space-y-2 border-2 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                <span className="font-semibold">Schedule Call</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Book a consultation session</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Application Roadmap */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Application Roadmap</h2>
          
          {/* Roadmap Tabs - Side by side */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveRoadmapTab("before")}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeRoadmapTab === "before"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-sm font-medium mr-3">
                1
              </span>
              Before Apply
            </button>
            
            <button
              onClick={() => setActiveRoadmapTab("after")}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeRoadmapTab === "after"
                  ? "bg-purple-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-sm font-medium mr-3">
                2
              </span>
              After Apply
            </button>
          </div>
          
          {/* Single horizontal line of roadmap steps */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center space-x-2 overflow-x-auto pb-2">
              {roadmapSteps[activeRoadmapTab].map((step, stepIndex) => (
                <Card 
                  key={step.id} 
                  className="flex-shrink-0 w-48 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-2 ${
                          step.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          step.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                          'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                        }`}>
                          {step.icon}
                        </div>
                        <span className="text-gray-900 dark:text-white text-xs font-medium">{step.title}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-300 dark:bg-gray-600'
                      }`} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplyWithUsDashboard;
