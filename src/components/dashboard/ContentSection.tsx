
import AiTalentAssessment from "@/components/dashboard/sections/AiTalentAssessment";
import FindSchools from "@/components/dashboard/sections/FindSchools";
import FindPrograms from "@/components/dashboard/sections/FindPrograms";
import FindProfessors from "@/components/dashboard/sections/FindProfessors";
import CreateResume from "@/components/dashboard/sections/CreateResume";
import CreateSOP from "@/components/dashboard/sections/CreateSOP";
import CreateLOR from "@/components/dashboard/sections/CreateLOR";
import ApplyNow from "@/components/dashboard/sections/ApplyNow";
import { Section } from "@/utils/FilterUtils";
import { motion } from "framer-motion";

interface ContentSectionProps {
  activeSection: Section;
  isQuestApplyAI: boolean;
}

const ContentSection = ({ activeSection, isQuestApplyAI }: ContentSectionProps) => {
  if (isQuestApplyAI) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6 overflow-x-hidden"
      >
        <h2 className="text-2xl font-semibold mb-4">QuestApply AI Search</h2>
        <p className="text-lg">
          Ask anything about admissions, programs, or application processes. Our AI-powered assistant will help you find the information you need.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8">
          <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-blue-50 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Find Schools & Programs</h3>
            <p className="text-gray-600 dark:text-gray-300">Explore top universities and programs tailored to your profile and interests</p>
          </div>
          
          <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Application Documents</h3>
            <p className="text-gray-600 dark:text-gray-300">Get assistance with your resume, SOP, and recommendation letters</p>
          </div>
          
          <div className="p-4 md:p-6 rounded-xl bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 shadow-sm">
            <h3 className="text-lg font-medium mb-2">Application Timeline</h3>
            <p className="text-gray-600 dark:text-gray-300">Stay on track with important deadlines and application steps</p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Render the appropriate section based on activeSection
  switch (activeSection) {
    case "ai-talent-test":
      return <AiTalentAssessment />;
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
      return <AiTalentAssessment />;
  }
};

export default ContentSection;
