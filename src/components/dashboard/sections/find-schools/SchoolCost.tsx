
import { motion } from "framer-motion";

interface SchoolCostProps {
  inState: number;
  outState: number;
}

const SchoolCost = ({ inState, outState }: SchoolCostProps) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Cost</h4>
      <div className="space-y-3">
        <motion.div 
          className="flex justify-between p-2 bg-green-50 dark:bg-green-900/20 rounded-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-sm text-gray-600 dark:text-gray-300">In State</span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(inState)}
          </span>
        </motion.div>
        
        <motion.div 
          className="flex justify-between p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm text-gray-600 dark:text-gray-300">Out of State</span>
          <span className="font-semibold text-orange-600 dark:text-orange-400">
            {formatCurrency(outState)}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolCost;
