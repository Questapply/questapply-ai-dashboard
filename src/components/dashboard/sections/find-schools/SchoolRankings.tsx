
import { motion } from "framer-motion";

interface SchoolRankingsProps {
  rankings: Record<string, number>;
}

const SchoolRankings = ({ rankings }: SchoolRankingsProps) => {
  // Map for vibrant gradient backgrounds based on ranking service
  const rankingColors: Record<string, string> = {
    qs: "bg-gradient-to-r from-amber-500 to-orange-600 text-white",
    usNews: "bg-gradient-to-r from-red-600 to-blue-700 text-white", 
    forbes: "bg-gradient-to-r from-blue-500 to-green-600 text-white",
    shanghai: "bg-gradient-to-r from-green-500 to-purple-600 text-white",
    the: "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
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
              className={`w-12 h-8 ${rankingColors[key]} rounded flex items-center justify-center shadow-lg bg-[#1A1A1A]`}
              style={{
                backgroundImage: rankingColors[key].split('bg-')[1],
                textShadow: '0 0 5px rgba(255,255,255,0.5)'
              }}
            >
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
