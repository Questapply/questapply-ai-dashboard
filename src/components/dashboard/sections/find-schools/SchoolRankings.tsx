
import { motion } from "framer-motion";

interface SchoolRankingsProps {
  rankings: Record<string, number>;
}

const SchoolRankings = ({ rankings }: SchoolRankingsProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Rankings</h4>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(rankings).map(([key, value], i) => (
          <div key={key} className="flex flex-col items-center">
            <motion.div 
              className={`w-8 h-8 rounded-md flex items-center justify-center mb-1 ${
                key === 'qs' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300' :
                key === 'usNews' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' :
                key === 'forbes' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                key === 'shanghai' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              whileHover={{ y: -2 }}
            >
              {key === 'qs' && 'QS'}
              {key === 'usNews' && 'US'}
              {key === 'forbes' && 'FB'}
              {key === 'shanghai' && 'SH'}
              {key === 'the' && 'THE'}
            </motion.div>
            <div className="text-xs text-center">
              <span className="text-gray-800 dark:text-gray-200 font-medium">#{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolRankings;
