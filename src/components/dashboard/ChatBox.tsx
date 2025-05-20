
import { useState, useEffect } from "react";
import { ArrowUp, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterOption } from "@/utils/FilterUtils";
import ConversationalDocumentGenerator from "@/components/generation/ConversationalDocumentGenerator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isQuestApplyAI: boolean;
  isDarkMode: boolean;
  filterOptions: FilterOption[] | null;
  activeSection?: string; // Add this to determine which section we're in
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
  filterOptions,
  activeSection 
}: ChatBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [typingEffect, setTypingEffect] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [activeGenerator, setActiveGenerator] = useState<"sop" | "cv" | null>(null);
  
  const welcomeMessage = "Hello! I'm here to help with your application. Let's start with Step 1: Find Schools. What would you like to search?";

  // Define suggested searches based on activeSection
  const getSuggestedSearches = () => {
    if (activeSection === "find-programs") {
      return [
        "Which top US CS PhD programs match my profile?",
        "What are the best Canadian CS PhD programs for my field?",
        "Which top UK CS PhD programs suit my academic goals?"
      ];
    } else if (activeSection === "find-professors") {
      return [
        "Which top Professors in AI?",
        "What are the top Professors in Machine Learning?",
        "Which top Professors in Deep Learning?"
      ];
    } else {
      return [
        "Which top universities in the US match my profile?",
        "What are the best universities in Canada for my field?",
        "Which top UK universities suit my academic goals?"
      ];
    }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Handle search logic here
  };

  const closeGenerator = () => {
    setActiveGenerator(null);
  };

  const suggestedSearches = getSuggestedSearches();

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
              placeholder={isQuestApplyAI ? "Ask QuestApply AI anything..." : "Search for Schools.."}
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

          {/* Filter Options Inside the Chat Box - REMOVED */}
        </form>
      </div>

      {isFocused && (
        <div className={`absolute inset-x-0 top-full mt-2 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } rounded-lg shadow-lg border p-4 z-10 animate-fade-in`}>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Suggested searches</div>
          <div className="space-y-2">
            {suggestedSearches.map((text, index) => (
              <div 
                key={index}
                className={`cursor-pointer p-2 ${
                  isDarkMode ? "hover:bg-teal-900/20 text-gray-300" : "hover:bg-teal-50 text-gray-700"
                } rounded-md transition-colors duration-200`}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Conversational Document Generator Dialog */}
      <AnimatePresence>
        {activeGenerator && (
          <ConversationalDocumentGenerator 
            documentType={activeGenerator} 
            onClose={closeGenerator}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBox;
