
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NavigationButtons from "@/components/dashboard/NavigationButtons";
import ContentSection from "@/components/dashboard/ContentSection";
import ChatBox from "@/components/dashboard/ChatBox";
import { getFilterOptions, Section } from "@/utils/FilterUtils";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>("ai-talent-test");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuestApplyAI, setIsQuestApplyAI] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setIsQuestApplyAI(false);
  };

  const handleQuestApplyAI = () => {
    setIsQuestApplyAI(true);
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Get filter options based on active section
  const filterOptions = getFilterOptions(activeSection, isQuestApplyAI);

  return (
    <DashboardLayout 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <NavigationButtons 
        activeSection={activeSection}
        handleSectionChange={handleSectionChange}
        handleQuestApplyAI={handleQuestApplyAI}
        isQuestApplyAI={isQuestApplyAI}
        isDarkMode={isDarkMode}
      />
      
      {/* Chat Box with Filters Inside */}
      <div className="relative">
        <ChatBox 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isQuestApplyAI={isQuestApplyAI}
          isDarkMode={isDarkMode}
          filterOptions={filterOptions}
        />
      </div>

      {/* Main Content Area */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 animate-fade-in">
        <ContentSection 
          activeSection={activeSection} 
          isQuestApplyAI={isQuestApplyAI} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
