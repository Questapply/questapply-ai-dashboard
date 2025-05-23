
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { ProfileCompleteProps } from "./ProfileTypes";

const ProfileComplete: React.FC<ProfileCompleteProps> = ({ onNext, profileData }) => {
  const handleContinue = () => {
    onNext({ completed: true });
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
    hidden: { scale: 0, rotate: -45 },
    show: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    }
  };

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
              className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Complete!</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Thank you for completing your profile. We now have all the information we need to help you find the perfect programs.
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800/30"
        >
          <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center mb-4">Your Profile Summary</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Citizenship:</span>
              <span className="font-medium text-gray-900 dark:text-white">{profileData.citizenship.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Highest Degree:</span>
              <span className="font-medium text-gray-900 dark:text-white">{profileData.education.degree}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Study Destination:</span>
              <span className="font-medium text-gray-900 dark:text-white">{profileData.goals.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Funding Needs:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {profileData.financial.requiresFunding ? "Requires Full Funding" : `$${parseInt(profileData.financial.budget).toLocaleString()} Budget/Year`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Programs:</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {profileData.programs.count} Applications
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center pt-6">
          <Button 
            onClick={handleContinue}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            Begin Your Journey
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfileComplete;
