
import React from "react";
import { motion } from "framer-motion";

interface SchoolCostProps {
  inState: number;
  outState: number;
}

const SchoolCost = ({ inState, outState }: SchoolCostProps) => {
  const formatCost = (cost: number) => {
    return `$${cost.toLocaleString()}`;
  };

  return (
    <div className="bg-gray-800/60 p-4 rounded-lg shadow-sm">
      <h4 className="text-sm font-medium text-gray-300 mb-3">Cost</h4>
      <div className="space-y-4">
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-sm text-gray-300">In State</span>
          <span className="font-semibold text-green-400">
            {formatCost(inState)}
          </span>
        </motion.div>
        
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm text-gray-300">Out of State</span>
          <span className="font-semibold text-amber-500">
            {formatCost(outState)}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolCost;
