
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SignInDialog } from "@/components/auth/SignInDialog";
import { SignUpDialog } from "@/components/auth/SignUpDialog";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Hero3 from "@/components/hero/Hero3";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <DashboardLayout 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <Hero3 isDarkMode={isDarkMode} />
        </div>
      </div>
      
      {showSignIn && (
        <SignInDialog 
          open={showSignIn}
          onOpenChange={setShowSignIn}
          onSwitchToSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
        />
      )}
      
      {showSignUp && (
        <SignUpDialog 
          open={showSignUp}
          onOpenChange={setShowSignUp}
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default Index;
