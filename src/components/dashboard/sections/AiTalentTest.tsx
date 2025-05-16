
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PersonalityTypes = [
  { id: "mbti", name: "Myers-Briggs Type Indicator", icon: "🧠", color: "bg-blue-100 dark:bg-blue-900/30" },
  { id: "disc", name: "DISC Assessment", icon: "🔄", color: "bg-yellow-100 dark:bg-yellow-900/30" },
  { id: "logical", name: "Logical Reasoning", icon: "🧩", color: "bg-green-100 dark:bg-green-900/30" },
  { id: "mathematical", name: "Mathematical Aptitude", icon: "🔢", color: "bg-red-100 dark:bg-red-900/30" },
  { id: "analytical", name: "Analytical Thinking", icon: "🔍", color: "bg-purple-100 dark:bg-purple-900/30" },
  { id: "artistic", name: "Artistic Skills", icon: "🎨", color: "bg-pink-100 dark:bg-pink-900/30" }
];

const AiTalentTest = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Your Academic Potential
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Our AI Talent Test analyzes multiple dimensions of your personality and aptitude to provide personalized academic and career recommendations that align with your strengths.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Start Your Assessment
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="flex-1 max-w-md">
          <div className="relative">
            <div className="absolute -z-10 rounded-full w-72 h-72 bg-gradient-to-r from-purple-400/30 to-blue-400/30 blur-3xl" />
            <div className="relative z-10 grid grid-cols-3 gap-4">
              {PersonalityTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`${type.color} p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="font-medium text-gray-800 dark:text-gray-200 text-sm">{type.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Explore by Type</h2>
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
          {["All Tests", "Personality", "Aptitude", "Career", "Academic", "Intelligence", "Emotional"].map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedFilter === filter
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/30"
              } transition-colors duration-200`}
              onClick={() => setSelectedFilter(filter === selectedFilter ? null : filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Test Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Comprehensive Personality Analysis",
            description: "Understand your MBTI, Big Five traits, and strengths",
            icon: "🧠",
            color: "from-blue-500 to-purple-600"
          },
          {
            title: "Academic Aptitude Assessment",
            description: "Evaluate your mathematical, verbal, and analytical skills",
            icon: "📚",
            color: "from-green-500 to-teal-600"
          },
          {
            title: "Career Path Finder",
            description: "Discover optimal career paths aligned with your abilities",
            icon: "🎯",
            color: "from-red-500 to-orange-600"
          },
          {
            title: "Learning Style Assessment",
            description: "Identify how you best acquire and retain information",
            icon: "💡",
            color: "from-yellow-500 to-amber-600"
          },
          {
            title: "Graduate Program Matcher",
            description: "Find graduate programs that match your profile",
            icon: "🎓",
            color: "from-purple-500 to-indigo-600"
          },
          {
            title: "Research Interest Analyzer",
            description: "Discover research areas that align with your strengths",
            icon: "🔬",
            color: "from-pink-500 to-rose-600"
          }
        ].map((category, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
          >
            <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
            <div className="p-6">
              <div className="text-2xl mb-3">{category.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{category.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
              <div className="mt-4">
                <Button 
                  variant="outline"
                  className="text-purple-600 border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  Take Test
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTalentTest;
