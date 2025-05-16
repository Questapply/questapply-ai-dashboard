
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

type ApplicationFilter = {
  id: string;
  name: string;
};

const filters: ApplicationFilter[] = [
  { id: "deadline", name: "Deadline" },
  { id: "qsRank", name: "QS Rank" },
  { id: "gpa", name: "GPA" },
  { id: "applicationFee", name: "Application Fee" },
  { id: "desc", name: "DESC" },
  { id: "asc", name: "ASC" }
];

const applications = [
  {
    id: 1,
    program: "Computer Science",
    degree: "Ph.D.",
    school: "Newcastle University",
    logo: "/placeholder.svg",
    deadline: "No Deadline Validate",
    applicationFees: "FREE",
    eligibility: true,
    admissionFit: "High",
    status: "Applied",
    actions: ["Submit with Us", "Remove"]
  },
  {
    id: 2,
    program: "Computer Science",
    degree: "Ph.D.",
    school: "University of Liverpool",
    logo: "/placeholder.svg",
    deadline: "56 days opening\nFall, Aug 31\nFall, Jul 12\nWinter, Nov 30",
    applicationFees: "FREE",
    eligibility: true,
    admissionFit: "Needs Info",
    status: "Applied",
    actions: ["Submit with Us", "Remove"]
  }
];

const ApplyNow = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<number[]>([]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };

  const toggleDetails = (applicationId: number) => {
    setExpandedDetails(prev => 
      prev.includes(applicationId)
        ? prev.filter(id => id !== applicationId)
        : [...prev, applicationId]
    );
  };

  return (
    <div className="p-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Applications</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-8">
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Order by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`
                  px-4 py-1.5 rounded-full text-sm
                  ${
                    activeFilters.includes(filter.id)
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                  }
                  transition-colors duration-200
                `}
                onClick={() => toggleFilter(filter.id)}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
        <Button className="ml-auto bg-purple-600 hover:bg-purple-700">
          Filter My Applications
        </Button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 mb-4 px-4 py-2 bg-gray-50 dark:bg-gray-900/50 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
        <div className="font-medium text-gray-700 dark:text-gray-300">Program</div>
        <div className="font-medium text-gray-700 dark:text-gray-300">Deadline</div>
        <div className="font-medium text-gray-700 dark:text-gray-300">Application Fees</div>
        <div className="font-medium text-gray-700 dark:text-gray-300">Eligibility</div>
        <div className="font-medium text-gray-700 dark:text-gray-300">Admission Fit</div>
        <div className="font-medium text-gray-700 dark:text-gray-300">Status</div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map(application => (
          <div 
            key={application.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            {/* Main Row */}
            <div className="grid grid-cols-6 gap-4 items-center px-4 py-4">
              <div className="flex items-center gap-3">
                <img 
                  src={application.logo} 
                  alt={`${application.school} logo`} 
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 dark:text-white">{application.program}</span>
                    <a href="#" className="ml-2 text-xs text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    {application.degree}
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    {application.school}
                  </div>
                </div>
              </div>
              
              <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm">
                {application.deadline}
              </div>
              
              <div className="text-gray-700 dark:text-gray-300">
                {application.applicationFees}
              </div>
              
              <div>
                {application.eligibility ? (
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              <div>
                <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      application.admissionFit === "High" 
                        ? "bg-green-500" 
                        : "bg-yellow-500"
                    } rounded-full`}
                    style={{ width: application.admissionFit === "High" ? "75%" : "40%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {application.admissionFit}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                    {application.status}
                  </span>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => toggleDetails(application.id)}
                >
                  {expandedDetails.includes(application.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Expanded Details */}
            {expandedDetails.includes(application.id) && (
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-end gap-3">
                  {application.actions.includes("Submit with Us") && (
                    <Button 
                      variant="outline" 
                      className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                      size="sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Submit with Us
                    </Button>
                  )}
                  
                  {application.actions.includes("Remove") && (
                    <Button 
                      variant="outline" 
                      className="text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      size="sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </Button>
                  )}
                  
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    size="sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    See More Details
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplyNow;
