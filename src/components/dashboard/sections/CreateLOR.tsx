
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  FileText, 
  Users, 
  Wand, 
  Star, 
  MessageSquare,
  Download,
  Upload,
  CheckCircle2,
  Info,
  FileCheck,
  Send
} from "lucide-react";

// Define reference sections for the LOR form
const referenceSections = [
  { id: "general", title: "General Assessment" },
  { id: "comparison", title: "Comparison with Peers" },
  { id: "skills", title: "Skills and Traits" },
  { id: "program", title: "School/Program" },
  { id: "endorsement", title: "Final Endorsement" },
  { id: "contact", title: "Contact" }
];

const CreateLOR = () => {
  const [activeTab, setActiveTab] = useState("guidance");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    method: "email",
    date: "",
    recipient: "",
    candidateName: "",
    candidateEmail: "",
    recommenderName: "",
    recommenderTitle: "",
    generalAssessment: "",
    comparison: "",
    skills: "",
    program: "",
    endorsement: "",
    contactInfo: ""
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      title: "LOR Created",
      description: "Your Letter of Recommendation has been created successfully!",
    });
  };

  const exportLOR = () => {
    toast({
      title: "LOR Exported",
      description: "Your Letter of Recommendation has been exported successfully!",
      variant: "success"
    });
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
        Letter of Recommendation
      </h2>
      
      <Tabs 
        defaultValue="guidance" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-7 mb-8 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger value="guidance" className="flex gap-2 items-center">
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">Guidance</span>
          </TabsTrigger>
          <TabsTrigger value="samples" className="flex gap-2 items-center">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">LOR Samples</span>
          </TabsTrigger>
          <TabsTrigger value="my-lors" className="flex gap-2 items-center">
            <FileCheck className="w-4 h-4" />
            <span className="hidden sm:inline">My LORs</span>
          </TabsTrigger>
          <TabsTrigger value="ai-improvement" className="flex gap-2 items-center">
            <Wand className="w-4 h-4" />
            <span className="hidden sm:inline">AI Improvement</span>
          </TabsTrigger>
          <TabsTrigger value="strengths" className="flex gap-2 items-center">
            <Star className="w-4 h-4" />
            <span className="hidden sm:inline">Highlight Strengths</span>
          </TabsTrigger>
          <TabsTrigger value="tone" className="flex gap-2 items-center">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Professional Tone</span>
          </TabsTrigger>
          <TabsTrigger value="humanizer" className="flex gap-2 items-center">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">AI Humanizer</span>
          </TabsTrigger>
        </TabsList>

        {/* Guidance Tab */}
        <TabsContent value="guidance" className="mt-2 animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-8">
                <div className="flex gap-6">
                  <div className="bg-gradient-to-br from-teal-100 to-blue-100 dark:from-teal-900/30 dark:to-blue-900/30 p-6 rounded-xl flex-1">
                    <h3 className="text-xl font-bold mb-4 text-teal-700 dark:text-teal-300">What Makes a Great LOR?</h3>
                    <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                      <li>Be specific about the candidate's achievements</li>
                      <li>Provide concrete examples rather than general statements</li>
                      <li>Comment on academic/professional abilities and personal qualities</li>
                      <li>Explain how you know the candidate and for how long</li>
                      <li>Compare the candidate to peers or other students/employees</li>
                      <li>Demonstrate enthusiasm in your endorsement</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl flex-1">
                    <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">Common Mistakes to Avoid</h3>
                    <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
                      <li>Being too generic or vague</li>
                      <li>Including irrelevant personal information</li>
                      <li>Focusing only on grades or technical skills</li>
                      <li>Being too brief (most LORs should be 1-2 pages)</li>
                      <li>Using informal language or slang</li>
                      <li>Mentioning weaknesses without context</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/50 dark:to-teal-950/50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">LOR Structure Guide</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Introduction</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Establish who you are, your relationship to the applicant, and how long you've known them. 
                        Indicate your overall assessment and support for their application.
                      </p>
                      
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Body Paragraphs</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Include 2-3 paragraphs focusing on different strengths with specific examples. 
                        Relate the candidate's qualities to the program/position they're applying for.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">Comparison</h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Compare the applicant to others you've worked with. Quantify their abilities 
                        (e.g., "in the top 5% of students I've taught").
                      </p>
                      
                      <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">Conclusion</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Reaffirm your recommendation, express willingness to be contacted for further 
                        information, and provide your contact details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOR Samples Tab */}
        <TabsContent value="samples" className="mt-2 animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">Academic LOR - Undergraduate</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">For Bachelor students applying to Master's programs</p>
                    <Button variant="outline" className="w-full">View Sample</Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">Academic LOR - Graduate</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">For Master's students applying to PhD programs</p>
                    <Button variant="outline" className="w-full">View Sample</Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">Research LOR</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Emphasizing research experience and capabilities</p>
                    <Button variant="outline" className="w-full">View Sample</Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">Professional LOR</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">From employers or supervisors</p>
                    <Button variant="outline" className="w-full">View Sample</Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">Engineering LOR</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Specific to engineering disciplines</p>
                    <Button variant="outline" className="w-full">View Sample</Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">Business School LOR</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">For MBA and business program applicants</p>
                    <Button variant="outline" className="w-full">View Sample</Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">Computer Science LOR</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">For CS and IT program applicants</p>
                    <Button variant="outline" className="w-full">View Sample</Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">Scholarship LOR</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Focused on merit and financial need</p>
                    <Button variant="outline" className="w-full">View Sample</Button>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow p-4">
                    <h3 className="font-bold text-lg mb-2">Character Reference</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Highlighting personal qualities and integrity</p>
                    <Button variant="outline" className="w-full">View Sample</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My LORs Tab */}
        <TabsContent value="my-lors" className="mt-2 animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Create New Letter of Recommendation</h3>
                <div className="bg-muted/30 p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-lg">Step {currentStep} of 11</h4>
                    <div className="w-3/4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / 11) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Step 1: Recommendation Method */}
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">Recommendation Method</h4>
                      <p className="text-sm text-muted-foreground mb-4">How will this recommendation letter be submitted?</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div 
                          className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${formData.method === 'email' ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                          onClick={() => updateFormData('method', 'email')}
                        >
                          <Send className="mx-auto h-8 w-8 mb-2 text-teal-500" />
                          <h5 className="font-medium">Email</h5>
                          <p className="text-xs text-muted-foreground">Direct email to program</p>
                        </div>
                        
                        <div 
                          className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${formData.method === 'upload' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                          onClick={() => updateFormData('method', 'upload')}
                        >
                          <Upload className="mx-auto h-8 w-8 mb-2 text-blue-500" />
                          <h5 className="font-medium">Upload</h5>
                          <p className="text-xs text-muted-foreground">Upload to application portal</p>
                        </div>
                        
                        <div 
                          className={`p-4 border rounded-lg text-center cursor-pointer transition-all ${formData.method === 'sealed' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                          onClick={() => updateFormData('method', 'sealed')}
                        >
                          <FileCheck className="mx-auto h-8 w-8 mb-2 text-purple-500" />
                          <h5 className="font-medium">Sealed Envelope</h5>
                          <p className="text-xs text-muted-foreground">Physical copy</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Date */}
                  {currentStep === 2 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">Date</h4>
                      <p className="text-sm text-muted-foreground mb-4">When will this letter be sent/submitted?</p>
                      
                      <div className="max-w-md">
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => updateFormData('date', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Recipient */}
                  {currentStep === 3 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">Recipient</h4>
                      <p className="text-sm text-muted-foreground mb-4">Who is this letter addressed to?</p>
                      
                      <div className="max-w-md">
                        <Input
                          placeholder="Admissions Committee, University Name"
                          value={formData.recipient}
                          onChange={(e) => updateFormData('recipient', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Candidate Information */}
                  {currentStep === 4 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">Candidate Information</h4>
                      <p className="text-sm text-muted-foreground mb-4">Who is this letter recommending?</p>
                      
                      <div className="grid gap-4 max-w-md">
                        <div>
                          <Label htmlFor="candidate-name">Candidate Name</Label>
                          <Input
                            id="candidate-name"
                            placeholder="Full Name"
                            value={formData.candidateName}
                            onChange={(e) => updateFormData('candidateName', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="candidate-email">Candidate Email</Label>
                          <Input
                            id="candidate-email"
                            type="email"
                            placeholder="email@example.com"
                            value={formData.candidateEmail}
                            onChange={(e) => updateFormData('candidateEmail', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Recommender Information */}
                  {currentStep === 5 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">Recommender Information</h4>
                      <p className="text-sm text-muted-foreground mb-4">Who is writing this recommendation?</p>
                      
                      <div className="grid gap-4 max-w-md">
                        <div>
                          <Label htmlFor="recommender-name">Recommender Name</Label>
                          <Input
                            id="recommender-name"
                            placeholder="Full Name"
                            value={formData.recommenderName}
                            onChange={(e) => updateFormData('recommenderName', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="recommender-title">Title & Institution</Label>
                          <Input
                            id="recommender-title"
                            placeholder="Professor of Computer Science, University Name"
                            value={formData.recommenderTitle}
                            onChange={(e) => updateFormData('recommenderTitle', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: General Assessment */}
                  {currentStep === 6 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">General Assessment</h4>
                      <p className="text-sm text-muted-foreground mb-4">Provide an overview of how you know the candidate and your general impression.</p>
                      
                      <div className="max-w-3xl">
                        <Textarea
                          placeholder="I have known [Candidate] for [time period] as [relationship]. Overall, I find them to be..."
                          rows={6}
                          value={formData.generalAssessment}
                          onChange={(e) => updateFormData('generalAssessment', e.target.value)}
                          className="resize-y"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 7: Comparison with Peers */}
                  {currentStep === 7 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">Comparison with Peers</h4>
                      <p className="text-sm text-muted-foreground mb-4">How does this candidate compare to others you've worked with?</p>
                      
                      <div className="max-w-3xl">
                        <Textarea
                          placeholder="Compared to other students/employees I have worked with, [Candidate] ranks in the top..."
                          rows={6}
                          value={formData.comparison}
                          onChange={(e) => updateFormData('comparison', e.target.value)}
                          className="resize-y"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 8: Skills and Traits */}
                  {currentStep === 8 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">Skills and Traits</h4>
                      <p className="text-sm text-muted-foreground mb-4">What specific skills, qualities, or traits make this candidate stand out?</p>
                      
                      <div className="max-w-3xl">
                        <Textarea
                          placeholder="[Candidate]'s strongest qualities include... They have demonstrated these abilities through..."
                          rows={6}
                          value={formData.skills}
                          onChange={(e) => updateFormData('skills', e.target.value)}
                          className="resize-y"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 9: School/Program */}
                  {currentStep === 9 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">School/Program Fit</h4>
                      <p className="text-sm text-muted-foreground mb-4">How is the candidate a good fit for the specific program or institution?</p>
                      
                      <div className="max-w-3xl">
                        <Textarea
                          placeholder="I believe [Candidate] would be an excellent fit for your program because..."
                          rows={6}
                          value={formData.program}
                          onChange={(e) => updateFormData('program', e.target.value)}
                          className="resize-y"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 10: Final Endorsement */}
                  {currentStep === 10 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">Final Endorsement</h4>
                      <p className="text-sm text-muted-foreground mb-4">Provide your concluding statement and level of recommendation.</p>
                      
                      <div className="max-w-3xl">
                        <Textarea
                          placeholder="In conclusion, I strongly recommend [Candidate] for admission to your program..."
                          rows={6}
                          value={formData.endorsement}
                          onChange={(e) => updateFormData('endorsement', e.target.value)}
                          className="resize-y"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 11: Contact Information */}
                  {currentStep === 11 && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-lg font-medium mb-2">Contact Information</h4>
                      <p className="text-sm text-muted-foreground mb-4">Provide your contact information for follow-up if needed.</p>
                      
                      <div className="max-w-3xl">
                        <Textarea
                          placeholder="Feel free to contact me at [email] or [phone] if you require any additional information..."
                          rows={4}
                          value={formData.contactInfo}
                          onChange={(e) => updateFormData('contactInfo', e.target.value)}
                          className="resize-y"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <Button 
                      onClick={handlePrevious} 
                      variant="outline"
                      disabled={currentStep === 1}
                    >
                      Previous
                    </Button>
                    
                    {currentStep < 11 ? (
                      <Button onClick={handleNext}>Next</Button>
                    ) : (
                      <Button onClick={handleSubmit} className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Complete LOR
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium">Your Saved LORs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <h5 className="font-medium mb-1">Jane Smith - MIT</h5>
                        <p className="text-sm text-gray-500 mb-3">Created on May 10, 2025</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-1" /> Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <h5 className="font-medium mb-1">John Doe - Stanford</h5>
                        <p className="text-sm text-gray-500 mb-3">Created on May 5, 2025</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-1" /> Export
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Improvement Tab */}
        <TabsContent value="ai-improvement" className="mt-2 animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <h3 className="text-xl font-semibold">AI Improvement</h3>
                <p className="text-muted-foreground">Select one of your LORs to improve with AI suggestions.</p>
                
                <div className="grid gap-4">
                  <Card className="border-teal-200 dark:border-teal-800">
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-4">General Assessment</h4>
                      <div className="bg-muted/30 p-4 rounded-md mb-4">
                        <p>I have known Jane Smith for three years as her professor. She's a good student who works hard and gets good grades in my class.</p>
                      </div>
                      
                      <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 p-4 rounded-md mb-4">
                        <h5 className="text-sm font-medium text-teal-700 dark:text-teal-300 mb-2">AI Suggestion</h5>
                        <p className="text-sm">I have had the privilege of knowing Jane Smith for the past three years in my capacity as her professor of Advanced Computer Systems. Throughout this time, Jane has consistently demonstrated exceptional analytical ability, creative problem-solving skills, and intellectual curiosity that distinguishes her among her peers.</p>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Decline</Button>
                        <Button>Accept Suggestion</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-4">Comparison with Peers</h4>
                      <div className="bg-muted/30 p-4 rounded-md mb-4">
                        <p>Jane is better than many students I've taught. She ranks high in her class.</p>
                      </div>
                      
                      <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 p-4 rounded-md mb-4">
                        <h5 className="text-sm font-medium text-teal-700 dark:text-teal-300 mb-2">AI Suggestion</h5>
                        <p className="text-sm">In my fifteen years of teaching at University College, I can confidently place Jane in the top 5% of students I have encountered. Her academic performance consistently exceeds that of her classmates, and her contributions to class discussions demonstrate a depth of understanding rarely seen at the undergraduate level.</p>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Decline</Button>
                        <Button>Accept Suggestion</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
                    Save All Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Highlight Student Strengths Tab */}
        <TabsContent value="strengths" className="mt-2 animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <h3 className="text-xl font-semibold">Highlight Student Strengths</h3>
                <p className="text-muted-foreground">Answer these questions to help identify and articulate the student's key strengths.</p>
                
                <div className="grid gap-6">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="font-medium mb-4">Academic Excellence</h4>
                    <div className="grid gap-4 mb-4">
                      <div>
                        <Label htmlFor="academic-strength">What is the student's greatest academic strength?</Label>
                        <Input id="academic-strength" placeholder="E.g., analytical thinking, research methodology" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="academic-evidence">Can you provide a specific example that demonstrates this strength?</Label>
                        <Textarea id="academic-evidence" placeholder="Describe a project, paper, or class participation" className="mt-1" />
                      </div>
                    </div>
                    
                    <Button className="w-full">Generate Strength Highlight</Button>
                    
                    <div className="mt-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 p-4 rounded-md">
                      <h5 className="text-sm font-medium text-teal-700 dark:text-teal-300 mb-2">AI-Generated Highlight</h5>
                      <p className="text-sm">The student demonstrates exceptional analytical thinking, particularly evident in their senior research project on quantum computing algorithms. Their ability to synthesize complex theoretical concepts and translate them into practical applications showcases an intellectual maturity rarely seen at the undergraduate level. Their work on this project not only earned the highest grade in the class but also attracted attention from faculty in our graduate department.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="font-medium mb-4">Personal Qualities</h4>
                    <div className="grid gap-4 mb-4">
                      <div>
                        <Label htmlFor="personal-strength">What personal quality makes this student stand out?</Label>
                        <Input id="personal-strength" placeholder="E.g., leadership, perseverance, teamwork" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="personal-evidence">Can you provide a specific example that demonstrates this quality?</Label>
                        <Textarea id="personal-evidence" placeholder="Describe an instance where this quality was evident" className="mt-1" />
                      </div>
                    </div>
                    
                    <Button className="w-full">Generate Strength Highlight</Button>
                    
                    <div className="mt-4 bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">Strength highlights will appear here after generation.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="font-medium mb-4">Growth & Potential</h4>
                    <div className="grid gap-4 mb-4">
                      <div>
                        <Label htmlFor="growth-area">In what area has the student shown the most growth?</Label>
                        <Input id="growth-area" placeholder="E.g., communication skills, technical proficiency" className="mt-1" />
                      </div>
                      
                      <div>
                        <Label htmlFor="future-potential">What is your assessment of the student's future potential?</Label>
                        <Textarea id="future-potential" placeholder="Describe where you see this student in 5-10 years" className="mt-1" />
                      </div>
                    </div>
                    
                    <Button className="w-full">Generate Strength Highlight</Button>
                    
                    <div className="mt-4 bg-gray-100 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-4 rounded-md">
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">Strength highlights will appear here after generation.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
                    Save All Highlights to LOR
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Tone Tab */}
        <TabsContent value="tone" className="mt-2 animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <h3 className="text-xl font-semibold">Professional Tone Suggestions</h3>
                <p className="text-muted-foreground">Our AI analyzes your LOR for tone and formality, suggesting improvements to maintain a professional voice.</p>
                
                <div className="grid gap-6">
                  <div className="border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
                    <h4 className="font-medium mb-2 flex items-center text-amber-800 dark:text-amber-300">
                      <Info className="w-4 h-4 mr-2" />
                      Informal Language Detected
                    </h4>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-md mb-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">Jane is a good kid</span> who always gets her work done on time. 
                        <span className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">She's pretty smart</span> and 
                        <span className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">does a great job</span> on assignments.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-md mb-4">
                      <h5 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Suggested Revision</h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded">Jane is a diligent student</span> who consistently submits assignments by their deadlines. 
                        <span className="bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded">She demonstrates strong analytical abilities</span> and 
                        <span className="bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded">produces exemplary work</span> throughout her coursework.
                      </p>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Ignore</Button>
                      <Button>Accept Revision</Button>
                    </div>
                  </div>
                  
                  <div className="border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6">
                    <h4 className="font-medium mb-2 flex items-center text-amber-800 dark:text-amber-300">
                      <Info className="w-4 h-4 mr-2" />
                      Vague Statements Detected
                    </h4>
                    
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-md mb-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        Jane has <span className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">many skills</span> that will make her successful. She is 
                        <span className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">very good at programming</span> and 
                        <span className="bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded">works well with others</span>.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-md mb-4">
                      <h5 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Suggested Revision</h5>
                      <p className="text-gray-700 dark:text-gray-300">
                        Jane possesses <span className="bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded">a diverse set of technical and interpersonal skills</span> that will serve her well in graduate studies. She has 
                        <span className="bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded">demonstrated proficiency in Python, Java, and C++, developing a machine learning application</span> that 
                        <span className="bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded">effectively facilitated collaboration among cross-functional team members</span>.
                      </p>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Ignore</Button>
                      <Button>Accept Revision</Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                  <h4 className="font-medium mb-4">Analyze Your Own Text</h4>
                  <Textarea
                    placeholder="Paste any section of your LOR here to get professional tone suggestions..."
                    rows={4}
                    className="resize-y mb-4"
                  />
                  <Button className="w-full md:w-auto">Analyze Text</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Humanizer Tab */}
        <TabsContent value="humanizer" className="mt-2 animate-fade-in">
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-6">
                <h3 className="text-xl font-semibold">AI Humanizer</h3>
                <p className="text-muted-foreground">Make your recommendation letter sound more natural and personal while maintaining professionalism.</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="font-medium mb-4">Input</h4>
                    <div className="mb-4">
                      <Label htmlFor="upload-lor">Upload LOR Document</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Drag and drop your file here, or click to browse</p>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Supported formats: .docx, .pdf, .txt (Max 5MB)</p>
                        <input id="upload-lor" type="file" className="hidden" />
                        <Button variant="outline" size="sm" className="mt-4">Browse Files</Button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="lor-text">Or Paste LOR Text</Label>
                      <Textarea
                        id="lor-text"
                        placeholder="Paste your letter text here..."
                        rows={12}
                        className="resize-y mt-2"
                      />
                    </div>
                    
                    <div className="flex justify-center">
                      <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8">
                        <Wand className="w-4 h-4 mr-2" />
                        Humanize Text
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h4 className="font-medium mb-4">Output</h4>
                    <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-[400px] overflow-auto">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        It is with great pleasure and enthusiasm that I write this letter of recommendation for Jane Smith, whom I have had the privilege of knowing for the past three years as her professor of Advanced Computer Science at University College.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Jane has consistently impressed me with her exceptional analytical abilities and intellectual curiosity. I recall a particular instance during our Neural Networks seminar when she posed a thoughtful question that fundamentally shifted our class discussion. Her ability to connect theoretical concepts with practical applications demonstrates a depth of understanding that is rare among undergraduate students.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Beyond her academic prowess, Jane has shown remarkable leadership qualities. When our department faced challenges with the annual student hackathon, she voluntarily stepped in to coordinate teams and manage resources. The event was ultimately a success, largely due to her organizational skills and calm demeanor under pressure.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        I confidently place Jane in the top 5% of students I have taught in my fifteen-year career. She possesses both the technical skills and personal qualities that will make her an asset to your program, and I give her my highest recommendation without reservation.
                      </p>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="outline">
                        <Upload className="w-4 h-4 mr-2" />
                        Copy Text
                      </Button>
                      <Button>
                        <Download className="w-4 h-4 mr-2" />
                        Download as Document
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
                  <h4 className="font-medium mb-2">Humanizer Settings</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="formality">Formality Level</Label>
                      <select id="formality" className="w-full mt-1 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-sm">
                        <option>Very Formal</option>
                        <option selected>Professional</option>
                        <option>Conversational</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="personality">Personality</Label>
                      <select id="personality" className="w-full mt-1 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-sm">
                        <option>Enthusiastic</option>
                        <option selected>Balanced</option>
                        <option>Reserved</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="specificity">Specificity</Label>
                      <select id="specificity" className="w-full mt-1 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 bg-white dark:bg-gray-800 text-sm">
                        <option>Very Detailed</option>
                        <option selected>Balanced</option>
                        <option>Concise</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateLOR;
