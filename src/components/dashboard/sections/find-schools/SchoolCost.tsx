
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
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg shadow-sm">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Tuition & Fees</h4>
      <div className="space-y-3">
        <motion.div 
          className="flex justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 rounded-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">In State</span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            {formatCurrency(inState)}
          </span>
        </motion.div>
        
        <motion.div 
          className="flex justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/30 rounded-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Out of State</span>
          <span className="font-semibold text-orange-600 dark:text-orange-400">
            {formatCurrency(outState)}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolCost;
