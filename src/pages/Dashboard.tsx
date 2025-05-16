import { useState } from "react";
import { 
  Activity, 
  Book, 
  FileText, 
  FilePen, 
  FileLock, 
  Check,
  BookOpen, 
  Users,
  Search,
  Trophy,
  Globe,
  Map,
  Scroll,
  DollarSign,
  FileCheck,
  UserCircle,
  Building,
  ArrowUp,
  Moon,
  Sun,
  GraduationCap,
  Calendar,
  PercentIcon,
  BarChart,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatBox from "@/components/dashboard/ChatBox";
import AiTalentTest from "@/components/dashboard/sections/AiTalentTest";
import FindSchools from "@/components/dashboard/sections/FindSchools";
import FindPrograms from "@/components/dashboard/sections/FindPrograms";
import FindProfessors from "@/components/dashboard/sections/FindProfessors";
import CreateResume from "@/components/dashboard/sections/CreateResume";
import CreateSOP from "@/components/dashboard/sections/CreateSOP";
import CreateLOR from "@/components/dashboard/sections/CreateLOR";
import ApplyNow from "@/components/dashboard/sections/ApplyNow";

type Section = 
  | "ai-talent-test"
  | "find-schools"
  | "find-programs"
  | "find-professors"
  | "create-resume"
  | "create-sop"
  | "create-lor"
  | "apply-now";

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

  // Filter options for each section
  const getFilterOptions = () => {
    if (isQuestApplyAI || activeSection === "ai-talent-test" || 
        activeSection === "create-resume" || activeSection === "create-sop" || 
        activeSection === "create-lor" || activeSection === "apply-now") {
      return null;
    }

    switch (activeSection) {
      case "find-schools":
        return [
          { icon: <Globe className="w-4 h-4" />, label: "Country" },
          { icon: <Map className="w-4 h-4" />, label: "State" },
          { icon: <GraduationCap className="w-4 h-4" />, label: "Schools" },
          { icon: <BookOpen className="w-4 h-4" />, label: "Degree Level" },
          { icon: <FileText className="w-4 h-4" />, label: "Area of Study" },
          { icon: <Scroll className="w-4 h-4" />, label: "Programs" },
          { icon: <ArrowUpDown className="w-4 h-4" />, label: "Order By" }
        ];
      case "find-programs":
        return [
          { icon: <Globe className="w-4 h-4" />, label: "Country" },
          { icon: <Map className="w-4 h-4" />, label: "State" },
          { icon: <GraduationCap className="w-4 h-4" />, label: "Schools" },
          { icon: <BookOpen className="w-4 h-4" />, label: "Degree Level" },
          { icon: <FileText className="w-4 h-4" />, label: "Area of Study" },
          { icon: <Scroll className="w-4 h-4" />, label: "Programs" },
          { icon: <Calendar className="w-4 h-4" />, label: "Deadline" },
          { icon: <FileText className="w-4 h-4" />, label: "English" },
          { icon: <PercentIcon className="w-4 h-4" />, label: "GPA" },
          { icon: <BarChart className="w-4 h-4" />, label: "GRE" },
          { icon: <ArrowUpDown className="w-4 h-4" />, label: "Order By" }
        ];
      case "find-professors":
        return [
          { icon: <Globe className="w-4 h-4" />, label: "Country" },
          { icon: <Map className="w-4 h-4" />, label: "State" },
          { icon: <GraduationCap className="w-4 h-4" />, label: "Schools" },
          { icon: <FileText className="w-4 h-4" />, label: "Area of Study" },
          { icon: <Scroll className="w-4 h-4" />, label: "Programs" },
          { icon: <BookOpen className="w-4 h-4" />, label: "Research Interest" },
          { icon: <Users className="w-4 h-4" />, label: "Title" }
        ];
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (isQuestApplyAI) {
      return (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">QuestApply AI Search</h2>
          <p className="text-lg">Ask anything about admissions, programs, or application processes.</p>
        </div>
      );
    }

    switch (activeSection) {
      case "ai-talent-test":
        return <AiTalentTest />;
      case "find-schools":
        return <FindSchools />;
      case "find-programs":
        return <FindPrograms />;
      case "find-professors":
        return <FindProfessors />;
      case "create-resume":
        return <CreateResume />;
      case "create-sop":
        return <CreateSOP />;
      case "create-lor":
        return <CreateLOR />;
      case "apply-now":
        return <ApplyNow />;
      default:
        return <AiTalentTest />;
    }
  };

  const filterOptions = getFilterOptions();

  return (
    <div className={`flex h-screen w-full ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-blue-50 to-teal-100'} overflow-hidden`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <nav className={`${isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDarkMode ? 'border-blue-900/50' : 'border-blue-100'} p-4`}>
          <div className="flex justify-between items-center">
            <button
              className={`md:hidden ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="ml-4 md:ml-0 flex-1">
              <img src="/logo.svg" alt="QuestApply Logo" className="h-10" />
            </div>
            <div className="flex items-center gap-4">
              {/* Theme toggle switch */}
              <div className="flex items-center space-x-2">
                <Sun className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Moon className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-gray-400'}`} />
              </div>
              
              <button className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 bg-teal-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="h-8 w-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                U
              </div>
            </div>
          </div>
        </nav>

        {/* Navigation Buttons - Above Chat Box */}
        <div className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex space-x-2 md:space-x-4">
                <Button
                  variant={activeSection === "ai-talent-test" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max transition-all duration-300 ${
                    activeSection === "ai-talent-test" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                      : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
                  }`}
                  onClick={() => handleSectionChange("ai-talent-test")}
                >
                  <Activity className="w-4 h-4" />
                  AI Talent Test
                </Button>
                
                <Button
                  variant={activeSection === "find-schools" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max transition-all duration-300 ${
                    activeSection === "find-schools" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                      : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
                  }`}
                  onClick={() => handleSectionChange("find-schools")}
                >
                  <Book className="w-4 h-4" />
                  Find Schools
                </Button>
                
                <Button
                  variant={activeSection === "find-programs" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max transition-all duration-300 ${
                    activeSection === "find-programs" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                      : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
                  }`}
                  onClick={() => handleSectionChange("find-programs")}
                >
                  <BookOpen className="w-4 h-4" />
                  Find Programs
                </Button>
                
                <Button
                  variant={activeSection === "find-professors" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max transition-all duration-300 ${
                    activeSection === "find-professors" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                      : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
                  }`}
                  onClick={() => handleSectionChange("find-professors")}
                >
                  <Users className="w-4 h-4" />
                  Find Professors
                </Button>
                
                <Button
                  variant={activeSection === "create-resume" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max transition-all duration-300 ${
                    activeSection === "create-resume" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                      : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
                  }`}
                  onClick={() => handleSectionChange("create-resume")}
                >
                  <FileText className="w-4 h-4" />
                  Create Resume
                </Button>
                
                <Button
                  variant={activeSection === "create-sop" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max transition-all duration-300 ${
                    activeSection === "create-sop" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                      : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
                  }`}
                  onClick={() => handleSectionChange("create-sop")}
                >
                  <FilePen className="w-4 h-4" />
                  Create SOP
                </Button>
                
                <Button
                  variant={activeSection === "create-lor" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max transition-all duration-300 ${
                    activeSection === "create-lor" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                      : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
                  }`}
                  onClick={() => handleSectionChange("create-lor")}
                >
                  <FileLock className="w-4 h-4" />
                  Create LOR
                </Button>
                
                <Button
                  variant={activeSection === "apply-now" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max transition-all duration-300 ${
                    activeSection === "apply-now" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                      : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
                  }`}
                  onClick={() => handleSectionChange("apply-now")}
                >
                  <Check className="w-4 h-4" />
                  Apply Now
                </Button>
                
                <Button
                  variant={isQuestApplyAI ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max transition-all duration-300 relative ${
                    isQuestApplyAI 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
                      : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
                  }`}
                  onClick={handleQuestApplyAI}
                >
                  <Search className="w-4 h-4" />
                  QuestApply AI
                  <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full animate-pulse">
                    NEW
                  </span>
                </Button>
              </div>
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
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
