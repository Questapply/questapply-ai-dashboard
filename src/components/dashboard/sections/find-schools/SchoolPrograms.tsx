
import React from "react";
import { motion } from "framer-motion";

interface SchoolProgramsProps {
  programs: string[];
}

const SchoolPrograms = ({ programs }: SchoolProgramsProps) => {
  // Group programs by type
  const programTypes = {
    "Ph.D": programs.filter(p => p.includes("Ph.D")).length,
    "Master": programs.filter(p => p.includes("Master") || p.includes("M.S.") || p.includes("M.A.")).length,
    "Bachelor": programs.filter(p => p.includes("Bachelor") || p.includes("B.S.") || p.includes("B.A.")).length,
  };

  return (
    <div className="bg-gray-800/60 p-4 rounded-lg shadow-sm">
      <h4 className="text-sm font-medium text-gray-300 mb-3">Programs</h4>
      <div className="flex flex-wrap gap-3">
        {Object.entries(programTypes).map(([type, count], index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="px-4 py-2 flex items-center"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm text-white">
              {type}: {count} Programs
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SchoolPrograms;
