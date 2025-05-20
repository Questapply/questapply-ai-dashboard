
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/ui/animated-card";
import StatCircle from "@/components/ui/stat-circle";
import { CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "../filters/FilterDropdown";
import ChatBox from "../ChatBox";
import {
  countryOptions,
  usStatesOptions,
  schoolsOptions,
  degreeLevelOptions,
  areaOfStudyOptions,
  programOptions,
  deadlineOptions,
  englishTestOptions,
  greOptions,
  orderByProgramOptions,
  filterIcons
} from "./FilterData";

// GPA options as a range from 0.0 to 4.0
const gpaOptions = Array.from({ length: 41 }, (_, i) => (i / 10).toFixed(1));

// Program data from the original file
const programs = [
  {
    id: 1,
    name: "Computer Science",
    degree: "Ph.D.",
    school: "Harvard University",
    schoolLogo: "/placeholder.svg",
    degreeType: "STEM Course",
    fit: "High Fit",
    duration: "4 Years",
    format: "Full Time",
    language: "English",
    campus: "On Campus",
    qsRanking: "1",
    deadline: "Fall, Dec 15",
    requirements: {
      toefl: 92,
      gpa: 3.0,
      gre: "Not Accepted"
    },
    favorite: true
  },
  {
    id: 2,
    name: "Computer Science",
    degree: "Ph.D. / M.S.",
    school: "University of California, Berkeley",
    schoolLogo: "/placeholder.svg",
    degreeType: "STEM Course",
    fit: "High Fit",
    duration: "4 Years",
    format: "Full Time",
    language: "English",
    campus: "On Campus",
    qsRanking: "4",
    deadline: "Fall, Dec 8",
    requirements: {
      toefl: 90,
      gpa: 3.0,
      gre: "Required"
    },
    favorite: false
  },
  {
    id: 3,
    name: "Machine Learning",
    degree: "Master's",
    school: "Stanford University",
    schoolLogo: "/placeholder.svg",
    degreeType: "STEM Course",
    fit: "Medium Fit",
    duration: "2 Years",
    format: "Full Time",
    language: "English",
    campus: "On Campus",
    qsRanking: "2",
    deadline: "Fall, Dec 6",
    requirements: {
      toefl: 90,
      gpa: 3.5,
      gre: "Optional"
    },
    favorite: false
  }
];

const FindPrograms = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    programs.reduce((acc, program) => ({...acc, [program.id]: program.favorite}), {})
  );

  const handleFilterSelect = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const toggleFavorite = (programId: number) => {
    setFavorites(prev => ({
      ...prev,
      [programId]: !prev[programId]
    }));
  };

  // Helper function to determine GRE status style
  const getGREStatusStyle = (status: string) => {
    switch (status) {
      case "Not Accepted":
        return {
          border: "border-red-300 dark:border-red-800",
          text: "text-red-600 dark:text-red-400",
          bg: "bg-red-50 dark:bg-red-950",
          icon: "✕",
        };
      case "Optional":
        return {
          border: "border-yellow-300 dark:border-yellow-800",
          text: "text-yellow-600 dark:text-yellow-400",
          bg: "bg-yellow-50 dark:bg-yellow-950",
          icon: "!",
        };
      case "Required":
        return {
          border: "border-green-300 dark:border-green-800",
          text: "text-green-600 dark:text-green-400",
          bg: "bg-green-50 dark:bg-green-950",
          icon: "✓",
        };
      default:
        return {
          border: "border-gray-300 dark:border-gray-700",
          text: "text-gray-600 dark:text-gray-400",
          bg: "bg-gray-50 dark:bg-gray-900",
          icon: "?",
        };
    }
  };

  const handleProgramInformation = (programId: number) => {
    navigate(`/program/${programId}`);
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Find Programs
        </motion.h1>
        <motion.div 
          className="text-sm text-gray-500 dark:text-gray-400"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Start your application on this page
        </motion.div>
      </div>

      {/* Search Box */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <ChatBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isQuestApplyAI={false}
          isDarkMode={document.documentElement.classList.contains('dark')}
          filterOptions={null}
          section="find-programs"
        />
      </motion.div>

      {/* Filters - updated to match chatbot filter styling */}
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
        
        <div className="flex flex-wrap gap-2 overflow-x-auto py-2">
          {[
            {label: "Country", icon: filterIcons.country, options: countryOptions},
            {label: "State", icon: filterIcons.state, options: usStatesOptions},
            {label: "Schools", icon: filterIcons.schools, options: schoolsOptions},
            {label: "Degree Level", icon: filterIcons.degreeLevel, options: degreeLevelOptions},
            {label: "Area of Study", icon: filterIcons.areaOfStudy, options: areaOfStudyOptions},
            {label: "Programs", icon: filterIcons.programs, options: programOptions},
            {label: "Deadline", icon: filterIcons.deadline, options: deadlineOptions},
            {label: "English", icon: filterIcons.english, options: englishTestOptions},
            {label: "GRE", icon: filterIcons.gre, options: greOptions},
            {label: "Order By", icon: filterIcons.orderBy, options: orderByProgramOptions}
          ].map((filter, idx) => (
            <FilterDropdown 
              key={idx}
              label={filter.label} 
              icon={<span>{filter.icon}</span>}
              options={filter.options}
              onSelect={(value) => handleFilterSelect(filter.label.toLowerCase().replace(/\s+/g, ''), value)}
              selectedValue={selectedFilters[filter.label.toLowerCase().replace(/\s+/g, '')]}
              buttonClassName="flex items-center gap-2 px-4 py-2 rounded-full border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-200 dark:hover:border-teal-700 text-sm transition-all duration-300 hover:shadow-sm transform hover:-translate-y-0.5 whitespace-nowrap"
            />
          ))}
        </div>
      </motion.div>

      {/* Programs List */}
      <div className="space-y-6">
        {programs.map((program, index) => (
          <AnimatedCard 
            key={program.id}
            delay={0.2 + index * 0.1}
            className="border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
          >
            <CardContent className="p-6">
              <div className="flex flex-col space-y-6">
                {/* Header with Logo and Title */}
                <div className="flex justify-between">
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img 
                        src={program.schoolLogo} 
                        alt={`${program.school} logo`}
                        className="w-16 h-16 object-contain bg-gray-100 dark:bg-gray-800 rounded-md p-2 border border-gray-200 dark:border-gray-700"
                      />
                    </motion.div>
                    
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{program.name}</h3>
                        <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                          {program.degreeType}
                        </span>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          program.fit === "High Fit" 
                            ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" 
                            : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                        )}>
                          {program.fit}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <span>{program.degree}</span>
                        <span className="text-xs mx-1">•</span>
                        <span>{program.school}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-gray-200 dark:border-gray-700"
                      onClick={() => handleProgramInformation(program.id)}
                    >
                      Program Details
                    </Button>
                    <button
                      onClick={() => toggleFavorite(program.id)}
                      className={`p-2 rounded-full ${
                        favorites[program.id]
                          ? "text-red-500 bg-red-50 dark:bg-red-900/20"
                          : "text-gray-400 bg-gray-50 dark:bg-gray-800"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill={favorites[program.id] ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Program Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Duration</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{program.duration}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Format</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{program.format}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Language</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{program.language}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Campus</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{program.campus}</span>
                  </div>
                </div>

                {/* Requirements and Rankings */}
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Requirements */}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Requirements</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">TOEFL iBT</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{program.requirements.toefl}+</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">GPA</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{program.requirements.gpa}+</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 dark:text-gray-400">GRE</span>
                        <div className={`mt-0.5 inline-flex items-center px-2 py-0.5 rounded text-xs ${
                          getGREStatusStyle(program.requirements.gre).bg
                        } ${getGREStatusStyle(program.requirements.gre).border} ${
                          getGREStatusStyle(program.requirements.gre).text
                        }`}>
                          <span className="mr-1 font-bold">{getGREStatusStyle(program.requirements.gre).icon}</span>
                          {program.requirements.gre}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rankings & Deadlines */}
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ranking</h4>
                        <div className="flex items-center">
                          <div className="bg-blue-100 dark:bg-blue-900/30 h-8 w-8 flex items-center justify-center rounded-md">
                            <span className="text-blue-800 dark:text-blue-300 font-semibold">{program.qsRanking}</span>
                          </div>
                          <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
                            QS World Ranking
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Deadline</h4>
                        <div className="flex items-center">
                          <div className="bg-purple-100 dark:bg-purple-900/30 h-8 px-3 flex items-center justify-center rounded-md">
                            <span className="text-purple-800 dark:text-purple-300 font-semibold text-sm">{program.deadline}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
};

export default FindPrograms;
