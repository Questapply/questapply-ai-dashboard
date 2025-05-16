
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Edit, Download, Share, Eye, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const resumeSections = [
  { id: "personal", title: "Personal Information", complete: true },
  { id: "summary", title: "Summary", complete: true },
  { id: "research", title: "Research Interests", complete: true },
  { id: "education", title: "Education", complete: true },
  { id: "experience", title: "Professional History", complete: true },
  { id: "publications", title: "Publications", complete: false },
  { id: "skills", title: "Certifications and Skills", complete: true },
  { id: "awards", title: "Honors and Awards", complete: false },
  { id: "memberships", title: "Memberships", complete: false },
  { id: "interests", title: "Interests and Hobbies", complete: true },
  { id: "references", title: "References", complete: false }
];

const MyResumes = () => {
  const [selectedResume, setSelectedResume] = useState("academic");
  const [viewingSection, setViewingSection] = useState("");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6">
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Resumes</h2>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Resume
        </Button>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">My Documents</h3>
            </div>
            <div className="p-0">
              <Tabs defaultValue="academic" orientation="vertical" className="w-full">
                <TabsList className="flex flex-col w-full rounded-none border-none bg-transparent h-auto">
                  <TabsTrigger 
                    value="academic" 
                    className="justify-start py-3 px-5 text-left border-l-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-purple-50 data-[state=active]:dark:bg-purple-900/20 rounded-none"
                    onClick={() => setSelectedResume("academic")}
                  >
                    Academic CV
                  </TabsTrigger>
                  <TabsTrigger 
                    value="professional" 
                    className="justify-start py-3 px-5 text-left border-l-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-purple-50 data-[state=active]:dark:bg-purple-900/20 rounded-none"
                    onClick={() => setSelectedResume("professional")}
                  >
                    Professional Resume
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </motion.div>
        </div>
        
        <div className="md:col-span-2">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {selectedResume === "academic" ? "Academic CV" : "Professional Resume"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: May 16, 2025</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                {resumeSections.filter(section => section.complete).length}/{resumeSections.length} Complete
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex space-x-4 mb-6">
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">Sections</h4>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {resumeSections.map((section) => (
                  <motion.div 
                    key={section.id}
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card 
                          className="cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-200"
                          onClick={() => setViewingSection(section.id)}
                        >
                          <CardContent className="p-4 flex justify-between items-center">
                            <div>
                              <h5 className="font-medium text-gray-900 dark:text-white">{section.title}</h5>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {section.complete ? "Complete" : "Not complete"}
                              </p>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${section.complete ? "bg-green-500" : "bg-amber-500"}`}></div>
                            <Eye className="h-4 w-4 text-gray-400" />
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{section.title}</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          {section.id === "personal" && (
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                                <p className="text-sm text-gray-500">Neuroscience Researcher</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-500">Email:</p>
                                  <p>sarah.johnson@university.edu</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Phone:</p>
                                  <p>(123) 456-7890</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Address:</p>
                                  <p>123 University Ave, Boston, MA</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">LinkedIn:</p>
                                  <p>linkedin.com/in/sarahjohnson</p>
                                </div>
                              </div>
                            </div>
                          )}
                          {section.id !== "personal" && (
                            <p className="text-gray-500">
                              {section.complete 
                                ? "This section has been completed. Click Edit to modify its contents."
                                : "This section needs to be completed. Click Edit to add content."}
                            </p>
                          )}
                        </div>
                        <div className="flex justify-end">
                          <Button>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Section
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyResumes;
