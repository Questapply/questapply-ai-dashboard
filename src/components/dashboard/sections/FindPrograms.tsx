
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProgramFilter = {
  id: string;
  name: string;
  icon: string;
};

const filters: ProgramFilter[] = [
  { id: "field", name: "Field of Study", icon: "📚" },
  { id: "degree", name: "Degree Level", icon: "🎓" },
  { id: "school", name: "School", icon: "🏫" },
  { id: "location", name: "Location", icon: "🌎" },
  { id: "duration", name: "Duration", icon: "⏱️" },
  { id: "language", name: "Language", icon: "🗣️" },
  { id: "format", name: "Format", icon: "💻" },
  { id: "deadline", name: "Application Deadline", icon: "📆" }
];

const programs = [
  {
    id: 1,
    name: "Computer Science",
    degree: "Ph.D.",
    school: "Harvard University",
    schoolLogo: "/placeholder.svg",
    degreeType: "STEM Course",
    fit: "High Fit",
    duration: "4 Years",
    format: "Full Time",
    language: "English",
    campus: "On Campus",
    qsRanking: "QS: 1",
    deadline: "Fall, Dec 15",
    requirements: {
      toefl: 92,
      gpa: 3.0,
      gre: "Not Accepted"
    },
    favorite: true
  },
  {
    id: 2,
    name: "Computer Science",
    degree: "Ph.D. / M.S.",
    school: "University of California, Berkeley",
    schoolLogo: "/placeholder.svg",
    degreeType: "STEM Course",
    fit: "High Fit",
    duration: "4 Years",
    format: "Full Time",
    language: "English",
    campus: "On Campus",
    qsRanking: "QS: 4",
    deadline: "Fall, Dec 8",
    requirements: {
      toefl: 90,
      gpa: 3.0,
      gre: "Required"
    },
    favorite: false
  },
  {
    id: 3,
    name: "Machine Learning",
    degree: "Master's",
    school: "Stanford University",
    schoolLogo: "/placeholder.svg",
    degreeType: "STEM Course",
    fit: "Medium Fit",
    duration: "2 Years",
    format: "Full Time",
    language: "English",
    campus: "On Campus",
    qsRanking: "QS: 2",
    deadline: "Fall, Dec 6",
    requirements: {
      toefl: 90,
      gpa: 3.5,
      gre: "Optional"
    },
    favorite: false
  }
];

const FindPrograms = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    programs.reduce((acc, program) => ({...acc, [program.id]: program.favorite}), {})
  );

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };

  const toggleFavorite = (programId: number) => {
    setFavorites(prev => ({
      ...prev,
      [programId]: !prev[programId]
    }));
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find Programs</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Start your application on this page
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

      {/* Programs List */}
      <div className="space-y-6">
        {programs.map(program => (
          <div 
            key={program.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src={program.schoolLogo} 
                    alt={`${program.school} logo`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{program.name}</h3>
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                      {program.degreeType}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      program.fit === "High Fit" 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" 
                        : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300"
                    }`}>
                      {program.fit}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <span>{program.degree}</span>
                    <span className="text-xs">•</span>
                    <span>{program.school}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                  Compare
                </Button>
                <button
                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                  onClick={() => toggleFavorite(program.id)}
                >
                  {favorites[program.id] ? (
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
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
              <div>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1 text-xs text-gray-500 dark:text-gray-400">{program.qsRanking}</div>
                    <div className="col-span-1 text-xs text-gray-500 dark:text-gray-400">{program.duration}</div>
                    <div className="col-span-1 text-xs text-gray-500 dark:text-gray-400">{program.campus}</div>
                    <div className="col-span-1 text-xs text-gray-500 dark:text-gray-400">{program.language}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deadline(s)</h4>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800 dark:text-gray-200">{program.deadline}</span>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Requirement(Min)</h4>
                <div className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="rounded-full h-12 w-12 flex items-center justify-center border-4 border-purple-200 dark:border-purple-900 bg-white dark:bg-gray-800">
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{program.requirements.toefl}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">TOEFL</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="rounded-full h-12 w-12 flex items-center justify-center border-4 border-purple-200 dark:border-purple-900 bg-white dark:bg-gray-800">
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{program.requirements.gpa}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">GPA</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className={`rounded-full h-12 w-12 flex items-center justify-center border-4 ${
                      program.requirements.gre === "Not Accepted" 
                        ? "border-red-200 dark:border-red-900"
                        : program.requirements.gre === "Optional"
                          ? "border-yellow-200 dark:border-yellow-900"
                          : "border-green-200 dark:border-green-900"
                    } bg-white dark:bg-gray-800`}>
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {program.requirements.gre === "Not Accepted" ? "✕" : program.requirements.gre === "Optional" ? "!" : "✓"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">GRE</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 gap-3">
              <Button variant="outline" className="text-purple-600 border-purple-300 dark:border-purple-700">
                Program Information
              </Button>
              <Button className="bg-purple-600 text-white hover:bg-purple-700">
                Add to List
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindPrograms;
