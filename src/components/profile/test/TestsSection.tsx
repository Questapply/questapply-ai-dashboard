
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { standardizedTests } from "@/lib/test-options";
import TestOption from "./TestOption";
import TestScoreForm from "./TestScoreForm";

interface TestsSectionProps {
  selectedTests: Record<string, boolean>;
  testData: Record<string, { active: boolean; scores: Record<string, string> }>;
  errors: Record<string, any>;
  handleToggleTest: (testId: string) => void;
  handleScoreChange: (testId: string, scoreField: string, value: string) => void;
  variants: any;
}

const TestsSection: React.FC<TestsSectionProps> = ({
  selectedTests,
  testData,
  errors,
  handleToggleTest,
  handleScoreChange,
  variants,
}) => {
  // Check if any test is selected
  const anyTestSelected = Object.values(selectedTests).some(
    (selected) => selected
  );

  return (
    <motion.div variants={variants} className="space-y-4 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="text-lg font-medium text-gray-800 dark:text-gray-200 p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <span>GRE, GMAT or LSAT Scores</span>
        </div>

        <div className="p-6 space-y-6">
          {standardizedTests.map((test) => (
            <div key={test.id} className="mb-6 last:mb-0">
              {/* Test selection button */}
              <TestOption
                testId={test.id}
                testName={test.name}
                isSelected={selectedTests[test.id]}
                onToggle={handleToggleTest}
              />

              <AnimatePresence>
                {selectedTests[test.id] && (
                  <TestScoreForm
                    testId={test.id}
                    description={test.description}
                    scoreFields={test.scoreFields}
                    scores={testData[test.id]?.scores || {}}
                    errors={errors[test.id] || {}}
                    onScoreChange={handleScoreChange}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}

          {!anyTestSelected && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400 italic text-sm">
              No tests selected. You can continue without adding test scores if you haven't taken any standardized tests yet.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TestsSection;
