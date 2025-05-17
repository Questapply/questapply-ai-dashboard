
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AnimatedCard from "@/components/ui/animated-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, SchoolIcon, Settings, Star } from "lucide-react";

const Favorites = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Sample favorite schools data
  const favoriteSchools = [
    {
      id: 1,
      name: "Massachusetts Institute of Technology",
      location: "Cambridge, MA",
      ranking: "#1 in Computer Science",
      acceptance: "7% Acceptance Rate",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Stanford University",
      location: "Stanford, CA",
      ranking: "#2 in Computer Science",
      acceptance: "5% Acceptance Rate",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Harvard University",
      location: "Cambridge, MA",
      ranking: "#3 in Law",
      acceptance: "4% Acceptance Rate",
      image: "/placeholder.svg"
    }
  ];
  
  // Sample favorite programs data
  const favoritePrograms = [
    {
      id: 1,
      name: "Computer Science MS",
      school: "Massachusetts Institute of Technology",
      duration: "2 years",
      deadline: "December 15, 2023",
      tuition: "$58,000 per year"
    },
    {
      id: 2,
      name: "Artificial Intelligence PhD",
      school: "Stanford University",
      duration: "5 years",
      deadline: "January 5, 2024",
      tuition: "$62,000 per year"
    },
    {
      id: 3,
      name: "Data Science MS",
      school: "University of California, Berkeley",
      duration: "2 years",
      deadline: "December 1, 2023",
      tuition: "$54,000 per year"
    }
  ];

  return (
    <DashboardLayout 
      isDarkMode={isDarkMode} 
      toggleTheme={toggleTheme}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            My Favorites
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your favorite schools and programs.
          </p>
        </motion.div>

        <Tabs defaultValue="schools" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="schools" className="flex items-center gap-2">
              <SchoolIcon className="h-4 w-4" />
              <span>Schools</span>
            </TabsTrigger>
            <TabsTrigger value="programs" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Programs</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="schools">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteSchools.map((school, index) => (
                <AnimatedCard 
                  key={school.id} 
                  delay={index * 0.1}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      src={school.image} 
                      alt={school.name} 
                      className="w-full h-40 object-cover"
                    />
                    <button className="absolute top-3 right-3 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full">
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-1">{school.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{school.location}</p>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <Star className="h-4 w-4 text-amber-500 mr-1" />
                      <span>{school.ranking}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {school.acceptance}
                    </div>
                    <button className="mt-4 text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline">
                      View Details
                    </button>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="programs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {favoritePrograms.map((program, index) => (
                <AnimatedCard 
                  key={program.id} 
                  delay={index * 0.1}
                  className="flex flex-col"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{program.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{program.school}</p>
                      </div>
                      <button className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-full">
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                      </button>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                      <div>
                        <span className="font-medium">Duration:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{program.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium">Application Deadline:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{program.deadline}</span>
                      </div>
                      <div>
                        <span className="font-medium">Tuition:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{program.tuition}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <button className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline">
                        View Program
                      </button>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Favorites;
