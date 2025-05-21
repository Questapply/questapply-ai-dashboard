
import { useState } from "react";
import { Filter } from "lucide-react";
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
  activeFilters: string[];
  toggleFilter: (filterId: string) => void;
  filterType?: "schools" | "professors";
}

const SchoolFilters = ({ activeFilters, toggleFilter, filterType = "schools" }: SchoolFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterSelect = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

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
      
      <div className="flex flex-wrap items-center gap-2">
        <FilterDropdown 
          label="Country" 
          icon={<span>{filterIcons.country}</span>}
          options={countryOptions}
          onSelect={(value) => handleFilterSelect("country", value)}
          selectedValue={selectedFilters.country}
          buttonClassName="!py-1.5"
        />
        
        <FilterDropdown 
          label="State" 
          icon={<span>{filterIcons.state}</span>}
          options={usStatesOptions}
          onSelect={(value) => handleFilterSelect("state", value)}
          selectedValue={selectedFilters.state}
          buttonClassName="!py-1.5"
        />
        
        <FilterDropdown 
          label="Schools" 
          icon={<span>{filterIcons.schools}</span>}
          options={schoolsOptions}
          onSelect={(value) => handleFilterSelect("school", value)}
          selectedValue={selectedFilters.school}
          buttonClassName="!py-1.5"
        />
        
        {filterType === "schools" ? (
          <>
            <FilterDropdown 
              label="Degree Level" 
              icon={<span>{filterIcons.degreeLevel}</span>}
              options={degreeLevelOptions}
              onSelect={(value) => handleFilterSelect("degreeLevel", value)}
              selectedValue={selectedFilters.degreeLevel}
              buttonClassName="!py-1.5"
            />
            
            <FilterDropdown 
              label="Area of Study" 
              icon={<span>{filterIcons.areaOfStudy}</span>}
              options={areaOfStudyOptions}
              onSelect={(value) => handleFilterSelect("areaOfStudy", value)}
              selectedValue={selectedFilters.areaOfStudy}
              buttonClassName="!py-1.5"
            />
            
            <FilterDropdown 
              label="Programs" 
              icon={<span>{filterIcons.programs}</span>}
              options={programOptions}
              onSelect={(value) => handleFilterSelect("program", value)}
              selectedValue={selectedFilters.program}
              buttonClassName="!py-1.5"
            />
            
            <FilterDropdown 
              label="Order By" 
              icon={<span>{filterIcons.orderBy}</span>}
              options={orderBySchoolOptions}
              onSelect={(value) => handleFilterSelect("orderBy", value)}
              selectedValue={selectedFilters.orderBy}
              buttonClassName="!py-1.5"
            />
          </>
        ) : (
          <>
            <FilterDropdown 
              label="Area of Study" 
              icon={<span>{filterIcons.areaOfStudy}</span>}
              options={areaOfStudyOptions}
              onSelect={(value) => handleFilterSelect("areaOfStudy", value)}
              selectedValue={selectedFilters.areaOfStudy}
              buttonClassName="!py-1.5"
            />
            
            <FilterDropdown 
              label="Programs" 
              icon={<span>{filterIcons.programs}</span>}
              options={programOptions}
              onSelect={(value) => handleFilterSelect("program", value)}
              selectedValue={selectedFilters.program}
              buttonClassName="!py-1.5"
            />
            
            <FilterDropdown 
              label="Research Interest" 
              icon={<span>{filterIcons.researchInterest}</span>}
              options={researchInterestOptions}
              onSelect={(value) => handleFilterSelect("researchInterest", value)}
              selectedValue={selectedFilters.researchInterest}
              buttonClassName="!py-1.5"
            />
            
            <FilterDropdown 
              label="Title" 
              icon={<span>{filterIcons.title}</span>}
              options={professorTitleOptions}
              onSelect={(value) => handleFilterSelect("title", value)}
              selectedValue={selectedFilters.title}
              buttonClassName="!py-1.5"
            />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SchoolFilters;
