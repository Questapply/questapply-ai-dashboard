
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { RotateCw, Info, FileText, MenuSquare, Sparkles, MessageSquare, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StrengthsHighlighter from "./create-lor/StrengthsHighlighter";

const CreateLOR = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    universityName: "",
    programName: "",
    relationship: "",
    studentSkills: "",
    letterBody: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("guidance");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: "LOR Preview Generated",
      description: "Your Letter of Recommendation preview has been generated successfully.",
      variant: "default",
    });
  };

  return (
    <motion.div
      className="min-h-screen animate-fade-in"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1
        className="text-3xl font-bold text-teal-500 dark:text-teal-400 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Letter of Recommendation
      </motion.h1>

      <Tabs 
        defaultValue="guidance" 
        value={activeTab}
        onValueChange={setActiveTab}
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
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">How to Write an Effective LOR</h2>
            <ul className="space-y-3 list-disc pl-5">
              <li>Start with your relationship to the student and how long you've known them</li>
              <li>Highlight specific accomplishments rather than general statements</li>
              <li>Include concrete examples that demonstrate the student's skills</li>
              <li>Discuss how the student stands out compared to peers</li>
              <li>Connect the student's qualities to their future goals and chosen program</li>
              <li>Keep the letter between 1-2 pages (400-800 words)</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="studentName">Student's Name</Label>
                <Input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Enter student's full name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="universityName">University Name</Label>
                <Input
                  type="text"
                  id="universityName"
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleChange}
                  placeholder="Enter the university name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="programName">Program Name</Label>
                <Input
                  type="text"
                  id="programName"
                  name="programName"
                  value={formData.programName}
                  onChange={handleChange}
                  placeholder="Enter the program name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="relationship">Your Relationship to Student</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("relationship", value)}
                  value={formData.relationship}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professor">Professor</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="advisor">Advisor</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="studentSkills">Student's Key Skills</Label>
              <Input
                type="text"
                id="studentSkills"
                name="studentSkills"
                value={formData.studentSkills}
                onChange={handleChange}
                placeholder="Enter key skills separated by commas"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="letterBody">Letter Body</Label>
              <Textarea
                id="letterBody"
                name="letterBody"
                value={formData.letterBody}
                onChange={handleChange}
                placeholder="Enter the body of the letter"
                rows={8}
                required
                className="mt-1"
              />
            </div>

            <Button 
              disabled={isLoading}
              className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
            >
              {isLoading && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
              Generate LOR Preview
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="samples" className="pt-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">LOR Samples</h2>
            <p className="mb-6">View professionally written LOR examples to guide your own writing:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="flex justify-between items-center w-full p-4">
                <span>STEM Field LOR Template</span>
                <FileText className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" className="flex justify-between items-center w-full p-4">
                <span>Business School LOR Example</span>
                <FileText className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" className="flex justify-between items-center w-full p-4">
                <span>Academic Research LOR</span>
                <FileText className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" className="flex justify-between items-center w-full p-4">
                <span>Character Reference Example</span>
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="mylors" className="pt-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">My Saved LORs</h2>
            <p className="mb-6">Access and manage your previously created letters:</p>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">MIT Computer Science LOR</h3>
                    <p className="text-sm text-gray-500">Last edited: May 12, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 cursor-pointer transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Stanford MBA Program LOR</h3>
                    <p className="text-sm text-gray-500">Last edited: May 10, 2025</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="outline">Download</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="improvement" className="pt-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">AI Improvement</h2>
            <p className="mb-6">Upload your draft LOR to receive AI-powered suggestions for improvement:</p>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <FileText className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium">Drag and drop your LOR document here</p>
                <p className="text-sm text-gray-500 mt-2 mb-4">or</p>
                <Button>Browse Files</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="strengths" className="pt-4">
          <StrengthsHighlighter />
        </TabsContent>
        
        <TabsContent value="tone" className="pt-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Professional Tone Checker</h2>
            <p className="mb-6">Ensure your LOR maintains a professional and effective tone:</p>
            
            <Textarea
              placeholder="Paste your LOR text here to analyze its tone and receive professional language suggestions..."
              rows={8}
              className="mb-4"
            />
            
            <Button 
              className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white mb-4"
            >
              Analyze Tone
            </Button>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Tone Analysis Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Upload or paste your LOR to see professional tone analysis results here.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="humanizer" className="pt-4">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">AI Humanizer</h2>
            <p className="mb-6">Make AI-generated content sound more authentic and human:</p>
            
            <Textarea
              placeholder="Paste your AI-generated LOR here to make it sound more authentic and human-written..."
              rows={8}
              className="mb-4"
            />
            
            <Button 
              className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white mb-4"
            >
              Humanize Text
            </Button>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Humanized Content</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Your humanized text will appear here after processing.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CreateLOR;
