
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, BookOpen, Globe, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatBox from "../ChatBox";
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
import ProfessorReminderDialog from "./professors/ProfessorReminderDialog";

// Sample professors data
const professors = [
  {
    id: 1,
    name: "Dr. John Smith",
    title: "Associate Professor",
    university: "Stanford University",
    country: "USA",
    researchArea: "Artificial Intelligence",
    bio: "Dr. Smith specializes in deep learning and computer vision with over 15 years of research experience.",
    email: "john.smith@stanford.edu",
    scholarUrl: "https://scholar.google.com/citations?user=123456",
    websiteUrl: "https://stanford.edu/~jsmith",
    photoUrl: "/placeholder.svg",
    publications: 78,
    hIndex: 25,
    favorite: true
  },
  {
    id: 2,
    name: "Dr. Maria Rodriguez",
    title: "Professor",
    university: "MIT",
    country: "USA",
    researchArea: "Machine Learning",
    bio: "Dr. Rodriguez focuses on reinforcement learning and robotics with applications in autonomous systems.",
    email: "maria.rodriguez@mit.edu",
    scholarUrl: "https://scholar.google.com/citations?user=789012",
    websiteUrl: "https://mit.edu/~mrodriguez",
    photoUrl: "/placeholder.svg",
    publications: 126,
    hIndex: 38,
    favorite: false
  },
  {
    id: 3,
    name: "Dr. Hiroshi Tanaka",
    title: "Assistant Professor",
    university: "University of Tokyo",
    country: "Japan",
    researchArea: "Natural Language Processing",
    bio: "Dr. Tanaka's research focuses on multilingual language models and cross-cultural NLP applications.",
    email: "h.tanaka@tokyo-u.ac.jp",
    scholarUrl: "https://scholar.google.com/citations?user=345678",
    websiteUrl: "https://tokyo-u.ac.jp/~htanaka",
    photoUrl: "/placeholder.svg",
    publications: 45,
    hIndex: 18,
    favorite: false
  }
];

const FindProfessors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    professors.reduce((acc, prof) => ({...acc, [prof.id]: prof.favorite}), {})
  );
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState<number | null>(null);

  const handleFilterSelect = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const toggleFavorite = (professorId: number) => {
    setFavorites(prev => ({
      ...prev,
      [professorId]: !prev[professorId]
    }));
  };

  const handleSendEmail = (professorId: number) => {
    setSelectedProfessor(professorId);
    setShowContactDialog(true);
  };

  const handleSendReminder = (professorId: number) => {
    setSelectedProfessor(professorId);
    setShowReminderDialog(true);
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
          Connect with professors in your field of interest
        </motion.div>
      </div>

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
          isDarkMode={document.documentElement.classList.contains('dark')}
          filterOptions={null}
          section="find-professors"
        />
      </motion.div>

      {/* Filters - updated to match chatbox filter styling */}
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
        
        <div className="flex flex-wrap gap-2 overflow-x-auto py-2">
          {[
            {label: "Country", icon: filterIcons.country, options: countryOptions},
            {label: "State", icon: filterIcons.state, options: usStatesOptions},
            {label: "Schools", icon: filterIcons.schools, options: schoolsOptions},
            {label: "Area of Study", icon: filterIcons.areaOfStudy, options: areaOfStudyOptions},
            {label: "Programs", icon: filterIcons.programs, options: programOptions},
            {label: "Research Interest", icon: filterIcons.researchInterest, options: researchInterestOptions},
            {label: "Title", icon: filterIcons.title, options: professorTitleOptions}
          ].map((filter, idx) => (
            <FilterDropdown 
              key={idx}
              label={filter.label} 
              icon={<span>{filter.icon}</span>}
              options={filter.options}
              onSelect={(value) => handleFilterSelect(filter.label.toLowerCase().replace(/\s+/g, ''), value)}
              selectedValue={selectedFilters[filter.label.toLowerCase().replace(/\s+/g, '')]}
              buttonClassName="flex items-center gap-2 px-4 py-2 rounded-full border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-200 dark:hover:border-teal-700 text-sm transition-all duration-300 hover:shadow-sm transform hover:-translate-y-0.5 whitespace-nowrap"
            />
          ))}
        </div>
      </motion.div>

      {/* Professors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professors.map((professor, index) => (
          <motion.div
            key={professor.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <div className="p-6">
              {/* Professor header with photo and name - updated layout */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={professor.photoUrl}
                  alt={`${professor.name}'s photo`}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{professor.name}</h3>
                    <button
                      onClick={() => toggleFavorite(professor.id)}
                      className={`text-2xl ${favorites[professor.id] ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    >
                      <Heart className={`h-5 w-5 ${favorites[professor.id] ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{professor.title}</div>
                  
                  {/* University box */}
                  <div className="mt-2 inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-md">
                    <span>{professor.university}, {professor.country}</span>
                  </div>
                </div>
              </div>
              
              {/* Research area */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Research Area</div>
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{professor.researchArea}</div>
              </div>
              
              {/* Bio */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Bio</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{professor.bio}</div>
              </div>
              
              {/* Contact links - updated to stylish icons */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <a href={`mailto:${professor.email}`} className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800/30 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href={professor.scholarUrl} target="_blank" rel="noopener noreferrer" className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 p-2 rounded-full hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors">
                  <BookOpen className="h-5 w-5" />
                </a>
                <a href={professor.websiteUrl} target="_blank" rel="noopener noreferrer" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                  <span title="Publications">{professor.publications} pubs</span>
                  <span>•</span>
                  <span title="h-index">h-index: {professor.hIndex}</span>
                </div>
              </div>
              
              {/* Action buttons - updated text and functionality */}
              <div className="flex justify-between gap-2">
                <Button
                  onClick={() => handleSendEmail(professor.id)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Send Email
                </Button>
                <Button
                  onClick={() => handleSendReminder(professor.id)}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Remind
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Contact Dialog */}
      {showContactDialog && selectedProfessor !== null && (
        <ProfessorContactDialog 
          open={showContactDialog}
          onOpenChange={() => setShowContactDialog(false)}
          professor={professors.find(p => p.id === selectedProfessor) || professors[0]}
        />
      )}

      {/* Add Reminder Dialog */}
      {showReminderDialog && selectedProfessor !== null && (
        <ProfessorReminderDialog
          open={showReminderDialog}
          onOpenChange={() => setShowReminderDialog(false)}
          professor={professors.find(p => p.id === selectedProfessor) || professors[0]}
        />
      )}
    </div>
  );
};

export default FindProfessors;
