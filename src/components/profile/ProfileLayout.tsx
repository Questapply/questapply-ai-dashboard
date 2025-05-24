
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sun, Moon, ArrowRight } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/hooks/use-toast";
import StepNavigation from "./StepNavigation";
import StepContent from "./StepContent";
import { Step, StepData, ProfileStep } from "./ProfileTypes";

// Define the steps
const steps: Step[] = [
  { id: 'citizenship', title: 'Citizenship & Residency', icon: "Flag" },
  { id: 'education', title: 'Education', icon: "School" },
  { id: 'goals', title: 'Study Abroad Goals', icon: "Globe" },
  { id: 'language', title: 'Language Proficiency', icon: "Languages" },
  { id: 'tests', title: 'Standardized Tests', icon: "TestTube" },
  { id: 'priorities', title: 'Application Priorities', icon: "Target" },
  { id: 'financial', title: 'Financial Status', icon: "DollarSign" },
  { id: 'programs', title: 'Number of Programs', icon: "List" },
  { id: 'complete', title: 'Complete', icon: "Check" },
];

const ProfileLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<ProfileStep>('citizenship');
  const [progress, setProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [formData, setFormData] = useState<StepData>({
    citizenship: { country: "", residence: "" },
    education: { degree: "", university: "", major: "", gpa: "" },
    goals: { country: "", level: "", field: "" },
    language: { test: "", score: "" },
    tests: { type: "", scores: {} },
    priorities: { options: [] },
    financial: { requiresFunding: false, budget: "" },
    programs: { count: 0 }
  });

  useEffect(() => {
    // Update progress when step changes
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    setProgress(((currentIndex) / (steps.length - 1)) * 100);
  }, [currentStep]);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNext = (data: any) => {
    // Find the current step index
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    
    // Check if this is a "back" navigation
    if (data.type === "back") {
      // Move back one step if possible
      if (currentIndex > 0) {
        setCurrentStep(steps[currentIndex - 1].id as ProfileStep);
      }
      return;
    }
    
    // Update form data for forward navigation
    setFormData(prevData => ({
      ...prevData,
      [currentStep]: data
    }));
    
    // If this is the last step, finalize the process and navigate to plans page
    if (currentStep === 'complete') {
      navigate('/apply-with-us/plans');
      return;
    }
    
    // If this is the second-to-last step, navigate to the complete step
    if (currentIndex === steps.length - 2) {
      setCurrentStep('complete');
      
      // Show success toast
      toast({
        title: "Profile Almost Complete!",
        description: "Just one more step to finalize your profile.",
      });
    } else if (currentIndex < steps.length - 2) {
      // Move to the next step
      setCurrentStep(steps[currentIndex + 1].id as ProfileStep);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header with Theme Toggle */}
      <header className="p-4 flex justify-end">
        <Toggle
          aria-label="Toggle theme"
          pressed={isDarkMode}
          onPressedChange={toggleTheme}
          className="p-2"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Toggle>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl">
          {/* Progress Bar */}
          <div className="mb-10 px-8 md:px-16">
            <div className="flex flex-col gap-2 mb-4">
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Completion
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Complete your profile to get personalized university recommendations
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Navigation */}
          <StepNavigation 
            steps={steps} 
            currentStep={currentStep} 
            progress={progress} 
          />

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <StepContent 
                currentStep={currentStep} 
                onNext={handleNext} 
                data={formData} 
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Skip button (except for complete step) */}
      {currentStep !== 'complete' && (
        <div className="flex justify-center p-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            Skip for now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileLayout;
