
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import SchoolCard from "./find-schools/SchoolCard";
import { schools } from "./find-schools/SchoolsData";
import FilterDropdown from "../filters/FilterDropdown";
import FindSchoolsTourGuide from "./find-schools/FindSchoolsTourGuide";
import {
  countryOptions,
  usStatesOptions,
  schoolsOptions,
  degreeLevelOptions,
  areaOfStudyOptions,
  programOptions,
  orderBySchoolOptions,
  filterIcons
} from "./FilterData";

const FindSchools = () => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    schools.reduce((acc, school) => ({...acc, [school.id]: school.favorite}), {})
  );
  const [schoolsToCompare, setSchoolsToCompare] = useState<number[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFilterSelect = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
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

      {/* Filters - replaced with dropdown filters */}
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
          <FilterDropdown 
            label="Country" 
            icon={<span>{filterIcons.country}</span>}
            options={countryOptions}
            onSelect={(value) => handleFilterSelect("country", value)}
            selectedValue={selectedFilters.country}
          />
          
          <FilterDropdown 
            label="State" 
            icon={<span>{filterIcons.state}</span>}
            options={usStatesOptions}
            onSelect={(value) => handleFilterSelect("state", value)}
            selectedValue={selectedFilters.state}
          />
          
          <FilterDropdown 
            label="Schools" 
            icon={<span>{filterIcons.schools}</span>}
            options={schoolsOptions}
            onSelect={(value) => handleFilterSelect("school", value)}
            selectedValue={selectedFilters.school}
          />
          
          <FilterDropdown 
            label="Degree Level" 
            icon={<span>{filterIcons.degreeLevel}</span>}
            options={degreeLevelOptions}
            onSelect={(value) => handleFilterSelect("degreeLevel", value)}
            selectedValue={selectedFilters.degreeLevel}
          />
          
          <FilterDropdown 
            label="Area of Study" 
            icon={<span>{filterIcons.areaOfStudy}</span>}
            options={areaOfStudyOptions}
            onSelect={(value) => handleFilterSelect("areaOfStudy", value)}
            selectedValue={selectedFilters.areaOfStudy}
          />
          
          <FilterDropdown 
            label="Programs" 
            icon={<span>{filterIcons.programs}</span>}
            options={programOptions}
            onSelect={(value) => handleFilterSelect("program", value)}
            selectedValue={selectedFilters.program}
          />
          
          <FilterDropdown 
            label="Order By" 
            icon={<span>{filterIcons.orderBy}</span>}
            options={orderBySchoolOptions}
            onSelect={(value) => handleFilterSelect("orderBy", value)}
            selectedValue={selectedFilters.orderBy}
          />
        </div>
      </motion.div>

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
