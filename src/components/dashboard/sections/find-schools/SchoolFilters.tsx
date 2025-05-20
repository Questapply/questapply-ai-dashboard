
import { useState } from "react";
import { Filter } from "lucide-react";
import { motion } from "framer-motion";

type SchoolFilter = {
  id: string;
  name: string;
  icon: string;
};

interface SchoolFiltersProps {
  activeFilters: string[];
  toggleFilter: (filterId: string) => void;
}

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

const SchoolFilters = ({ activeFilters, toggleFilter }: SchoolFiltersProps) => {
  return (
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
              flex items-center gap-2 px-4 py-2 rounded-full text-sm border
              ${
                activeFilters.includes(filter.id)
                  ? "bg-purple-600 border-purple-700 text-white shadow-md shadow-purple-500/20"
                  : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-sm"
              }
              transition-all duration-300 ease-in-out transform hover:-translate-y-0.5
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
  );
};

export default SchoolFilters;
