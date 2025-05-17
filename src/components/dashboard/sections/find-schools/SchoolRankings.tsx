
import { motion } from "framer-motion";

interface SchoolRankingsProps {
  rankings: Record<string, number>;
}

const SchoolRankings = ({ rankings }: SchoolRankingsProps) => {
  const rankingLabels: Record<string, string> = {
    qs: "QS World",
    usNews: "US News",
    forbes: "Forbes",
    shanghai: "Shanghai",
    the: "THE"
  };

  const rankingColors: Record<string, { bg: string, darkBg: string, text: string, darkText: string }> = {
    qs: {
      bg: "bg-yellow-100", 
      darkBg: "dark:bg-yellow-900/30", 
      text: "text-yellow-800",
      darkText: "dark:text-yellow-300"
    },
    usNews: {
      bg: "bg-red-100", 
      darkBg: "dark:bg-red-900/30", 
      text: "text-red-800",
      darkText: "dark:text-red-300"
    },
    forbes: {
      bg: "bg-blue-100", 
      darkBg: "dark:bg-blue-900/30", 
      text: "text-blue-800",
      darkText: "dark:text-blue-300"
    },
    shanghai: {
      bg: "bg-green-100", 
      darkBg: "dark:bg-green-900/30", 
      text: "text-green-800",
      darkText: "dark:text-green-300"
    },
    the: {
      bg: "bg-purple-100", 
      darkBg: "dark:bg-purple-900/30", 
      text: "text-purple-800",
      darkText: "dark:text-purple-300"
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Rankings</h4>
      <div className="grid grid-cols-5 gap-2">
        {Object.entries(rankings).map(([key, value], i) => (
          <div key={key} className="flex flex-col items-center">
            <motion.div 
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-1 ${
                rankingColors[key]?.bg || "bg-gray-100"} ${
                rankingColors[key]?.darkBg || "dark:bg-gray-700"} ${
                rankingColors[key]?.text || "text-gray-800"} ${
                rankingColors[key]?.darkText || "dark:text-gray-200"}
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
              whileHover={{ y: -2 }}
            >
              <span className="font-semibold">
                {key === 'qs' && 'QS'}
                {key === 'usNews' && 'US'}
                {key === 'forbes' && 'FB'}
                {key === 'shanghai' && 'SH'}
                {key === 'the' && 'THE'}
              </span>
            </motion.div>
            <div className="text-xs text-center">
              <span className="font-medium text-gray-800 dark:text-gray-200">#{value}</span>
              <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate w-full max-w-[40px]">
                {rankingLabels[key]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolRankings;
