
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MyLORs = () => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    submissionMethod: "",
    date: "",
    recipient: "",
    candidateName: "",
    candidateEmail: "",
    recommenderName: "",
    recommenderTitle: "",
    generalAssessment: "",
    comparisonWithPeers: "",
    skillsAndTraits: "",
    programFit: "",
    finalEndorsement: "",
    contactInfo: ""
  });

  // Mock data for existing LORs
  const savedLORs = [
    {
      id: 1,
      name: "Jane Smith",
      institution: "MIT",
      date: "May 10, 2025"
    },
    {
      id: 2,
      name: "John Doe",
      institution: "Stanford",
      date: "May 5, 2025"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentStep < 11) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "LOR Completed",
      description: "Your Letter of Recommendation has been successfully created.",
      variant: "default",
    });
    setIsCreatingNew(false);
    setCurrentStep(1);
  };

  const handleSelectSubmissionMethod = (method: string) => {
    setFormData(prev => ({ ...prev, submissionMethod: method }));
    handleNext();
  };

  const handleExport = () => {
    toast({
      title: "Exporting LOR",
      description: "Your Letter of Recommendation is being prepared for download.",
      variant: "default",
    });
  };

  return (
    <div className="animate-fade-in">
      {isCreatingNew ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Create New Letter of Recommendation</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsCreatingNew(false)}
            >
              Cancel
            </Button>
          </div>

          <div className="mb-8">
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-blue-500" 
                style={{ width: `${(currentStep / 11) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-sm">Step {currentStep} of 11</span>
            </div>
          </div>

          {/* Step 1: Submission Method */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recommendation Method</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">How will this recommendation letter be submitted?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleSelectSubmissionMethod("email")}
                  className={`p-6 border rounded-lg text-center hover:border-teal-300 dark:hover:border-teal-600 transition-all ${
                    formData.submissionMethod === "email" ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Direct email to program</p>
                </button>
                
                <button
                  onClick={() => handleSelectSubmissionMethod("upload")}
                  className={`p-6 border rounded-lg text-center hover:border-blue-300 dark:hover:border-blue-600 transition-all ${
                    formData.submissionMethod === "upload" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Upload</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Upload to application portal</p>
                </button>
                
                <button
                  onClick={() => handleSelectSubmissionMethod("envelope")}
                  className={`p-6 border rounded-lg text-center hover:border-purple-300 dark:hover:border-purple-600 transition-all ${
                    formData.submissionMethod === "envelope" ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                  </div>
                  <h4 className="font-medium">Sealed Envelope</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Physical copy</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Date</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">When will this letter be sent/submitted?</p>
              
              <div className="relative">
                <Input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Recipient */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recipient</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Who is this letter addressed to?</p>
              
              <Input
                type="text"
                id="recipient"
                placeholder="Admissions Committee, University Name"
                value={formData.recipient}
                onChange={handleInputChange}
              />
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Candidate Information */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Candidate Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Who is this letter recommending?</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="candidateName" className="block text-sm font-medium mb-1">Candidate Name</label>
                  <Input
                    type="text"
                    id="candidateName"
                    placeholder="Full Name"
                    value={formData.candidateName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="candidateEmail" className="block text-sm font-medium mb-1">Candidate Email</label>
                  <Input
                    type="email"
                    id="candidateEmail"
                    placeholder="email@example.com"
                    value={formData.candidateEmail}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Recommender Information */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Recommender Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Who is writing this recommendation?</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="recommenderName" className="block text-sm font-medium mb-1">Recommender Name</label>
                  <Input
                    type="text"
                    id="recommenderName"
                    placeholder="Full Name"
                    value={formData.recommenderName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="recommenderTitle" className="block text-sm font-medium mb-1">Title & Institution</label>
                  <Input
                    type="text"
                    id="recommenderTitle"
                    placeholder="Professor of Computer Science, University Name"
                    value={formData.recommenderTitle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 6: General Assessment */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">General Assessment</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Provide an overview of how you know the candidate and your general impression.</p>
              
              <Textarea
                id="generalAssessment"
                placeholder="I have known [Candidate] for [time period] as [relationship]. Overall, I find them to be..."
                rows={6}
                value={formData.generalAssessment}
                onChange={handleInputChange}
              />
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 7: Comparison with Peers */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Comparison with Peers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">How does this candidate compare to others you've worked with?</p>
              
              <Textarea
                id="comparisonWithPeers"
                placeholder="Compared to other students/employees I have worked with, [Candidate] ranks in the top..."
                rows={6}
                value={formData.comparisonWithPeers}
                onChange={handleInputChange}
              />
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 8: Skills and Traits */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skills and Traits</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">What specific skills, qualities, or traits make this candidate stand out?</p>
              
              <Textarea
                id="skillsAndTraits"
                placeholder="[Candidate]'s strongest qualities include... They have demonstrated these abilities through..."
                rows={6}
                value={formData.skillsAndTraits}
                onChange={handleInputChange}
              />
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 9: Program Fit */}
          {currentStep === 9 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">School/Program Fit</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">How is the candidate a good fit for the specific program or institution?</p>
              
              <Textarea
                id="programFit"
                placeholder="I believe [Candidate] would be an excellent fit for your program because..."
                rows={6}
                value={formData.programFit}
                onChange={handleInputChange}
              />
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 10: Final Endorsement */}
          {currentStep === 10 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Final Endorsement</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Provide your concluding statement and level of recommendation.</p>
              
              <Textarea
                id="finalEndorsement"
                placeholder="In conclusion, I strongly recommend [Candidate] for admission to your program..."
                rows={6}
                value={formData.finalEndorsement}
                onChange={handleInputChange}
              />
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 11: Contact Information */}
          {currentStep === 11 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Provide your contact information for follow-up if needed.</p>
              
              <Textarea
                id="contactInfo"
                placeholder="Feel free to contact me at [email] or [phone] if you require any additional information..."
                rows={4}
                value={formData.contactInfo}
                onChange={handleInputChange}
              />
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={handleSubmit}
                  className="bg-teal-500 hover:bg-teal-600"
                >
                  Complete LOR
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Saved LORs</h2>
            <Button onClick={() => setIsCreatingNew(true)}>
              Create New Letter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedLORs.map(lor => (
              <div key={lor.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all">
                <div>
                  <h3 className="font-medium">{lor.name} - {lor.institution}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Created on {lor.date}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={handleExport}
                  >
                    <FileText className="h-4 w-4 mr-2" /> Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyLORs;
