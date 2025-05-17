
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Plus, ListOrdered, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { schools } from "@/components/dashboard/sections/find-schools/SchoolsData";

const CompareSchools = () => {
  const { schoolIds } = useParams<{ schoolIds: string }>();
  const [selectedSchools, setSelectedSchools] = useState<any[]>([]);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (schoolIds) {
      const ids = schoolIds.split(',').map(id => parseInt(id, 10));
      const filtered = schools.filter(school => ids.includes(school.id));
      setSelectedSchools(filtered);
    }
  }, [schoolIds]);

  const removeSchool = (id: number) => {
    const updatedSchools = selectedSchools.filter(school => school.id !== id);
    if (updatedSchools.length === 0) {
      navigate('/dashboard');
      return;
    }
    
    const newSchoolIds = updatedSchools.map(school => school.id).join(',');
    navigate(`/compare-schools/${newSchoolIds}`);
  };

  const addNewSchool = () => {
    navigate('/dashboard');
  };

  const renderComparisonItem = (label: string, keyPath: string[], numberFormat?: boolean) => {
    return (
      <tr className="border-t border-gray-200 dark:border-gray-700">
        <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</td>
        {selectedSchools.map((school) => {
          let value = school;
          for (const key of keyPath) {
            value = value[key];
          }
          
          if (numberFormat && typeof value === 'number') {
            if (label.toLowerCase().includes('cost')) {
              value = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(value);
            } else if (label.toLowerCase().includes('rate') || label.toLowerCase().includes('graduation')) {
              value = `${value}%`;
            }
          }
          
          return (
            <td key={`${school.id}-${label}`} className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100 font-medium">{value}</td>
          );
        })}
        <td className="py-4 px-6"></td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Compare Schools
        </motion.h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            {/* School Selection Cards */}
            {selectedSchools.map((school) => (
              <motion.div
                key={school.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => removeSchool(school.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                >
                  <X size={18} />
                </button>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center overflow-hidden mb-3">
                    <img
                      src={school.logo}
                      alt={`${school.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-center">{school.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{school.location}</p>
                </div>
              </motion.div>
            ))}
            
            {/* Add New School Card (if less than 3 schools) */}
            {selectedSchools.length < 3 && (
              <motion.div
                className="bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                onClick={addNewSchool}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-3">
                  <Plus size={30} className="text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-600 dark:text-gray-300 text-center">Add School</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Click to add another school</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Comparison Sections */}
        <div className="space-y-8">
          {/* Rankings Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <ListOrdered className="h-5 w-5 text-purple-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Ranking</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/80">
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ranking</th>
                    {selectedSchools.map(school => (
                      <th key={`header-${school.id}`} className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{school.name}</th>
                    ))}
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">QS Ranking</td>
                    {selectedSchools.map(school => (
                      <td key={`qs-${school.id}`} className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100 font-medium">#{school.ranking.qs}</td>
                    ))}
                    <td className="py-4 px-6"></td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">US News Ranking</td>
                    {selectedSchools.map(school => (
                      <td key={`usNews-${school.id}`} className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100 font-medium">#{school.ranking.usNews}</td>
                    ))}
                    <td className="py-4 px-6"></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Forbes Ranking</td>
                    {selectedSchools.map(school => (
                      <td key={`forbes-${school.id}`} className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100 font-medium">#{school.ranking.forbes}</td>
                    ))}
                    <td className="py-4 px-6"></td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">Shanghai Ranking</td>
                    {selectedSchools.map(school => (
                      <td key={`shanghai-${school.id}`} className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100 font-medium">#{school.ranking.shanghai}</td>
                    ))}
                    <td className="py-4 px-6"></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">THE Ranking</td>
                    {selectedSchools.map(school => (
                      <td key={`the-${school.id}`} className="py-4 px-6 text-sm text-gray-900 dark:text-gray-100 font-medium">#{school.ranking.the}</td>
                    ))}
                    <td className="py-4 px-6"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <School className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Statistics & Costs</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/80">
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Factor</th>
                    {selectedSchools.map(school => (
                      <th key={`header-stats-${school.id}`} className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{school.name}</th>
                    ))}
                    <th className="py-3 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {renderComparisonItem("Acceptance Rate", ["acceptance"], true)}
                  {renderComparisonItem("Graduation Rate", ["graduation"], true)}
                  {renderComparisonItem("In-State Tuition", ["cost", "inState"], true)}
                  {renderComparisonItem("Out-of-State Tuition", ["cost", "outState"], true)}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Programs Section */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
              <School className="h-5 w-5 text-green-500 mr-2" />
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Available Programs</h2>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedSchools.map((school) => (
                <div 
                  key={`programs-${school.id}`} 
                  className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg"
                >
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">{school.name}</h3>
                  <div className="space-y-2">
                    {school.programs.map((program, idx) => (
                      <div 
                        key={`${school.id}-program-${idx}`} 
                        className="bg-white dark:bg-gray-800 px-3 py-2 rounded-md text-sm border border-gray-200 dark:border-gray-700"
                      >
                        {program}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareSchools;
