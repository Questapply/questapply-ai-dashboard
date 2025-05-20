
import { motion } from "framer-motion";

interface SchoolRankingsProps {
  rankings: Record<string, number>;
}

const SchoolRankings = ({ rankings }: SchoolRankingsProps) => {
  // Map for ranking labels and colors
  const rankingLabels: Record<string, string> = {
    qs: "QS",
    usNews: "US",
    forbes: "FB",
    shanghai: "SH",
    the: "THE"
  };

  // Map for text colors based on ranking service
  const rankingColors: Record<string, string> = {
    qs: "text-amber-400",
    usNews: "text-red-400",
    forbes: "text-blue-400",
    shanghai: "text-green-400",
    the: "text-purple-400"
  };

  return (
    <div className="bg-gray-800/60 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-300 mb-3">Rankings</h4>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {Object.entries(rankings).map(([key, value]) => (
          <motion.div 
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div 
              className={`w-8 h-8 bg-[#1A1A1A] rounded flex items-center justify-center shadow-lg`}
            >
              <span className={`font-bold text-xs ${rankingColors[key]}`}>{rankingLabels[key]}</span>
            </div>
            <div className="text-center mt-1">
              <span className="text-xs font-medium text-white">#{value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SchoolRankings;
