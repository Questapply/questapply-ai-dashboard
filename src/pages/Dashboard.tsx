
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
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setIsQuestApplyAI(false);
  };

  const handleQuestApplyAI = () => {
    setIsQuestApplyAI(true);
  };

  // Filter options for each section
  const getFilterOptions = () => {
    if (isQuestApplyAI) return null;

    switch (activeSection) {
      case "find-schools":
        return [
          { icon: <Trophy className="w-4 h-4" />, label: "Ranking" },
          { icon: <Globe className="w-4 h-4" />, label: "Country" },
          { icon: <Map className="w-4 h-4" />, label: "State" },
          { icon: <Scroll className="w-4 h-4" />, label: "Program" },
          { icon: <DollarSign className="w-4 h-4" />, label: "Cost" },
          { icon: <FileCheck className="w-4 h-4" />, label: "Acceptance Rate" },
          { icon: <UserCircle className="w-4 h-4" />, label: "Size" },
          { icon: <Building className="w-4 h-4" />, label: "Campus" },
        ];
      case "find-programs":
        return [
          { icon: <Scroll className="w-4 h-4" />, label: "Field of Study" },
          { icon: <Trophy className="w-4 h-4" />, label: "Ranking" },
          { icon: <DollarSign className="w-4 h-4" />, label: "Cost" },
          { icon: <FileCheck className="w-4 h-4" />, label: "Admission Requirements" },
        ];
      case "find-professors":
        return [
          { icon: <Globe className="w-4 h-4" />, label: "University" },
          { icon: <Scroll className="w-4 h-4" />, label: "Field" },
          { icon: <Trophy className="w-4 h-4" />, label: "Research Areas" },
        ];
      case "create-resume":
        return [
          { icon: <Globe className="w-4 h-4" />, label: "Template" },
          { icon: <Scroll className="w-4 h-4" />, label: "Experience Level" },
          { icon: <Trophy className="w-4 h-4" />, label: "Field" },
        ];
      case "create-sop":
        return [
          { icon: <Globe className="w-4 h-4" />, label: "Program Type" },
          { icon: <Scroll className="w-4 h-4" />, label: "University" },
          { icon: <Trophy className="w-4 h-4" />, label: "Field" },
        ];
      case "create-lor":
        return [
          { icon: <Globe className="w-4 h-4" />, label: "Relationship" },
          { icon: <Scroll className="w-4 h-4" />, label: "Program Type" },
          { icon: <Trophy className="w-4 h-4" />, label: "Strength" },
        ];
      case "apply-now":
        return [
          { icon: <Globe className="w-4 h-4" />, label: "University" },
          { icon: <Scroll className="w-4 h-4" />, label: "Program" },
          { icon: <Trophy className="w-4 h-4" />, label: "Deadline" },
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
    <div className="flex h-screen w-full bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 dark:bg-black overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-blue-100 dark:border-blue-900/50 p-4">
          <div className="flex justify-between items-center">
            <button
              className="md:hidden text-gray-700 dark:text-gray-200"
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
              <button className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700 dark:text-gray-200"
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

        {/* Chat and Dashboard Content */}
        <div className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Navigation Buttons - Now above the chat box */}
            <div className="mb-8 flex overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex space-x-2 md:space-x-4">
                <Button
                  variant={activeSection === "ai-talent-test" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max ${
                    activeSection === "ai-talent-test" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600" 
                      : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                  } transition-all duration-300`}
                  onClick={() => handleSectionChange("ai-talent-test")}
                >
                  <Activity className="w-4 h-4" />
                  AI Talent Test
                </Button>
                
                <Button
                  variant={activeSection === "find-schools" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max ${
                    activeSection === "find-schools" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600" 
                      : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                  } transition-all duration-300`}
                  onClick={() => handleSectionChange("find-schools")}
                >
                  <Book className="w-4 h-4" />
                  Find Schools
                </Button>
                
                <Button
                  variant={activeSection === "find-programs" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max ${
                    activeSection === "find-programs" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600" 
                      : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                  } transition-all duration-300`}
                  onClick={() => handleSectionChange("find-programs")}
                >
                  <BookOpen className="w-4 h-4" />
                  Find Programs
                </Button>
                
                <Button
                  variant={activeSection === "find-professors" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max ${
                    activeSection === "find-professors" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600" 
                      : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                  } transition-all duration-300`}
                  onClick={() => handleSectionChange("find-professors")}
                >
                  <Users className="w-4 h-4" />
                  Find Professors
                </Button>
                
                <Button
                  variant={activeSection === "create-resume" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max ${
                    activeSection === "create-resume" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600" 
                      : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                  } transition-all duration-300`}
                  onClick={() => handleSectionChange("create-resume")}
                >
                  <FileText className="w-4 h-4" />
                  Create Resume
                </Button>
                
                <Button
                  variant={activeSection === "create-sop" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max ${
                    activeSection === "create-sop" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600" 
                      : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                  } transition-all duration-300`}
                  onClick={() => handleSectionChange("create-sop")}
                >
                  <FilePen className="w-4 h-4" />
                  Create SOP
                </Button>
                
                <Button
                  variant={activeSection === "create-lor" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max ${
                    activeSection === "create-lor" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600" 
                      : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                  } transition-all duration-300`}
                  onClick={() => handleSectionChange("create-lor")}
                >
                  <FileLock className="w-4 h-4" />
                  Create LOR
                </Button>
                
                <Button
                  variant={activeSection === "apply-now" ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max ${
                    activeSection === "apply-now" 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600" 
                      : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                  } transition-all duration-300`}
                  onClick={() => handleSectionChange("apply-now")}
                >
                  <Check className="w-4 h-4" />
                  Apply Now
                </Button>
                
                <Button
                  variant={isQuestApplyAI ? "default" : "outline"}
                  className={`flex items-center gap-2 min-w-max ${
                    isQuestApplyAI 
                      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600" 
                      : "hover:bg-teal-100 dark:hover:bg-teal-900/30"
                  } transition-all duration-300`}
                  onClick={handleQuestApplyAI}
                >
                  <Search className="w-4 h-4" />
                  QuestApply AI
                </Button>
              </div>
            </div>
            
            {/* Chat Box */}
            <ChatBox 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isQuestApplyAI={isQuestApplyAI}
            />
            
            {/* Filters - Below the chat box */}
            {filterOptions && (
              <div className="mt-4 animate-fade-in">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                  </svg>
                  Filters
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {filterOptions.map((filter, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all duration-300 hover:border-teal-200 dark:hover:border-teal-700 hover:shadow-sm"
                    >
                      {filter.icon}
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content Area - With margin from the chat box */}
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
