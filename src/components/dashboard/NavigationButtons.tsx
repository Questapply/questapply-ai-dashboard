
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
      <div className="flex space-x-2">
        <Button
          variant={isQuestApplyAI ? "schools" : "outline"} 
          className={`flex items-center gap-1.5 h-10 px-3 py-1 min-w-max transition-all duration-300 relative ${
            isQuestApplyAI ? "" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={handleQuestApplyAI}
          size="sm"
        >
          <Search className="w-4 h-4" />
          <span>QuestApply AI</span>
          <span className="absolute -top-2 -right-2 px-1 py-0.5 text-[9px] font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full animate-pulse">
            NEW
          </span>
        </Button>
        
        <Button
          variant={activeSection === "ai-talent-test" ? "schools" : "outline"} 
          className={`flex items-center gap-1.5 h-10 px-3 py-1 min-w-max transition-all duration-300 ${
            activeSection === "ai-talent-test" ? "" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => handleSectionChange("ai-talent-test")}
          size="sm"
        >
          <Activity className="w-4 h-4" />
          <span>AI Talent Test</span>
        </Button>
        
        <Button
          variant={activeSection === "find-schools" ? "schools" : "outline"}
          className={`flex items-center gap-1.5 h-10 px-3 py-1 min-w-max transition-all duration-300 ${
            activeSection === "find-schools" ? "" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => handleSectionChange("find-schools")}
          size="sm"
        >
          <Book className="w-4 h-4" />
          <span>Find Schools</span>
        </Button>
        
        <Button
          variant={activeSection === "find-programs" ? "schools" : "outline"}
          className={`flex items-center gap-1.5 h-10 px-3 py-1 min-w-max transition-all duration-300 ${
            activeSection === "find-programs" ? "" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => handleSectionChange("find-programs")}
          size="sm"
        >
          <BookOpen className="w-4 h-4" />
          <span>Find Programs</span>
        </Button>
        
        <Button
          variant={activeSection === "find-professors" ? "schools" : "outline"}
          className={`flex items-center gap-1.5 h-10 px-3 py-1 min-w-max transition-all duration-300 ${
            activeSection === "find-professors" ? "" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => handleSectionChange("find-professors")}
          size="sm"
        >
          <Users className="w-4 h-4" />
          <span>Find Professors</span>
        </Button>
        
        <Button
          variant={activeSection === "create-resume" ? "schools" : "outline"}
          className={`flex items-center gap-1.5 h-10 px-3 py-1 min-w-max transition-all duration-300 ${
            activeSection === "create-resume" ? "" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => handleSectionChange("create-resume")}
          size="sm"
        >
          <FileText className="w-4 h-4" />
          <span>Create Resume</span>
        </Button>
        
        <Button
          variant={activeSection === "create-sop" ? "schools" : "outline"}
          className={`flex items-center gap-1.5 h-10 px-3 py-1 min-w-max transition-all duration-300 ${
            activeSection === "create-sop" ? "" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => handleSectionChange("create-sop")}
          size="sm"
        >
          <FilePen className="w-4 h-4" />
          <span>Create SOP</span>
        </Button>
        
        <Button
          variant={activeSection === "create-lor" ? "schools" : "outline"}
          className={`flex items-center gap-1.5 h-10 px-3 py-1 min-w-max transition-all duration-300 ${
            activeSection === "create-lor" ? "" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => handleSectionChange("create-lor")}
          size="sm"
        >
          <FileLock className="w-4 h-4" />
          <span>Create LOR</span>
        </Button>
        
        <Button
          variant={activeSection === "apply-now" ? "schools" : "outline"}
          className={`flex items-center gap-1.5 h-10 px-3 py-1 min-w-max transition-all duration-300 ${
            activeSection === "apply-now" ? "" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          }`}
          onClick={() => handleSectionChange("apply-now")}
          size="sm"
        >
          <Check className="w-4 h-4" />
          <span>Apply Now</span>
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;
