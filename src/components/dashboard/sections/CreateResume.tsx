
import { useState } from "react";
import { Button } from "@/components/ui/button";

const resumeFilters = [
  { id: "guidance", name: "Guidance", icon: "📚" },
  { id: "template", name: "Choose Template", icon: "🖼️" },
  { id: "myResumes", name: "My Resumes", icon: "📄" }
];

const resumeTemplates = [
  { 
    id: "academic", 
    name: "Academic CV", 
    description: "Ideal for PhD applications and research positions",
    image: "/placeholder.svg" 
  },
  { 
    id: "professional", 
    name: "Professional Resume", 
    description: "Clean, modern design for industry applications",
    image: "/placeholder.svg" 
  },
  { 
    id: "creative", 
    name: "Creative Resume", 
    description: "Stand out with a unique yet professional design",
    image: "/placeholder.svg" 
  },
  { 
    id: "minimal", 
    name: "Minimal Resume", 
    description: "Simple and elegant design focusing on content",
    image: "/placeholder.svg" 
  }
];

const cvSections = [
  { 
    icon: "📧", 
    title: "Contact Information", 
    description: "Full Name, Address, Phone Number, Email Address, LinkedIn Profile, Personal Website or Portfolio" 
  },
  { 
    icon: "🎓", 
    title: "Education", 
    description: "Degrees, Institutions, Dates, GPAs, Relevant Coursework, Honors and Awards"
  },
  { 
    icon: "💼", 
    title: "Professional Experience", 
    description: "Positions, Organizations, Dates, Responsibilities, Achievements, Skills Demonstrated"
  },
  { 
    icon: "🔬", 
    title: "Research Experience", 
    description: "Projects, Laboratories, Dates, Methodologies, Findings, Publications"
  },
  { 
    icon: "🏆", 
    title: "Honors and Awards", 
    description: "Scholarships, Academic Distinctions, Professional Recognitions, Dates Received"
  },
  {
    icon: "🌟",
    title: "Skills and Certifications",
    description: "Technical Skills, Language Proficiency, Certifications, Software Proficiency"
  }
];

const CreateResume = () => {
  const [activeFilter, setActiveFilter] = useState("guidance");

  const renderContent = () => {
    switch (activeFilter) {
      case "guidance":
        return (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-purple-600 text-white rounded-t-xl p-8">
                <h2 className="text-3xl font-bold mb-2">CV Guidance</h2>
                <p className="text-xl font-light">The specified sections for writing a CV/Resume</p>
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold mb-2">Key Criteria and Factors</h3>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-b-xl shadow-md p-8">
                {cvSections.map((section, index) => (
                  <div key={index} className="mb-8">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-6">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-2xl">
                          {section.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                          {section.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {section.description}
                        </p>
                        {index < cvSections.length - 1 && (
                          <div className="border-l-2 border-dashed border-purple-300 dark:border-purple-700 ml-8 pl-8 h-8 my-2"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-8 flex justify-center">
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 px-8"
                    onClick={() => setActiveFilter("template")}
                  >
                    Create My Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "template":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resumeTemplates.map(template => (
                <div 
                  key={template.id} 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{template.description}</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Use Template
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                Import Existing Resume
              </Button>
            </div>
          </div>
        );
        
      case "myResumes":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Resumes</h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                Create New Resume
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-16 h-20 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Academic CV</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: May 10, 2023</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                      Complete
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="text-gray-600 dark:text-gray-300">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-gray-600 dark:text-gray-300">
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="text-gray-600 dark:text-gray-300">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-16 h-20 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Professional Resume</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: April 22, 2023</p>
                    </div>
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded text-xs font-medium">
                      In Progress
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="text-gray-600 dark:text-gray-300">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-gray-600 dark:text-gray-300">
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="text-gray-600 dark:text-gray-300">
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Sub Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto scrollbar-hide">
          {resumeFilters.map(filter => (
            <button
              key={filter.id}
              className={`px-6 py-3 flex items-center gap-2 whitespace-nowrap text-sm font-medium ${
                activeFilter === filter.id
                  ? "border-b-2 border-purple-600 text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              } transition-colors duration-200`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <span>{filter.icon}</span>
              {filter.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {renderContent()}
    </div>
  );
};

export default CreateResume;
