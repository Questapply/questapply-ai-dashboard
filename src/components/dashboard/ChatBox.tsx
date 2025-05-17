
import { useState, useEffect } from "react";
import { ArrowUp, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterOption } from "@/utils/FilterUtils";

interface ChatBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isQuestApplyAI: boolean;
  isDarkMode: boolean;
  filterOptions: FilterOption[] | null;
}

interface QuickQuestion {
  id: string;
  text: string;
}

const ChatBox = ({ 
  searchQuery, 
  setSearchQuery, 
  isQuestApplyAI, 
  isDarkMode,
  filterOptions 
}: ChatBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [typingEffect, setTypingEffect] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  
  const welcomeMessage = "Hello! I'm here to help with your application. Let's start with Step 1: Find Schools. What would you like to search?";
  
  const quickQuestions: QuickQuestion[] = [
    { id: "q1", text: "How to find schools?" },
    { id: "q2", text: "Best programs for AI?" },
    { id: "q3", text: "How to write a resume?" },
    { id: "q4", text: "Application deadlines?" },
    { id: "q5", text: "Scholarship opportunities?" },
    { id: "q6", text: "Generate SOP (FREE)" }
  ];

  useEffect(() => {
    if (isQuestApplyAI) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < welcomeMessage.length) {
          setTypingEffect(welcomeMessage.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setTypingComplete(true);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [isQuestApplyAI]);

  const handleQuickQuestionClick = (question: string) => {
    setSearchQuery(question);
    // In a real app, you might want to trigger a submission here
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Handle search logic here
  };

  return (
    <div className="relative">
      <div 
        className={`w-full rounded-2xl border ${
          isFocused 
            ? "border-teal-400 shadow-lg shadow-teal-100 dark:shadow-teal-900/20" 
            : isDarkMode ? "border-gray-700" : "border-gray-200"
        } transition-all duration-300 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
      >
        {isQuestApplyAI && (
          <div className="pt-6 px-6">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              What would you like to search?
            </h2>
          </div>
        )}
        
        {isQuestApplyAI && (
          <div className={`px-6 py-4 ${isDarkMode ? "bg-gray-700/30" : "bg-gray-50"} rounded-t-xl mx-4 mt-2 mb-4`}>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className={`${isDarkMode ? "text-gray-200" : "text-gray-700"} text-lg`}>
                  {typingEffect}
                  {!typingComplete && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      |
                    </motion.span>
                  )}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Search Input Area - Increased Height */}
          <div className="flex items-center px-4 py-6 h-20">
            {!isQuestApplyAI && (
              <Search className={`w-5 h-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
            )}
            <input
              type="text"
              className={`flex-grow ml-3 outline-none bg-transparent text-lg ${
                isDarkMode ? "text-gray-200 placeholder-gray-500" : "text-gray-800 placeholder-gray-400"
              }`}
              placeholder={isQuestApplyAI ? "Ask QuestApply AI anything..." : "Search or ask for guidance..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {isQuestApplyAI && (
              <div className="ml-2 px-3 py-1 text-sm bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-full animate-pulse">
                QuestApply AI
              </div>
            )}
            <button
              type="submit"
              className="h-12 w-12 ml-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transition-colors duration-300 rounded-full flex items-center justify-center"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Questions */}
          {isQuestApplyAI && (
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-2 mt-2">
                {quickQuestions.map((question) => (
                  <motion.button
                    key={question.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleQuickQuestionClick(question.text)}
                    className={`px-4 py-2 rounded-full text-sm border ${
                      isDarkMode 
                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-teal-900/20 hover:border-teal-700" 
                        : "bg-white border-gray-200 text-gray-700 hover:bg-teal-50 hover:border-teal-200"
                    } transition-all duration-300 hover:shadow-sm`}
                  >
                    {question.text}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Filter Options Inside the Chat Box */}
          {filterOptions && (
            <div className={`p-3 border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} animate-fade-in`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Filters
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter, index) => (
                  <button
                    key={index}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                      isDarkMode 
                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-teal-900/20 hover:border-teal-700" 
                        : "bg-white border-gray-200 text-gray-700 hover:bg-teal-50 hover:border-teal-200"
                    } text-sm transition-all duration-300 hover:shadow-sm transform hover:-translate-y-0.5`}
                  >
                    {filter.icon}
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>

      {isFocused && (
        <div className={`absolute inset-x-0 top-full mt-2 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-lg shadow-lg border p-4 z-10 animate-fade-in`}>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Suggested searches</div>
          <div className="space-y-2">
            <div className={`cursor-pointer p-2 ${
              isDarkMode ? "hover:bg-teal-900/20 text-gray-300" : "hover:bg-teal-50 text-gray-700"
            } rounded-md transition-colors duration-200`}>
              How to improve my application?
            </div>
            <div className={`cursor-pointer p-2 ${
              isDarkMode ? "hover:bg-teal-900/20 text-gray-300" : "hover:bg-teal-50 text-gray-700"
            } rounded-md transition-colors duration-200`}>
              Top schools for Computer Science
            </div>
            <div className={`cursor-pointer p-2 ${
              isDarkMode ? "hover:bg-teal-900/20 text-gray-300" : "hover:bg-teal-50 text-gray-700"
            } rounded-md transition-colors duration-200`}>
              Resume writing tips for PhD applications
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
