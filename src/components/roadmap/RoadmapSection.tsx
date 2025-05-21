
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GradientCard } from "@/components/ui/gradient-card";
import { 
  Search, 
  BookOpen, 
  User, 
  FileText, 
  Send, 
  Calendar,
  Activity
} from "lucide-react";
import FindSchools from "@/components/dashboard/sections/FindSchools";
import FindPrograms from "@/components/dashboard/sections/FindPrograms";
import FindProfessors from "@/components/dashboard/sections/FindProfessors";
import { cn } from "@/lib/utils";

const RoadmapSection = () => {
  // States for tracking active step and selected programs
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showFindSchools, setShowFindSchools] = useState(false);
  const [showFindPrograms, setShowFindPrograms] = useState(false);
  const [showFindProfessors, setShowFindProfessors] = useState(false);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Step data with new color scheme
  const steps = [
    { 
      id: 1, 
      title: "Find Schools", 
      icon: <Search className="h-5 w-5" />,
      color: "#6366f1"
    },
    { 
      id: 2, 
      title: "Find Programs", 
      icon: <BookOpen className="h-5 w-5" />,
      color: "#ec4899" 
    },
    { 
      id: 3, 
      title: "Find Professors", 
      icon: <User className="h-5 w-5" />,
      color: "#f97316" 
    },
    { 
      id: 4, 
      title: "Create Resume", 
      icon: <FileText className="h-5 w-5" />,
      color: "#10b981" 
    },
    { 
      id: 5, 
      title: "Create SOP", 
      icon: <FileText className="h-5 w-5" />,
      color: "#0ea5e9" 
    },
    { 
      id: 6, 
      title: "Create LOR", 
      icon: <FileText className="h-5 w-5" />,
      color: "#14b8a6" 
    },
    { 
      id: 7, 
      title: "Apply Now", 
      icon: <Send className="h-5 w-5" />,
      color: "#84cc16" 
    }
  ];

  // Handle step click
  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    
    // Reset all display states
    setShowFindSchools(false);
    setShowFindPrograms(false);
    setShowFindProfessors(false);
    setShowApplyPopup(false);
    setShowApplicationForm(false);
    
    // Handle specific step actions without auto-scrolling
    if (stepId === 1) {
      setShowFindSchools(true);
    } else if (stepId === 2) {
      setShowFindPrograms(true);
    } else if (stepId === 3) {
      setShowFindProfessors(true);
    } else if (stepId === 7) {
      // For Apply Now, show popup after a delay
      setTimeout(() => setShowApplyPopup(true), 800);
    }
  };

  // Handle applying (for step 7)
  const handleApplyNow = () => {
    setShowApplyPopup(false);
    setShowApplicationForm(true);
  };

  const handleSubmitWithUs = () => {
    // In a real app, this would handle the submission form
    console.log("Submit with us clicked");
  };

  return (
    <div className="w-full bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-900 dark:from-purple-800 dark:via-indigo-900 dark:to-purple-900 light:from-purple-200 light:via-indigo-100 light:to-purple-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title - Styled to match "AI Meets Your Talent" */}
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 dark:text-white text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI-Powered</span> Roadmap to Success
        </motion.h2>
        
        {/* Subtitle - Styled to match AI Meets Your Talent subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-center mb-16 dark:text-purple-200 text-purple-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A smart, step-by-step guide that uses AI to help you reach your educational and career goals.
        </motion.p>
        
        {/* Roadmap Container with width of 1152px */}
        <div className="w-full max-w-[1152px] mx-auto"> 
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <GradientCard 
              variant="talent-section" 
              className="p-4 md:p-6 shadow-xl w-full dark:bg-gray-800 bg-white/90"
            >
              {/* Updated Button Layout - with icons above text */}
              <div className="flex justify-center items-center my-6 px-3 py-2">
                <div className="flex flex-wrap justify-center gap-2 w-full">
                  {steps.map((step) => (
                    <React.Fragment key={step.id}>
                      {/* Button */}
                      <motion.button
                        className={cn(
                          "relative flex flex-col items-center justify-center px-4 py-4 rounded-md text-sm md:text-base transition-all duration-300",
                          "border border-gray-200 dark:border-gray-700",
                          activeStep === step.id 
                            ? "bg-purple-600 text-white border-purple-700 shadow-md shadow-purple-500/20" 
                            : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-200 dark:hover:border-purple-600"
                        )}
                        onClick={() => handleStepClick(step.id)}
                        whileHover={{ 
                          y: -2,
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
                        }}
                        style={{
                          width: `calc(${100 / steps.length}% - 8px)`,
                          minWidth: '130px',
                          maxWidth: '160px',
                          height: '90px' // Increased height to accommodate vertical layout
                        }}
                      >
                        {/* Icon - Now positioned above text */}
                        <span 
                          className={cn(
                            "flex items-center justify-center h-8 w-8 rounded-md mb-2",
                            activeStep === step.id ? "text-white" : ""
                          )}
                          style={{ color: activeStep === step.id ? "#ffffff" : step.color }}
                        >
                          {step.icon}
                        </span>
                        
                        {/* Step Title */}
                        <span className="font-medium whitespace-nowrap text-center">
                          {step.title}
                        </span>
                      </motion.button>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              
              {/* Dynamic Content Area - Fixed height with scrolling */}
              <div className="mt-6">
                <ScrollArea className="h-[500px] rounded-md px-1">
                  {activeStep === null && (
                    <motion.div 
                      className="text-center py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-purple-200 text-lg dark:text-purple-200 text-purple-700">
                        Click on any step above to see a demonstration of our application process
                      </p>
                    </motion.div>
                  )}
                  
                  {activeStep === 1 && showFindSchools && (
                    <FindSchools />
                  )}
                  
                  {activeStep === 2 && showFindPrograms && (
                    <FindPrograms />
                  )}
                  
                  {activeStep === 3 && showFindProfessors && (
                    <FindProfessors />
                  )}
                  
                  {activeStep === 4 && (
                    <motion.div 
                      className="bg-gray-800/50 p-6 rounded-lg mx-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Create Resume</h3>
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {["Guidance", "Choose Template", "My Resumes", "AI Improvement", "Match with University", "Success Stories", "ATS Analysis"].map((tab) => (
                          <div key={tab} className="px-4 py-2 bg-gray-700 rounded-md text-white whitespace-nowrap">
                            {tab}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center text-purple-300">
                        <p>Create professionally formatted resumes tailored for academic applications</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeStep === 5 && (
                    <motion.div 
                      className="bg-gray-800/50 p-6 rounded-lg mx-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Create Statement of Purpose</h3>
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {["Guidance", "Templates", "My SOP", "AI Improvement", "University Match", "Success Stories"].map((tab) => (
                          <div key={tab} className="px-4 py-2 bg-gray-700 rounded-md text-white whitespace-nowrap">
                            {tab}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center text-purple-300">
                        <p>Craft compelling statements that showcase your academic journey and future goals</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeStep === 6 && (
                    <motion.div 
                      className="bg-gray-800/50 p-6 rounded-lg mx-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">Create Letter of Recommendation</h3>
                      <div className="flex space-x-2 overflow-x-auto pb-2">
                        {["Guidance", "LOR Samples", "My LORs", "AI Improvement", "Strengths Highlighter", "Professional Tone", "AI Humanizer"].map((tab) => (
                          <div key={tab} className="px-4 py-2 bg-gray-700 rounded-md text-white whitespace-nowrap">
                            {tab}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center text-purple-300">
                        <p>Generate powerful recommendation letters that highlight your strengths and potential</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {activeStep === 7 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="px-2"
                    >
                      {!showApplyPopup && !showApplicationForm && (
                        <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                          <h3 className="text-xl font-semibold text-white mb-4">Apply Now</h3>
                          <p className="text-purple-300">Click to see your selected programs and begin the application process</p>
                        </div>
                      )}
                      
                      {showApplyPopup && (
                        <motion.div 
                          className="bg-gray-800/50 p-6 rounded-lg"
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-xl font-semibold text-white mb-4">Selected Programs</h3>
                          <div className="space-y-4 mb-6">
                            {[
                              { id: 1, title: "PhD in Computer Science", school: "Stanford University" },
                              { id: 2, title: "PhD in Artificial Intelligence", school: "Massachusetts Institute of Technology" }
                            ].map((program) => (
                              <div key={program.id} className="border border-gray-700 rounded-lg p-4 bg-gray-700/50">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="text-lg font-medium text-white">{program.title}</h4>
                                    <p className="text-purple-300">{program.school}</p>
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    className="bg-green-800/30 text-green-400 border-green-600"
                                    onClick={handleApplyNow}
                                  >
                                    Apply Now
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      
                      {showApplicationForm && (
                        <motion.div 
                          className="bg-gray-800/50 p-6 rounded-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <h3 className="text-xl font-semibold text-white mb-6">Application Options</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-700 rounded-lg p-6 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 hover:from-purple-900/40 hover:to-indigo-900/40 transition-all">
                              <h4 className="text-lg font-medium text-white mb-2">Apply Yourself</h4>
                              <p className="text-gray-300 mb-4">Apply directly through the university's website using our guidance.</p>
                              <Button className="w-full bg-purple-800 hover:bg-purple-700 text-white">
                                Continue
                              </Button>
                            </div>
                            
                            <div 
                              className="border border-indigo-600/30 rounded-lg p-6 bg-gradient-to-br from-indigo-900/30 to-blue-900/30 hover:from-indigo-900/40 hover:to-blue-900/40 transition-all"
                              onClick={handleSubmitWithUs}
                            >
                              <h4 className="text-lg font-medium text-white mb-2">Submit with Us</h4>
                              <p className="text-gray-300 mb-4">We handle the entire application process on your behalf.</p>
                              <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white">
                                Submit with Us
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </ScrollArea>
              </div>
            </GradientCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSection;
