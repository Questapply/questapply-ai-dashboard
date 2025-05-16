
import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ProfessorFilter = {
  id: string;
  name: string;
  icon: string;
};

const filters: ProfessorFilter[] = [
  { id: "country", name: "Country", icon: "🌎" },
  { id: "state", name: "State", icon: "🗺️" },
  { id: "university", name: "University", icon: "🏫" },
  { id: "research", name: "Research Interest", icon: "🔬" },
  { id: "title", name: "Title", icon: "👨‍🏫" },
  { id: "department", name: "Department", icon: "🏢" }
];

const professors = [
  {
    id: 1,
    name: "Ran Raz",
    title: "Professor",
    avatar: "/placeholder.svg",
    university: "Princeton University",
    location: "New Jersey, United States of America (USA)",
    research: [
      "Computational Complexity",
      "Complexity Theory",
      "Communication Complexity"
    ],
    programs: [
      { name: "Computer Science", level: "Bachelor(A.B.)", status: "available" },
      { name: "Computer Science", level: "Master(M.S.)", status: "available" },
      { name: "Computer Science", level: "Ph.D.(Ph.D.)", status: "unavailable" }
    ],
    favorite: false
  },
  {
    id: 2,
    name: "Olga Russakovsky",
    title: "Assistant Professor",
    avatar: "/placeholder.svg",
    university: "Princeton University",
    location: "New Jersey, United States of America (USA)",
    research: [
      "Computer Vision",
      "Machine Learning",
      "Human Computer Interaction"
    ],
    programs: [
      { name: "Computer Science", level: "Bachelor(A.B.)", status: "available" },
      { name: "Computer Science", level: "Master(M.S.)", status: "available" },
      { name: "Computer Science", level: "Ph.D.(Ph.D.)", status: "unavailable" }
    ],
    favorite: true
  }
];

const FindProfessors = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    professors.reduce((acc, professor) => ({...acc, [professor.id]: professor.favorite}), {})
  );
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };

  const toggleFavorite = (professorId: number) => {
    setFavorites(prev => ({
      ...prev,
      [professorId]: !prev[professorId]
    }));
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find Professors</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Professors are sorted by university ranking
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="w-full max-w-md relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-purple-500 focus:border-purple-500 dark:focus:ring-purple-400 dark:focus:border-purple-400 transition-all duration-300"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:shadow-sm"
                }
                transition-all duration-300 ease-in-out transform hover:-translate-y-0.5
              `}
              onClick={() => toggleFilter(filter.id)}
            >
              <span>{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Professors List */}
      <div className="space-y-6">
        {professors.map(professor => (
          <Card 
            key={professor.id}
            className="overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar and Info */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <img 
                    src={professor.avatar} 
                    alt={`${professor.name}'s avatar`}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-100 dark:ring-purple-900/30"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{professor.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{professor.title}</p>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="University Logo"
                      className="w-6 h-6 mr-2"
                    />
                    <a 
                      href="#" 
                      className="text-purple-600 dark:text-purple-400 hover:underline transition-colors"
                    >
                      {professor.university}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="Location"
                      className="w-6 h-6 mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{professor.location}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="transition-all hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" className="transition-all hover:bg-gray-100 dark:hover:bg-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                      </svg>
                      Website
                    </Button>
                  </div>
                </div>
                
                {/* Research and Programs */}
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Research Interest</h4>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                        {professor.research.map((interest, i) => (
                          <li key={i} className="transition-all duration-300 hover:text-purple-600 dark:hover:text-purple-400">
                            {interest}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </Button>
                      <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Create email
                      </Button>
                      <Button variant="ghost" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Remind
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Programs</h4>
                    <div className="space-y-2 mt-2">
                      {professor.programs.map((program, i) => (
                        <div key={i} className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
                          {program.status === "available" ? (
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className="text-gray-700 dark:text-gray-300">
                            {program.name}, {program.level}
                          </span>
                        </div>
                      ))}
                      <button className="text-purple-600 dark:text-purple-400 text-sm hover:underline mt-2 transition-colors">
                        Show More
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Favorite Button */}
                <div className="md:ml-auto">
                  <button
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                    onClick={() => toggleFavorite(professor.id)}
                    aria-label={favorites[professor.id] ? "Remove from favorites" : "Add to favorites"}
                  >
                    {favorites[professor.id] ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-red-500 hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FindProfessors;
