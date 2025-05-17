
import React from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { School } from "./SchoolsData";

interface SchoolStatisticsProps {
  school: School;
}

const SchoolStatistics = ({ school }: SchoolStatisticsProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Key Statistics</h4>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Acceptance Rate</span>
            <span className="font-medium text-gray-700 dark:text-gray-200">{school.acceptance}%</span>
          </div>
          <div className="relative">
            <Progress value={school.acceptance} className="h-2 bg-gray-200 dark:bg-gray-700" />
            <motion.div
              className="absolute -top-8 left-0 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-2 py-1 rounded shadow-sm"
              style={{ left: `${school.acceptance}%`, transform: "translateX(-50%)" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {school.acceptance}%
            </motion.div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Graduation Rate</span>
            <span className="font-medium text-gray-700 dark:text-gray-200">{school.graduation}%</span>
          </div>
          <div className="relative">
            <Progress value={school.graduation} className="h-2 bg-gray-200 dark:bg-gray-700" />
            <motion.div
              className="absolute -top-8 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded shadow-sm"
              style={{ left: `${school.graduation}%`, transform: "translateX(-50%)" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {school.graduation}%
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStatistics;
