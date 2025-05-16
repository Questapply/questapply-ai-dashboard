
import { ReactNode } from "react";
import { 
  Globe, 
  Map, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Scroll, 
  Calendar, 
  PercentIcon, 
  BarChart, 
  ArrowUpDown,
  Users
} from "lucide-react";

export interface FilterOption {
  icon: ReactNode;
  label: string;
}

export type Section = 
  | "ai-talent-test"
  | "find-schools"
  | "find-programs"
  | "find-professors"
  | "create-resume"
  | "create-sop"
  | "create-lor"
  | "apply-now";

export const getFilterOptions = (activeSection: Section, isQuestApplyAI: boolean) => {
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
