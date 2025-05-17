
import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { ProgramDetail } from "@/data/programDetails";

interface CareerOutcomesProps {
  program: ProgramDetail;
}

const CareerOutcomes: React.FC<CareerOutcomesProps> = ({ program }) => {
  const data = program.careerOutcomes.map(outcome => ({
    name: outcome.title,
    value: outcome.percentage,
    fill: outcome.title === "Academia" ? "#9b87f5" :
          outcome.title === "Industry Research" ? "#7E69AB" :
          outcome.title === "Tech Startups" ? "#D6BCFA" : "#8E9196"
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 shadow-md rounded-md">
          <p className="font-medium">{label}</p>
          <p className="text-purple-600 dark:text-purple-400">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <Briefcase className="h-5 w-5 text-purple-500 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Career Outcomes</h2>
      </div>
      
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <p className="text-gray-700 dark:text-gray-300">
            Below are the career paths taken by graduates of this program, based on the most recent data available.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-50 dark:bg-gray-700/20 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Career Paths</h3>
              <div className="space-y-4">
                {program.careerOutcomes.map((outcome, index) => (
                  <motion.div 
                    key={outcome.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center"
                  >
                    <div className="w-32 text-gray-700 dark:text-gray-300">{outcome.title}</div>
                    <div className="flex-grow mx-4">
                      <div className="relative h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-purple-500 dark:bg-purple-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${outcome.percentage}%` }}
                          transition={{ duration: 0.7, delay: 0.3 + (0.1 * index) }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right font-medium text-gray-900 dark:text-gray-100">
                      {outcome.percentage}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-80"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis type="category" dataKey="name" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" nameKey="name" fill="#9b87f5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30"
        >
          <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Alumni Network</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Graduates of this program join a prestigious alumni network that spans across industries and academic institutions worldwide. The program provides networking opportunities, career services, and continued access to resources that support ongoing professional development.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerOutcomes;
