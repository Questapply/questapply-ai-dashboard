
import { motion } from "framer-motion";

interface SchoolRankingsProps {
  rankings: Record<string, number>;
}

const SchoolRankings = ({ rankings }: SchoolRankingsProps) => {
  // Map for background gradients based on ranking service
  const rankingColors: Record<string, string> = {
    qs: "bg-gradient-to-r from-yellow-600 to-amber-700 text-amber-100",
    usNews: "bg-gradient-to-r from-red-700 to-red-800 text-red-100",
    forbes: "bg-gradient-to-r from-blue-600 to-blue-800 text-blue-100",
    shanghai: "bg-gradient-to-r from-green-600 to-green-700 text-green-100",
    the: "bg-gradient-to-r from-purple-600 to-purple-800 text-purple-100"
  };

  // Map for readable labels
  const rankingLabels: Record<string, string> = {
    qs: "QS",
    usNews: "US",
    forbes: "FB",
    shanghai: "SH",
    the: "THE"
  };

  return (
    <div className="bg-gray-800/60 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-300 mb-3">Rankings</h4>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Object.entries(rankings).map(([key, value]) => (
          <motion.div 
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className={`w-8 h-8 ${rankingColors[key]} rounded-md flex items-center justify-center shadow-md`}>
              <span className="font-bold text-xs">{rankingLabels[key]}</span>
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
