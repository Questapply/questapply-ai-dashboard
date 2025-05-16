
import { useState } from "react";
import { Button } from "@/components/ui/button";

const lorFilters = [
  { id: "guidance", name: "Guidance", icon: "📚" },
  { id: "samples", name: "Samples", icon: "📝" },
  { id: "createLOR", name: "Create LOR", icon: "✏️" }
];

const referenceSections = [
  {
    step: "Step-1",
    title: "Introduction and Relationship",
    icon: "👥",
    point: "Explain your relationship with the recommender, including how long they've known you and in what capacity."
  },
  {
    step: "Step-2",
    title: "Academic and Professional Achievements",
    icon: "🏆",
    point: "Highlight your top academic performances, research contributions, or professional accomplishments that the recommender observed."
  },
  {
    step: "Step-3",
    title: "Personal Qualities and Skills",
    icon: "⭐",
    point: "Describe your character traits, work ethic, interpersonal skills, and unique qualities that make you stand out."
  },
  {
    step: "Step-4",
    title: "Specific Examples",
    icon: "📋",
    point: "Include specific instances or projects that demonstrate your abilities and achievements under their supervision."
  },
  {
    step: "Step-5",
    title: "Fit for the Program",
    icon: "🎯",
    point: "Explain why the recommender believes you are well-suited for the specific program or position you're applying for."
  },
  {
    step: "Step-6",
    title: "Conclusion and Endorsement",
    icon: "👍",
    point: "Include a strong statement of endorsement indicating the level of recommendation and willingness to be contacted for further information."
  }
];

const CreateLOR = () => {
  const [activeFilter, setActiveFilter] = useState("guidance");

  const renderContent = () => {
    switch (activeFilter) {
      case "guidance":
        return (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-purple-600 text-white rounded-xl p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">Recommendation Guidance:</h2>
                    <p className="text-lg font-light">Criteria and Factors for Writing a Recommendation Letter</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 space-y-12 pl-4">
                {referenceSections.map((section, index) => (
                  <div key={index} className="flex">
                    <div className="relative mr-8">
                      <div className="bg-purple-600 text-white rounded-lg px-4 py-2 font-semibold">
                        {section.step}
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-12 bottom-0 w-0.5 bg-purple-300 dark:bg-purple-700"></div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-12 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-4 border-purple-600 flex items-center justify-center text-lg mt-8">
                        {section.icon}
                      </div>
                    </div>
                    
                    <div className="mt-24">
                      <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 ml-4">
                        • {section.point}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 px-8"
                  onClick={() => setActiveFilter("createLOR")}
                >
                  Request a Letter of Recommendation
                </Button>
              </div>
            </div>
          </div>
        );
      
      case "samples":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sample Letters of Recommendation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Academic Excellence",
                  author: "Prof. James Wilson",
                  position: "Department Chair, Computer Science",
                  institution: "Stanford University",
                  excerpt: "In my 25 years of teaching, Maria stands out among the top 1% of students I have encountered...",
                  type: "Academic"
                },
                {
                  title: "Research Potential",
                  author: "Dr. Sarah Chen",
                  position: "Principal Investigator",
                  institution: "MIT Laboratory for Computer Science",
                  excerpt: "Robert's exceptional ability to formulate research questions and design elegant experiments demonstrates his readiness for doctoral studies...",
                  type: "Research"
                },
                {
                  title: "Professional Accomplishment",
                  author: "Michael Johnson",
                  position: "VP of Engineering",
                  institution: "Google",
                  excerpt: "During her three years as a software engineer on our team, Jennifer consistently delivered high-quality solutions to complex problems...",
                  type: "Professional"
                },
                {
                  title: "Leadership and Character",
                  author: "Dr. Elizabeth Brown",
                  position: "Dean of Students",
                  institution: "Harvard University",
                  excerpt: "Beyond his academic achievements, Daniel has demonstrated remarkable leadership as the president of our student government...",
                  type: "Character"
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
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                        {sample.type}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{sample.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{sample.position}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{sample.institution}</p>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{sample.excerpt}</p>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm" className="text-purple-600 border-purple-300 dark:border-purple-700">
                        Read Full Letter
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
        
      case "createLOR":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Request a Letter of Recommendation</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Recommender Information
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name *
                    </label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name *
                    </label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Institution/Organization *
                    </label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Position/Title *
                    </label>
                    <input 
                      type="text" 
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Relationship to You *
                  </label>
                  <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
                    <option>Select relationship</option>
                    <option>Professor</option>
                    <option>Academic Advisor</option>
                    <option>Research Supervisor</option>
                    <option>Employer</option>
                    <option>Internship Supervisor</option>
                    <option>Other (please specify)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    How long have you known this recommender? *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
                        <option>Years</option>
                        <option>Less than 1 year</option>
                        <option>1 year</option>
                        <option>2 years</option>
                        <option>3 years</option>
                        <option>4 years</option>
                        <option>5+ years</option>
                      </select>
                    </div>
                    <div>
                      <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
                        <option>Months</option>
                        <option>0 months</option>
                        <option>1 month</option>
                        <option>2 months</option>
                        <option>3 months</option>
                        <option>4 months</option>
                        <option>5 months</option>
                        <option>6 months</option>
                        <option>7 months</option>
                        <option>8 months</option>
                        <option>9 months</option>
                        <option>10 months</option>
                        <option>11 months</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Letter Details
              </h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Program/Position Applying For *
                  </label>
                  <input 
                    type="text" 
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                    placeholder="e.g., PhD in Computer Science, Master's in Engineering"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Institution/Organization Applying To *
                  </label>
                  <input 
                    type="text" 
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                    placeholder="e.g., Stanford University, Google"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Letter Deadline *
                  </label>
                  <input 
                    type="date" 
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Specific Qualities/Achievements to Highlight (Optional)
                  </label>
                  <textarea 
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 h-32"
                    placeholder="Briefly note any specific qualities, skills, or achievements you'd like your recommender to emphasize"
                  ></textarea>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="waive-right" 
                    className="mt-1"
                  />
                  <label htmlFor="waive-right" className="text-sm text-gray-700 dark:text-gray-300">
                    I waive my right to review this letter of recommendation.
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Send Request
                </Button>
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
          {lorFilters.map(filter => (
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

export default CreateLOR;
