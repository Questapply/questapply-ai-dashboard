import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ListOrdered, Shield, HelpCircle, Sun, Moon, FileText, BookOpen, Sparkles, MessageSquare, Layers } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import QuestApplyLogo from "@/components/common/QuestApplyLogo";
import WordQuestGame from "@/components/game/WordQuestGame";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [searchParams, useSetSearchParams] = useSearchParams();
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

  // Check URL param for hero selection
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
              description: "Hero 2 is our recommended design! It presents the AI chat interface prominently while maintaining clean aesthetics.",
            });
          }, 1000);
        }
      }
    }
  }, [searchParams]);

  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Initialize chat messages
  useEffect(() => {
    if (activeHero === "hero2" || activeHero === "hero3" || activeHero === "hero4") {
      setChatMessages([
        { role: "assistant", content: "Hello! I'm QuestApply AI. How can I help with your study abroad journey?" }
      ]);
    }
  }, [activeHero]);

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
      } else {
        response = "I'm here to help with your study abroad journey. I can assist with finding schools, preparing application documents, or understanding the admission process. What specific help do you need?";
      }
      
      setChatMessages(prev => [...prev, { role: "assistant", content: response }]);
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
                {/* Hero Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium flex items-center">
                      <Layers className="h-4 w-4 mr-1" />
                      Hero
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
                    <DropdownMenuItem 
                      className={`focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md ${activeHero === "hero1" ? "bg-purple-100 dark:bg-purple-900/30" : ""}`}
                      onClick={() => setActiveHero("hero1")}
                    >
                      <div className="flex items-center w-full px-2 py-1.5">
                        HERO 1 (Classic)
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md ${activeHero === "hero2" ? "bg-purple-100 dark:bg-purple-900/30" : ""}`}
                      onClick={() => setActiveHero("hero2")}
                    >
                      <div className="flex items-center w-full px-2 py-1.5">
                        HERO 2 (Dashboard Style)
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md ${activeHero === "hero3" ? "bg-purple-100 dark:bg-purple-900/30" : ""}`}
                      onClick={() => setActiveHero("hero3")}
                    >
                      <div className="flex items-center w-full px-2 py-1.5">
                        HERO 3 (Fullscreen)
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md ${activeHero === "hero4" ? "bg-purple-100 dark:bg-purple-900/30" : ""}`}
                      onClick={() => setActiveHero("hero4")}
                    >
                      <div className="flex items-center w-full px-2 py-1.5">
                        HERO 4 (Lovable Style)
                      </div>
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

      {/* Hero Section */}
      {activeHero === "hero1" && (
        <section className="flex-grow flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Your Ultimate <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Study Abroad</span> Assistant
              </motion.h1>
              <motion.p 
                className="mt-6 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                QuestApply streamlines your graduate school application process with <span className="font-semibold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">AI-powered</span> tools to find, apply, and get accepted to top universities worldwide.
              </motion.p>
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link to="/ranking">
                  <Button size="lg" variant="outline" className="border-purple-400 dark:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto flex items-center">
                    <ListOrdered className="h-5 w-5 mr-2" />
                    Explore Rankings
                  </Button>
                </Link>
              </motion.div>
              
              {/* TOEFL Game Call to Action */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Button 
                  onClick={openGame}
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Try Our TOEFL Vocabulary Game
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {activeHero === "hero2" && (
        <section className="flex-grow flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-2 flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">QuestApply</span>
                  </h2>
                  <p className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                    Your study abroad journey, <span className="relative">
                      powered by AI
                      <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></span>
                    </span>
                  </p>
                  <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
                    From finding schools to perfecting applications, our AI assistant streamlines every step of your graduate education journey.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button 
                      className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white border-none shadow-md hover:shadow-lg"
                    >
                      Start Your Journey
                    </Button>
                    <Button variant="outline" className="border-purple-400 dark:border-purple-500">
                      Watch Demo
                    </Button>
                  </div>
                </motion.div>
              </div>
              <div className="md:col-span-3">
                <motion.div 
                  className="bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-xl p-5 border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">QuestApply AI</span>
                  </div>
                  
                  <div className="space-y-4 max-h-64 overflow-y-auto mb-4 scrollbar-thin">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`${
                        message.role === 'user' 
                          ? "bg-gray-100 dark:bg-gray-900/70 p-4 rounded-lg max-w-[80%]" 
                          : "bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg ml-auto max-w-[80%]"
                      }`}>
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                              AI
                            </div>
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">QuestApply Assistant</span>
                          </div>
                        )}
                        <p className={`${message.role === 'user' ? "text-gray-700 dark:text-gray-300" : "text-gray-800 dark:text-gray-200"}`}>
                          {message.content}
                        </p>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg ml-auto max-w-[80%]">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                            AI
                          </div>
                          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">QuestApply Assistant</span>
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce"></div>
                          <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                  
                  <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
                    {quickPrompts.map((prompt, index) => (
                      <Button 
                        key={index}
                        variant="outline" 
                        size="sm" 
                        className="whitespace-nowrap border-purple-200 dark:border-purple-800"
                        onClick={() => handleSendMessage(null, prompt)}
                      >
                        {index === 0 && <Sparkles className="w-3 h-3 mr-1" />}
                        {index === 1 && <MessageSquare className="w-3 h-3 mr-1" />}
                        {prompt}
                      </Button>
                    ))}
                  </div>
                  
                  <form onSubmit={handleSendMessage} className="relative mt-4">
                    <input 
                      type="text" 
                      placeholder="Ask anything..." 
                      className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button 
                      type="submit"
                      className="absolute right-1 top-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                    >
                      Send
                    </Button>
                  </form>
                </motion.div>
                
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <motion.div 
                    className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">98%</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm text-center">Acceptance Rate</p>
                  </motion.div>
                  <motion.div 
                    className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">5K+</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm text-center">Universities</p>
                  </motion.div>
                  <motion.div 
                    className="bg-white/80 dark:bg-gray-800/80 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <p className="text-4xl font-bold text-teal-600 dark:text-teal-400">24/7</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm text-center">AI Support</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeHero === "hero3" && (
        <section className="flex-grow flex flex-col">
          <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-20 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-800 text-white overflow-hidden">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-center max-w-5xl mx-auto leading-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <span className="relative inline-block">
                Reimagining
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                ></motion.span>
              </span>{" "}
              Education with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400 font-extrabold">
                AI-Enhanced
              </span>{" "}
              Tools
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              QuestApply harnesses cutting-edge artificial intelligence to transform how students discover and apply to their ideal graduate programs worldwide.
            </motion.p>
            
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-none shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-900/50 transition-all duration-300 transform hover:-translate-y-0.5 px-8 py-6 text-lg">
                Begin Your Journey
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-24 w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="relative">
                <div className="aspect-[16/9] bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 backdrop-blur rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-2xl p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-red-400"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                          <div className="h-3 w-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="text-xs text-gray-400 ml-2">QuestApply AI - Assistant</div>
                      </div>
                      
                      <div className="space-y-4 max-h-[40vh] overflow-y-auto">
                        {chatMessages.map((message, index) => (
                          <motion.div 
                            key={index}
                            className="flex items-start gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 * index, duration: 0.5 }}
                          >
                            <div className={`h-8 w-8 rounded-full ${message.role === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-purple-600 to-blue-600'} flex items-center justify-center text-white text-sm font-bold`}>
                              {message.role === 'user' ? 'U' : 'AI'}
                            </div>
                            <div className={`${
                              message.role === 'user' 
                                ? 'bg-blue-800/50 backdrop-blur' 
                                : 'bg-gray-900/70 backdrop-blur'
                              } px-4 py-3 rounded-xl max-w-[80%]`}>
                              <p className={`${message.role === 'user' ? 'text-blue-100' : 'text-gray-100'}`}>
                                {message.content}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                        {isTyping && (
                          <motion.div 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                              AI
                            </div>
                            <div className="bg-gray-900/70 backdrop-blur px-4 py-3 rounded-xl max-w-[80%]">
                              <div className="flex space-x-2">
                                <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce"></div>
                                <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="h-2 w-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        <div ref={chatEndRef} />
                      </div>
                      
                      <form onSubmit={handleSendMessage} className="mt-4 bg-gray-900/50 backdrop-blur rounded-xl border border-gray-700 p-2">
                        <div className="flex items-center">
                          <input 
                            type="text" 
                            className="bg-transparent flex-1 px-3 py-2 text-white focus:outline-none" 
                            placeholder="Ask me anything..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                          />
                          <Button 
                            type="submit"
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Send
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4">
                    <div className="flex gap-2">
                      <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs text-white">
                        AI-powered advisor
                      </div>
                      <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs text-white">
                        5,000+ universities
                      </div>
                      <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded-md text-xs text-white">
                        Live application status
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* New Hero 4 - Lovable Style */}
      {activeHero === "hero4" && (
        <section className="flex-grow flex items-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 overflow-x-hidden">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                Build something QuestApply
              </h1>
              <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">
                Idea to app in seconds, with your personal full stack engineer
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-4xl mx-auto overflow-hidden"
            >
              <div className="p-6">
                <form onSubmit={handleSendMessage}>
                  <div className="relative">
                    <textarea
                      className="w-full p-4 pr-20 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none min-h-[120px] placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Ask QuestApply to help with your study abroad journey..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    ></textarea>
                    <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                      <button type="button" className="text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="14" height="14" x="5" y="5" rx="2" />
                          <path d="M15 2v4" />
                          <path d="M8 2v4" />
                          <path d="M2 10h20" />
                        </svg>
                      </button>
                      <button 
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 2-7 20-4-9-9-4Z" />
                          <path d="M22 2 11 13" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>

                <div className="flex flex-wrap gap-3 mt-5 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSendMessage(null, "Find top 5 schools for Computer Science")}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10H3" />
                      <path d="M21 6H3" />
                      <path d="M21 14H3" />
                      <path d="M21 18H3" />
                    </svg>
                    Find top schools
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSendMessage(null, "Create a CV for grad school")}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                    </svg>
                    Create CV
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSendMessage(null, "Analyze my chances for MIT")}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4" />
                    </svg>
                    Analyze chances
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSendMessage(null, "Write a statement of purpose")}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                      <path d="M9 9h1" />
                      <path d="M9 13h6" />
                      <path d="M9 17h6" />
                    </svg>
                    Write SOP
                  </motion.button>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex flex-wrap justify-center gap-6 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">10,000+ Programs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Admissions Success</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">24/7 AI Support</span>
                </div>
              </div>
            </motion.div>

            {/* Stats and Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-4xl mx-auto">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 text-center border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">5,000+</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Universities Covered</p>
              </motion.div>
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 text-center border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">98%</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Acceptance Rate</p>
              </motion.div>
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 text-center border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">24/7</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">AI Assistance</p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

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
