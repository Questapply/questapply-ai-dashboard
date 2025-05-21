import React, { useState } from "react";
import { motion } from "framer-motion";
import { Info, FileText, MenuSquare, Sparkles, MessageSquare, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LORSamplesSection from "./LORSamplesSection";
import { ListOrdered, Shield, HelpCircle, Sun, Moon, BookOpen, Layers, GraduationCap, Landmark, University } from "lucide-react";

const RoadmapSection = () => {
  const [activeLORTab, setActiveLORTab] = useState("samples");

  return (
    <section className="bg-white dark:bg-gray-900 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Application Roadmap
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Follow these steps to complete your graduate school application journey
          </p>
        </motion.div>

        {/* Roadmap steps before Create LOR */}
        {/* Step 1: Explore Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-teal-500 dark:text-teal-400 mb-4">
                Explore Programs
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Start by exploring different graduate programs and universities that align with your academic and career goals.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-300">
                <li>Research universities and programs</li>
                <li>Attend virtual info sessions</li>
                <li>Connect with current students</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Step 2: Prepare Application Documents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-teal-500 dark:text-teal-400 mb-4">
                Prepare Application Documents
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gather and prepare all necessary application documents, including transcripts, test scores, and letters of recommendation.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-300">
                <li>Request transcripts from previous institutions</li>
                <li>Prepare for and take standardized tests (GRE, GMAT, TOEFL, IELTS)</li>
                <li>Draft a compelling statement of purpose</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Step 3: Craft Statement of Purpose */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-teal-500 dark:text-teal-400 mb-4">
                Craft Statement of Purpose
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Write a clear and concise statement of purpose that highlights your academic and research experiences, as well as your goals for graduate study.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-300">
                <li>Outline your academic and research experiences</li>
                <li>Clearly state your goals for graduate study</li>
                <li>Proofread and edit for clarity and grammar</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Create Letter of Recommendation Step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-teal-500 dark:text-teal-400 mb-4">
                Letter of Recommendation
              </h3>

              <Tabs 
                defaultValue="samples" 
                value={activeLORTab}
                onValueChange={setActiveLORTab}
                className="w-full"
              >
                <TabsList className="w-full flex mb-6 overflow-x-auto space-x-1 border-b-0">
                  <TabsTrigger 
                    value="guidance" 
                    className="flex items-center gap-1.5 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-b-teal-500 data-[state=active]:text-teal-500 rounded-none border-b-2 border-transparent transition-all"
                  >
                    <Info className="w-4 h-4" />
                    <span>Guidance</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="samples" 
                    className="flex items-center gap-1.5 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-b-teal-500 data-[state=active]:text-teal-500 rounded-none border-b-2 border-transparent transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>LOR Samples</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mylors" 
                    className="flex items-center gap-1.5 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-b-teal-500 data-[state=active]:text-teal-500 rounded-none border-b-2 border-transparent transition-all"
                  >
                    <MenuSquare className="w-4 h-4" />
                    <span>My LORs</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="improvement" 
                    className="flex items-center gap-1.5 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-b-teal-500 data-[state=active]:text-teal-500 rounded-none border-b-2 border-transparent transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>AI Improvement</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="strengths" 
                    className="flex items-center gap-1.5 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-b-teal-500 data-[state=active]:text-teal-500 rounded-none border-b-2 border-transparent transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Highlight Strengths</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tone" 
                    className="flex items-center gap-1.5 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-b-teal-500 data-[state=active]:text-teal-500 rounded-none border-b-2 border-transparent transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Professional Tone</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="humanizer" 
                    className="flex items-center gap-1.5 flex-1 data-[state=active]:border-b-2 data-[state=active]:border-b-teal-500 data-[state=active]:text-teal-500 rounded-none border-b-2 border-transparent transition-all"
                  >
                    <User className="w-4 h-4" />
                    <span>AI Humanizer</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="guidance" className="pt-4">
                  <div className="text-center p-8">
                    <p className="text-gray-600 dark:text-gray-300">Guidance content will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="samples" className="pt-4">
                  <LORSamplesSection />
                </TabsContent>
                
                <TabsContent value="mylors" className="pt-4">
                  <div className="text-center p-8">
                    <p className="text-gray-600 dark:text-gray-300">Your saved LORs will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="improvement" className="pt-4">
                  <div className="text-center p-8">
                    <p className="text-gray-600 dark:text-gray-300">AI improvement tools will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="strengths" className="pt-4">
                  <div className="text-center p-8">
                    <p className="text-gray-600 dark:text-gray-300">Strengths highlighter will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="tone" className="pt-4">
                  <div className="text-center p-8">
                    <p className="text-gray-600 dark:text-gray-300">Professional tone adjustments will appear here</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="humanizer" className="pt-4">
                  <div className="text-center p-8">
                    <p className="text-gray-600 dark:text-gray-300">AI humanizer tools will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>

        {/* Step 5: Submit Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-teal-500 dark:text-teal-400 mb-4">
                Submit Applications
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Carefully review and submit your applications before the deadlines.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-300">
                <li>Double-check all application requirements</li>
                <li>Submit applications before the deadlines</li>
                <li>Pay application fees</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Step 6: Prepare for Interviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-teal-500 dark:text-teal-400 mb-4">
                Prepare for Interviews
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                If selected, prepare for interviews by practicing common questions and researching the faculty and program.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-300">
                <li>Research faculty and program</li>
                <li>Practice common interview questions</li>
                <li>Prepare questions to ask the interviewer</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Step 7: Await Decisions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-teal-500 dark:text-teal-400 mb-4">
                Await Decisions
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                After submitting your applications, await decisions from the universities.
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 dark:text-gray-300">
                <li>Check your email regularly for updates</li>
                <li>Prepare for potential interview requests</li>
                <li>Consider your options once decisions are received</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapSection;
