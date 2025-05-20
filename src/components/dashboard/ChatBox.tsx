import { useState, useEffect, useRef } from "react";
import { Search, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { type FilterOption } from "@/utils/FilterUtils";

interface ChatBoxProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isQuestApplyAI: boolean;
  isDarkMode: boolean;
  filterOptions: FilterOption[] | null;
  section?: string;
}

const ChatBox = ({ 
  searchQuery, 
  setSearchQuery, 
  isQuestApplyAI, 
  isDarkMode,
  filterOptions,
  section = "default",
}: ChatBoxProps) => {
  const [hasFilters, setHasFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      console.log("Search query:", searchQuery);
      // Keep existing search handling code
    }
  };

  const getSuggestedSearches = () => {
    switch(section) {
      case "find-schools":
        return [
          "Which top universities in the US match my profile?",
          "What are the best universities in Canada for my field?",
          "Which top UK universities suit my academic goals?"
        ];
      case "find-programs":
        return [
          "Which top US CS PhD programs match my profile?",
          "What are the best Canadian CS PhD programs for my field?",
          "Which top UK CS PhD programs suit my academic goals?"
        ];
      case "find-professors":
        return [
          "Which top Professors in AI?",
          "What are the top Professors in Machine Learning?",
          "Which top Professors in Deep Learning?"
        ];
      default:
        return [
          "How to improve my application?", 
          "Top schools for Computer Science", 
          "Resume writing tips for PhD applications"
        ];
    }
  };

  const handleSuggestedSearch = (text: string) => {
    setSearchQuery(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleFilter = (label: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Calculate if any filters are selected
  useEffect(() => {
    const anyFilterSelected = Object.values(selectedFilters).some(value => value);
    setHasFilters(anyFilterSelected);
  }, [selectedFilters]);

  return (
    <div className={`w-full rounded-xl border ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'} p-4 shadow-sm backdrop-blur-sm transition-all`}>
      <form onSubmit={handleSearch} className="relative flex items-center">
        <Search className={`absolute left-3 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`${isQuestApplyAI ? 'Ask QuestApply AI anything...' : 'Search or ask for guidance...'}`}
          className={`flex-grow rounded-full border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-800 placeholder:text-gray-500'} py-2 pl-10 pr-12 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-purple-500/50' : 'focus:ring-purple-500/30'}`}
        />
        <Button 
          type="submit" 
          size="icon"
          className="absolute right-1.5 text-white bg-purple-600 hover:bg-purple-700 h-7 w-7"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {/* Removed filter buttons from chatbox as requested */}

      {/* Search suggestions */}
      {searchQuery.length === 0 && (
        <div className="mt-4">
          <div className="mb-2">
            <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Suggested searches
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {getSuggestedSearches().map((text, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedSearch(text)}
                className={`px-3 py-1.5 text-sm rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
