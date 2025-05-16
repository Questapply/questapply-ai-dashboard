
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
  Users,
  Trophy,
  DollarSign,
  Building
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
        { icon: <Globe size={16} />, label: "Country" },
        { icon: <Map size={16} />, label: "State" },
        { icon: <GraduationCap size={16} />, label: "Schools" },
        { icon: <BookOpen size={16} />, label: "Degree Level" },
        { icon: <FileText size={16} />, label: "Area of Study" },
        { icon: <Scroll size={16} />, label: "Programs" },
        { icon: <ArrowUpDown size={16} />, label: "Order By" }
      ];
    case "find-programs":
      return [
        { icon: <Globe size={16} />, label: "Country" },
        { icon: <Map size={16} />, label: "State" },
        { icon: <GraduationCap size={16} />, label: "Schools" },
        { icon: <BookOpen size={16} />, label: "Degree Level" },
        { icon: <FileText size={16} />, label: "Area of Study" },
        { icon: <Scroll size={16} />, label: "Programs" },
        { icon: <Calendar size={16} />, label: "Deadline" },
        { icon: <FileText size={16} />, label: "English" },
        { icon: <PercentIcon size={16} />, label: "GPA" },
        { icon: <BarChart size={16} />, label: "GRE" },
        { icon: <ArrowUpDown size={16} />, label: "Order By" }
      ];
    case "find-professors":
      return [
        { icon: <Globe size={16} />, label: "Country" },
        { icon: <Map size={16} />, label: "State" },
        { icon: <GraduationCap size={16} />, label: "Schools" },
        { icon: <FileText size={16} />, label: "Area of Study" },
        { icon: <Scroll size={16} />, label: "Programs" },
        { icon: <BookOpen size={16} />, label: "Research Interest" },
        { icon: <Users size={16} />, label: "Title" }
      ];
    default:
      return null;
  }
};
