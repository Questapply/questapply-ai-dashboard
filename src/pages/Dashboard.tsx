
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NavigationButtons from "@/components/dashboard/NavigationButtons";
import ContentSection from "@/components/dashboard/ContentSection";
import ChatBox from "@/components/dashboard/ChatBox";
import FeedbackPrompt from "@/components/feedback/FeedbackPrompt";
import { getFilterOptions, Section } from "@/utils/FilterUtils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Layers } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<Section>("ai-talent-test");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed on mobile
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
      <div className="w-full max-w-full overflow-x-hidden">
        <div className="flex justify-between items-center mb-4">
          <NavigationButtons 
            activeSection={activeSection}
            handleSectionChange={handleSectionChange}
            handleQuestApplyAI={handleQuestApplyAI}
            isQuestApplyAI={isQuestApplyAI}
            isDarkMode={isDarkMode}
          />
          
          {/* Hero Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-200 dark:border-gray-700">
                <Layers className="h-4 w-4 mr-1" />
                Hero Designs
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
              <DropdownMenuItem>
                <Link to="/?hero=1" className="flex items-center w-full px-2 py-1.5">
                  HERO 1 (Classic)
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/?hero=2" className="flex items-center w-full px-2 py-1.5">
                  HERO 2 (Dashboard Style)
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/?hero=3" className="flex items-center w-full px-2 py-1.5">
                  HERO 3 (Fullscreen)
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
