
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ListOrdered, Shield, HelpCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/40 dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                QuestApply
              </div>
              <div className="hidden md:flex ml-10 space-x-4">
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/ranking" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium flex items-center">
                  <ListOrdered className="h-4 w-4 mr-1" />
                  Ranking
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium flex items-center">
                      <HelpCircle className="h-4 w-4 mr-1" />
                      Help Center
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
                    <DropdownMenuItem className="focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md">
                      <Link to="/help-center?tab=faqs" className="flex items-center w-full px-2 py-1.5">
                        FAQs
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md">
                      <Link to="/help-center?tab=video-tutorials" className="flex items-center w-full px-2 py-1.5">
                        Video Tutorials
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md">
                      <Link to="/help-center?tab=support-ticket" className="flex items-center w-full px-2 py-1.5">
                        Support Ticket
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/pro">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Pro
                </Button>
              </Link>
              <Link to="/profile">
                <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white border-none">
                  Profile
                </Button>
              </Link>
              <Link to="/auth?mode=login">
                <Button variant="outline" className="border-purple-400 dark:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/50">
                  Login
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-none">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white">
              Your Ultimate <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Study Abroad</span> Assistant
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              QuestApply streamlines your graduate school application process with AI-powered tools to find, apply, and get accepted to top universities worldwide.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link to="/ranking">
                <Button size="lg" variant="outline" className="border-purple-400 dark:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto flex items-center">
                  <ListOrdered className="h-5 w-5 mr-2" />
                  Explore Rankings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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

export default Index;
