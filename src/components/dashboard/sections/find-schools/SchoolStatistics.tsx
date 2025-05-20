
import React from "react";
import { motion } from "framer-motion";

interface School {
  acceptance: number;
  graduation: number;
}

interface SchoolStatisticsProps {
  school: School;
}

const SchoolStatistics = ({ school }: SchoolStatisticsProps) => {
  return (
    <div className="bg-gray-800/60 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-300 mb-4">Statistics</h4>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="transparent"
                stroke="#374151"
                strokeWidth="6"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="transparent"
                stroke="#10B981"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 24 * (school.graduation / 100)} ${
                  2 * Math.PI * 24
                }`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {school.graduation}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Graduation</div>
            <div className="text-sm font-medium text-green-400">Rate</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="transparent"
                stroke="#374151"
                strokeWidth="6"
              />
              <circle
                cx="28"
                cy="28"
                r="24"
                fill="transparent"
                stroke="#EF4444"
                strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 24 * (school.acceptance / 100)} ${
                  2 * Math.PI * 24
                }`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white">
                {school.acceptance}%
              </span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Acceptance</div>
            <div className="text-sm font-medium text-red-400">Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStatistics;
