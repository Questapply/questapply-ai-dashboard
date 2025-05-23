
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TestsActionsProps {
  onPrevious: () => void;
  onNext: () => void;
  variants: any;
}

const TestsActions: React.FC<TestsActionsProps> = ({ onPrevious, onNext, variants }) => {
  return (
    <motion.div variants={variants} className="flex justify-between pt-6">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        className="px-8"
      >
        Previous step
      </Button>
      <Button
        onClick={onNext}
        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-2"
      >
        Save and Continue
      </Button>
    </motion.div>
  );
};

export default TestsActions;
