
import { motion } from "framer-motion";

interface SchoolRankingsProps {
  rankings: Record<string, number>;
}

const SchoolRankings = ({ rankings }: SchoolRankingsProps) => {
  // Map for background colors based on ranking service
  const rankingColors: Record<string, string> = {
    qs: "bg-amber-700 text-amber-100",
    usNews: "bg-red-700 text-red-100",
    forbes: "bg-blue-700 text-blue-100",
    shanghai: "bg-green-700 text-green-100",
    the: "bg-purple-700 text-purple-100"
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
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`w-12 h-12 ${rankingColors[key]} rounded-md flex items-center justify-center mb-2`}>
              <span className="font-bold text-lg">{rankingLabels[key]}</span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-white">#{value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SchoolRankings;
