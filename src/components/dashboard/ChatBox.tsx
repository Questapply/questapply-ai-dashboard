
import { useState } from "react";
import { ArrowUp, Search } from "lucide-react";
import { FilterOption } from "@/utils/FilterUtils";

interface ChatBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isQuestApplyAI: boolean;
  isDarkMode: boolean;
  filterOptions: FilterOption[] | null;
}

const ChatBox = ({ 
  searchQuery, 
  setSearchQuery, 
  isQuestApplyAI, 
  isDarkMode,
  filterOptions 
}: ChatBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

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
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Search Input Area - Fixed Height */}
          <div className="flex items-center px-4 py-4 h-16">
            {!isQuestApplyAI && (
              <Search className={`w-5 h-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
            )}
            <input
              type="text"
              className={`flex-grow ml-3 outline-none bg-transparent ${
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
              className="h-10 w-10 ml-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 transition-colors duration-300 rounded-full flex items-center justify-center"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>

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
