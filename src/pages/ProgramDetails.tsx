
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getProgramDetails } from "@/data/programDetails";
import { motion } from "framer-motion";

// Import components
import ProgramHeader from "@/components/program-details/ProgramHeader";
import ProgramOverview from "@/components/program-details/ProgramOverview";
import RequirementsSection from "@/components/program-details/RequirementsSection";
import CostSection from "@/components/program-details/CostSection";
import CareerOutcomes from "@/components/program-details/CareerOutcomes";
import SimilarPrograms from "@/components/program-details/SimilarPrograms";
import ContactInfo from "@/components/program-details/ContactInfo";

const ProgramDetails: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [program, setProgram] = useState(getProgramDetails(Number(programId)));

  // Simulate loading program details
  useEffect(() => {
    if (programId) {
      const programData = getProgramDetails(Number(programId));
      setProgram(programData);
      setIsFavorite(false); // Reset favorite state when program changes
    }
  }, [programId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Back to Programs</span>
          </Link>
        </motion.div>

        <ProgramHeader program={program} toggleFavorite={toggleFavorite} isFavorite={isFavorite} />
        <ProgramOverview program={program} />
        <RequirementsSection program={program} />
        <CostSection program={program} />
        <CareerOutcomes program={program} />
        <SimilarPrograms program={program} />
        <ContactInfo program={program} />
      </div>
    </div>
  );
};

export default ProgramDetails;
