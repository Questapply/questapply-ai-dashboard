
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  HelpCircle, 
  X, 
  ArrowRight,
  Heart,
  Info,
  GitCompare
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
import "./TourGuide.css";

// Sample school data for the tour
const tourSchool = {
  id: 1,
  name: "Massachusetts Institute of Technology (MIT)",
  location: "Cambridge, MA, USA",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/1200px-MIT_logo.svg.png",
  ranking: {
    "QS World": 1,
    "US News": 2, 
    "THE": 1
  },
  programs: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Business", "Biology"],
  acceptance: 6.7,
  graduation: 94,
  cost: {
    inState: 53790,
    outState: 53790
  },
  favorite: false
};

type TourStep = {
  target: string;
  title: string;
  content: string;
  position: "top" | "bottom" | "left" | "right";
};

const FindSchoolsTourGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTourComplete, setIsTourComplete] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [highlightButtons, setHighlightButtons] = useState(false);
  const [activeTrigger, setActiveTrigger] = useState<string | null>(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  // References to DOM elements for scrolling
  const tourRef = useRef<HTMLDivElement>(null);
  const countryFilterRef = useRef<HTMLDivElement>(null);
  const degreeLevelFilterRef = useRef<HTMLDivElement>(null);
  const areaFilterRef = useRef<HTMLDivElement>(null);
  const programFilterRef = useRef<HTMLDivElement>(null);
  const orderByFilterRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const schoolCardRef = useRef<HTMLDivElement>(null);
  
  // Tour steps definition
  const tourSteps: TourStep[] = [
    {
      target: "intro",
      title: "Welcome to Find Schools!",
      content: "Let me show you how to find the perfect school for your academic journey. I'll walk you through each step of the process.",
      position: "top"
    },
    {
      target: "country-filter",
      title: "Step 1: Select a Country",
      content: "First, click on the Country filter to see available options. You can choose where you want to study.",
      position: "bottom"
    },
    {
      target: "country-select",
      title: "Country Selection",
      content: "Browse countries with their flags. Let's select USA for this tour.",
      position: "bottom"
    },
    {
      target: "degree-filter",
      title: "Step 2: Choose Degree Level",
      content: "Next, select your preferred degree level: Bachelor, Master, or PhD.",
      position: "bottom"
    },
    {
      target: "degree-select",
      title: "Degree Selection",
      content: "For this example, let's choose PhD programs.",
      position: "bottom"
    },
    {
      target: "area-filter",
      title: "Step 3: Select Area of Study",
      content: "Now, let's narrow down by selecting your preferred field of study.",
      position: "bottom"
    },
    {
      target: "area-select",
      title: "Area Selection",
      content: "Let's choose Engineering & Technology for this demonstration.",
      position: "bottom"
    },
    {
      target: "program-filter",
      title: "Step 4: Choose a Specific Program",
      content: "Further refine your search by selecting a specific program within your chosen field.",
      position: "bottom"
    },
    {
      target: "program-select",
      title: "Program Selection",
      content: "Let's select Computer Science for this example.",
      position: "bottom"
    },
    {
      target: "orderby-filter",
      title: "Step 5: Sort Results",
      content: "Finally, you can sort schools by different rankings or criteria.",
      position: "bottom"
    },
    {
      target: "orderby-select",
      title: "Sort Selection",
      content: "Let's sort by QS Ranking to see top-ranked schools first.",
      position: "bottom"
    },
    {
      target: "results",
      title: "View Your Results",
      content: "Based on your selections, here are the matching schools. Let's explore one of them.",
      position: "top"
    },
    {
      target: "favorite",
      title: "Save Your Favorites",
      content: "Click the heart icon to save schools to your favorites for easy access later.",
      position: "left"
    },
    {
      target: "actions",
      title: "Explore and Compare",
      content: "You can view detailed information about each school or add them to a comparison list.",
      position: "bottom"
    },
    {
      target: "complete",
      title: "Tour Complete!",
      content: "You now know how to use the Find Schools feature. Feel free to explore on your own!",
      position: "top"
    }
  ];

  // Start the tour
  const startTour = () => {
    setIsOpen(true);
    setCurrentStep(0);
    setIsTourComplete(false);
    setSelectedFilters({});
    setShowResults(false);
    setIsFavorite(false);
    setHighlightButtons(false);
    
    // Reset DOM to top
    if (tourRef.current) {
      tourRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Close the tour
  const closeTour = () => {
    setIsOpen(false);
    setIsTourComplete(true);
  };

  // Handle next step in tour
  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsTourComplete(true);
      setIsOpen(false);
    }
  };

  // Handle previous step in tour
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Effect to handle different steps
  useEffect(() => {
    // Clear any active trigger first
    setActiveTrigger(null);
    
    const step = tourSteps[currentStep];
    
    // Scroll to relevant section
    setTimeout(() => {
      const target = step.target;
      
      if (target === "country-filter") {
        countryFilterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (target === "country-select") {
        setActiveTrigger("country");
        // Auto-select after a delay
        setTimeout(() => {
          setSelectedFilters(prev => ({ ...prev, country: "usa" }));
        }, 1500);
      } else if (target === "degree-filter") {
        degreeLevelFilterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (target === "degree-select") {
        setActiveTrigger("degreeLevel");
        // Auto-select after a delay
        setTimeout(() => {
          setSelectedFilters(prev => ({ ...prev, degreeLevel: "PhD" }));
        }, 1500);
      } else if (target === "area-filter") {
        areaFilterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (target === "area-select") {
        setActiveTrigger("areaOfStudy");
        // Auto-select after a delay
        setTimeout(() => {
          setSelectedFilters(prev => ({ ...prev, areaOfStudy: "Engineering & Technology" }));
        }, 1500);
      } else if (target === "program-filter") {
        programFilterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (target === "program-select") {
        setActiveTrigger("program");
        // Auto-select after a delay
        setTimeout(() => {
          setSelectedFilters(prev => ({ ...prev, program: "Computer Science" }));
        }, 1500);
      } else if (target === "orderby-filter") {
        orderByFilterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (target === "orderby-select") {
        setActiveTrigger("orderBy");
        // Auto-select after a delay
        setTimeout(() => {
          setSelectedFilters(prev => ({ ...prev, orderBy: "QS Ranking" }));
          // After all filters are set, show results
          setTimeout(() => {
            setShowResults(true);
            // Scroll to results after a delay
            setTimeout(() => {
              resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 500);
          }, 1000);
        }, 1500);
      } else if (target === "results") {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (target === "favorite") {
        schoolCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        // Animate heart after a delay
        setTimeout(() => {
          setIsFavorite(true);
        }, 1500);
      } else if (target === "actions") {
        schoolCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        // Highlight buttons after a delay
        setTimeout(() => {
          setHighlightButtons(true);
        }, 500);
      }
    }, 300);
  }, [currentStep, tourSteps]);

  return (
    <div ref={tourRef} className="relative">
      {/* Tour Guide Button */}
      {!isOpen && !isTourComplete && (
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            onClick={startTour}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Take the Tour</span>
            
            {isButtonHovered && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                className="ml-1 text-xs bg-white/20 rounded-full px-2 py-0.5"
              >
                New!
              </motion.span>
            )}
          </Button>
        </motion.div>
      )}
      
      {/* Tour is Active */}
      <AnimatePresence>
        {isOpen && (
          <div className="pt-6 pb-16 animate-fade-in">
            {/* Tour Progress Bar */}
            <motion.div 
              className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                initial={{ width: `${(currentStep / (tourSteps.length - 1)) * 100}%` }}
                animate={{ width: `${(currentStep / (tourSteps.length - 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            {/* Tour Popup */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tour-popup-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`fixed z-50 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-purple-100 dark:border-purple-900 w-80 p-4 ${
                  tourSteps[currentStep].position === "top" ? "bottom-24" :
                  tourSteps[currentStep].position === "bottom" ? "top-24" :
                  tourSteps[currentStep].position === "left" ? "right-8 top-1/3" :
                  "left-8 top-1/3"
                } ${
                  currentStep === 0 ? "left-1/2 -translate-x-1/2" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-purple-600 dark:text-purple-400">
                    {tourSteps[currentStep].title}
                  </h3>
                  <button 
                    onClick={closeTour}
                    className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {tourSteps[currentStep].content}
                </p>
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={`${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Previous
                  </Button>
                  <span className="text-xs text-gray-400">
                    {currentStep + 1} / {tourSteps.length}
                  </span>
                  <Button
                    size="sm"
                    onClick={nextStep}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
                    {currentStep !== tourSteps.length - 1 && <ArrowRight className="ml-1 h-3 w-3" />}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Find Schools Content */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-6">
                <motion.h1 
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Find Schools
                </motion.h1>
                <motion.div 
                  className="text-sm text-gray-500 dark:text-gray-400"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Find Schools helps you explore educational institutions worldwide
                </motion.div>
              </div>

              {/* Filters Section */}
              <motion.div 
                className="mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
                    <path d="M3 4.5h18M7 12h10M11 19.5h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h2 className="font-semibold text-gray-700 dark:text-gray-200">Filters</h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {/* Country Filter */}
                  <div ref={countryFilterRef} className={`relative ${currentStep === 1 ? 'z-20' : 'z-10'}`}>
                    <motion.div
                      animate={currentStep === 1 ? { 
                        boxShadow: ["0 0 0 rgba(124, 58, 237, 0)", "0 0 15px rgba(124, 58, 237, 0.7)", "0 0 0 rgba(124, 58, 237, 0)"],
                      } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FilterDropdown 
                        label="Country" 
                        icon={<span>{filterIcons.country}</span>}
                        options={countryOptions}
                        onSelect={(value) => setSelectedFilters(prev => ({ ...prev, country: value }))}
                        selectedValue={selectedFilters.country}
                        className={activeTrigger === "country" ? "ring-2 ring-purple-500 ring-opacity-70" : ""}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Degree Level Filter */}
                  <div ref={degreeLevelFilterRef} className={`relative ${currentStep === 3 || currentStep === 4 ? 'z-20' : 'z-10'}`}>
                    <motion.div
                      animate={currentStep === 3 ? { 
                        boxShadow: ["0 0 0 rgba(124, 58, 237, 0)", "0 0 15px rgba(124, 58, 237, 0.7)", "0 0 0 rgba(124, 58, 237, 0)"],
                      } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FilterDropdown 
                        label="Degree Level" 
                        icon={<span>{filterIcons.degreeLevel}</span>}
                        options={degreeLevelOptions}
                        onSelect={(value) => setSelectedFilters(prev => ({ ...prev, degreeLevel: value }))}
                        selectedValue={selectedFilters.degreeLevel}
                        className={activeTrigger === "degreeLevel" ? "ring-2 ring-purple-500 ring-opacity-70" : ""}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Area of Study Filter */}
                  <div ref={areaFilterRef} className={`relative ${currentStep === 5 || currentStep === 6 ? 'z-20' : 'z-10'}`}>
                    <motion.div
                      animate={currentStep === 5 ? { 
                        boxShadow: ["0 0 0 rgba(124, 58, 237, 0)", "0 0 15px rgba(124, 58, 237, 0.7)", "0 0 0 rgba(124, 58, 237, 0)"],
                      } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FilterDropdown 
                        label="Area of Study" 
                        icon={<span>{filterIcons.areaOfStudy}</span>}
                        options={areaOfStudyOptions}
                        onSelect={(value) => setSelectedFilters(prev => ({ ...prev, areaOfStudy: value }))}
                        selectedValue={selectedFilters.areaOfStudy}
                        className={activeTrigger === "areaOfStudy" ? "ring-2 ring-purple-500 ring-opacity-70" : ""}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Programs Filter */}
                  <div ref={programFilterRef} className={`relative ${currentStep === 7 || currentStep === 8 ? 'z-20' : 'z-10'}`}>
                    <motion.div
                      animate={currentStep === 7 ? { 
                        boxShadow: ["0 0 0 rgba(124, 58, 237, 0)", "0 0 15px rgba(124, 58, 237, 0.7)", "0 0 0 rgba(124, 58, 237, 0)"],
                      } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FilterDropdown 
                        label="Programs" 
                        icon={<span>{filterIcons.programs}</span>}
                        options={programOptions}
                        onSelect={(value) => setSelectedFilters(prev => ({ ...prev, program: value }))}
                        selectedValue={selectedFilters.program}
                        className={activeTrigger === "program" ? "ring-2 ring-purple-500 ring-opacity-70" : ""}
                      />
                    </motion.div>
                  </div>
                  
                  {/* Order By Filter */}
                  <div ref={orderByFilterRef} className={`relative ${currentStep === 9 || currentStep === 10 ? 'z-20' : 'z-10'}`}>
                    <motion.div
                      animate={currentStep === 9 ? { 
                        boxShadow: ["0 0 0 rgba(124, 58, 237, 0)", "0 0 15px rgba(124, 58, 237, 0.7)", "0 0 0 rgba(124, 58, 237, 0)"],
                      } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <FilterDropdown 
                        label="Order By" 
                        icon={<span>{filterIcons.orderBy}</span>}
                        options={orderBySchoolOptions}
                        onSelect={(value) => setSelectedFilters(prev => ({ ...prev, orderBy: value }))}
                        selectedValue={selectedFilters.orderBy}
                        className={activeTrigger === "orderBy" ? "ring-2 ring-purple-500 ring-opacity-70" : ""}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Results Section */}
              <div ref={resultsRef}>
                {showResults ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div ref={schoolCardRef}>
                      {/* Modified SchoolCard for tour purposes */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Logo, Basic Info and Rankings */}
                            <div className="flex flex-col gap-6 w-full md:w-1/3">
                              {/* School Info */}
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 relative flex-shrink-0">
                                  <img 
                                    src={tourSchool.logo} 
                                    alt={tourSchool.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                
                                <div className="flex-grow">
                                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{tourSchool.name}</h3>
                                  <p className="text-gray-500 dark:text-gray-400 text-sm">{tourSchool.location}</p>
                                  
                                  {/* Favorite button with animation */}
                                  <div className="mt-2 relative">
                                    <motion.button
                                      className={`text-gray-400 hover:text-red-500 ${isFavorite ? 'text-red-500' : ''} relative`}
                                      onClick={() => setIsFavorite(!isFavorite)}
                                      whileHover={{ scale: 1.2 }}
                                      animate={currentStep === 12 ? { 
                                        scale: [1, 1.3, 1],
                                      } : {}}
                                      transition={{ duration: 0.3, repeat: currentStep === 12 ? 2 : 0 }}
                                    >
                                      <Heart className="h-6 w-6 fill-current" fill={isFavorite ? "currentColor" : "none"} />
                                    </motion.button>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Rankings */}
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rankings</h4>
                                <div className="space-y-1.5">
                                  {Object.entries(tourSchool.ranking).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center">
                                      <span className="text-xs text-gray-500 dark:text-gray-400">{key}</span>
                                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">#{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Actions - with highlight animation */}
                              <div className="flex gap-2 mt-2">
                                <motion.div
                                  className="flex-1"
                                  animate={highlightButtons && currentStep === 13 ? { 
                                    boxShadow: ["0 0 0 rgba(124, 58, 237, 0)", "0 0 8px rgba(124, 58, 237, 0.7)", "0 0 0 rgba(124, 58, 237, 0)"],
                                  } : {}}
                                  transition={{ repeat: 3, duration: 1.5 }}
                                >
                                  <Button 
                                    variant="outline" 
                                    className="flex-1 w-full bg-purple-900/20 text-purple-400 border-purple-800 hover:bg-purple-800/30 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-800/30"
                                  >
                                    <Info className="mr-1 h-4 w-4" />
                                    School Details
                                  </Button>
                                </motion.div>
                                
                                <motion.div
                                  animate={highlightButtons && currentStep === 13 ? { 
                                    boxShadow: ["0 0 0 rgba(66, 153, 225, 0)", "0 0 8px rgba(66, 153, 225, 0.7)", "0 0 0 rgba(66, 153, 225, 0)"],
                                  } : {}}
                                  transition={{ repeat: 3, duration: 1.5, delay: 0.5 }}
                                >
                                  <Button 
                                    variant="outline"
                                    className="flex items-center gap-1 bg-blue-900/20 text-blue-400 border-blue-800 hover:bg-blue-800/30 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-800/30"
                                  >
                                    <GitCompare className="h-4 w-4" />
                                    Compare
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                            
                            {/* Main Content */}
                            <div className="flex-grow">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Cost */}
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Tuition & Fees</h4>
                                  
                                  <div className="space-y-2">
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400 text-sm">In-State</span>
                                      <span className="font-medium text-gray-900 dark:text-white">${tourSchool.cost.inState.toLocaleString()}/year</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                      <span className="text-gray-500 dark:text-gray-400 text-sm">Out-of-State</span>
                                      <span className="font-medium text-gray-900 dark:text-white">${tourSchool.cost.outState.toLocaleString()}/year</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Statistics */}
                                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Key Statistics</h4>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Acceptance Rate</div>
                                      <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">{tourSchool.acceptance}%</div>
                                    </div>
                                    
                                    <div>
                                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Graduation Rate</div>
                                      <div className="text-lg font-semibold text-green-600 dark:text-green-400">{tourSchool.graduation}%</div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Programs */}
                                <div className="lg:col-span-2">
                                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Popular Programs</h4>
                                    
                                    <div className="flex flex-wrap gap-2">
                                      {tourSchool.programs.map((program, idx) => (
                                        <span 
                                          key={idx}
                                          className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                        >
                                          {program}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="text-center py-16 text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-lg">Apply filters to find schools matching your criteria</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Completed Tour Button */}
      {isTourComplete && !isOpen && (
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            onClick={startTour}
            variant="outline"
            className="bg-white/90 dark:bg-gray-800/90 border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 rounded-full px-4 py-2 flex items-center gap-2 shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Replay Tour</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default FindSchoolsTourGuide;
