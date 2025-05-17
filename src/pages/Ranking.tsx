
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FilterSidebar from "@/components/ranking/FilterSidebar";
import UniversityTable from "@/components/ranking/UniversityTable";
import RankingHeader from "@/components/ranking/RankingHeader";
import { universities } from "@/components/ranking/universitiesData";

const Ranking = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <RankingHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar />
          <UniversityTable 
            universities={universities} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default Ranking;
