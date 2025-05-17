
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HelpCircle, Video, MessageSquare, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState("faqs");

  // Categories for FAQs
  const faqCategories = [
    { id: "profile", name: "Profile Setup and Management", icon: "👤" },
    { id: "dashboard", name: "Dashboard", icon: "📊" },
    { id: "schools", name: "Finding Schools", icon: "🏫" },
    { id: "programs", name: "Finding Programs", icon: "📚" },
    { id: "professors", name: "Finding Professors", icon: "👨‍🏫" },
    { id: "plans", name: "Plans", icon: "💎" },
    { id: "payments", name: "Payments", icon: "💳" },
    { id: "referral", name: "Referral Codes", icon: "🔗" },
    { id: "technical", name: "Technical Issues", icon: "💻" },
    { id: "resume", name: "Resume", icon: "📄" },
    { id: "sop", name: "Statement of Purpose", icon: "🎯" },
    { id: "recommendation", name: "Recommendation Letter", icon: "✉️" },
    { id: "apply", name: "Apply Now", icon: "📝" },
    { id: "cover", name: "Cover Letter", icon: "📋" },
    { id: "personal", name: "Personal Statement", icon: "💼" },
  ];

  // Sample FAQ questions for each category
  const faqQuestions = {
    profile: [
      {
        question: "How do I create a new profile?",
        answer: "To create a new profile, click on the 'Sign Up' button on the homepage, fill in your details, and follow the guided setup process."
      },
      {
        question: "Can I update my personal information after signing up?",
        answer: "Yes, you can update your personal information anytime by going to your Profile page and clicking on 'Edit Profile'."
      },
      {
        question: "What should I do if I forget my password?",
        answer: "Click on 'Forgot Password' on the login page, enter your email address, and follow the instructions sent to your email to reset your password."
      }
    ],
    dashboard: [
      {
        question: "What information can I find on my dashboard?",
        answer: "Your dashboard provides an overview of your application progress, saved universities, upcoming deadlines, and personalized recommendations."
      }
    ],
    // More FAQ questions for other categories would be added here
  };

  // Sample video tutorials
  const videoTutorials = [
    { id: 1, title: "Profile Setup", duration: "06:27", thumbnail: "/placeholder.svg" },
    { id: 2, title: "Find Schools", duration: "03:36", thumbnail: "/placeholder.svg" },
    { id: 3, title: "Find Programs", duration: "03:51", thumbnail: "/placeholder.svg" },
    { id: 4, title: "Find Professors", duration: "03:31", thumbnail: "/placeholder.svg" },
    { id: 5, title: "Create Resume", duration: "03:19", thumbnail: "/placeholder.svg" },
    { id: 6, title: "Create SOP", duration: "06:23", thumbnail: "/placeholder.svg" },
    { id: 7, title: "Create LOR", duration: "05:07", thumbnail: "/placeholder.svg" },
    { id: 8, title: "Apply Now", duration: "02:58", thumbnail: "/placeholder.svg" },
  ];

  // State to track selected FAQ category
  const [selectedCategory, setSelectedCategory] = useState("profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/40 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                QuestApply
              </Link>
              <div className="hidden md:flex ml-10 space-x-4">
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/ranking" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium">
                  Ranking
                </Link>
                <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 text-sm font-medium">
                  Blog
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-purple-600 dark:text-purple-400 px-3 py-2 text-sm font-medium border-b-2 border-purple-600 dark:border-purple-400 flex items-center">
                      Help Center
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
                    <DropdownMenuItem className="focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md">
                      <Link to="/help-center?tab=faqs" className="flex items-center w-full px-2 py-1.5">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>FAQs</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md">
                      <Link to="/help-center?tab=video-tutorials" className="flex items-center w-full px-2 py-1.5">
                        <Video className="mr-2 h-4 w-4" />
                        <span>Video Tutorials</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-purple-100 dark:focus:bg-purple-900/30 rounded-md">
                      <Link to="/help-center?tab=support-ticket" className="flex items-center w-full px-2 py-1.5">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Support Ticket</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/pro">
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                  Pro
                </Button>
              </Link>
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center text-white">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions, watch tutorial videos, or get in touch with our support team.
          </p>
        </motion.div>

        <Tabs defaultValue="faqs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faqs" className="flex items-center justify-center gap-2">
              <HelpCircle className="h-5 w-5" />
              <span>FAQs</span>
            </TabsTrigger>
            <TabsTrigger value="video-tutorials" className="flex items-center justify-center gap-2">
              <Video className="h-5 w-5" />
              <span>Video Tutorials</span>
            </TabsTrigger>
            <TabsTrigger value="support-ticket" className="flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Support Ticket</span>
            </TabsTrigger>
          </TabsList>

          {/* FAQs Tab */}
          <TabsContent value="faqs">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Explore FAQs by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`bg-white dark:bg-gray-800 border ${
                      selectedCategory === category.id 
                        ? 'border-purple-500 dark:border-purple-400' 
                        : 'border-gray-200 dark:border-gray-700'
                    } rounded-lg p-4 text-center hover:shadow-md transition-all duration-300 flex flex-col items-center`}
                  >
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 text-center">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Questions for selected category */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {faqCategories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <Link to="/help-center" className="text-purple-600 dark:text-purple-400 text-sm hover:underline">
                  Back to FAQs
                </Link>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {faqQuestions[selectedCategory as keyof typeof faqQuestions]?.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-gray-800 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* Video Tutorials Tab */}
          <TabsContent value="video-tutorials">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Video Tutorials</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Featured Video */}
                <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center ml-1">
                          <svg 
                            viewBox="0 0 24 24" 
                            className="w-6 h-6 text-purple-600" 
                            fill="currentColor"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">Profile Setup</h3>
                      <div className="flex items-center text-white/80 text-sm">
                        <span>06:27</span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-0 right-0 px-4">
                      <div className="bg-white/30 h-1 rounded-full w-full overflow-hidden">
                        <div className="bg-white h-full rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video List */}
                {videoTutorials.map((video) => (
                  <div key={video.id} className="flex gap-4 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg hover:shadow-md transition-all">
                    <div className="flex-shrink-0 w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                      <svg 
                        viewBox="0 0 24 24" 
                        className="w-8 h-8 text-purple-600 dark:text-purple-400" 
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-800 dark:text-gray-100">{video.title}</h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        <span>{video.duration}</span>
                      </div>
                      <Button variant="link" className="text-purple-600 dark:text-purple-400 p-0 h-auto mt-1">
                        Watch Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Support Ticket Tab */}
          <TabsContent value="support-ticket">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Create Support Ticket</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ticket subject"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  >
                    <option value="">Select category</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="account">Account Management</option>
                    <option value="application">Application Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    placeholder="Please describe your issue in detail"
                    rows={5}
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attachments (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Drag & drop files here or 
                      <span className="text-purple-600 dark:text-purple-400 ml-1 cursor-pointer">browse</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      (Max size: 10MB, Allowed formats: .jpg, .png, .pdf)
                    </p>
                  </div>
                </div>

                <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white">
                  Submit Ticket
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
            Still searching for something?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link to="/help-center?tab=faqs">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-gray-100">Help Center</h3>
              </div>
            </Link>
            <Link to="/help-center?tab=video-tutorials">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-gray-100">Video Tutorials</h3>
              </div>
            </Link>
            <Link to="/help-center?tab=support-ticket">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-all">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-medium text-gray-800 dark:text-gray-100">Support Ticket</h3>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-purple-100 dark:border-purple-900/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-4">
                QuestApply
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your ultimate study abroad assistant, helping you find and apply to top universities worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Dashboard</Link></li>
                <li><Link to="/ranking" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">University Rankings</Link></li>
                <li><Link to="/blog" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Contact</Link></li>
                <li><Link to="/careers" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} QuestApply. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;
