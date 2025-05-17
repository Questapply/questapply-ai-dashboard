
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TestTube, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { standardizedTests } from "@/lib/test-options";

interface StandardizedTestsProps {
  onNext: (data: any) => void;
  data: {
    type: string;
    scores: Record<string, any>;
  };
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
    setTestData(prev => ({
      ...prev,
      [testId]: {
        ...prev[testId],
        active: !prev[testId].active
      }
    }));
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

        <motion.div variants={itemVariants} className="space-y-8">
          {standardizedTests.map((test) => (
            <div key={test.id} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center space-x-2">
                  <test.icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <Label htmlFor={`test-${test.id}`} className="text-lg">{test.name}</Label>
                </div>
                <Switch 
                  id={`test-${test.id}`}
                  checked={testData[test.id]?.active || false}
                  onCheckedChange={() => handleToggleTest(test.id)}
                />
              </div>

              {testData[test.id]?.active && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pl-2 border-l-2 border-amber-200 dark:border-amber-800 space-y-4"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">{test.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {test.scoreFields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label htmlFor={`${test.id}-${field.id}`}>{field.label}</Label>
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
                </motion.div>
              )}
            </div>
          ))}
          
          {!anyTestActive && (
            <div className="text-center text-gray-500 italic">
              No tests selected. You can continue without adding test scores if you haven't taken any standardized tests yet.
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center pt-6">
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StandardizedTests;
