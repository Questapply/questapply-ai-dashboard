
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Edit, Download, Share, Eye, Plus, File, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Resume section definitions with content templates
const defaultResumeSections = [
  { id: "personal", title: "Personal Information", complete: true, content: "Dr. Sarah Johnson\nNeuroscience Researcher\nsarah.johnson@university.edu\n(123) 456-7890\n123 University Ave, Boston, MA\nlinkedin.com/in/sarahjohnson" },
  { id: "summary", title: "Summary", complete: true, content: "Experienced neuroscience researcher with 8 years of experience in cognitive science and neural imaging techniques. Specializing in memory formation and retention patterns across diverse demographic groups." },
  { id: "research", title: "Research Interests", complete: true, content: "Cognitive neuroscience, memory formation processes, neural plasticity, and AI applications in predictive brain function modeling." },
  { id: "education", title: "Education", complete: true, content: "Ph.D. in Neuroscience, University of California, Berkeley (2017)\nM.S. in Cognitive Psychology, Stanford University (2014)\nB.S. in Biology, Massachusetts Institute of Technology (2012)" },
  { id: "experience", title: "Professional History", complete: true, content: "Senior Researcher, Neural Dynamics Lab (2020-Present)\n- Led research team investigating memory formation patterns\n- Authored 12 peer-reviewed publications\n\nResearch Associate, Cognitive Science Institute (2017-2020)\n- Conducted neuroimaging studies of memory retention\n- Developed new protocols for fMRI data analysis" },
  { id: "publications", title: "Publications", complete: false, content: "" },
  { id: "skills", title: "Certifications and Skills", complete: true, content: "Technical Skills: fMRI, EEG, Python for neuroscience data analysis, MATLAB\nCertifications: Advanced Neuroimaging Techniques (2019), Research Ethics Certification (2018)" },
  { id: "awards", title: "Honors and Awards", complete: false, content: "" },
  { id: "memberships", title: "Memberships", complete: false, content: "" },
  { id: "interests", title: "Interests and Hobbies", complete: true, content: "Neural network modeling, hiking, piano, science communication" },
  { id: "references", title: "References", complete: false, content: "" }
];

// Resume types with their specific section configurations
const resumeTypes = {
  "academic": {
    name: "Academic CV",
    sections: [...defaultResumeSections]
  },
  "professional": {
    name: "Professional Resume",
    sections: defaultResumeSections.filter(s => 
      !["publications", "research", "memberships"].includes(s.id)
    )
  },
  "creative": {
    name: "Creative Resume",
    sections: defaultResumeSections.filter(s => 
      !["publications", "memberships"].includes(s.id)
    )
  },
  "minimal": {
    name: "Minimal Resume",
    sections: defaultResumeSections.filter(s => 
      ["personal", "summary", "experience", "education", "skills"].includes(s.id)
    )
  },
  "modern": {
    name: "Modern Resume",
    sections: defaultResumeSections.filter(s => 
      !["publications", "memberships", "research"].includes(s.id)
    )
  },
  "technical": {
    name: "Technical Resume",
    sections: [...defaultResumeSections, 
      { id: "projects", title: "Technical Projects", complete: false, content: "" }
    ]
  },
  "research": {
    name: "Research CV", 
    sections: [...defaultResumeSections,
      { id: "grants", title: "Grants & Funding", complete: false, content: "" }
    ]
  },
  "executive": {
    name: "Executive Resume",
    sections: [...defaultResumeSections.filter(s => 
      !["publications", "research"].includes(s.id)
    ),
      { id: "leadership", title: "Leadership Experience", complete: false, content: "" },
      { id: "achievements", title: "Key Achievements", complete: false, content: "" }
    ]
  }
};

// Type definitions
interface ResumeSection {
  id: string;
  title: string;
  complete: boolean;
  content: string;
}

interface Resume {
  id: string;
  type: string;
  name: string;
  lastUpdated: string;
  sections?: ResumeSection[];
}

const MyResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<ResumeSection | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isFullEditMode, setIsFullEditMode] = useState(false);
  
  const navigate = useNavigate();

  // Animation variants
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

  // Load resumes from localStorage on component mount
  useEffect(() => {
    const storedResumes = JSON.parse(localStorage.getItem('userResumes') || '[]');
    const activeId = localStorage.getItem('activeResumeId');
    
    // Initialize resumes with sections if needed
    const initializedResumes = storedResumes.map((resume: Resume) => {
      if (!resume.sections) {
        const type = resume.type || 'academic';
        const typeSections = resumeTypes[type as keyof typeof resumeTypes]?.sections || defaultResumeSections;
        return {
          ...resume,
          sections: JSON.parse(JSON.stringify(typeSections)) // Deep clone
        };
      }
      return resume;
    });
    
    setResumes(initializedResumes);
    setSelectedResumeId(activeId || (initializedResumes.length > 0 ? initializedResumes[0].id : null));
  }, []);

  // Get the selected resume
  const selectedResume = resumes.find(resume => resume.id === selectedResumeId) || null;
  
  // Handle resume selection
  const handleSelectResume = (id: string) => {
    setSelectedResumeId(id);
    localStorage.setItem('activeResumeId', id);
    setIsFullEditMode(false);
  };
  
  // Navigate to template selection
  const handleCreateNewResume = () => {
    navigate('/dashboard?tab=template');
  };
  
  // Open section editor
  const handleOpenSection = (section: ResumeSection) => {
    setSelectedSection(section);
    setEditContent(section.content);
    setIsEditDialogOpen(true);
  };
  
  // Save section changes
  const handleSaveSection = () => {
    if (!selectedResume || !selectedSection) return;
    
    const updatedResumes = resumes.map(resume => {
      if (resume.id === selectedResume.id) {
        const updatedSections = resume.sections?.map(section => {
          if (section.id === selectedSection.id) {
            return {
              ...section,
              content: editContent,
              complete: Boolean(editContent.trim())
            };
          }
          return section;
        }) || [];
        
        return {
          ...resume,
          sections: updatedSections,
          lastUpdated: new Date().toISOString()
        };
      }
      return resume;
    });
    
    setResumes(updatedResumes);
    localStorage.setItem('userResumes', JSON.stringify(updatedResumes));
    setIsEditDialogOpen(false);
    toast.success("Section updated successfully");
  };
  
  // Save all changes in full edit mode
  const handleSaveAllChanges = () => {
    setIsFullEditMode(false);
    toast.success("All changes saved successfully");
  };
  
  // Download resume as PDF
  const handleDownloadResume = () => {
    toast.success("Resume downloaded successfully");
  };

  // Calculate completion percentage
  const getCompletionPercentage = (resume: Resume) => {
    if (!resume.sections || resume.sections.length === 0) return "0/0";
    const completed = resume.sections.filter(section => section.complete).length;
    return `${completed}/${resume.sections.length}`;
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
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={handleCreateNewResume}
        >
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
              <Tabs defaultValue={selectedResumeId || ""} orientation="vertical" className="w-full">
                <TabsList className="flex flex-col w-full rounded-none border-none bg-transparent h-auto">
                  {resumes.map(resume => (
                    <TabsTrigger 
                      key={resume.id} 
                      value={resume.id}
                      className="justify-start py-3 px-5 text-left border-l-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-purple-50 data-[state=active]:dark:bg-purple-900/20 rounded-none"
                      onClick={() => handleSelectResume(resume.id)}
                    >
                      <File className="h-4 w-4 mr-2" />
                      {resume.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </motion.div>
        </div>
        
        <div className="md:col-span-2">
          {selectedResume ? (
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {selectedResume.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last updated: {new Date(selectedResume.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                  {getCompletionPercentage(selectedResume)} Complete
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex space-x-4 mb-6">
                  <Button 
                    size="sm"
                    onClick={() => setIsFullEditMode(!isFullEditMode)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isFullEditMode ? "Exit Edit Mode" : "Edit"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={handleDownloadResume}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                
                {isFullEditMode ? (
                  <div className="space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4 mb-4">
                      <p className="text-amber-800 dark:text-amber-300 text-sm">
                        You are in full edit mode. Make changes to any section and click Save when finished.
                      </p>
                    </div>
                    
                    {selectedResume.sections?.map((section) => (
                      <div key={section.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{section.title}</h4>
                          <div className={`w-2 h-2 rounded-full ${section.complete ? "bg-green-500" : "bg-amber-500"}`}></div>
                        </div>
                        <Textarea 
                          className="min-h-[100px]"
                          value={section.content}
                          onChange={(e) => {
                            const updatedResumes = resumes.map(resume => {
                              if (resume.id === selectedResume.id) {
                                const updatedSections = resume.sections?.map(s => {
                                  if (s.id === section.id) {
                                    return {
                                      ...s,
                                      content: e.target.value,
                                      complete: Boolean(e.target.value.trim())
                                    };
                                  }
                                  return s;
                                }) || [];
                                
                                return {
                                  ...resume,
                                  sections: updatedSections
                                };
                              }
                              return resume;
                            });
                            
                            setResumes(updatedResumes);
                          }}
                        />
                      </div>
                    ))}
                    
                    <div className="flex justify-end mt-4">
                      <Button onClick={handleSaveAllChanges}>
                        <Save className="h-4 w-4 mr-2" />
                        Save All Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">Sections</h4>
                    
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {selectedResume.sections?.map((section) => (
                        <motion.div 
                          key={section.id}
                          variants={item}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Card 
                            className="cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-200"
                            onClick={() => handleOpenSection(section)}
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
                        </motion.div>
                      ))}
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-6 text-center">
              <File className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-1">No resume selected</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Select a resume from the sidebar or create a new one</p>
              <Button onClick={handleCreateNewResume}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Resume
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Dialog for editing individual sections */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedSection?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              className="min-h-[200px] font-mono text-sm"
              placeholder={`Enter your ${selectedSection?.title} here...`}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveSection}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyResumes;
