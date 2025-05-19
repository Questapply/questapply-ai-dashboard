
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Hero3 from "@/components/hero/Hero3";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    </DashboardLayout>
  );
};

export default Index;
