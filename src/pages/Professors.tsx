
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AnimatedCard from "@/components/ui/animated-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MoreVertical, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Send,
  Heart,
  Globe,
  BookOpen
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProfessorContactDialog from "@/components/dashboard/sections/professors/ProfessorContactDialog";
import ProfessorReminderDialog from "@/components/dashboard/sections/professors/ProfessorReminderDialog";
import ChatBox from "@/components/dashboard/ChatBox";

// Define the Professor interface to match what's needed for the dialogs
interface Professor {
  id: number;
  name: string;
  title: string;
  university: string;
  email: string;
  photoUrl: string;
  country?: string;
  department?: string;
  research?: string[];
  scholarUrl?: string;
  websiteUrl?: string;
  responseStatus?: string;
  lastContacted?: string;
  favorite?: boolean;
}

const Professors = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeContactProfessor, setActiveContactProfessor] = useState<number | null>(null);
  const [activeReminderProfessor, setActiveReminderProfessor] = useState<number | null>(null);
  
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Updated professors data with title and photoUrl properties
  const professors: Professor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Associate Professor", // Added required title field
      university: "Massachusetts Institute of Technology",
      country: "USA",
      department: "Computer Science",
      research: ["Artificial Intelligence", "Machine Learning"],
      email: "sjohnson@mit.edu",
      photoUrl: "/placeholder.svg", // Renamed from image to photoUrl
      scholarUrl: "https://scholar.google.com/scholar?q=author:johnson",
      websiteUrl: "https://mit.edu/sjohnson",
      responseStatus: "responded", // responded, pending, declined
      lastContacted: "2023-11-15",
      favorite: true
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Professor", // Added required title field
      university: "Stanford University",
      country: "USA",
      department: "Data Science",
      research: ["Big Data Analytics", "Statistical Learning"],
      email: "mchen@stanford.edu",
      photoUrl: "/placeholder.svg", // Renamed from image to photoUrl
      scholarUrl: "https://scholar.google.com/scholar?q=author:chen",
      websiteUrl: "https://stanford.edu/mchen",
      responseStatus: "pending",
      lastContacted: "2023-11-20",
      favorite: true
    },
    {
      id: 3,
      name: "Dr. Rachel Williams",
      title: "Associate Professor", // Added required title field
      university: "Harvard University",
      country: "USA",
      department: "Computer Science",
      research: ["Human-Computer Interaction", "UX Research"],
      email: "rwilliams@harvard.edu",
      photoUrl: "/placeholder.svg", // Renamed from image to photoUrl
      scholarUrl: "https://scholar.google.com/scholar?q=author:williams",
      websiteUrl: "https://harvard.edu/rwilliams",
      responseStatus: "declined",
      lastContacted: "2023-11-05",
      favorite: true
    },
    {
      id: 4,
      name: "Prof. David Martinez",
      title: "Professor", // Added required title field
      university: "University of California, Berkeley",
      country: "USA",
      department: "Electrical Engineering",
      research: ["Robotics", "Computer Vision"],
      email: "dmartinez@berkeley.edu",
      photoUrl: "/placeholder.svg", // Renamed from image to photoUrl
      scholarUrl: "https://scholar.google.com/scholar?q=author:martinez",
      websiteUrl: "https://berkeley.edu/dmartinez",
      responseStatus: "pending",
      lastContacted: "2023-11-18",
      favorite: true
    }
  ];
  
  const getResponseBadge = (status: string) => {
    switch (status) {
      case "responded":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"><CheckCircle2 className="h-3 w-3 mr-1" /> Responded</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case "declined":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"><XCircle className="h-3 w-3 mr-1" /> Declined</Badge>;
      default:
        return null;
    }
  };
  
  // Function to handle removing professor from favorites
  const handleToggleFavorite = (professorId: number) => {
    // In a real app, this would update state and possibly a database
    console.log(`Professor ${professorId} favorite status toggled`);
  };

  const handleSendEmail = (professorId: number) => {
    setActiveContactProfessor(professorId);
  };
  
  const handleSendReminder = (professorId: number) => {
    setActiveReminderProfessor(professorId);
  };

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
            Find Professors
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Connect with professors for research collaboration and recommendations.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <ChatBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isQuestApplyAI={false}
            isDarkMode={isDarkMode}
            filterOptions={null}
            section="find-professors"
          />
        </motion.div>

        {/* Filters Section */}
        <motion.div 
          className="mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500">
              <path d="M3 4.5h18M7 12h10M11 19.5h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="font-semibold text-gray-700 dark:text-gray-200">Filters</h2>
          </div>
          
          {/* Filter buttons styled like chatbox filter buttons */}
          <div className="flex flex-wrap gap-2">
            {/* Filter buttons would go here using the same styling as in FindSchools and FindPrograms */}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {professors.map((professor, index) => (
            <AnimatedCard 
              key={professor.id} 
              delay={index * 0.1}
              className="overflow-hidden"
            >
              <div className="flex flex-col h-full bg-white dark:bg-gray-800/90 p-6 rounded-lg shadow-md">
                {/* Top section with photo and name */}
                <div className="flex gap-4 mb-4">
                  {/* Profile photo */}
                  <div className="w-20 h-20 relative">
                    <img 
                      src={professor.photoUrl} 
                      alt={professor.name} 
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Name and university info */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-xl text-gray-800 dark:text-white flex items-center gap-2">
                        {professor.name}
                        <button
                          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                          onClick={() => handleToggleFavorite(professor.id)}
                        >
                          <Heart className={`h-5 w-5 ${professor.favorite ? "fill-red-500 text-red-500" : ""}`} />
                        </button>
                      </h3>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                            <MoreVertical className="h-5 w-5 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Create Email
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer" onClick={() => handleSendReminder(professor.id)}>
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Remove from List
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    {/* University badge */}
                    <div className="inline-block bg-purple-100 dark:bg-purple-900/30 rounded-md px-3 py-1 text-sm text-purple-800 dark:text-purple-300 my-2">
                      {professor.university}, {professor.country}
                    </div>
                  </div>
                </div>
                
                {/* Contact icons */}
                <div className="flex gap-4 mb-4">
                  <a href={`mailto:${professor.email}`} className="bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2 transition-colors">
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </a>
                  <a href={professor.scholarUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2 transition-colors">
                    <BookOpen className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </a>
                  <a href={professor.websiteUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full p-2 transition-colors">
                    <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </a>
                </div>
                
                {/* Research Interests */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Research Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {professor.research.map((item, idx) => (
                      <span key={idx} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Status and Actions */}
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center">
                    {getResponseBadge(professor.responseStatus)}
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      <Clock className="inline h-3 w-3 mr-0.5" />
                      Last contacted: {new Date(professor.lastContacted).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex items-center gap-1"
                      onClick={() => handleSendReminder(professor.id)}
                    >
                      <Clock className="h-4 w-4" />
                      <span>Remind</span>
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleSendEmail(professor.id)}
                    >
                      <Mail className="h-4 w-4" />
                      <span>Send Email</span>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Professor Contact Dialog */}
      {activeContactProfessor && (
        <ProfessorContactDialog
          open={activeContactProfessor !== null}
          onOpenChange={() => setActiveContactProfessor(null)}
          professor={professors.find(p => p.id === activeContactProfessor) || professors[0]}
        />
      )}
      
      {/* Professor Reminder Dialog */}
      {activeReminderProfessor && (
        <ProfessorReminderDialog
          open={activeReminderProfessor !== null}
          onOpenChange={() => setActiveReminderProfessor(null)}
          professor={professors.find(p => p.id === activeReminderProfessor) || professors[0]}
        />
      )}
    </DashboardLayout>
  );
};

export default Professors;
