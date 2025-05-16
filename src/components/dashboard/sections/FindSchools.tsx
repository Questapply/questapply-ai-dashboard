
import { useState } from "react";
import { motion } from "framer-motion";
import SchoolFilters from "./find-schools/SchoolFilters";
import SchoolCard from "./find-schools/SchoolCard";
import { schools } from "./find-schools/SchoolsData";

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
      <SchoolFilters 
        activeFilters={activeFilters} 
        toggleFilter={toggleFilter} 
      />

      {/* Schools List */}
      <div className="space-y-6">
        {schools.map((school, index) => (
          <SchoolCard 
            key={school.id}
            school={school}
            index={index}
            isFavorite={favorites[school.id]}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FindSchools;
