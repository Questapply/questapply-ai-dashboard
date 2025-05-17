
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NavigationButtons from "@/components/dashboard/NavigationButtons";
import ContentSection from "@/components/dashboard/ContentSection";
import ChatBox from "@/components/dashboard/ChatBox";
import FeedbackPrompt from "@/components/feedback/FeedbackPrompt";
import { getFilterOptions, Section } from "@/utils/FilterUtils";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>("ai-talent-test");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isQuestApplyAI, setIsQuestApplyAI] = useState(true); // Default to QuestApply AI
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode ? JSON.parse(savedDarkMode) : true;
  });
  const [showFeedbackPrompt, setShowFeedbackPrompt] = useState(false);

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
  
  // Show feedback prompt with a small chance when the dashboard loads
  useEffect(() => {
    // Get the last time the feedback was shown
    const lastFeedbackTime = localStorage.getItem("lastFeedbackTime");
    const now = Date.now();
    
    // If it's been more than 24 hours or never shown before, show it with a 30% chance
    if (!lastFeedbackTime || (now - parseInt(lastFeedbackTime)) > 24 * 60 * 60 * 1000) {
      const shouldShow = Math.random() < 0.3;
      if (shouldShow) {
        // Wait a bit before showing to allow the page to load
        const timer = setTimeout(() => {
          setShowFeedbackPrompt(true);
          // Update the last feedback time
          localStorage.setItem("lastFeedbackTime", now.toString());
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, []);

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
    
    // Save preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
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
      
      {/* Feedback Prompt */}
      <FeedbackPrompt 
        show={showFeedbackPrompt} 
        onClose={() => setShowFeedbackPrompt(false)}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
