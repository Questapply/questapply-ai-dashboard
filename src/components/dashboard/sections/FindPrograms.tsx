
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedCard from "@/components/ui/animated-card";
import StatCircle from "@/components/ui/stat-circle";
import { CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ProgramFilter = {
  id: string;
  name: string;
  icon: string;
};

const filters: ProgramFilter[] = [
  { id: "field", name: "Field of Study", icon: "📚" },
  { id: "degree", name: "Degree Level", icon: "🎓" },
  { id: "school", name: "School", icon: "🏫" },
  { id: "location", name: "Location", icon: "🌎" },
  { id: "duration", name: "Duration", icon: "⏱️" },
  { id: "language", name: "Language", icon: "🗣️" },
  { id: "format", name: "Format", icon: "💻" },
  { id: "deadline", name: "Application Deadline", icon: "📆" }
];

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
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    programs.reduce((acc, program) => ({...acc, [program.id]: program.favorite}), {})
  );

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
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

      {/* Filters */}
      <motion.div 
        className="mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-gray-500" />
          <h2 className="font-semibold text-gray-700 dark:text-gray-200">Filters</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <motion.button
              key={filter.id}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm
                ${
                  activeFilters.includes(filter.id)
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:shadow-sm"
                }
                transition-all duration-300 ease-in-out
              `}
              onClick={() => toggleFilter(filter.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ 
                y: -3, 
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
              }}
            >
              <span>{filter.icon}</span>
              <span>{filter.name}</span>
            </motion.button>
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
                    <Button variant="outline" size="sm" className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                      Compare
                    </Button>
                    <motion.button
                      className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                      onClick={() => toggleFavorite(program.id)}
                      aria-label={favorites[program.id] ? "Remove from favorites" : "Add to favorites"}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {favorites[program.id] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-red-500" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>
                
                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Program Features */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Program Features</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400"
                          whileHover={{ rotate: 20 }}
                        >
                          🏆
                        </motion.div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">QS Ranking</div>
                          <div className="font-medium">{program.qsRanking}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400"
                          whileHover={{ rotate: 20 }}
                        >
                          ⏱️
                        </motion.div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Duration</div>
                          <div className="font-medium">{program.duration}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400"
                          whileHover={{ rotate: 20 }}
                        >
                          🏫
                        </motion.div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Campus</div>
                          <div className="font-medium">{program.campus}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.div 
                          className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400"
                          whileHover={{ rotate: 20 }}
                        >
                          🗣️
                        </motion.div>
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Language</div>
                          <div className="font-medium">{program.language}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Deadline */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Application Deadline</h4>
                    <div className="flex items-center justify-center h-full">
                      <motion.div 
                        className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg shadow-sm"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <div className="text-base font-bold text-gray-800 dark:text-gray-200">{program.deadline}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Application Deadline</div>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Requirements */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Requirements (Min)</h4>
                    <div className="flex justify-around">
                      <StatCircle 
                        value={program.requirements.toefl} 
                        label="TOEFL" 
                        color="blue"
                        isPercentage={false}
                      />
                      
                      <StatCircle 
                        value={program.requirements.gpa} 
                        label="GPA" 
                        color="green"
                        isPercentage={false}
                      />
                      
                      {/* GRE Status */}
                      <div className="flex flex-col items-center">
                        <motion.div 
                          className={`rounded-full h-[70px] w-[70px] flex items-center justify-center border-4 shadow-sm ${getGREStatusStyle(program.requirements.gre).border} ${getGREStatusStyle(program.requirements.gre).bg}`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.3
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className={`text-xl font-bold ${getGREStatusStyle(program.requirements.gre).text}`}>
                            {getGREStatusStyle(program.requirements.gre).icon}
                          </span>
                        </motion.div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          GRE
                        </span>
                        <span className={`text-xs ${getGREStatusStyle(program.requirements.gre).text} font-medium`}>
                          {program.requirements.gre}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Button actions */}
                <div className="flex justify-end mt-2 gap-3">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button variant="outline" className="text-purple-600 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                      Program Information
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all">
                      Add to List
                    </Button>
                  </motion.div>
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
