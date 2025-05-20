
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ListOrdered, Shield, HelpCircle, Sun, Moon, FileText, BookOpen, Sparkles, MessageSquare, Layers, GraduationCap, Landmark, University } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import QuestApplyLogo from "@/components/common/QuestApplyLogo";
import WordQuestGame from "@/components/game/WordQuestGame";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Hero3 from "@/components/hero/Hero3";
import RoadmapSection from "@/components/roadmap/RoadmapSection";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [activeHero, setActiveHero] = useState<"hero1" | "hero2" | "hero3" | "hero4">("hero1");
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [autoTypingMessage, setAutoTypingMessage] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [showSchoolCards, setShowSchoolCards] = useState(false);
  const [showProfessorCards, setShowProfessorCards] = useState(false);
  const [showSOP, setShowSOP] = useState(false);
  const autoResetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check URL param for hero selection without scrolling
  useEffect(() => {
    const heroParam = searchParams.get('hero');
    if (heroParam) {
      const heroNumber = parseInt(heroParam);
      if (heroNumber >= 1 && heroNumber <= 4) {
        setActiveHero(`hero${heroNumber}` as "hero1" | "hero2" | "hero3" | "hero4");
        
        // Show toast with hero recommendation if it's the best one
        if (heroNumber === 2) {
          setTimeout(() => {
            toast({
              title: "Hero Design Recommendation",
              description: "Hero 2 is our recommended design! It presents the AI chat interface prominently while maintaining clean aesthetics."
            });
          }, 1000);
        }
      }
    }
  }, [searchParams, toast]);

  // Auto-scroll to bottom of chat when messages change - only for the chat component itself
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Initialize chat messages for Hero 2 and Hero 4
  useEffect(() => {
    if (activeHero === "hero2" || activeHero === "hero4") {
      setChatMessages([
        { role: "assistant", content: "Hello! I'm QuestApply AI. How can I help with your study abroad journey?" }
      ]);
    }
  }, [activeHero]);

  // Cleanup timers on unmount or hero change
  useEffect(() => {
    return () => {
      if (autoResetTimerRef.current) {
        clearTimeout(autoResetTimerRef.current);
      }
    };
  }, [activeHero]);

  // Mock data for schools
  const topSchools = [
    { id: 1, name: "Massachusetts Institute of Technology (MIT)", ranking: "#1", location: "Cambridge, MA", icon: <University className="w-8 h-8 text-blue-300" /> },
    { id: 2, name: "Stanford University", ranking: "#2", location: "Stanford, CA", icon: <GraduationCap className="w-8 h-8 text-purple-300" /> },
    { id: 3, name: "Carnegie Mellon University", ranking: "#3", location: "Pittsburgh, PA", icon: <Landmark className="w-8 h-8 text-teal-300" /> },
    { id: 4, name: "University of California, Berkeley", ranking: "#4", location: "Berkeley, CA", icon: <University className="w-8 h-8 text-blue-300" /> },
    { id: 5, name: "Cornell University", ranking: "#5", location: "Ithaca, NY", icon: <Landmark className="w-8 h-8 text-teal-300" /> }
  ];

  // Mock data for professors with profile images
  const topProfessors = [
    { id: 1, name: "Dr. Andrew Ng", university: "Stanford University", expertise: "Machine Learning", initial: "AN", imgUrl: "https://randomuser.me/api/portraits/men/32.jpg" },
    { id: 2, name: "Dr. Fei-Fei Li", university: "Stanford University", expertise: "Computer Vision", initial: "FL", imgUrl: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 3, name: "Dr. Yoshua Bengio", university: "University of Montreal", expertise: "Deep Learning", initial: "YB", imgUrl: "https://randomuser.me/api/portraits/men/46.jpg" },
    { id: 4, name: "Dr. Sebastian Thrun", university: "Stanford University", expertise: "Robotics & AI", initial: "ST", imgUrl: "https://randomuser.me/api/portraits/men/22.jpg" },
    { id: 5, name: "Dr. Geoffrey Hinton", university: "University of Toronto", expertise: "Neural Networks", initial: "GH", imgUrl: "https://randomuser.me/api/portraits/men/86.jpg" },
    { id: 6, name: "Dr. Emma Johnson", university: "MIT", expertise: "Natural Language Processing", initial: "EJ", imgUrl: "https://randomuser.me/api/portraits/women/28.jpg" },
    { id: 7, name: "Dr. David Lee", university: "UC Berkeley", expertise: "Reinforcement Learning", initial: "DL", imgUrl: "https://randomuser.me/api/portraits/men/57.jpg" },
    { id: 8, name: "Dr. Sarah Chen", university: "CMU", expertise: "Computer Vision", initial: "SC", imgUrl: "https://randomuser.me/api/portraits/women/63.jpg" },
    { id: 9, name: "Dr. Michael Brown", university: "Harvard", expertise: "AI Ethics", initial: "MB", imgUrl: "https://randomuser.me/api/portraits/men/37.jpg" },
    { id: 10, name: "Dr. Lisa Park", university: "Princeton", expertise: "Quantum Computing", initial: "LP", imgUrl: "https://randomuser.me/api/portraits/women/90.jpg" }
  ];

  // Auto-typing simulation for Hero 2 (normal heroes)
  useEffect(() => {
    if (activeHero === "hero2" && !isAutoTyping && !isTyping && chatMessages.length <= 1) {
      const scenarioMessages = [
        "My bachelor is in CS, GPA is 3.7, TOEFL 100, GRE 320. What are the TOP 10 schools in the US for PhD CS?",
        "Best professors in AI?"
      ];
      
      if (currentScenario < scenarioMessages.length) {
        const startTyping = setTimeout(() => {
          setAutoTypingMessage(scenarioMessages[currentScenario]);
          setCurrentCharIndex(0);
          setIsAutoTyping(true);
          setShowSchoolCards(false);
          setShowProfessorCards(false);
          setShowSOP(false);
        }, 2000);
        
        return () => clearTimeout(startTyping);
      } else if (currentScenario === 2) {
        // Auto-trigger SOP generation after professors list
        const triggerSOPTimer = setTimeout(() => {
          handleSOPGenerate();
          setCurrentScenario(3);
        }, 2000);
        
        return () => clearTimeout(triggerSOPTimer);
      } else if (currentScenario === 3) {
        // Reset the entire flow to create a loop
        const resetTimer = setTimeout(() => {
          setChatMessages([
            { role: "assistant", content: "Hello! I'm QuestApply AI. How can I help with your study abroad journey?" }
          ]);
          setCurrentScenario(0);
          setShowSchoolCards(false);
          setShowProfessorCards(false);
          setShowSOP(false);
        }, 8000);
        
        autoResetTimerRef.current = resetTimer;
        return () => clearTimeout(resetTimer);
      }
    }
  }, [activeHero, currentScenario, isAutoTyping, isTyping, chatMessages.length]);

  // Character-by-character typing effect for Hero 2
  useEffect(() => {
    if (isAutoTyping && currentCharIndex < autoTypingMessage.length) {
      const typingTimer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, 50);
      
      return () => clearTimeout(typingTimer);
    } else if (isAutoTyping && currentCharIndex >= autoTypingMessage.length) {
      const sendTimer = setTimeout(() => {
        setChatMessages(prev => [...prev, { role: "user", content: autoTypingMessage }]);
        setIsAutoTyping(false);
        setIsTyping(true);
        
        // Simulate AI response
        setTimeout(() => {
          let response = "";
          
          if (currentScenario === 0) {
            response = "Based on your profile, here are the top schools for PhD in Computer Science in the US:";
            setShowSchoolCards(true);
          } else if (currentScenario === 1) {
            response = "Here are some of the best professors in AI:";
            setShowProfessorCards(true);
            // Auto-trigger SOP after showing professors
            setTimeout(() => {
              setCurrentScenario(2);
            }, 3000);
          }
          
          setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
          setIsTyping(false);
          if (currentScenario < 2) {
            setCurrentScenario(prev => prev + 1);
          }
        }, 1500);
      }, 500);
      
      return () => clearTimeout(sendTimer);
    }
  }, [isAutoTyping, currentCharIndex, autoTypingMessage, currentScenario]);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const openGame = () => {
    setIsGameOpen(true);
  };

  // Simulate sending a message and getting AI response
  const handleSendMessage = (e: React.FormEvent | null, quickPrompt: string = "") => {
    if (e) e.preventDefault();
    
    const message = quickPrompt || inputValue;
    if (!message.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { role: "user", content: message }]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI typing response with delay
    setTimeout(() => {
      let response = "";
      
      if (message.toLowerCase().includes("study") || message.toLowerCase().includes("universities") || message.toLowerCase().includes("schools")) {
        response = "Based on your profile, I recommend considering these top CS programs: MIT, Stanford, Carnegie Mellon, UC Berkeley, and Georgia Tech. Would you like me to analyze your chances for these schools?";
      } else if (message.toLowerCase().includes("cv") || message.toLowerCase().includes("resume")) {
        response = "I'd be happy to help generate a CV for your Data Science Master's application. Let me create a template customized to highlight your technical skills, research experience, and academic achievements.";
      } else if (message.toLowerCase().includes("generate") || message.toLowerCase().includes("sop")) {
        response = "I can help you craft a compelling Statement of Purpose. What program are you applying to and what are your key accomplishments you'd like to highlight?";
        setShowSOP(true);
      } else {
        response = "I'm here to help with your study abroad journey. I can assist with finding schools, preparing application documents, or understanding the admission process. What specific help do you need?";
      }
      
      setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle SOP generation
  const handleSOPGenerate = () => {
    setChatMessages(prev => [
      ...prev,
      { role: "user", content: "Generate SOP for Computer Science PhD" }
    ]);
    setIsTyping(true);
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: "Here's your Statement of Purpose for Computer Science PhD applications:" }
      ]);
      setShowSOP(true);
      setIsTyping(false);
    }, 1500);
  };

  // Quick prompt buttons
  const quickPrompts = [
    "Show me top universities in Canada",
    "Generate CV for Data Science Master's",
    "What GRE score do I need?"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/40 dark:bg-gray-900">
      {/* Header/Navigation */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <QuestApplyLogo variant="full" size="md" />
              <div className="hidden md:flex ml-10 space-x-4">
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/ranking" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium flex items-center">
                  <ListOrdered className="h-4 w-4 mr-1" />
                  Ranking
                </Link>
                <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  Blog
                </Link>
                <button 
                  onClick={openGame}
                  className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium flex items-center group"
                >
                  <BookOpen className="h-4 w-4 mr-1 group-hover:animate-pulse" />
                  <span>TOEFL Game</span>
                  <motion.span 
                    className="ml-1 inline-block text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full px-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    New!
                  </motion.span>
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium flex items-center">
                      <HelpCircle className="h-4 w-4 mr-1" />
                      Help Center
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
                    <DropdownMenuItem className="focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md">
                      <Link to="/help-center?tab=faqs" className="flex items-center w-full px-2 py-1.5">
                        FAQs
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md">
                      <Link to="/help-center?tab=video-tutorials" className="flex items-center w-full px-2 py-1.5">
                        Video Tutorials
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md">
                      <Link to="/help-center?tab=support-ticket" className="flex items-center w-full px-2 py-1.5">
                        Support Ticket
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Theme toggle switch */}
              <div className="flex items-center space-x-2">
                <Sun className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Moon className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-gray-400'}`} />
              </div>
            
              <Link to="/pro">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Pro
                </Button>
              </Link>
              <Link to="/profile">
                <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white border-none">
                  Profile
                </Button>
              </Link>
              <Link to="/auth?mode=login">
                <Button variant="outline" className="border-purple-400 dark:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/50">
                  Login
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-none">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content - Hero section */}
      <section className="flex-grow flex items-center bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-900">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Hero3 isDarkMode={isDarkMode} />
        </div>
      </section>
      
      {/* Roadmap Section */}
      <RoadmapSection />

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-purple-100 dark:border-purple-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>&copy; 2023 QuestApply. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* TOEFL Game Dialog */}
      <WordQuestGame open={isGameOpen} onOpenChange={setIsGameOpen} />
    </div>
  );
};

export default Index;
