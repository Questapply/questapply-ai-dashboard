
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCard from "@/components/ui/animated-card";
import StatCircle from "@/components/ui/stat-circle";
import ProgressCircle from "@/components/ui/progress-circle";
import { motion } from "framer-motion";

type SchoolFilter = {
  id: string;
  name: string;
  icon: string;
};

const filters: SchoolFilter[] = [
  { id: "ranking", name: "Ranking", icon: "🏆" },
  { id: "country", name: "Country", icon: "🌎" },
  { id: "state", name: "State", icon: "🗺️" },
  { id: "program", name: "Program", icon: "📚" },
  { id: "cost", name: "Cost", icon: "💰" },
  { id: "acceptance", name: "Acceptance Rate", icon: "📝" },
  { id: "size", name: "Size", icon: "👥" },
  { id: "campus", name: "Campus", icon: "🏫" }
];

const schools = [
  {
    id: 1,
    name: "Harvard University",
    location: "Cambridge, Massachusetts",
    logo: "/placeholder.svg",
    ranking: {
      qs: 1,
      usNews: 3,
      forbes: 15,
      shanghai: 1,
      the: 1
    },
    programs: ["Ph.D: 74 Programs", "Master: 13 Programs", "Bachelor: 62 Programs"],
    acceptance: 5,
    graduation: 98,
    cost: {
      inState: 22441,
      outState: 91403
    },
    favorite: false,
  },
  {
    id: 2,
    name: "Stanford University",
    location: "Stanford, California",
    logo: "/placeholder.svg",
    ranking: {
      qs: 2,
      usNews: 4,
      forbes: 10,
      shanghai: 2,
      the: 3
    },
    programs: ["Ph.D: 74 Programs", "Master: 51 Programs", "Bachelor: 58 Programs"],
    acceptance: 4,
    graduation: 96,
    cost: {
      inState: 18491,
      outState: 77740
    },
    favorite: false,
  },
  {
    id: 3,
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, Massachusetts",
    logo: "/placeholder.svg",
    ranking: {
      qs: 3,
      usNews: 2,
      forbes: 4, 
      shanghai: 4,
      the: 2
    },
    programs: ["Ph.D: 65 Programs", "Master: 46 Programs", "Bachelor: 55 Programs"],
    acceptance: 7,
    graduation: 95,
    cost: {
      inState: 20454,
      outState: 83250
    },
    favorite: true,
  }
];

const FindSchools = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    schools.reduce((acc, school) => ({...acc, [school.id]: school.favorite}), {})
  );

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };

  const toggleFavorite = (schoolId: number) => {
    setFavorites(prev => ({
      ...prev,
      [schoolId]: !prev[schoolId]
    }));
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
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

      {/* Schools List */}
      <div className="space-y-6">
        {schools.map((school, index) => (
          <AnimatedCard 
            key={school.id}
            delay={0.2 + index * 0.1}
            className="border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Logo and Basic Info */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img 
                        src={school.logo} 
                        alt={`${school.name} logo`}
                        className="w-20 h-20 object-contain bg-gray-100 dark:bg-gray-800 rounded-md p-2 border border-gray-200 dark:border-gray-700"
                      />
                    </motion.div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{school.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{school.location}</p>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" className="text-purple-600 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                          School Details
                        </Button>
                        <motion.button
                          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                          onClick={() => toggleFavorite(school.id)}
                          aria-label={favorites[school.id] ? "Remove from favorites" : "Add to favorites"}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {favorites[school.id] ? (
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
                  </div>
                
                  {/* Rankings */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Rankings</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {Object.entries(school.ranking).map(([key, value], i) => (
                        <div key={key} className="flex flex-col items-center">
                          <motion.div 
                            className={`w-8 h-8 rounded-md flex items-center justify-center mb-1 ${
                              key === 'qs' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                              key === 'usNews' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                              key === 'forbes' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                              key === 'shanghai' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                              'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                            whileHover={{ y: -2 }}
                          >
                            {key === 'qs' && 'QS'}
                            {key === 'usNews' && 'US'}
                            {key === 'forbes' && 'FB'}
                            {key === 'shanghai' && 'SH'}
                            {key === 'the' && 'THE'}
                          </motion.div>
                          <div className="text-xs text-center">
                            <span className="text-gray-800 dark:text-gray-200 font-medium">#{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="flex-grow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                    {/* Cost */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Cost</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">In State</span>
                          <motion.span 
                            className="font-semibold text-green-600 dark:text-green-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            {formatCurrency(school.cost.inState)}
                          </motion.span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Out of State</span>
                          <motion.span 
                            className="font-semibold text-orange-600 dark:text-orange-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                          >
                            {formatCurrency(school.cost.outState)}
                          </motion.span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Statistics */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Statistics</h4>
                      <div className="flex justify-around items-center">
                        <div>
                          <ProgressCircle 
                            value={school.acceptance}
                            size={70}
                            color="rgba(239, 68, 68, 0.7)"
                            bgColor="rgba(239, 68, 68, 0.1)"
                            strokeWidth={6}
                          />
                          <div className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">Acceptance</div>
                        </div>
                        <div>
                          <ProgressCircle 
                            value={school.graduation}
                            size={70}
                            color="rgba(34, 197, 94, 0.7)"
                            bgColor="rgba(34, 197, 94, 0.1)"
                            strokeWidth={6}
                          />
                          <div className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">Graduation</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Programs */}
                    <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Programs</h4>
                      <div className="flex flex-wrap gap-4">
                        {school.programs.map((program, i) => (
                          <motion.div 
                            key={i} 
                            className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-700"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                          >
                            <span className="text-purple-600 dark:text-purple-400 mr-1">•</span> {program}
                          </motion.div>
                        ))}
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

export default FindSchools;
