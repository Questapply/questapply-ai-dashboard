
import { useState } from "react";
import { motion } from "framer-motion";
import { ListOrdered, ChevronDown, Star, Heart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface University {
  id: number;
  name: string;
  location: string;
  country: string;
  logo: string;
  rankings: {
    qs: string;
    usNews: string;
    shanghai: string;
    the: string;
    forbes: string;
  };
}

const universities: University[] = [
  {
    id: 1,
    name: "IMT School for Advanced Studies Lucca",
    location: "Lucca, Lucca",
    country: "IT",
    logo: "/placeholder.svg",
    rankings: {
      qs: "#1",
      usNews: "",
      shanghai: "",
      the: "",
      forbes: ""
    }
  },
  {
    id: 2,
    name: "Harvard University",
    location: "Massachusetts, Cambridge",
    country: "US",
    logo: "/placeholder.svg",
    rankings: {
      qs: "#1",
      usNews: "#3",
      shanghai: "#1",
      the: "#1",
      forbes: "#15"
    }
  },
  {
    id: 3,
    name: "University of Toronto",
    location: "Ontario, Toronto",
    country: "CA",
    logo: "/placeholder.svg",
    rankings: {
      qs: "#1",
      usNews: "#1",
      shanghai: "",
      the: "",
      forbes: ""
    }
  },
  {
    id: 4,
    name: "McGill University",
    location: "Quebec, Montreal",
    country: "CA",
    logo: "/placeholder.svg",
    rankings: {
      qs: "#2",
      usNews: "#3",
      shanghai: "",
      the: "",
      forbes: ""
    }
  },
  {
    id: 5,
    name: "Stanford University",
    location: "California, Stanford",
    country: "US",
    logo: "/placeholder.svg",
    rankings: {
      qs: "#2",
      usNews: "#3",
      shanghai: "#2",
      the: "#2",
      forbes: "#2"
    }
  },
  {
    id: 6,
    name: "Massachusetts Institute of Technology (MIT)",
    location: "Massachusetts, Cambridge",
    country: "US",
    logo: "/placeholder.svg",
    rankings: {
      qs: "#3",
      usNews: "#2",
      shanghai: "#3",
      the: "#3",
      forbes: "#1"
    }
  }
];

const Ranking = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  const toggleFavorite = (id: number) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                QuestApply
              </div>
              <NavigationMenu className="hidden md:block ml-10">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="/dashboard"
                      className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="/ranking"
                      className="px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400"
                    >
                      Ranking
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      href="#"
                      className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Blog
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                      Help Center
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500 to-purple-700 p-6 no-underline outline-none focus:shadow-md"
                              href="#"
                            >
                              <div className="mt-4 mb-2 text-lg font-medium text-white">
                                Documentation
                              </div>
                              <p className="text-sm leading-tight text-white/90">
                                Learn how to use QuestApply to find the perfect university for your future.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/30"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">FAQs</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400">
                                Find answers to common questions.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <a
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/30"
                              href="#"
                            >
                              <div className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">Contact Support</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400">
                                Get in touch with our support team.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center space-x-4">
              <span className="relative">
                <button className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 text-gray-700 dark:text-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                    <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </span>
              <span className="relative">
                <button className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 text-gray-700 dark:text-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
                    <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                  1
                </span>
              </span>
              <div className="h-8 w-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <motion.div 
            className="w-full md:w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h2>
                <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <button className="w-full flex items-center justify-between text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                    <div className="flex items-center">
                      <ListOrdered className="h-5 w-5 mr-2" />
                      <span>Country</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <button className="w-full flex items-center justify-between text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                    <div className="flex items-center">
                      <ListOrdered className="h-5 w-5 mr-2" />
                      <span>QS Ranking</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <button className="w-full flex items-center justify-between text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                    <div className="flex items-center">
                      <ListOrdered className="h-5 w-5 mr-2" />
                      <span>Program</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Table */}
          <motion.div 
            className="flex-grow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-6 gap-4 p-4 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="col-span-2">Country</div>
                <div className="text-center font-medium text-purple-600 dark:text-purple-400">QS</div>
                <div className="text-center">US News</div>
                <div className="text-center">Shanghai</div>
                <div className="text-center">THE</div>
                <div className="text-center">Forbes</div>
                <div className="text-center">Schools details</div>
              </div>

              {universities.map((university) => (
                <div key={university.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150">
                  <div className="grid grid-cols-6 gap-4 p-4 items-center">
                    <div className="col-span-2 flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center overflow-hidden">
                        <img 
                          src={university.logo} 
                          alt={university.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">{university.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{university.location}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      {university.rankings.qs && (
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                          {university.rankings.qs}
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      {university.rankings.usNews && (
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {university.rankings.usNews}
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      {university.rankings.shanghai && (
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {university.rankings.shanghai}
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      {university.rankings.the && (
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {university.rankings.the}
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      {university.rankings.forbes && (
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {university.rankings.forbes}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-center">
                      <button 
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => toggleFavorite(university.id)}
                      >
                        {favorites[university.id] ? (
                          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                        ) : (
                          <Heart className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
