
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const resumeTemplates = [
  { 
    id: "academic", 
    name: "Academic CV", 
    description: "Ideal for PhD applications and research positions",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
    popular: true
  },
  { 
    id: "professional", 
    name: "Professional Resume", 
    description: "Clean, modern design for industry applications",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
    popular: false
  },
  { 
    id: "creative", 
    name: "Creative Resume", 
    description: "Stand out with a unique yet professional design",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
    popular: false
  },
  { 
    id: "minimal", 
    name: "Minimal Resume", 
    description: "Simple and elegant design focusing on content",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
    popular: false
  },
  { 
    id: "modern", 
    name: "Modern Resume", 
    description: "Contemporary style with bold typography",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
    popular: false
  },
  { 
    id: "technical", 
    name: "Technical Resume", 
    description: "Optimized for technical and engineering roles",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
    popular: true
  },
  { 
    id: "research", 
    name: "Research CV", 
    description: "Focused on academic research achievements",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
    popular: false
  },
  { 
    id: "executive", 
    name: "Executive Resume", 
    description: "Sophisticated design for senior positions",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
    popular: false
  }
];

// Define sections for each resume type
const resumeSectionsByType = {
  academic: [
    { id: "personal", title: "Personal Information" },
    { id: "summary", title: "Summary" },
    { id: "research", title: "Research Interests" },
    { id: "education", title: "Education" },
    { id: "experience", title: "Professional History" },
    { id: "publications", title: "Publications" },
    { id: "skills", title: "Certifications and Skills" },
    { id: "awards", title: "Honors and Awards" },
    { id: "memberships", title: "Memberships" },
    { id: "references", title: "References" }
  ],
  professional: [
    { id: "personal", title: "Personal Information" },
    { id: "summary", title: "Professional Summary" },
    { id: "skills", title: "Skills" },
    { id: "experience", title: "Work Experience" },
    { id: "education", title: "Education" },
    { id: "certifications", title: "Certifications" },
    { id: "achievements", title: "Achievements" },
    { id: "references", title: "References" }
  ],
  creative: [
    { id: "personal", title: "Personal Details" },
    { id: "profile", title: "Profile" },
    { id: "experience", title: "Experience" },
    { id: "skills", title: "Skills & Expertise" },
    { id: "projects", title: "Portfolio & Projects" },
    { id: "education", title: "Education" },
    { id: "interests", title: "Interests" }
  ],
  minimal: [
    { id: "personal", title: "Contact Information" },
    { id: "summary", title: "Summary" },
    { id: "experience", title: "Experience" },
    { id: "education", title: "Education" },
    { id: "skills", title: "Skills" }
  ],
  modern: [
    { id: "personal", title: "Profile" },
    { id: "summary", title: "Career Objective" },
    { id: "experience", title: "Professional Experience" },
    { id: "education", title: "Education" },
    { id: "skills", title: "Skills" },
    { id: "projects", title: "Projects" },
    { id: "languages", title: "Languages" }
  ],
  technical: [
    { id: "personal", title: "Contact Information" },
    { id: "summary", title: "Technical Summary" },
    { id: "skills", title: "Technical Skills" },
    { id: "experience", title: "Professional Experience" },
    { id: "projects", title: "Technical Projects" },
    { id: "education", title: "Education" },
    { id: "certifications", title: "Technical Certifications" }
  ],
  research: [
    { id: "personal", title: "Personal Information" },
    { id: "research", title: "Research Focus" },
    { id: "education", title: "Academic Background" },
    { id: "publications", title: "Publications" },
    { id: "grants", title: "Grants & Funding" },
    { id: "conferences", title: "Conference Presentations" },
    { id: "teaching", title: "Teaching Experience" },
    { id: "skills", title: "Research Skills" },
    { id: "references", title: "Academic References" }
  ],
  executive: [
    { id: "personal", title: "Contact Details" },
    { id: "summary", title: "Executive Summary" },
    { id: "experience", title: "Leadership Experience" },
    { id: "achievements", title: "Key Achievements" },
    { id: "education", title: "Education" },
    { id: "skills", title: "Core Competencies" },
    { id: "boards", title: "Board Positions" },
    { id: "presentations", title: "Speaking Engagements" }
  ]
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ResumeTemplates = () => {
  const navigate = useNavigate();
  
  const handleUseTemplate = (templateId: string) => {
    // Store template info in localStorage so we can retrieve it in MyResumes
    localStorage.setItem("selectedResumeTemplate", templateId);
    localStorage.setItem("resumeSections", JSON.stringify(resumeSectionsByType[templateId as keyof typeof resumeSectionsByType]));
    
    // Navigate to My Resumes tab
    navigate("/dashboard");
    // We'll handle the tab change in CreateResume.tsx
    localStorage.setItem("activeResumeTab", "myResumes");
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Choose Your Template</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Select from our professionally designed templates to create a standout resume that matches your career goals and personal style.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {resumeTemplates.map((template) => (
          <motion.div
            key={template.id}
            variants={item}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 20 } 
            }}
          >
            <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-48 object-cover object-center"
                />
                {template.popular && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Star className="w-3 h-3 mr-1" fill="white" />
                    Popular
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 h-10">{template.description}</p>
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    USE TEMPLATE
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center mt-10"
      >
        <Button 
          variant="outline" 
          className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
        >
          <Download className="mr-2 h-4 w-4" />
          Import Existing Resume
        </Button>
      </motion.div>
    </div>
  );
};

export default ResumeTemplates;
