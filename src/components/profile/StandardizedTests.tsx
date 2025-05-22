
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TestTube, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { standardizedTests } from "@/lib/test-options";
import { TestData } from "./ProfileTypes";

interface StandardizedTestsProps {
  onNext: (data: any) => void;
  data: TestData;
}

const StandardizedTests: React.FC<StandardizedTestsProps> = ({ onNext, data }) => {
  const [testData, setTestData] = useState<Record<string, { active: boolean, scores: Record<string, string> }>>(
    data.scores || 
    {
      gre: { active: false, scores: { total: '', verbal: '', quantitative: '', writing: '' } },
      gmat: { active: false, scores: { total: '', verbal: '', quantitative: '', writing: '' } },
      lsat: { active: false, scores: { total: '' } }
    }
  );
  
  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleToggleTest = (testId: string) => {
    setTestData(prev => {
      // Create a new object with all tests
      const updatedTests = { ...prev };
      
      // Toggle the active state of the clicked test
      updatedTests[testId] = {
        ...updatedTests[testId],
        active: !updatedTests[testId].active
      };
      
      // If we're activating this test, deactivate all others
      if (updatedTests[testId].active) {
        Object.keys(updatedTests).forEach(key => {
          if (key !== testId) {
            updatedTests[key] = {
              ...updatedTests[key],
              active: false
            };
          }
        });
      }
      
      return updatedTests;
    });
  };

  const handleScoreChange = (testId: string, scoreField: string, value: string) => {
    setTestData(prev => ({
      ...prev,
      [testId]: {
        ...prev[testId],
        scores: {
          ...prev[testId].scores,
          [scoreField]: value
        }
      }
    }));
    
    // Clear error for this field if it exists
    if (errors[testId]?.[scoreField]) {
      setErrors(prev => ({
        ...prev,
        [testId]: {
          ...prev[testId],
          [scoreField]: false
        }
      }));
    }
  };

  const handleNext = () => {
    // Find active tests
    const activeTests = Object.keys(testData).filter(test => testData[test].active);
    
    // Validate if any test is active and has scores
    if (activeTests.length === 0) {
      // No test selected, that's fine
      onNext({ type: "none", scores: {} });
      return;
    }
    
    // Validate active tests have scores
    let newErrors = {};
    let hasError = false;
    
    activeTests.forEach(testId => {
      const test = standardizedTests.find(t => t.id === testId);
      if (!test) return;
      
      const testErrors = {};
      
      test.scoreFields.forEach(field => {
        if (!testData[testId].scores[field.id]) {
          testErrors[field.id] = true;
          hasError = true;
        }
      });
      
      if (Object.keys(testErrors).length > 0) {
        newErrors[testId] = testErrors;
      }
    });
    
    setErrors(newErrors);
    
    if (!hasError) {
      // Transform the data to return
      const returnData = {
        type: activeTests.join(','),
        scores: testData
      };
      
      onNext(returnData);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const iconAnimation = {
    hidden: { scale: 0.8, opacity: 0, rotate: 15 },
    show: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    }
  };

  // Check if any test is active
  const anyTestActive = Object.values(testData).some(test => test.active);

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <div className="flex justify-center mb-4">
            <motion.div
              variants={iconAnimation}
              className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center"
            >
              <TestTube className="w-10 h-10 text-amber-600 dark:text-amber-400" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Standardized Test Scores</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Many graduate programs require standardized test scores. Let us know which tests you've taken.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="text-lg font-medium text-gray-800 dark:text-gray-200 p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <span>GRE or GMAT or LSAT Scores</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-gray-400"
              >
                <path d="m18 15-6-6-6 6"/>
              </svg>
            </div>
            
            <div className="p-6 space-y-6">
              {standardizedTests.map((test) => (
                <div key={test.id} className={`border-b border-gray-100 dark:border-gray-800 pb-6 last:border-0 last:pb-0 ${testData[test.id]?.active ? 'bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4' : ''}`}>
                  <div 
                    className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all"
                    onClick={() => handleToggleTest(test.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <TestTube className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                      <Label className="text-base font-medium cursor-pointer">
                        I have {test.name} exam scores
                      </Label>
                    </div>
                    <div className="flex items-center">
                      {testData[test.id]?.active ? (
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-amber-500"
                        >
                          <path d="m18 15-6-6-6 6"/>
                        </svg>
                      ) : (
                        <svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-gray-400"
                        >
                          <path d="m6 9 6 6 6-6"/>
                        </svg>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {testData[test.id]?.active && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 px-4"
                      >
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400">{test.description}</p>
                        </div>
                        
                        <div className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {test.scoreFields.map((field) => (
                              <div key={field.id} className="space-y-2">
                                <Label htmlFor={`${test.id}-${field.id}`} className="text-sm text-gray-700 dark:text-gray-300">
                                  {field.label}
                                </Label>
                                <Input
                                  id={`${test.id}-${field.id}`}
                                  value={testData[test.id]?.scores[field.id] || ''}
                                  onChange={(e) => handleScoreChange(test.id, field.id, e.target.value)}
                                  placeholder={`Enter your ${field.label}`}
                                  className={errors[test.id]?.[field.id] ? 'border-red-500 dark:border-red-500' : ''}
                                />
                                {errors[test.id]?.[field.id] && (
                                  <p className="text-red-500 text-sm">Required</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
          
          {!anyTestActive && (
            <div className="text-center text-gray-500 italic mt-4">
              No tests selected. You can continue without adding test scores if you haven't taken any standardized tests yet.
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-between pt-6">
          <Button 
            variant="outline"
            onClick={() => onNext({ type: "none", scores: {} })}
            className="px-8"
          >
            Previous step
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2"
          >
            Save and Continue
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StandardizedTests;
