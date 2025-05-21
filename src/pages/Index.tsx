
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
import { SuccessStories } from "@/components/dashboard/sections";
import CallToAction from "@/components/common/CallToAction";

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
        {/* Header content */}
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

      {/* Main content - Hero section with Background matching */}
      <section className="flex-grow flex items-center bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-900">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Hero3 isDarkMode={isDarkMode} />
        </div>
      </section>
      
      {/* Roadmap Section - Background already matched in the component */}
      <RoadmapSection />
      
      {/* Success Stories Section */}
      <section className="bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-purple-200 mb-8">
            Don't just take our word for it. Hear from students who transformed their university
            application journey with QuestApply.
          </p>
          
          <div className="mt-12">
            <SuccessStories />
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <CallToAction isDarkMode={isDarkMode} />

      {/* Footer Section */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and About section */}
            <div className="col-span-1 md:col-span-1">
              <QuestApplyLogo variant="full" size="md" />
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                QuestApply helps students navigate the complex process of applying to universities abroad with AI-powered tools.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/ranking" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                    University Rankings
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/help-center" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/documents" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                    Documents
                  </Link>
                </li>
                <li>
                  <Link to="/applications" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                    Applications
                  </Link>
                </li>
                <li>
                  <Link to="/professors" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                    Find Professors
                  </Link>
                </li>
                <li>
                  <Link to="/feedback" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                    Feedback
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-600 dark:text-gray-400 text-sm">
                  support@questapply.com
                </li>
                <li className="text-gray-600 dark:text-gray-400 text-sm">
                  1-800-QUEST-APPLY
                </li>
                <li className="mt-4">
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; 2023 QuestApply. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
      {/* TOEFL Game Dialog */}
      <WordQuestGame open={isGameOpen} onOpenChange={setIsGameOpen} />
    </div>
  );
};

export default Index;
