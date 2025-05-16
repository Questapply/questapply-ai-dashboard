
import { useState } from "react";
import { Button } from "@/components/ui/button";

const sopFilters = [
  { id: "guidance", name: "Guidance", icon: "📚" },
  { id: "samples", name: "Samples", icon: "📝" },
  { id: "createSOP", name: "Create SOP", icon: "✏️" }
];

const sopSteps = [
  { 
    id: 1,
    title: "Country / Program / Level / University",
    icon: "🎓",
    description: "What country are you applying to, and what specific program and level of study are you pursuing at the university?"
  },
  {
    id: 2,
    title: "Academic and Research Background",
    icon: "📚",
    description: "Highlight your academic achievements and any research experience relevant to your desired program."
  },
  {
    id: 3,
    title: "Professional Experience",
    icon: "💼",
    description: "Discuss how your work experience has prepared you for graduate studies and aligns with your goals."
  },
  {
    id: 4,
    title: "Why This Program / University",
    icon: "🏫",
    description: "Explain why you're interested in this specific program and institution and how they align with your goals."
  },
  {
    id: 5,
    title: "Research Interests",
    icon: "🔬",
    description: "Describe the specific research areas or questions that interest you and why they matter."
  },
  {
    id: 6,
    title: "Career Goals",
    icon: "🎯",
    description: "Outline your short-term and long-term career objectives after completing this program."
  }
];

const CreateSOP = () => {
  const [activeFilter, setActiveFilter] = useState("guidance");

  const renderContent = () => {
    switch (activeFilter) {
      case "guidance":
        return (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-purple-600 text-white rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-4">How Should I Organize my Statement of Purpose?</h2>
                <p className="text-lg">
                  A well-structured SOP allows readers to see your growth and development as an
                  individual and as a researcher and student. You can think of the SOP like a story,
                  where all parts are in sequential, chronological order. The following is the most
                  standard structure of a Statement of Purpose. For each "section," you should write
                  at least one paragraph but no more than two paragraphs, depending on the word
                  count limit indicated by your graduate program:
                </p>
              </div>
              
              <div className="mt-8 space-y-12">
                {sopSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                    {/* Step Number Circle */}
                    <div className="absolute left-0 top-0 bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                      {step.id}
                    </div>
                    
                    {/* Step Content */}
                    <div className="ml-16">
                      <div className="flex mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-2xl">
                            {step.icon}
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <div className="pl-20">
                        <p className="text-gray-600 dark:text-gray-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Connector Line */}
                    {index < sopSteps.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-purple-300 dark:bg-purple-700 h-16"></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 px-8"
                  onClick={() => setActiveFilter("createSOP")}
                >
                  Create My Statement of Purpose
                </Button>
              </div>
            </div>
          </div>
        );
      
      case "samples":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sample Statements of Purpose</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Computer Science Ph.D.",
                  university: "Stanford University",
                  excerpt: "My interest in computer science began when I built my first program at age 13...",
                  rating: 5
                },
                {
                  title: "Molecular Biology Master's",
                  university: "MIT",
                  excerpt: "The complex mechanisms of cellular function have fascinated me since my undergraduate research...",
                  rating: 5
                },
                {
                  title: "Economics Ph.D.",
                  university: "Harvard University",
                  excerpt: "Working at the intersection of behavioral economics and public policy has shown me...",
                  rating: 4
                },
                {
                  title: "Mechanical Engineering Master's",
                  university: "UC Berkeley",
                  excerpt: "My experience designing sustainable energy solutions has prepared me to contribute to...",
                  rating: 4
                },
                {
                  title: "Psychology Ph.D.",
                  university: "University of Michigan",
                  excerpt: "Through my clinical experience and research in cognitive development, I've observed...",
                  rating: 5
                },
                {
                  title: "Business MBA",
                  university: "Wharton School",
                  excerpt: "Leading teams in technology startups has honed my understanding of organizational...",
                  rating: 4
                }
              ].map((sample, i) => (
                <div 
                  key={i} 
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="h-2 bg-purple-600"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{sample.title}</h3>
                      <div className="flex">
                        {[...Array(sample.rating)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{sample.university}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{sample.excerpt}</p>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" className="text-purple-600 border-purple-300 dark:border-purple-700">
                        Read More
                      </Button>
                      <Button size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                Load More Samples
              </Button>
            </div>
          </div>
        );
        
      case "createSOP":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Your Statement of Purpose</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 1, title: "Choose Program", completed: true },
                  { id: 2, title: "Academic Background", completed: true },
                  { id: 3, title: "Research Experience", completed: true },
                  { id: 4, title: "Professional Experience", completed: false },
                  { id: 5, title: "Program Fit", completed: false },
                  { id: 6, title: "Research Goals", completed: false },
                  { id: 7, title: "Career Objectives", completed: false },
                  { id: 8, title: "Review & Download", completed: false }
                ].map(step => (
                  <div 
                    key={step.id} 
                    className={`${
                      step.completed ? "bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800" : "bg-gray-50 dark:bg-gray-900/10 border-gray-200 dark:border-gray-700"
                    } border rounded-lg p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all duration-300`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? "bg-purple-600 text-white" 
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}>
                      {step.completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <span className={`font-medium ${
                      step.completed 
                        ? "text-purple-800 dark:text-purple-300" 
                        : "text-gray-700 dark:text-gray-300"
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Professional Experience</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Job Title
                    </label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                      placeholder="e.g., Research Assistant, Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Organization
                    </label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                      placeholder="e.g., Google, Stanford University"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Start Date
                      </label>
                      <input 
                        type="date" 
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        End Date
                      </label>
                      <input 
                        type="date" 
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Key Responsibilities and Achievements
                    </label>
                    <textarea 
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 h-32"
                      placeholder="Describe your responsibilities, achievements, and skills gained that are relevant to your graduate program application"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Relevance to Graduate Program
                    </label>
                    <textarea 
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 h-32"
                      placeholder="Explain how this experience has prepared you for graduate studies in your field"
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button variant="outline" className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Save and Continue
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
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
          {sopFilters.map(filter => (
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

export default CreateSOP;
