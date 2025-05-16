
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

type SchoolFilter = {
  id: string;
  name: string;
  icon: string;
};

const filters: SchoolFilter[] = [
  { id: "ranking", name: "Ranking", icon: "🏆" },
  { id: "country", name: "Country", icon: "🌎" },
  { id: "state", name: "State", icon: "🗺️" },
  { id: "program", name: "Program", icon: "📚" },
  { id: "cost", name: "Cost", icon: "💰" },
  { id: "acceptance", name: "Acceptance Rate", icon: "📝" },
  { id: "size", name: "Size", icon: "👥" },
  { id: "campus", name: "Campus", icon: "🏫" }
];

const schools = [
  {
    id: 1,
    name: "Harvard University",
    location: "Cambridge, Massachusetts",
    logo: "/placeholder.svg",
    ranking: "#1 QS",
    programs: ["Ph.D: 74 Programs", "Master: 13 Programs", "Bachelor: 62 Programs"],
    acceptance: "5%",
    graduation: "98%",
    cost: "$91,403",
    favorite: false,
  },
  {
    id: 2,
    name: "Stanford University",
    location: "Stanford, California",
    logo: "/placeholder.svg",
    ranking: "#2 QS",
    programs: ["Ph.D: 74 Programs", "Master: 51 Programs", "Bachelor: 58 Programs"],
    acceptance: "4%",
    graduation: "96%",
    cost: "$77,740",
    favorite: false,
  },
  {
    id: 3,
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, Massachusetts",
    logo: "/placeholder.svg",
    ranking: "#3 QS",
    programs: ["Ph.D: 65 Programs", "Master: 46 Programs", "Bachelor: 55 Programs"],
    acceptance: "7%",
    graduation: "95%",
    cost: "$83,250",
    favorite: true,
  }
];

const FindSchools = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    schools.reduce((acc, school) => ({...acc, [school.id]: school.favorite}), {})
  );

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };

  const toggleFavorite = (schoolId: number) => {
    setFavorites(prev => ({
      ...prev,
      [schoolId]: !prev[schoolId]
    }));
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find Schools</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Find Schools helps you explore educational institutions worldwide
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-gray-500" />
          <h2 className="font-semibold text-gray-700 dark:text-gray-200">Filters</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm
                ${
                  activeFilters.includes(filter.id)
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                }
                transition-colors duration-200
              `}
              onClick={() => toggleFilter(filter.id)}
            >
              <span>{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Schools List */}
      <div className="space-y-6">
        {schools.map(school => (
          <div 
            key={school.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src={school.logo} 
                  alt={`${school.name} logo`}
                  className="w-20 h-20 object-contain"
                />
              </div>
              
              {/* Content */}
              <div className="flex-grow">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{school.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{school.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-purple-600 border-purple-300 dark:border-purple-700">
                      School Details
                    </Button>
                    <button
                      className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                      onClick={() => toggleFavorite(school.id)}
                    >
                      {favorites[school.id] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-red-500" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                  {/* Ranking */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Ranking (USA)</h4>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{school.ranking}</p>
                  </div>
                  
                  {/* Cost */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Cost</h4>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{school.cost}</p>
                  </div>
                  
                  {/* Statistics */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Statistics</h4>
                    <div className="flex gap-4">
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Acceptance Rate</div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">{school.acceptance}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Graduation Rate</div>
                        <div className="font-semibold text-gray-800 dark:text-gray-200">{school.graduation}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Programs */}
                  <div className="md:col-span-3">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Programs</h4>
                    <div className="flex flex-wrap gap-4">
                      {school.programs.map((program, i) => (
                        <div key={i} className="font-semibold text-gray-800 dark:text-gray-200">
                          {program}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindSchools;
