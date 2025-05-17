
import React from "react";
import { motion } from "framer-motion";
import AnimatedCard from "@/components/ui/animated-card";
import { CardContent } from "@/components/ui/card";
import SchoolBasicInfo from "./SchoolBasicInfo";
import SchoolRankings from "./SchoolRankings";
import SchoolCost from "./SchoolCost";
import SchoolStatistics from "./SchoolStatistics";
import SchoolPrograms from "./SchoolPrograms";

interface School {
  id: number;
  name: string;
  location: string;
  logo: string;
  ranking: Record<string, number>;
  programs: string[];
  acceptance: number;
  graduation: number;
  cost: {
    inState: number;
    outState: number;
  };
  favorite: boolean;
}

interface SchoolCardProps {
  school: School;
  index: number;
  isFavorite: boolean;
  toggleFavorite: (schoolId: number) => void;
}

const SchoolCard = ({ school, index, isFavorite, toggleFavorite }: SchoolCardProps) => {
  return (
    <AnimatedCard 
      key={school.id}
      delay={0.2 + index * 0.1}
      className="border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo and Basic Info */}
          <div className="flex flex-col gap-4">
            <SchoolBasicInfo 
              name={school.name}
              location={school.location}
              logo={school.logo}
              isFavorite={isFavorite}
              toggleFavorite={() => toggleFavorite(school.id)}
            />
            
            {/* Rankings */}
            <SchoolRankings rankings={school.ranking} />
          </div>
          
          {/* Main Content */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Cost */}
              <SchoolCost 
                inState={school.cost.inState}
                outState={school.cost.outState}
              />
              
              {/* Statistics */}
              <SchoolStatistics 
                school={school}
              />
              
              {/* Programs */}
              <SchoolPrograms programs={school.programs} />
            </div>
          </div>
        </div>
      </CardContent>
    </AnimatedCard>
  );
};

export default SchoolCard;
