
import { useState } from "react";
import { Search } from "lucide-react";

interface ChatBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isQuestApplyAI: boolean;
}

const ChatBox = ({ searchQuery, setSearchQuery, isQuestApplyAI }: ChatBoxProps) => {
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
            ? "border-purple-400 shadow-lg shadow-purple-100 dark:shadow-purple-900/20" 
            : "border-gray-200 dark:border-gray-700"
        } transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden`}
      >
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="flex-grow flex items-center px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              className="flex-grow ml-3 outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder={isQuestApplyAI ? "Ask QuestApply AI anything..." : "Search or ask for guidance..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          <button
            type="submit"
            className="h-full px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300"
          >
            {isQuestApplyAI ? "Ask AI" : "Search"}
          </button>
        </form>
      </div>

      {isFocused && (
        <div className="absolute inset-x-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-10 animate-fade-in">
          <div className="text-sm text-gray-500 mb-2">Suggested searches</div>
          <div className="space-y-2">
            <div className="cursor-pointer p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300">
              How to improve my application?
            </div>
            <div className="cursor-pointer p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300">
              Top schools for Computer Science
            </div>
            <div className="cursor-pointer p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-md transition-colors duration-200 text-gray-700 dark:text-gray-300">
              Resume writing tips for PhD applications
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
