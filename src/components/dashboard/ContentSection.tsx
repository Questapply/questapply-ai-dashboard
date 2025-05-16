
import AiTalentTest from "@/components/dashboard/sections/AiTalentTest";
import FindSchools from "@/components/dashboard/sections/FindSchools";
import FindPrograms from "@/components/dashboard/sections/FindPrograms";
import FindProfessors from "@/components/dashboard/sections/FindProfessors";
import CreateResume from "@/components/dashboard/sections/CreateResume";
import CreateSOP from "@/components/dashboard/sections/CreateSOP";
import CreateLOR from "@/components/dashboard/sections/CreateLOR";
import ApplyNow from "@/components/dashboard/sections/ApplyNow";
import { Section } from "@/utils/FilterUtils";

interface ContentSectionProps {
  activeSection: Section;
  isQuestApplyAI: boolean;
}

const ContentSection = ({ activeSection, isQuestApplyAI }: ContentSectionProps) => {
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

export default ContentSection;
