import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Flag, Home, School, Globe, Languages, TestTube, ArrowRight, Check, Circle } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/components/ui/use-toast";

// Import step components
import CitizenshipResidency from "@/components/profile/CitizenshipResidency";
import Education from "@/components/profile/Education";
import StudyGoals from "@/components/profile/StudyGoals";
import LanguageProficiency from "@/components/profile/LanguageProficiency";
import StandardizedTests from "@/components/profile/StandardizedTests";
import ProfileComplete from "@/components/profile/ProfileComplete";

const steps = [
  { id: 'citizenship', title: 'Citizenship & Residency', icon: Flag },
  { id: 'education', title: 'Education', icon: School },
  { id: 'goals', title: 'Study Abroad Goals', icon: Globe },
  { id: 'language', title: 'Language Proficiency', icon: Languages },
  { id: 'tests', title: 'Standardized Tests', icon: TestTube },
  { id: 'complete', title: 'Complete', icon: Check },
];

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [profileData, setProfileData] = useState({
    citizenship: { citizenship: '', residence: '' },
    education: { degree: '', university: '', major: '', gpa: '' },
    goals: { country: '', level: '', field: '' },
    language: { test: '', score: '' },
    tests: { type: '', scores: {} }
  });
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if dark mode is active in document
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    // Calculate progress
    const newProgress = Math.min(100, (currentStep / (steps.length - 1)) * 100);
    setProgress(newProgress);
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

  const handleNext = (data) => {
    if (currentStep < steps.length - 1) {
      // Update data for the current step
      setProfileData(prev => ({ ...prev, [steps[currentStep].id]: data }));
      
      // Move to next step
      setCurrentStep(prev => prev + 1);
      
      // Show toast message
      toast({
        title: "Step completed",
        description: `${steps[currentStep].title} information saved successfully.`,
      });
    } else {
      // Final step, complete profile setup
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CitizenshipResidency onNext={handleNext} data={profileData.citizenship} />;
      case 1:
        return <Education onNext={handleNext} data={profileData.education} />;
      case 2:
        return <StudyGoals onNext={handleNext} data={profileData.goals} />;
      case 3:
        return <LanguageProficiency onNext={handleNext} data={profileData.language} />;
      case 4:
        return <StandardizedTests onNext={handleNext} data={profileData.tests} />;
      case 5:
        return <ProfileComplete onNext={handleNext} profileData={profileData} />;
      default:
        return null;
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const backgroundVariants = {
    light: {
      background: "linear-gradient(to right, #e6e9f0 0%, #eef1f5 100%)"
    },
    dark: {
      background: "linear-gradient(to right, #243949 0%, #517fa4 100%)"
    }
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      animate={isDarkMode ? "dark" : "light"}
      variants={backgroundVariants}
      transition={{ duration: 0.8 }}
    >
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                QuestApply
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">|</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Profile Setup</span>
            </div>
            
            {/* Progress indicators */}
            <div className="hidden md:flex items-center space-x-2">
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isActive = idx === currentStep;
                const isCompleted = idx < currentStep;
                
                return (
                  <div key={step.id} className="flex items-center">
                    {idx > 0 && (
                      <div className={`h-px w-8 ${isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`} />
                    )}
                    <div 
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full 
                        ${isActive ? 'bg-purple-600 text-white' : 
                          isCompleted ? 'bg-green-500 text-white' : 
                          'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Theme toggle */}
            <Toggle 
              pressed={!isDarkMode} 
              onPressedChange={toggleTheme}
              variant="outline"
              className={`rounded-full p-2 ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Toggle>
          </div>
          
          {/* Mobile progress indicator */}
          <div className="md:hidden py-2">
            <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
            <div className="flex justify-between text-xs mt-1 text-gray-500 dark:text-gray-400">
              <span>{steps[currentStep]?.title || 'Start'}</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={{ type: "tween", duration: 0.4 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons below form */}
          <div className="mt-6 flex justify-between">
            <Button
              onClick={handleBack}
              disabled={currentStep === 0}
              variant="outline"
              className="px-6"
            >
              Back
            </Button>

            {/* Step indicators */}
            <div className="hidden md:flex items-center space-x-2">
              {steps.slice(0, steps.length - 1).map((_, idx) => (
                <Circle 
                  key={idx}
                  className={`w-2 h-2 ${idx === currentStep ? 'fill-purple-600 text-purple-600' : idx < currentStep ? 'fill-green-500 text-green-500' : 'fill-gray-300 dark:fill-gray-700 text-gray-300 dark:text-gray-700'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default Profile;
