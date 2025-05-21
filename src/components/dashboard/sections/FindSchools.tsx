
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import SchoolCard from "./find-schools/SchoolCard";
import { schools } from "./find-schools/SchoolsData";
import SchoolFilters from "./find-schools/SchoolFilters";
import FindSchoolsTourGuide from "./find-schools/FindSchoolsTourGuide";

const FindSchools = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    schools.reduce((acc, school) => ({...acc, [school.id]: school.favorite}), {})
  );
  const [schoolsToCompare, setSchoolsToCompare] = useState<number[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId);
      }
      return [...prev, filterId];
    });
  };

  const toggleFavorite = (schoolId: number) => {
    setFavorites(prev => ({
      ...prev,
      [schoolId]: !prev[schoolId]
    }));
  };

  const handleCompare = (schoolId: number) => {
    setSchoolsToCompare(prev => {
      // Check if the school is already in the comparison list
      if (prev.includes(schoolId)) {
        return prev.filter(id => id !== schoolId);
      }
      
      // Check if we already have 3 schools (maximum) to compare
      if (prev.length >= 3) {
        toast({
          title: "Maximum schools to compare reached",
          description: "You can compare up to 3 schools at a time.",
          variant: "default",
        });
        return prev;
      }
      
      return [...prev, schoolId];
    });
  };

  const navigateToComparison = () => {
    if (schoolsToCompare.length > 0) {
      const schoolIds = schoolsToCompare.join(',');
      navigate(`/compare-schools/${schoolIds}`);
    } else {
      toast({
        title: "No schools selected",
        description: "Please select at least one school to compare.",
        variant: "default",
      });
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* Tour Guide Component */}
      <FindSchoolsTourGuide />
      
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
          className="flex items-center gap-3"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {schoolsToCompare.length > 0 && (
            <Button 
              onClick={navigateToComparison}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Compare Selected ({schoolsToCompare.length})
            </Button>
          )}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Find Schools helps you explore educational institutions worldwide
          </div>
        </motion.div>
      </div>

      {/* Filters - use the SchoolFilters component */}
      <SchoolFilters activeFilters={activeFilters} toggleFilter={toggleFilter} />

      {/* Schools List */}
      <div className="space-y-6">
        {schools.map((school, index) => (
          <SchoolCard 
            key={school.id}
            school={school}
            index={index}
            isFavorite={favorites[school.id]}
            toggleFavorite={toggleFavorite}
            onCompare={handleCompare}
          />
        ))}
      </div>
    </div>
  );
};

export default FindSchools;
