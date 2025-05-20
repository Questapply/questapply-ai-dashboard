
import React from "react";
import { motion } from "framer-motion";
import ProgressCircle from "@/components/ui/progress-circle";
import { School } from "./SchoolsData";

interface SchoolStatisticsProps {
  school: School;
}

const SchoolStatistics = ({ school }: SchoolStatisticsProps) => {
  return (
    <div className="bg-gray-800/60 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-300 mb-3">Statistics</h4>
      <div className="flex justify-around items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <ProgressCircle 
            value={school.acceptance}
            size="lg"
            color="red"
            label="Acceptance"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <ProgressCircle 
            value={school.graduation}
            size="lg"
            color="green"
            label="Graduation"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolStatistics;
