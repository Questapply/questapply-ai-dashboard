
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Book, 
  FileText, 
  FilePen, 
  FileLock, 
  Check,
  BookOpen, 
  Users,
  Search
} from "lucide-react";

type Section = 
  | "ai-talent-test"
  | "find-schools"
  | "find-programs"
  | "find-professors"
  | "create-resume"
  | "create-sop"
  | "create-lor"
  | "apply-now";

interface NavigationButtonsProps {
  activeSection: Section;
  handleSectionChange: (section: Section) => void;
  handleQuestApplyAI: () => void;
  isQuestApplyAI: boolean;
  isDarkMode: boolean;
}

const NavigationButtons = ({
  activeSection,
  handleSectionChange,
  handleQuestApplyAI,
  isQuestApplyAI,
  isDarkMode
}: NavigationButtonsProps) => {
  return (
    <div className="mb-8 flex overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex space-x-1.5 md:space-x-2">
        <Button
          variant={isQuestApplyAI ? "default" : "outline"}
          className={`flex items-center gap-1.5 min-w-max transition-all duration-300 relative ${
            isQuestApplyAI 
              ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
          }`}
          onClick={handleQuestApplyAI}
          size="sm"
        >
          <Search className="w-3.5 h-3.5" />
          QuestApply AI
          <span className="absolute -top-2 -right-2 px-1 py-0.5 text-[9px] font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full animate-pulse">
            NEW
          </span>
        </Button>
        
        <Button
          variant={activeSection === "ai-talent-test" ? "default" : "outline"}
          className={`flex items-center gap-1.5 min-w-max transition-all duration-300 ${
            activeSection === "ai-talent-test" 
              ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
          }`}
          onClick={() => handleSectionChange("ai-talent-test")}
          size="sm"
        >
          <Activity className="w-3.5 h-3.5" />
          AI Talent Test
        </Button>
        
        <Button
          variant={activeSection === "find-schools" ? "default" : "outline"}
          className={`flex items-center gap-1.5 min-w-max transition-all duration-300 ${
            activeSection === "find-schools" 
              ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
          }`}
          onClick={() => handleSectionChange("find-schools")}
          size="sm"
        >
          <Book className="w-3.5 h-3.5" />
          Find Schools
        </Button>
        
        <Button
          variant={activeSection === "find-programs" ? "default" : "outline"}
          className={`flex items-center gap-1.5 min-w-max transition-all duration-300 ${
            activeSection === "find-programs" 
              ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
          }`}
          onClick={() => handleSectionChange("find-programs")}
          size="sm"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Find Programs
        </Button>
        
        <Button
          variant={activeSection === "find-professors" ? "default" : "outline"}
          className={`flex items-center gap-1.5 min-w-max transition-all duration-300 ${
            activeSection === "find-professors" 
              ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
          }`}
          onClick={() => handleSectionChange("find-professors")}
          size="sm"
        >
          <Users className="w-3.5 h-3.5" />
          Find Professors
        </Button>
        
        <Button
          variant={activeSection === "create-resume" ? "default" : "outline"}
          className={`flex items-center gap-1.5 min-w-max transition-all duration-300 ${
            activeSection === "create-resume" 
              ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
          }`}
          onClick={() => handleSectionChange("create-resume")}
          size="sm"
        >
          <FileText className="w-3.5 h-3.5" />
          Create Resume
        </Button>
        
        <Button
          variant={activeSection === "create-sop" ? "default" : "outline"}
          className={`flex items-center gap-1.5 min-w-max transition-all duration-300 ${
            activeSection === "create-sop" 
              ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
          }`}
          onClick={() => handleSectionChange("create-sop")}
          size="sm"
        >
          <FilePen className="w-3.5 h-3.5" />
          Create SOP
        </Button>
        
        <Button
          variant={activeSection === "create-lor" ? "default" : "outline"}
          className={`flex items-center gap-1.5 min-w-max transition-all duration-300 ${
            activeSection === "create-lor" 
              ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
          }`}
          onClick={() => handleSectionChange("create-lor")}
          size="sm"
        >
          <FileLock className="w-3.5 h-3.5" />
          Create LOR
        </Button>
        
        <Button
          variant={activeSection === "apply-now" ? "default" : "outline"}
          className={`flex items-center gap-1.5 min-w-max transition-all duration-300 ${
            activeSection === "apply-now" 
              ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              : `${isDarkMode ? "hover:bg-teal-900/30" : "hover:bg-teal-100"}`
          }`}
          onClick={() => handleSectionChange("apply-now")}
          size="sm"
        >
          <Check className="w-3.5 h-3.5" />
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;
