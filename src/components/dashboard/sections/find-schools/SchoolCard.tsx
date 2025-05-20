
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GitCompare } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  onCompare?: (schoolId: number) => void;
}

const SchoolCard = ({ 
  school, 
  index, 
  isFavorite, 
  toggleFavorite,
  onCompare
}: SchoolCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/school/${school.id}`);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCompare) {
      onCompare(school.id);
    }
  };

  return (
    <motion.div
      key={school.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo, Basic Info and Rankings */}
          <div className="w-full md:w-1/4 flex flex-col gap-4">
            <SchoolBasicInfo 
              name={school.name}
              location={school.location}
              logo={school.logo}
              isFavorite={isFavorite}
              toggleFavorite={() => toggleFavorite(school.id)}
            />
            
            {/* Rankings */}
            <SchoolRankings rankings={school.ranking} />
            
            {/* Actions */}
            <div className="flex flex-col gap-2 mt-2">
              <Button 
                variant="outline" 
                className="w-full bg-purple-900/20 hover:bg-purple-800/30 text-purple-400 border-purple-800"
                onClick={handleViewDetails}
              >
                School Details
              </Button>
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-blue-900/20 hover:bg-blue-800/30 text-blue-400 border-blue-800"
                onClick={handleCompare}
              >
                <GitCompare className="h-4 w-4" />
                Compare
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="lg:col-span-2">
              <SchoolPrograms programs={school.programs} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SchoolCard;
