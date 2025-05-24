
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Sparkles, CheckCircle, Clock, FileText, Upload, Users, Send, Trophy, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  // Application Roadmap Steps
  const roadmapSteps = [
    {
      phase: "Before Apply",
      steps: [
        { id: "upload-docs", title: "Upload Documents", icon: <Upload className="h-5 w-5" />, status: "pending", description: "Upload your transcripts, certificates, and ID" },
        { id: "select-programs", title: "Program Selected", icon: <Users className="h-5 w-5" />, status: "pending", description: "Choose your target universities and programs" },
        { id: "create-docs", title: "Create Documents", icon: <FileText className="h-5 w-5" />, status: "pending", description: "Generate SOPs, CVs, and recommendation letters" },
        { id: "list-professors", title: "List Professors", icon: <Users className="h-5 w-5" />, status: "pending", description: "Find and contact potential supervisors" },
        { id: "prepare-app", title: "Prepare Application", icon: <CheckCircle className="h-5 w-5" />, status: "pending", description: "Finalize all application materials" }
      ]
    },
    {
      phase: "After Apply",
      steps: [
        { id: "submission", title: "Submission", icon: <Send className="h-5 w-5" />, status: "pending", description: "Submit applications to universities" },
        { id: "decision", title: "Decision", icon: <Trophy className="h-5 w-5" />, status: "pending", description: "Receive admission decisions" },
        { id: "post-decision", title: "Post-Decision Requirements", icon: <FileText className="h-5 w-5" />, status: "pending", description: "Complete any additional requirements" },
        { id: "enrollment", title: "Enrollment Confirmation", icon: <GraduationCap className="h-5 w-5" />, status: "pending", description: "Confirm your enrollment and prepare for departure" }
      ]
    }
  ];

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

        {/* Application Roadmap */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Application Roadmap</h2>
          
          {roadmapSteps.map((phase, phaseIndex) => (
            <div key={phase.phase} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-medium mr-3 ${
                  phaseIndex === 0 ? 'bg-blue-500' : 'bg-purple-500'
                }`}>
                  {phaseIndex + 1}
                </span>
                {phase.phase}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phase.steps.map((step, stepIndex) => (
                  <Card key={step.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-lg mr-3 ${
                            step.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                            step.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                            'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                          }`}>
                            {step.icon}
                          </div>
                          <span className="text-gray-900 dark:text-white">{step.title}</span>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${
                          step.status === 'completed' ? 'bg-green-500' :
                          step.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-gray-300 dark:bg-gray-600'
                        }`} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Your Application Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Based on your profile information and selected plan, we've customized this dashboard to help you with your application journey. Follow the roadmap above to track your progress.
            </p>

            {/* Quick Actions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center space-y-2">
                  <span className="font-semibold">Start Application</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Begin your university applications</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center space-y-2">
                  <span className="font-semibold">Upload Documents</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Add your academic documents</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 flex-col items-center justify-center space-y-2">
                  <span className="font-semibold">Schedule Call</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Book a consultation session</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ApplyWithUsDashboard;
