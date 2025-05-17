import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Award, Star, BadgeCheck, BadgePlus, BadgePercent, ShieldCheck, BadgeInfo, ShieldPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProFeatureCard from "@/components/pro/ProFeatureCard";
import { useToast } from "@/hooks/use-toast";

const Pro = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubscribe = () => {
    navigate('/payment-checkout');
  };

  const features = [
    {
      id: 1,
      title: "Professor Access",
      description: "Unlimited emails to all professors worldwide.",
      icon: ShieldCheck,
      color: "from-blue-500 to-blue-700",
    },
    {
      id: 2,
      title: "Resume Creation",
      description: "AI-crafted, tailored resumes to stand out.",
      icon: Award,
      color: "from-purple-500 to-purple-700",
    },
    {
      id: 3,
      title: "SOP Creation",
      description: "Custom SOPs by AI for a unique story.",
      icon: BadgeCheck,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      id: 4,
      title: "LOR Creation",
      description: "Three pro letters tailored to your profile.",
      icon: Star,
      color: "from-amber-500 to-amber-700",
    },
    {
      id: 5,
      title: "Unlimited Applications",
      description: "Apply to all programs and universities.",
      icon: BadgePlus,
      color: "from-green-500 to-green-700",
    },
    {
      id: 6,
      title: "Resume Improvement",
      description: "AI + expert review with unlimited edits.",
      icon: Shield,
      color: "from-teal-500 to-teal-700",
    },
    {
      id: 7,
      title: "SOP Improvement",
      description: "AI + expert refinement with unlimited edits.",
      icon: BadgeInfo,
      color: "from-pink-500 to-pink-700",
    },
    {
      id: 8,
      title: "LOR Improvement",
      description: "AI + expert polish with unlimited edits.",
      icon: ShieldPlus,
      color: "from-rose-500 to-rose-700",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/40">
      {/* Header/Navigation */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                QuestApply
              </Link>
              <div className="hidden md:flex ml-10 space-x-4">
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/ranking" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium">
                  Ranking
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <Link to="/profile">
                <Button variant="outline" className="border-purple-400 dark:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/50">
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center p-1 mb-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <span className="text-sm font-medium">QuestApply Pro - $100/Month</span>
              </div>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                Elevate Your Application
              </span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Get premium tools and expert support to maximize your chances of admission.
            </p>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                onClick={handleSubscribe}
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Subscribe Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <ProFeatureCard 
                key={feature.id}
                feature={feature}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Why Pro Section */}
          <motion.div
            className="max-w-3xl mx-auto text-center bg-white dark:bg-gray-800/90 p-8 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="inline-flex bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full mb-6">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">Why Pro?</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              End-to-end automation and expert guidance for a seamless application journey.
            </p>
            <Button 
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-purple-100 dark:border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>&copy; 2023 QuestApply. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Pro;
