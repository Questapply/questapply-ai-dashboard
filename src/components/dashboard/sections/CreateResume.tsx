
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { BookOpen, FileText, Image, Wand, University, Trophy, FileSearch } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import ResumeGuidance from "@/components/dashboard/sections/resume/ResumeGuidance";
import ResumeTemplates from "@/components/dashboard/sections/resume/ResumeTemplates";
import MyResumes from "@/components/dashboard/sections/resume/MyResumes";
import AiImprovement from "@/components/dashboard/sections/resume/AiImprovement";
import UniversityMatch from "@/components/dashboard/sections/resume/UniversityMatch";
import SuccessStories from "@/components/dashboard/sections/resume/SuccessStories";
import AtsAnalysis from "@/components/dashboard/sections/resume/AtsAnalysis";

const resumeTabs = [
  { id: "guidance", name: "Guidance", icon: <BookOpen className="w-4 h-4" /> },
  { id: "template", name: "Choose Template", icon: <Image className="w-4 h-4" /> },
  { id: "myResumes", name: "My Resumes", icon: <FileText className="w-4 h-4" /> },
  { id: "aiImprovement", name: "AI Improvement", icon: <Wand className="w-4 h-4" /> },
  { id: "universityMatch", name: "Match with University", icon: <University className="w-4 h-4" /> },
  { id: "successStories", name: "Success Stories", icon: <Trophy className="w-4 h-4" /> },
  { id: "atsAnalysis", name: "ATS Analysis", icon: <FileSearch className="w-4 h-4" /> }
];

const CreateResume = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "guidance";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Update active tab based on URL params
  useEffect(() => {
    const tabFromParams = searchParams.get("tab");
    if (tabFromParams && resumeTabs.some(tab => tab.id === tabFromParams)) {
      setActiveTab(tabFromParams);
    }
  }, [searchParams]);

  return (
    <div className="animate-fade-in">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="relative border-b border-gray-200 dark:border-gray-700">
          <TabsList className="w-full h-auto px-2 py-1 bg-transparent overflow-x-auto flex justify-start">
            {resumeTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`
                  px-4 py-3 flex items-center gap-2 whitespace-nowrap relative font-medium transition-all duration-300
                  ${activeTab === tab.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
                `}
              >
                {tab.icon}
                {tab.name}
                {activeTab === tab.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400" 
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Content */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <TabsContent value="guidance" className="m-0">
            <ResumeGuidance />
          </TabsContent>
          
          <TabsContent value="template" className="m-0">
            <ResumeTemplates />
          </TabsContent>
          
          <TabsContent value="myResumes" className="m-0">
            <MyResumes />
          </TabsContent>
          
          <TabsContent value="aiImprovement" className="m-0">
            <AiImprovement />
          </TabsContent>
          
          <TabsContent value="universityMatch" className="m-0">
            <UniversityMatch />
          </TabsContent>
          
          <TabsContent value="successStories" className="m-0">
            <SuccessStories />
          </TabsContent>
          
          <TabsContent value="atsAnalysis" className="m-0">
            <AtsAnalysis />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
};

export default CreateResume;
