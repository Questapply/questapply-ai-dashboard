import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import AnimatedCard from "@/components/ui/animated-card";
import { Mail, MapPin, Globe, Heart, Send, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import FilterDropdown from "../filters/FilterDropdown";
import {
  countryOptions,
  usStatesOptions,
  schoolsOptions,
  areaOfStudyOptions,
  programOptions,
  researchInterestOptions,
  professorTitleOptions,
  filterIcons
} from "./FilterData";
import ProfessorContactDialog from "./professors/ProfessorContactDialog";
import { toast } from "sonner";

const professors = [
  {
    id: 1,
    name: "Ran Raz",
    title: "Professor",
    avatar: "/placeholder.svg",
    university: "Princeton University",
    universityLogo: "/placeholder.svg",
    location: "New Jersey, United States of America (USA)",
    country: "United States",
    email: "ran.raz@princeton.edu",
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
    universityLogo: "/placeholder.svg",
    location: "New Jersey, United States of America (USA)",
    country: "United States",
    email: "olga@princeton.edu",
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
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    professors.reduce((acc, professor) => ({...acc, [professor.id]: professor.favorite}), {})
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<typeof professors[0] | null>(null);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  const handleFilterSelect = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const toggleFavorite = (professorId: number) => {
    setFavorites(prev => {
      const newState = {
        ...prev,
        [professorId]: !prev[professorId]
      };
      
      const professor = professors.find(p => p.id === professorId);
      if (professor) {
        if (newState[professorId]) {
          toast.success(`${professor.name} added to My Professors`);
        } else {
          toast.info(`${professor.name} removed from My Professors`);
        }
      }
      
      return newState;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would filter professors based on search
  };

  const handleEmailClick = (professor: typeof professors[0]) => {
    setSelectedProfessor(professor);
    setEmailDialogOpen(true);
  };

  const handleReminderClick = (professor: typeof professors[0]) => {
    setSelectedProfessor(professor);
    setReminderDialogOpen(true);
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          className="text-2xl font-bold text-gray-900 dark:text-white"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Find Professors
        </motion.h1>
        <motion.div 
          className="text-sm text-gray-500 dark:text-gray-400"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Professors are sorted by university ranking
        </motion.div>
      </div>

      {/* Search */}
      <motion.div 
        className="mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>

      {/* Filters - replaced with dropdown filters */}
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
        
        <div className="flex flex-wrap gap-2">
          <FilterDropdown 
            label="Country" 
            icon={<span>{filterIcons.country}</span>}
            options={countryOptions}
            onSelect={(value) => handleFilterSelect("country", value)}
            selectedValue={selectedFilters.country}
          />
          
          <FilterDropdown 
            label="State" 
            icon={<span>{filterIcons.state}</span>}
            options={usStatesOptions}
            onSelect={(value) => handleFilterSelect("state", value)}
            selectedValue={selectedFilters.state}
          />
          
          <FilterDropdown 
            label="Schools" 
            icon={<span>{filterIcons.schools}</span>}
            options={schoolsOptions}
            onSelect={(value) => handleFilterSelect("school", value)}
            selectedValue={selectedFilters.school}
          />
          
          <FilterDropdown 
            label="Area of Study" 
            icon={<span>{filterIcons.areaOfStudy}</span>}
            options={areaOfStudyOptions}
            onSelect={(value) => handleFilterSelect("areaOfStudy", value)}
            selectedValue={selectedFilters.areaOfStudy}
          />
          
          <FilterDropdown 
            label="Programs" 
            icon={<span>{filterIcons.programs}</span>}
            options={programOptions}
            onSelect={(value) => handleFilterSelect("program", value)}
            selectedValue={selectedFilters.program}
          />
          
          <FilterDropdown 
            label="Research Interest" 
            icon={<span>{filterIcons.researchInterest}</span>}
            options={researchInterestOptions}
            onSelect={(value) => handleFilterSelect("researchInterest", value)}
            selectedValue={selectedFilters.researchInterest}
          />
          
          <FilterDropdown 
            label="Title" 
            icon={<span>{filterIcons.title}</span>}
            options={professorTitleOptions}
            onSelect={(value) => handleFilterSelect("title", value)}
            selectedValue={selectedFilters.title}
          />
        </div>
      </motion.div>

      {/* Professors List */}
      <motion.div 
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {professors.map((professor, index) => (
          <AnimatedCard 
            key={professor.id}
            delay={0.2 + index * 0.1}
            className="border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Professor Profile with updated layout */}
                <motion.div 
                  className="flex flex-col items-center md:items-start gap-4"
                  variants={itemVariants}
                >
                  <div className="flex items-start gap-4 w-full">
                    <div className="relative">
                      <motion.img 
                        src={professor.avatar} 
                        alt={`${professor.name}'s avatar`}
                        className="w-24 h-24 rounded-full object-cover border-4 border-purple-100 dark:border-purple-900/30 shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                      <motion.div
                        className="absolute -bottom-2 -right-2 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-full px-3 py-1 text-xs font-medium shadow-sm border border-purple-200 dark:border-purple-800"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        {professor.title}
                      </motion.div>
                    </div>
                    
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{professor.name}</h3>
                        <button
                          onClick={() => toggleFavorite(professor.id)}
                          className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                          aria-label={favorites[professor.id] ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart 
                            className={cn(
                              "h-5 w-5 transition-colors duration-300", 
                              favorites[professor.id] 
                                ? "text-red-500 fill-red-500" 
                                : ""
                            )} 
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mt-2 w-full min-h-[80px]">
                        <img 
                          src={professor.universityLogo} 
                          alt="University Logo"
                          className="w-10 h-10 rounded-full bg-white p-1"
                        />
                        <div className="flex flex-col">
                          <a 
                            href="#" 
                            className="text-purple-600 dark:text-purple-400 hover:underline text-md font-medium transition-colors"
                          >
                            {professor.university}
                          </a>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="h-3 w-3 mr-1" /> {professor.country}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Professor contact icons */}
                  <div className="flex items-center gap-6 mt-2 justify-center w-full">
                    <a href={`mailto:${professor.email}`} className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                      <Mail className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors">
                      {/* Google Scholar Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 10 0 14 7 7 0 0 0 0-14z"/>
                        <path d="M10 15h4v1h-4z"/>
                        <path d="M10 18h4v1h-4z"/>
                        <path d="M10 12h4v1h-4z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors">
                      <Globe className="w-6 h-6" />
                    </a>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 w-full mt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleEmailClick(professor)}
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Send Email
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => handleReminderClick(professor)}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Remind
                    </Button>
                  </div>
                </motion.div>
                
                {/* Research and Programs */}
                <motion.div 
                  className="md:col-span-2"
                  variants={itemVariants}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                    {/* Research Interests */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 h-full">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Research Interest</h4>
                      </div>
                      <ul className="space-y-3">
                        {professor.research.map((interest, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-start gap-2 transition-all duration-300 hover:translate-x-1"
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                          >
                            <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                            <span className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                              {interest}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          className="text-purple-600 dark:text-purple-400 text-sm hover:underline flex items-center gap-1"
                        >
                          <span>Show More</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Programs */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 h-full">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Programs</h4>
                      <div className="space-y-4">
                        {professor.programs.map((program, i) => (
                          <motion.div 
                            key={i} 
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-lg transition-all duration-300 border",
                              program.status === "available" 
                                ? "border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/10" 
                                : "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10"
                            )}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                          >
                            {program.status === "available" ? (
                              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span className={cn(
                              "text-sm font-medium",
                              program.status === "available" ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"
                            )}>
                              {program.name}, {program.level}
                            </span>
                          </motion.div>
                        ))}
                        <motion.button 
                          className="text-purple-600 dark:text-purple-400 text-sm hover:underline flex items-center gap-1"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7 }}
                          whileHover={{ x: 3 }}
                        >
                          <span>Show More</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-between mt-4">
                    <div className="flex gap-2">
                      <motion.button
                        className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </motion.button>
                      <motion.button
                        className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </motion.div>

      {/* Email Composition Dialog (opened directly on Send Email click) */}
      {selectedProfessor && (
        <ProfessorContactDialog 
          open={emailDialogOpen}
          onOpenChange={setEmailDialogOpen}
          professor={selectedProfessor}
          directEmailMode={true}
        />
      )}

      {/* Reminder Dialog */}
      {selectedProfessor && (
        <ProfessorContactDialog 
          open={reminderDialogOpen}
          onOpenChange={setReminderDialogOpen}
          professor={selectedProfessor}
          isReminder={true}
        />
      )}
    </div>
  );
};

export default FindProfessors;
