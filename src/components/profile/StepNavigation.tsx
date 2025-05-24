
import React from "react";
import { motion } from "framer-motion";
import { Flag, School, Globe, Languages, TestTube, Check, Circle, Target, DollarSign, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Step, ProfileStep } from "./ProfileTypes";

interface StepNavigationProps {
  steps: Step[];
  currentStep: ProfileStep;
  progress: number;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  steps,
  currentStep,
  progress
}) => {
  // Function to render the appropriate icon
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Flag":
        return <Flag className="h-5 w-5" />;
      case "School":
        return <School className="h-5 w-5" />;
      case "Globe":
        return <Globe className="h-5 w-5" />;
      case "Languages":
        return <Languages className="h-5 w-5" />;
      case "TestTube":
        return <TestTube className="h-5 w-5" />;
      case "Target":
        return <Target className="h-5 w-5" />;
      case "DollarSign":
        return <DollarSign className="h-5 w-5" />;
      case "List":
        return <List className="h-5 w-5" />;
      case "Check":
        return <Check className="h-5 w-5" />;
      default:
        return <Circle className="h-5 w-5" />;
    }
  };

  // Function to split title into two lines
  const formatTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length <= 2) {
      return { line1: title, line2: "" };
    }
    
    // Split based on common patterns
    switch (title) {
      case "Citizenship & Residency":
        return { line1: "Citizenship &", line2: "Residency" };
      case "Study Abroad Goals":
        return { line1: "Study Abroad", line2: "Goals" };
      case "Language Proficiency":
        return { line1: "Language", line2: "Proficiency" };
      case "Standardized Tests":
        return { line1: "Standardized", line2: "Tests" };
      case "Application Priorities":
        return { line1: "Application", line2: "Priorities" };
      case "Financial Status":
        return { line1: "Financial", line2: "Status" };
      case "Number of Programs":
        return { line1: "Number of", line2: "Programs" };
      default:
        // For other cases, split roughly in half
        const midPoint = Math.ceil(words.length / 2);
        return {
          line1: words.slice(0, midPoint).join(' '),
          line2: words.slice(midPoint).join(' ')
        };
    }
  };

  return (
    <div className="hidden md:flex justify-between mb-8 px-6">
      {steps.map((step, index) => {
        const isPrevious = steps.findIndex(s => s.id === currentStep) > index;
        const isCurrent = step.id === currentStep;
        const stepProgress = (index / (steps.length - 1)) * 100;
        const { line1, line2 } = formatTitle(step.title);
        
        return (
          <div key={step.id} className="flex flex-col items-center max-w-[120px]">
            {/* Step Icon */}
            <motion.div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center mb-2 transition-colors duration-200",
                isCurrent ? 
                  "bg-gradient-to-r from-purple-500 to-indigo-500 text-white" : 
                  isPrevious || progress >= stepProgress ? 
                    "bg-green-500 text-white" : 
                    "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              )}
              animate={{
                scale: isCurrent ? [1, 1.1, 1] : 1,
              }}
              transition={{ 
                duration: 0.5, 
                repeat: isCurrent ? Infinity : 0, 
                repeatType: "reverse" 
              }}
            >
              {getIcon(step.icon)}
            </motion.div>
            
            {/* Step Title - Two Lines */}
            <div className="text-center">
              <div 
                className={cn(
                  "text-xs font-medium leading-tight",
                  isCurrent ? 
                    "text-purple-600 dark:text-purple-400" : 
                    isPrevious || progress >= stepProgress ? 
                      "text-green-600 dark:text-green-400" : 
                      "text-gray-500 dark:text-gray-400"
                )}
              >
                {line1}
              </div>
              {line2 && (
                <div 
                  className={cn(
                    "text-xs font-medium leading-tight",
                    isCurrent ? 
                      "text-purple-600 dark:text-purple-400" : 
                      isPrevious || progress >= stepProgress ? 
                        "text-green-600 dark:text-green-400" : 
                        "text-gray-500 dark:text-gray-400"
                  )}
                >
                  {line2}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepNavigation;
