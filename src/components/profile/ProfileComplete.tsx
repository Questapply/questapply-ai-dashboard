
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import ProgressCircle from "@/components/ui/progress-circle";
import { StepData } from "./ProfileTypes";

interface ProfileCompleteProps {
  onNext: (data: any) => void;
  profileData: StepData;
}

const ProfileComplete: React.FC<ProfileCompleteProps> = ({ onNext, profileData }) => {
  const handleNext = () => {
    onNext({}); // This will complete the process
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

  const successAnimation = {
    hidden: { scale: 0, opacity: 0 },
    show: { 
      scale: [0, 1.2, 1],
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3
      }
    }
  };

  // Calculate completion percentage based on filled fields
  const getProfileCompletion = () => {
    const totalFields = 10; // Estimate of required fields across all sections
    let filledFields = 0;
    
    // Count citizenship fields
    if (profileData.citizenship.country) filledFields++;
    if (profileData.citizenship.residence) filledFields++;
    
    // Count education fields
    if (profileData.education.degree) filledFields++;
    if (profileData.education.university) filledFields++;
    if (profileData.education.major) filledFields++;
    if (profileData.education.gpa) filledFields++;
    
    // Count goals fields
    if (profileData.goals.country) filledFields++;
    if (profileData.goals.level) filledFields++;
    if (profileData.goals.field) filledFields++;
    
    // Language test count as one field regardless of which test
    if (profileData.language.test) filledFields++;
    
    return Math.min(100, (filledFields / totalFields) * 100);
  };

  const completion = getProfileCompletion();

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <div className="flex justify-center mb-6">
            <motion.div
              variants={successAnimation}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Complete!</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Great job! Your profile is now set up. We'll use this information to provide personalized recommendations for your study abroad journey.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <ProgressCircle
            value={completion}
            size="lg"
            color="blue"
            strokeWidth={8}
            label="Profile Completion"
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6 max-w-xl mx-auto">
          <h3 className="text-xl font-medium text-center">Profile Summary</h3>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="font-medium text-gray-700 dark:text-gray-300">Citizenship & Residence</div>
              <div className="mt-2 flex justify-between">
                <span className="text-gray-500">Citizenship:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.citizenship.country}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-gray-500">Current Residence:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.citizenship.residence}</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="font-medium text-gray-700 dark:text-gray-300">Education</div>
              <div className="mt-2 flex justify-between">
                <span className="text-gray-500">Degree:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.education.degree}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-gray-500">University:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.education.university}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-gray-500">Major:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.education.major}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-gray-500">GPA:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.education.gpa}</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="font-medium text-gray-700 dark:text-gray-300">Study Goals</div>
              <div className="mt-2 flex justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.goals.country}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-gray-500">Study Level:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.goals.level}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-gray-500">Field of Study:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{profileData.goals.field}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center pt-6">
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileComplete;
