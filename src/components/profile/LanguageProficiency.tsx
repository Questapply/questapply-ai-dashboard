
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Languages, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { languageTests } from "@/lib/test-options";

interface LanguageProficiencyProps {
  onNext: (data: any) => void;
  data: {
    test: string;
    score: string;
  };
}

const LanguageProficiency: React.FC<LanguageProficiencyProps> = ({ onNext, data }) => {
  const [selectedTest, setSelectedTest] = useState(data.test || "");
  const [score, setScore] = useState(data.score || "");
  const [errors, setErrors] = useState({
    test: false,
    score: false
  });

  const handleNext = () => {
    // If "Not yet" or "I don't have" options are selected, we don't require a score
    const requiresScore = selectedTest && 
      selectedTest !== "I don't have this" && 
      selectedTest !== "Not yet, but I will in the future";
    
    const newErrors = {
      test: !selectedTest,
      score: requiresScore && !score
    };

    setErrors(newErrors);

    if (!newErrors.test && !newErrors.score) {
      onNext({ test: selectedTest, score: requiresScore ? score : "N/A" });
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
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    }
  };

  const requiresScore = selectedTest && 
    selectedTest !== "I don't have this" && 
    selectedTest !== "Not yet, but I will in the future";

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
              className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center"
            >
              <Languages className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Language Proficiency</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Most international programs require proof of language proficiency. Let us know what tests you've taken.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="space-y-4">
            <Label>Have you taken any language proficiency tests?</Label>
            <RadioGroup value={selectedTest} onValueChange={setSelectedTest} className="space-y-3">
              {languageTests.map((test) => (
                <div key={test.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={test.value} id={test.value} />
                  <Label htmlFor={test.value} className="cursor-pointer">{test.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {errors.test && (
              <p className="text-red-500 text-sm">Please select an option</p>
            )}
          </div>

          {requiresScore && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <Label htmlFor="score">What was your score?</Label>
              <Input
                id="score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder={`Enter your ${selectedTest} score`}
                className={errors.score ? 'border-red-500 dark:border-red-500' : ''}
              />
              {errors.score && (
                <p className="text-red-500 text-sm">Please enter your score</p>
              )}
            </motion.div>
          )}
        </motion.div>

        {selectedTest && selectedTest !== "I don't have this" && selectedTest !== "Not yet, but I will in the future" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30"
          >
            <div className="text-center">
              <span className="inline-block p-3 bg-white dark:bg-gray-800 rounded-full shadow-md mb-4">
                <Languages className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </span>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{selectedTest}</h3>
              {score && (
                <p className="text-gray-600 dark:text-gray-300">
                  Your score: <span className="font-semibold">{score}</span>
                </p>
              )}
            </div>
          </motion.div>
        )}

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

export default LanguageProficiency;
