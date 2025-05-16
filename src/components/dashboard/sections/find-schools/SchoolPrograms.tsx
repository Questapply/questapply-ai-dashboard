
import { motion } from "framer-motion";

interface SchoolProgramsProps {
  programs: string[];
}

const SchoolPrograms = ({ programs }: SchoolProgramsProps) => {
  return (
    <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Programs</h4>
      <div className="flex flex-wrap gap-4">
        {programs.map((program, i) => (
          <motion.div 
            key={i} 
            className="bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + (i * 0.1) }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.1)" }}
          >
            <span className="text-purple-600 dark:text-purple-400 mr-1">•</span> {program}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SchoolPrograms;
