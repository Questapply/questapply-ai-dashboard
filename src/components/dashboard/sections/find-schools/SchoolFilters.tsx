
import { useState } from "react";
import { Filter, Flag, MapPin, School, GraduationCap, Book, Layers, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import FilterDropdown from "@/components/dashboard/filters/FilterDropdown";
import { 
  countryOptions,
  usStatesOptions,
  schoolsOptions,
  degreeLevelOptions,
  areaOfStudyOptions,
  programOptions,
  orderBySchoolOptions,
  researchInterestOptions,
  professorTitleOptions,
  filterIcons
} from "../FilterData";

interface SchoolFiltersProps {
  activeFilters?: string[];
  toggleFilter?: (filterId: string) => void;
  type?: "schools" | "professors"; // Add type to determine which filters to show
  compact?: boolean; // Add compact mode for inline display
}

const SchoolFilters = ({ 
  activeFilters = [], 
  toggleFilter = () => {}, 
  type = "schools",
  compact = false 
}: SchoolFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterSelect = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <motion.div 
      className={`${compact ? "mb-4" : "mb-8"}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {!compact && (
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-gray-500" />
          <h2 className="font-semibold text-gray-700 dark:text-gray-200">Filters</h2>
        </div>
      )}
      
      <div className="flex flex-wrap items-center gap-2">
        {/* Common filters for both schools and professors */}
        <FilterDropdown 
          label="Country" 
          icon={<Flag className="h-4 w-4" />}
          options={countryOptions}
          onSelect={(value) => handleFilterSelect("country", value)}
          selectedValue={selectedFilters.country}
          buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
        />
        
        <FilterDropdown 
          label="State" 
          icon={<MapPin className="h-4 w-4" />}
          options={usStatesOptions}
          onSelect={(value) => handleFilterSelect("state", value)}
          selectedValue={selectedFilters.state}
          buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
        />
        
        <FilterDropdown 
          label="Schools" 
          icon={<School className="h-4 w-4" />}
          options={schoolsOptions}
          onSelect={(value) => handleFilterSelect("school", value)}
          selectedValue={selectedFilters.school}
          buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
        />
        
        {type === "schools" ? (
          // School-specific filters
          <>
            <FilterDropdown 
              label="Degree Level" 
              icon={<GraduationCap className="h-4 w-4" />}
              options={degreeLevelOptions}
              onSelect={(value) => handleFilterSelect("degreeLevel", value)}
              selectedValue={selectedFilters.degreeLevel}
              buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
            />
            
            <FilterDropdown 
              label="Area of Study" 
              icon={<Book className="h-4 w-4" />}
              options={areaOfStudyOptions}
              onSelect={(value) => handleFilterSelect("areaOfStudy", value)}
              selectedValue={selectedFilters.areaOfStudy}
              buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
            />
            
            <FilterDropdown 
              label="Programs" 
              icon={<Layers className="h-4 w-4" />}
              options={programOptions}
              onSelect={(value) => handleFilterSelect("program", value)}
              selectedValue={selectedFilters.program}
              buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
            />
            
            <FilterDropdown 
              label="Order By" 
              icon={<BarChart3 className="h-4 w-4" />}
              options={orderBySchoolOptions}
              onSelect={(value) => handleFilterSelect("orderBy", value)}
              selectedValue={selectedFilters.orderBy}
              buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
            />
          </>
        ) : (
          // Professor-specific filters
          <>
            <FilterDropdown 
              label="Area of Study" 
              icon={<Book className="h-4 w-4" />}
              options={areaOfStudyOptions}
              onSelect={(value) => handleFilterSelect("areaOfStudy", value)}
              selectedValue={selectedFilters.areaOfStudy}
              buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
            />
            
            <FilterDropdown 
              label="Programs" 
              icon={<Layers className="h-4 w-4" />}
              options={programOptions}
              onSelect={(value) => handleFilterSelect("program", value)}
              selectedValue={selectedFilters.program}
              buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
            />
            
            <FilterDropdown 
              label="Research Interest" 
              icon={<span>{filterIcons.researchInterest}</span>}
              options={researchInterestOptions}
              onSelect={(value) => handleFilterSelect("researchInterest", value)}
              selectedValue={selectedFilters.researchInterest}
              buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
            />
            
            <FilterDropdown 
              label="Title" 
              icon={<span>{filterIcons.title}</span>}
              options={professorTitleOptions}
              onSelect={(value) => handleFilterSelect("title", value)}
              selectedValue={selectedFilters.title}
              buttonClassName={`!py-1.5 ${compact ? "text-xs" : ""}`}
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SchoolFilters;
