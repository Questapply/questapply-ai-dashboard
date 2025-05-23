import React, { useState } from "react";
import { motion } from "framer-motion";
import { TestData } from "./ProfileTypes";
import TestsHeader from "./test/TestsHeader";
import TestsSection from "./test/TestsSection";
import TestsActions from "./test/TestsActions";
import { standardizedTests } from "@/lib/test-options";

interface StandardizedTestsProps {
  onNext: (data: any) => void;
  data: TestData;
}

const StandardizedTests: React.FC<StandardizedTestsProps> = ({ onNext, data }) => {
  const [selectedTests, setSelectedTests] = useState<Record<string, boolean>>(
    // Initialize from existing data or set all to false
    data.scores
      ? Object.keys(data.scores).reduce((acc, testId) => {
          acc[testId] = data.scores[testId]?.active || false;
          return acc;
        }, {} as Record<string, boolean>)
      : {
          gre: false,
          gmat: false,
          lsat: false,
        }
  );

  const [testData, setTestData] = useState<
    Record<string, { active: boolean; scores: Record<string, string> }>
  >(
    data.scores || {
      gre: {
        active: false,
        scores: { total: "", verbal: "", quantitative: "", writing: "" },
      },
      gmat: {
        active: false,
        scores: { total: "", verbal: "", quantitative: "", writing: "" },
      },
      lsat: { active: false, scores: { total: "" } },
    }
  );

  const [errors, setErrors] = useState<Record<string, any>>({});

  const handleToggleTest = (testId: string) => {
    // Toggle selected state for this test
    setSelectedTests((prev) => {
      const newState = { ...prev };
      newState[testId] = !prev[testId];
      return newState;
    });

    // If we're opening this test, mark it as active in the data
    setTestData((prev) => ({
      ...prev,
      [testId]: {
        ...prev[testId],
        active: !selectedTests[testId], // If we're opening it, set active to true
      },
    }));
  };

  const handleScoreChange = (
    testId: string,
    scoreField: string,
    value: string
  ) => {
    setTestData((prev) => ({
      ...prev,
      [testId]: {
        ...prev[testId],
        scores: {
          ...prev[testId].scores,
          [scoreField]: value,
        },
      },
    }));

    // Clear error for this field if it exists
    if (errors[testId]?.[scoreField]) {
      setErrors((prev) => ({
        ...prev,
        [testId]: {
          ...prev[testId],
          [scoreField]: false,
        },
      }));
    }
  };

  const handleNext = () => {
    // Find active tests
    const activeTests = Object.keys(testData).filter(
      (test) => testData[test].active
    );

    if (activeTests.length === 0) {
      onNext({ type: "none", scores: {} });
      return;
    }

    // Validate active tests have scores
    let newErrors = {};
    let hasError = false;

    activeTests.forEach((testId) => {
      const test = standardizedTests.find((t) => t.id === testId);
      if (!test) return;

      const testErrors = {};

      test.scoreFields.forEach((field) => {
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
        type: activeTests.join(","),
        scores: testData,
      };

      onNext(returnData);
    }
  };

  const handlePrevious = () => {
    // Go back to the previous section (Language Proficiency)
    onNext({ type: "back" });
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <TestsHeader variants={itemVariants} />

        <TestsSection
          selectedTests={selectedTests}
          testData={testData}
          errors={errors}
          handleToggleTest={handleToggleTest}
          handleScoreChange={handleScoreChange}
          variants={itemVariants}
        />

        <TestsActions
          onPrevious={handlePrevious}
          onNext={handleNext}
          variants={itemVariants}
        />
      </motion.div>
    </div>
  );
};

export default StandardizedTests;
