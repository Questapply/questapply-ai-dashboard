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
  ListOrdered 
} from "lucide-react";
import FilterDropdown from "@/components/dashboard/filters/FilterDropdown";
import {
  countryOptions,
  degreeLevelOptions,
  areaOfStudyOptions,
  programOptions,
  orderBySchoolOptions,
  filterIcons
} from "@/components/dashboard/sections/FilterData";
import { schools } from "@/components/dashboard/sections/find-schools/SchoolsData";
import SchoolCard from "@/components/dashboard/sections/find-schools/SchoolCard";

const RoadmapSection = () => {
  // States for tracking active step and selected programs
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    country: "United States",
    degreeLevel: "PhD",
    areaOfStudy: "Engineering & Technology",
    program: "Computer Science",
    orderBy: "QS Ranking",
    deadline: "Fall",
    englishTest: "TOEFL",
    englishScore: "100",
    gpa: "3.7",
    gre: "320",
    researchInterest: "AI",
    title: "Professor"
  });
  const [selectedPrograms, setSelectedPrograms] = useState<number[]>([]);
  const [showProgramCards, setShowProgramCards] = useState(false);
  const [showProfessorCards, setShowProfessorCards] = useState(false);
  const [showSchoolCards, setShowSchoolCards] = useState(false);
  const [showApplyPopup, setShowApplyPopup] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Step data
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
      color: "#8b5cf6" 
    },
    { 
      id: 3, 
      title: "Find Professors", 
      icon: <User className="h-5 w-5" />,
      color: "#ec4899" 
    },
    { 
      id: 4, 
      title: "Create Resume", 
      icon: <FileText className="h-5 w-5" />,
      color: "#14b8a6" 
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
      color: "#f59e0b" 
    },
    { 
      id: 7, 
      title: "Apply Now", 
      icon: <Send className="h-5 w-5" />,
      color: "#10b981" 
    }
  ];

  // Handle step click
  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    
    // Reset all display states
    setShowSchoolCards(false);
    setShowProgramCards(false);
    setShowProfessorCards(false);
    setShowApplyPopup(false);
    setShowApplicationForm(false);
    
    // Handle specific step actions without auto-scrolling
    if (stepId === 1) {
      setTimeout(() => setShowSchoolCards(true), 800);
    } else if (stepId === 2) {
      setTimeout(() => setShowProgramCards(true), 800);
    } else if (stepId === 3) {
      setTimeout(() => setShowProfessorCards(true), 800);
    } else if (stepId === 7) {
      // For Apply Now, show popup after a delay
      setTimeout(() => setShowApplyPopup(true), 800);
    }
  };

  // Handle selecting programs (for step 2)
  const handleAddToList = (programId: number) => {
    setSelectedPrograms(prev => 
      prev.includes(programId) 
        ? prev.filter(id => id !== programId) 
        : [...prev, programId]
    );
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
    <div className="w-full bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-indigo-800/90 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title - Styled to match "AI Meets Your Talent" */}
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">AI-Powered</span> Roadmap to Success
        </motion.h2>
        
        {/* Subtitle - Styled to match AI Meets Your Talent subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-center text-purple-200 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A smart, step-by-step guide that uses AI to help you reach your educational and career goals.
        </motion.p>
        
        {/* Roadmap Container - We'll use a div for content and wrap in GradientCard */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <GradientCard 
              variant="talent-section"
              className="p-6 md:p-8 shadow-xl"
            >
              {/* Workflow Steps - Styled like n8n nodes with connector line */}
              <div className="flex flex-wrap justify-center mb-12 relative">
                {/* Connector Lines */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform -translate-y-1/2 z-0"></div>
                
                {/* n8n styled steps */}
                {steps.map((step, index) => (
                  <div key={step.id} className="relative z-10 px-2 mb-6 md:mb-0">
                    <motion.button
                      className={`relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 p-4 rounded-lg transition-all duration-300
                        ${activeStep === step.id 
                          ? 'bg-gray-800 shadow-lg border-2 border-white/20 dark:bg-gray-800/90' 
                          : 'bg-gray-800/80 hover:bg-gray-800 border border-gray-700/50 hover:border-purple-500/50 dark:bg-gray-800/60 dark:hover:bg-gray-800/80'}`}
                      onClick={() => handleStepClick(step.id)}
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)",
                        transition: { duration: 0.2 }
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      {/* Node indicator dot */}
                      <div 
                        className={`absolute top-0 right-0 w-3 h-3 rounded-full mr-2 mt-2 
                          ${activeStep === step.id ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}
                      ></div>
                      
                      {/* Icon */}
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                        style={{ backgroundColor: `${step.color}30` }}
                      >
                        <div style={{ color: step.color }}>
                          {step.icon}
                        </div>
                      </div>
                      
                      {/* Step Title */}
                      <span className="text-sm font-medium text-white text-center">
                        {step.title}
                      </span>
                      
                      {/* Step Number */}
                      <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600 text-xs text-white">
                        {step.id}
                      </div>
                    </motion.button>
                  </div>
                ))}
              </div>
              
              {/* Dynamic Content Area - Fixed height with scrolling */}
              <div className="mt-8">
                <ScrollArea className="h-[400px] rounded-md">
                  {activeStep === 1 && (
                    <div className="space-y-8 px-2">
                      {/* Filters */}
                      <motion.div 
                        className="flex flex-wrap gap-2 p-4 bg-gray-800/50 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FilterDropdown 
                          label="Country" 
                          icon={<span>{filterIcons.country}</span>}
                          options={countryOptions}
                          selectedValue="United States"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Degree Level" 
                          icon={<span>{filterIcons.degreeLevel}</span>}
                          options={degreeLevelOptions}
                          selectedValue="PhD"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Area of Study" 
                          icon={<span>{filterIcons.areaOfStudy}</span>}
                          options={areaOfStudyOptions}
                          selectedValue="Engineering & Technology"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Programs" 
                          icon={<span>{filterIcons.programs}</span>}
                          options={programOptions}
                          selectedValue="Computer Science"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Order By" 
                          icon={<span>{filterIcons.orderBy}</span>}
                          options={orderBySchoolOptions}
                          selectedValue="QS Ranking"
                          onSelect={() => {}}
                        />
                      </motion.div>
                      
                      {/* School Results */}
                      {showSchoolCards && (
                        <motion.div 
                          className="space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {schools.slice(0, 2).map((school, index) => (
                            <SchoolCard 
                              key={school.id}
                              school={school}
                              index={index}
                              isFavorite={false}
                              toggleFavorite={() => {}}
                              onCompare={() => {}}
                            />
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}
                  
                  {activeStep === 2 && (
                    <div className="space-y-8 px-2">
                      {/* Filters */}
                      <motion.div 
                        className="flex flex-wrap gap-2 p-4 bg-gray-800/50 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FilterDropdown 
                          label="Country" 
                          icon={<span>{filterIcons.country}</span>}
                          options={countryOptions}
                          selectedValue="United States"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Degree Level" 
                          icon={<span>{filterIcons.degreeLevel}</span>}
                          options={degreeLevelOptions}
                          selectedValue="PhD"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Area of Study" 
                          icon={<span>{filterIcons.areaOfStudy}</span>}
                          options={areaOfStudyOptions}
                          selectedValue="Engineering & Technology"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Programs" 
                          icon={<span>{filterIcons.programs}</span>}
                          options={programOptions}
                          selectedValue="Computer Science"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Deadline" 
                          icon={<span><Calendar className="h-4 w-4" /></span>}
                          options={[{label: "Fall", value: "Fall"}, {label: "Spring", value: "Spring"}]}
                          selectedValue="Fall"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Order By" 
                          icon={<span>{filterIcons.orderBy}</span>}
                          options={[{label: "Deadline", value: "Deadline"}, {label: "Ranking", value: "Ranking"}]}
                          selectedValue="Deadline"
                          onSelect={() => {}}
                        />
                      </motion.div>
                      
                      {/* Program Results */}
                      {showProgramCards && (
                        <motion.div 
                          className="space-y-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Program Cards (simplified version of SchoolCard) */}
                          {[1, 2].map((id) => (
                            <div key={id} className="border border-gray-700 rounded-lg p-6 bg-gray-800/50">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-semibold text-white">
                                    {id === 1 ? "PhD in Computer Science" : "PhD in Artificial Intelligence"}
                                  </h3>
                                  <p className="text-purple-300">
                                    {id === 1 ? "Stanford University" : "Massachusetts Institute of Technology"}
                                  </p>
                                  <div className="mt-2 text-gray-300">
                                    <p>Deadline: Fall 2023</p>
                                    <p>GRE Required: 320+</p>
                                    <p>TOEFL Required: 100+</p>
                                  </div>
                                </div>
                                <Button 
                                  variant="outline" 
                                  className={`${
                                    selectedPrograms.includes(id) 
                                      ? "bg-green-800/30 text-green-400 border-green-600"
                                      : "bg-purple-900/30 text-purple-400 border-purple-800"
                                  }`}
                                  onClick={() => handleAddToList(id)}
                                >
                                  {selectedPrograms.includes(id) ? "Added to List ✓" : "Add to List"}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )}
                  
                  {activeStep === 3 && (
                    <div className="space-y-8 px-2">
                      {/* Filters */}
                      <motion.div 
                        className="flex flex-wrap gap-2 p-4 bg-gray-800/50 rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FilterDropdown 
                          label="Country" 
                          icon={<span>{filterIcons.country}</span>}
                          options={countryOptions}
                          selectedValue="United States"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Area of Study" 
                          icon={<span>{filterIcons.areaOfStudy}</span>}
                          options={areaOfStudyOptions}
                          selectedValue="Engineering & Technology"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Programs" 
                          icon={<span>{filterIcons.programs}</span>}
                          options={programOptions}
                          selectedValue="Computer Science"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Research Interest" 
                          icon={<span><BookOpen className="h-4 w-4" /></span>}
                          options={[{label: "AI", value: "AI"}, {label: "Machine Learning", value: "Machine Learning"}]}
                          selectedValue="AI"
                          onSelect={() => {}}
                        />
                        
                        <FilterDropdown 
                          label="Title" 
                          icon={<span><User className="h-4 w-4" /></span>}
                          options={[{label: "Professor", value: "Professor"}, {label: "Associate Professor", value: "Associate Professor"}]}
                          selectedValue="Professor"
                          onSelect={() => {}}
                        />
                      </motion.div>
                      
                      {/* Professor Results */}
                      {showProfessorCards && (
                        <motion.div 
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Professor Cards */}
                          {[1, 2, 3, 4].map((id) => (
                            <div key={id} className="border border-gray-700 rounded-lg p-4 bg-gray-800/50 flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-full bg-purple-900/50 flex items-center justify-center text-purple-300 font-bold text-xl">
                                {id === 1 ? "AN" : id === 2 ? "FL" : id === 3 ? "YB" : "ST"}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-white">
                                  {id === 1 ? "Dr. Andrew Ng" : id === 2 ? "Dr. Fei-Fei Li" : id === 3 ? "Dr. Yoshua Bengio" : "Dr. Sebastian Thrun"}
                                </h3>
                                <p className="text-purple-300">
                                  {id === 1 || id === 2 ? "Stanford University" : id === 3 ? "University of Montreal" : "Stanford University"}
                                </p>
                                <p className="text-gray-300 text-sm">
                                  {id === 1 ? "Machine Learning" : id === 2 ? "Computer Vision" : id === 3 ? "Deep Learning" : "Robotics & AI"}
                                </p>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
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
                  
                  {/* Default state when no step is selected */}
                  {activeStep === null && (
                    <motion.div 
                      className="text-center py-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-purple-200 text-lg">
                        Click on any step above to see a demonstration of our application process
                      </p>
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
