
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
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">In State</span>
          <motion.span 
            className="font-semibold text-green-600 dark:text-green-400"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            {formatCurrency(inState)}
          </motion.span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">Out of State</span>
          <motion.span 
            className="font-semibold text-orange-600 dark:text-orange-400"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {formatCurrency(outState)}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default SchoolCost;
