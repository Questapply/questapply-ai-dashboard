
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { 
  BookOpen, 
  FileText, 
  PenTool, 
  Lightbulb, 
  MessageCircle, 
  Wand2, 
  Calendar,
  User,
  UserPlus,
  FileSearch,
  Users,
  Award,
  GraduationCap,
  CheckCircle2,
  MailOpen,
  Upload
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const lorTabs = [
  { id: "guidance", name: "Guidance", icon: <BookOpen className="w-4 h-4" /> },
  { id: "samples", name: "Samples", icon: <FileSearch className="w-4 h-4" /> },
  { id: "myLORs", name: "My LORs", icon: <FileText className="w-4 h-4" /> },
  { id: "aiImprovement", name: "AI Improvement", icon: <PenTool className="w-4 h-4" /> },
  { id: "highlightStrengths", name: "Highlight Strengths", icon: <Lightbulb className="w-4 h-4" /> },
  { id: "professionalTone", name: "Professional Tone", icon: <MessageCircle className="w-4 h-4" /> },
  { id: "aiHumanizer", name: "AI Humanizer", icon: <Wand2 className="w-4 h-4" /> }
];

const lorCreationSteps = [
  { id: "method", name: "Recommendation Method", icon: <FileText className="w-4 h-4" /> },
  { id: "date", name: "Date", icon: <Calendar className="w-4 h-4" /> },
  { id: "recipient", name: "Recipient", icon: <MailOpen className="w-4 h-4" /> },
  { id: "candidate", name: "Candidate", icon: <User className="w-4 h-4" /> },
  { id: "recommender", name: "Recommender", icon: <UserPlus className="w-4 h-4" /> },
  { id: "generalAssessment", name: "General Assessment", icon: <Award className="w-4 h-4" /> },
  { id: "comparisonPeers", name: "Comparison with Peers", icon: <Users className="w-4 h-4" /> },
  { id: "skillsTraits", name: "Skills And Traits", icon: <Award className="w-4 h-4" /> },
  { id: "schoolProgram", name: "School/Program", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "finalEndorsement", name: "Final Endorsement", icon: <CheckCircle2 className="w-4 h-4" /> }
];

const sampleLORs = [
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
  },
  {
    title: "Graduate School Recommendation",
    author: "Dr. Robert Chang",
    position: "Associate Professor, Physics",
    institution: "California Institute of Technology",
    excerpt: "Ms. Wong's exceptional analytical abilities and dedication to scientific inquiry make her an outstanding candidate for your PhD program...",
    type: "Academic"
  },
  {
    title: "Teaching Excellence",
    author: "Prof. Melissa Rodriguez",
    position: "Education Department Chair",
    institution: "University of Michigan",
    excerpt: "Throughout his student teaching experience, Thomas displayed exceptional classroom management skills and innovative teaching methods...",
    type: "Professional"
  }
];

const CreateLOR = () => {
  const [activeTab, setActiveTab] = useState("guidance");
  const [activeStep, setActiveStep] = useState("method");

  // For My LORs creation
  const form = useForm({
    defaultValues: {
      recommendationMethod: "",
      date: "",
      recipientKnown: "yes",
      recipientName: "",
      recipientInstitution: "",
      candidateFirstName: "",
      candidateLastName: "",
      acquaintanceLength: "",
      relationship: "",
      relationshipDetail: "",
      candidateBackground: "",
      recommenderName: "",
      recommenderTitle: "",
      recommenderInstitution: "",
      recommenderAddress: "",
      recommenderEmail: "",
      recommenderPhone: "",
    },
  });

  const renderMyLORsContent = () => {
    switch(activeStep) {
      case "method":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              Select Your Recommendation Method
            </motion.h2>
            
            <Form {...form}>
              <form className="space-y-6">
                <FormField
                  control={form.control}
                  name="recommendationMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-lg text-purple-700 dark:text-purple-300">
                        How do you want to handle your recommendation letter?
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-3"
                        >
                          <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center space-x-3 border p-4 rounded-lg"
                          >
                            <RadioGroupItem value="write" id="write" />
                            <label htmlFor="write" className="cursor-pointer flex-1">
                              Write the recommendation letter yourself.
                            </label>
                          </motion.div>
                          
                          <motion.div 
                            whileHover={{ scale: 1.01 }}
                            className="flex items-center space-x-3 border p-4 rounded-lg"
                          >
                            <RadioGroupItem value="ask" id="ask" />
                            <label htmlFor="ask" className="cursor-pointer flex-1">
                              Ask someone else to recommend you.
                            </label>
                          </motion.div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between pt-4">
                  <Button variant="outline">Close</Button>
                  <Button 
                    onClick={() => setActiveStep("date")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save and Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        );
        
      case "date":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              1) Date
            </motion.h2>
            
            <Form {...form}>
              <form className="space-y-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="date" 
                          placeholder="Select date" 
                          className="w-full text-base p-4 h-12"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep("method")}
                  >
                    Back
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline">Clear</Button>
                    <Button 
                      onClick={() => setActiveStep("recipient")}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Save and Continue
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        );
        
      case "recipient":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              2) Recipient
            </motion.h2>
            
            <Form {...form}>
              <form className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg">Do you know the name of the individual who will be the recipient of this letter?</h3>
                  
                  <FormField
                    control={form.control}
                    name="recipientKnown"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="yes" />
                              <label htmlFor="yes">Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="no" />
                              <label htmlFor="no">No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="recipientInstitution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name of company or institution the recipient works for:</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., MIT" 
                            className="w-full"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep("date")}
                  >
                    Back
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline">Clear</Button>
                    <Button 
                      onClick={() => setActiveStep("candidate")}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Save and Continue
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        );

      case "candidate":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              3) Candidate
            </motion.h2>
            
            <Form {...form}>
              <form className="space-y-6">
                <div className="space-y-5">
                  <h3 className="text-lg">Who are you recommending?</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="candidateFirstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., John" 
                              className="w-full"
                              {...field} 
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground mt-1">Example: John</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="candidateLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Doe" 
                              className="w-full"
                              {...field} 
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground mt-1">Example: Doe</p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="acquaintanceLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length of Acquaintance</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 3 years" 
                            className="w-full"
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">Example: 3 years</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="relationship"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Relationship with Candidate</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
                              <option value="">Select relationship</option>
                              <option value="professor">Professor</option>
                              <option value="advisor">Academic Advisor</option>
                              <option value="supervisor">Research Supervisor</option>
                              <option value="employer">Employer</option>
                              <option value="internship">Internship Supervisor</option>
                              <option value="other">Other</option>
                            </select>
                          </FormControl>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="relationshipDetail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specify your relationship with the candidate</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., I was their professor for Advanced Algorithms" 
                            className="w-full"
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">Example: Mentor</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="candidateBackground"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How Do You Know the Candidate?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., I was their professor in the Computer Science department..." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">
                          Example: supervised the candidate during their internship at XYZ company, where they demonstrated exceptional problem-solving skills.
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep("recipient")}
                  >
                    Back
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline">Clear</Button>
                    <Button 
                      onClick={() => setActiveStep("recommender")}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Save and Continue
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        );

      case "recommender":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              4) Recommender
            </motion.h2>
            
            <Form {...form}>
              <form className="space-y-6">
                <div className="space-y-5">
                  <h3 className="text-lg">Who is the person providing the references?</h3>
                  <p>Sincerely,</p>
                  
                  <FormField
                    control={form.control}
                    name="recommenderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Dr. John Smith" 
                            className="w-full"
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">Example: Doe</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="recommenderTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Professor of Computer Science" 
                            className="w-full"
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">Example: Associate Professor</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="recommenderInstitution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company or Institution Affiliated With</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Stanford University" 
                            className="w-full"
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">Example: Harvard University, Department of Computer Science</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="recommenderAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Full address" 
                            className="w-full"
                            {...field} 
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground mt-1">Example: 123 Harvard Yard Cambridge, MA 02138</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="recommenderEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Email address" 
                            className="w-full"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="recommenderPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Phone number" 
                            className="w-full"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveStep("candidate")}
                  >
                    Back
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline">Clear</Button>
                    <Button 
                      onClick={() => setActiveStep("generalAssessment")}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Save and Continue
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        );
        
      case "generalAssessment":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              5) General Assessment
            </motion.h2>
            
            <div className="space-y-6">
              <div className="relative flex flex-wrap items-center gap-2">
                <p>I highly recommend</p>
                <Input className="w-auto inline-flex flex-grow-0 min-w-[150px] max-w-[200px]" placeholder="Name" />
                <p>for</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>PhD Program</option>
                  <option>Master's Program</option>
                  <option>Undergraduate Program</option>
                  <option>Research Position</option>
                  <option>Teaching Position</option>
                </select>
                <p>as</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Select one</option>
                  <option>a student</option>
                  <option>a researcher</option>
                  <option>a candidate</option>
                </select>
                <p>has demonstrated</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>exceptional academic performance</option>
                  <option>outstanding research abilities</option>
                  <option>remarkable leadership skills</option>
                  <option>excellent analytical thinking</option>
                </select>
                <p>and</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>innovative thinking</option>
                  <option>technical expertise</option>
                  <option>dedication to excellence</option>
                  <option>collaborative spirit</option>
                </select>
                <p>throughout</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Select one</option>
                  <option>their academic career</option>
                  <option>our professional relationship</option>
                  <option>their time in my class</option>
                  <option>their research project</option>
                </select>
                <p>time at</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <Input className="w-auto inline-flex flex-grow-0 min-w-[150px] max-w-[200px]" placeholder="Institution" />
                <p>.</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Select one</option>
                  <option>Their academic rigor</option>
                  <option>Their research methodology</option>
                  <option>Their innovative approach</option>
                  <option>Their commitment to excellence</option>
                </select>
                <p>and</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>problem-solving</option>
                  <option>communication skills</option>
                  <option>technical expertise</option>
                  <option>leadership abilities</option>
                </select>
                <p>and</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>creative problem-solving</option>
                  <option>critical thinking</option>
                  <option>professional demeanor</option>
                  <option>work ethic</option>
                </select>
                <p>make</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Select one</option>
                  <option>them</option>
                  <option>him</option>
                  <option>her</option>
                </select>
                <p>an ideal fit for your program.</p>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveStep("recommender")}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">Clear</Button>
                  <Button 
                    onClick={() => setActiveStep("comparisonPeers")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "comparisonPeers":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              6) Comparison with Peers
            </motion.h2>
            
            <div className="space-y-6">
              <div className="relative flex flex-wrap items-center gap-2">
                <Input className="w-auto inline-flex flex-grow-0 min-w-[150px] max-w-[200px]" placeholder="Name" />
                <p>ranks among the</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Top 1%</option>
                  <option>Top 5%</option>
                  <option>Top 10%</option>
                  <option>Top 25%</option>
                </select>
                <p>of</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Students</option>
                  <option>Researchers</option>
                  <option>Professionals</option>
                  <option>Candidates</option>
                </select>
                <p>. I have</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Taught</option>
                  <option>Mentored</option>
                  <option>Worked with</option>
                  <option>Supervised</option>
                </select>
                <p>in my</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>3 years</option>
                  <option>5 years</option>
                  <option>10 years</option>
                  <option>15 years</option>
                  <option>20+ years</option>
                </select>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveStep("generalAssessment")}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">Clear</Button>
                  <Button 
                    onClick={() => setActiveStep("skillsTraits")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "skillsTraits":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              7) Skills And Traits
            </motion.h2>
            
            <div className="space-y-6">
              <div className="relative flex flex-wrap items-center gap-2">
                <Input className="w-auto inline-flex flex-grow-0 min-w-[150px] max-w-[200px]" placeholder="Name" />
                <p>has consistently demonstrated exceptional</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Problem-solving</option>
                  <option>Critical thinking</option>
                  <option>Research methodology</option>
                  <option>Technical skills</option>
                </select>
                <p>,</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Time management</option>
                  <option>Leadership</option>
                  <option>Teamwork</option>
                  <option>Communication</option>
                </select>
                <p>, and</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Curiosity</option>
                  <option>Creativity</option>
                  <option>Persistence</option>
                  <option>Initiative</option>
                </select>
                <p>throughout their</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Throughout their coursework</option>
                  <option>During their internship</option>
                  <option>In their research project</option>
                  <option>In their class participation</option>
                </select>
                <p>. Their ability to</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Solve complex problems</option>
                  <option>Think critically</option>
                  <option>Communicate effectively</option>
                  <option>Lead teams</option>
                </select>
                <p>and</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Work collaboratively</option>
                  <option>Adapt to new situations</option>
                  <option>Learn quickly</option>
                  <option>Apply theoretical concepts</option>
                </select>
                <p>sets them apart from their peers, making them an outstanding candidate for</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Graduate program</option>
                  <option>Research position</option>
                  <option>Teaching fellowship</option>
                  <option>Professional advancement</option>
                </select>
              </div>
              
              <div className="mt-8">
                <h3 className="text-sm text-gray-500 mb-2">Example:</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-bold">Reza</span> has consistently demonstrated exceptional <span className="font-bold">Problem-solving, Time management</span>, and <span className="font-bold">Dedication</span> throughout their <span className="font-bold">coursework</span>. Their ability to <span className="font-bold">Lead teams effectively</span> and <span className="font-bold">Work collaboratively</span> sets them apart from their peers, making them an outstanding candidate for the <span className="font-bold">Graduate program</span>.
                </p>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveStep("comparisonPeers")}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">Clear</Button>
                  <Button 
                    onClick={() => setActiveStep("schoolProgram")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "schoolProgram":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              8) School/Program
            </motion.h2>
            
            <div className="space-y-6">
              <div className="relative flex flex-wrap items-center gap-2">
                <p>I strongly believe that</p>
                <Input className="w-auto inline-flex flex-grow-0 min-w-[150px] max-w-[200px]" placeholder="Name" />
                <p>would be an excellent fit for</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Harvard University</option>
                  <option>Stanford University</option>
                  <option>MIT</option>
                  <option>UC Berkeley</option>
                </select>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <p>, given their</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Academic excellence</option>
                  <option>Research background</option>
                  <option>Professional experience</option>
                  <option>Technical expertise</option>
                </select>
                <p>,</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Leadership qualities</option>
                  <option>Communication skills</option>
                  <option>Critical thinking</option>
                  <option>Innovative mindset</option>
                </select>
                <p>and</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Research potential</option>
                  <option>Teaching abilities</option>
                  <option>Industry connections</option>
                  <option>International perspective</option>
                </select>
                <p>. Their passion for</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Computer Science and Engineering</option>
                  <option>Physics and Mathematics</option>
                  <option>Business Administration</option>
                  <option>Biological Sciences</option>
                </select>
                <p>and ability to</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Lead collaborative projects</option>
                  <option>Conduct independent research</option>
                  <option>Solve complex problems</option>
                  <option>Create innovative solutions</option>
                </select>
                <p>make them an ideal candidate for your</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Select one</option>
                  <option>PhD program</option>
                  <option>Master's program</option>
                  <option>Research fellowship</option>
                  <option>Faculty position</option>
                </select>
              </div>
              
              <div className="mt-8">
                <h3 className="text-sm text-gray-500 mb-2">Example:</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  I strongly believe that <span className="font-bold">Reza</span> would be an excellent fit for <span className="font-bold">Harvard University</span>, given their <span className="font-bold">Academic excellence, Leadership qualities</span> and <span className="font-bold">Research potential</span>. Their passion for <span className="font-bold">Computer Science</span> and ability to <span className="font-bold">Lead collaborative projects</span> make them an ideal candidate for your <span className="font-bold">PhD program</span>.
                </p>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveStep("skillsTraits")}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">Clear</Button>
                  <Button 
                    onClick={() => setActiveStep("finalEndorsement")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "finalEndorsement":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-2xl font-bold mb-6"
            >
              9) Final Endorsement
            </motion.h2>
            
            <div className="space-y-6">
              <div className="relative flex flex-wrap items-center gap-2">
                <p>In conclusion, I</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Strongly</option>
                  <option>Highly</option>
                  <option>Enthusiastically</option>
                  <option>Without reservation</option>
                </select>
                <p>recommend</p>
                <Input className="w-auto inline-flex flex-grow-0 min-w-[150px] max-w-[200px]" placeholder="Name" />
                <p>for</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>PhD program</option>
                  <option>Master's program</option>
                  <option>Research fellowship</option>
                  <option>Faculty position</option>
                </select>
                <p>, as I believe they will</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Contribute meaningfully to the academic community</option>
                  <option>Excel in their studies</option>
                  <option>Make significant research contributions</option>
                  <option>Become a leader in their field</option>
                </select>
                <p>. I am confident that their</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Academic rigor</option>
                  <option>Intellectual curiosity</option>
                  <option>Analytical skills</option>
                  <option>Problem-solving abilities</option>
                </select>
                <p>,</p>
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Research skills</option>
                  <option>Technical expertise</option>
                  <option>Practical knowledge</option>
                  <option>Theoretical understanding</option>
                </select>
                <p>and</p>
              </div>
              
              <div className="relative flex flex-wrap items-center gap-2">
                <select className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2">
                  <option>Communication skills</option>
                  <option>Leadership abilities</option>
                  <option>Collaborative nature</option>
                  <option>Professional ethics</option>
                </select>
                <p>will allow them to excel in this opportunity.</p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-sm text-gray-500 mb-2">Example:</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  In conclusion, I <span className="font-bold">strongly</span> recommend <span className="font-bold">Reza</span> for the <span className="font-bold">PhD program</span>, as I believe they will <span className="font-bold">excel in research and innovation</span>. I am confident that their <span className="font-bold">academic rigor, research skills</span>, and <span className="font-bold">leadership qualities</span> will allow them to excel in this opportunity.
                </p>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveStep("schoolProgram")}
                >
                  Back
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">Clear</Button>
                  <Button 
                    onClick={() => setActiveTab("guidance")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Save and Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Select a step to continue</div>;
    }
  };

  const renderGuidance = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-purple-600 dark:bg-purple-700 text-white rounded-xl p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Letter of Recommendation Guidance</h2>
            <p className="text-lg font-light">Elements of an Effective Recommendation Letter</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 space-y-12 pl-4">
        {referenceSections.map((section, index) => (
          <motion.div 
            key={index} 
            className="flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative mr-8">
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg px-4 py-2 font-semibold">
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
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <Button
          className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300 px-8"
          onClick={() => setActiveTab("myLORs")}
        >
          Create a Letter of Recommendation
        </Button>
      </div>
    </div>
  );

  const renderSamples = () => (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="w-1/3 min-w-[250px]">
          <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
            <option value="">Degree Level</option>
            <option value="bachelor">Bachelor's</option>
            <option value="master">Master's</option>
            <option value="phd">PhD</option>
          </select>
        </div>
        <div className="w-1/3 min-w-[250px]">
          <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
            <option value="">Field of Study</option>
            <option value="cs">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
            <option value="medicine">Medicine</option>
            <option value="arts">Arts & Humanities</option>
          </select>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sample Letters of Recommendation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleLORs.map((sample, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            <div className="h-2 bg-gradient-to-r from-purple-600 to-purple-400"></div>
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
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button variant="outline" className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600">
          Load More Samples
        </Button>
      </div>
    </div>
  );

  const renderAiImprovement = () => (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <PenTool className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">AI Improvement</h2>
              <p className="text-lg font-light">Enhance your letter of recommendation with AI suggestions</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Introduction and Relationship</h3>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              It is with great enthusiasm that I write this letter of recommendation for John Doe. I have known John for over three years as his professor in multiple advanced computer science courses at MIT, including Algorithm Design and Machine Learning Applications.
            </p>
            
            <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">AI Suggestion</h4>
              <p className="text-gray-700 dark:text-gray-300">
                It is with genuine enthusiasm that I write this letter of recommendation for John Doe. I have had the privilege of knowing John for over three years in my capacity as his professor for several advanced computer science courses at MIT, including Algorithm Design (CS 402) and Machine Learning Applications (CS 550), where he consistently demonstrated exceptional aptitude.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">Reject</Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Accept</Button>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Academic and Professional Achievements</h3>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              During his time in my courses, John has consistently ranked in the top 5% of his peers. His final project in the Machine Learning course was particularly impressive, as he developed a novel approach to natural language processing that showed great promise.
            </p>
            
            <div className="mt-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">AI Suggestion</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Throughout his academic journey in my courses, John has consistently distinguished himself, ranking in the top 5% of his cohort. His academic excellence was particularly evident in his final project for the Machine Learning course, where he developed a groundbreaking approach to natural language processing that incorporated both transformer architectures and reinforcement learning techniques. This innovative methodology not only earned him the highest grade in the class but also garnered attention from our department's research group, who are exploring opportunities to build upon his work.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">Reject</Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">Accept</Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button className="bg-purple-600 hover:bg-purple-700 px-6">
              Save All Changes and Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHighlightStrengths = () => (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Lightbulb className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Highlight Student Strengths</h2>
              <p className="text-lg font-light">Transform simple observations into professional statements</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Identify Key Strengths</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Answer a few questions about the student to generate professionally written paragraphs highlighting their strengths.
          </p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                What is the student's greatest academic skill?
              </label>
              <Input placeholder="e.g., Problem solving, critical thinking, research methodology" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Describe a specific achievement or project that demonstrates this skill.
              </label>
              <Textarea placeholder="e.g., Their final research project on machine learning algorithms..." className="min-h-[100px]" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                What personal quality makes this student stand out from peers?
              </label>
              <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
                <option>Select a quality</option>
                <option>Leadership</option>
                <option>Initiative</option>
                <option>Perseverance</option>
                <option>Teamwork</option>
                <option>Adaptability</option>
                <option>Creative thinking</option>
                <option>Other (specify below)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                How has the student demonstrated growth or improvement?
              </label>
              <Textarea placeholder="e.g., Over the course of our time working together..." className="min-h-[100px]" />
            </div>
            
            <Button className="bg-orange-500 hover:bg-orange-600 w-full">
              Generate Professional Paragraphs
            </Button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">AI Generated Strengths Highlights</h3>
          
          <div className="space-y-6">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-orange-700 dark:text-orange-400 mb-2">Academic Excellence</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Maria demonstrates exceptional analytical prowess, particularly in the realm of problem-solving and algorithm optimization. Her final research project on machine learning algorithms for natural language processing showcased not only her technical expertise but also her ability to synthesize complex information across multiple domains. She approached this challenging task with remarkable clarity and methodical precision, ultimately developing a solution that surpassed the performance metrics of established models in the field.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">Revise</Button>
                <Button variant="outline" size="sm">Copy</Button>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Use in Letter</Button>
              </div>
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-orange-700 dark:text-orange-400 mb-2">Personal Growth</h4>
              <p className="text-gray-700 dark:text-gray-300">
                What truly distinguishes Maria from her peers is her remarkable perseverance in the face of challenges. Over the course of our two years working together, I have observed her transform from a talented but cautious student into a confident researcher who embraces complexity. When confronted with obstacles in her research, Maria exhibits a rare combination of tenacity and adaptability—she neither gives up nor rigidly adheres to unsuccessful approaches, instead thoughtfully iterating on her methods until she achieves breakthrough results.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">Revise</Button>
                <Button variant="outline" size="sm">Copy</Button>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">Use in Letter</Button>
              </div>
            </div>
            
            <Button className="bg-orange-500 hover:bg-orange-600 w-full">
              Generate More Paragraphs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfessionalTone = () => (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <MessageCircle className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Professional Tone Suggestions</h2>
              <p className="text-lg font-light">Elevate the language and impact of your recommendation</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Tone Analysis</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Paste a section of your recommendation letter below to receive suggestions for improving its professional tone and impact.
          </p>
          
          <div>
            <Textarea 
              placeholder="Paste your text here..." 
              className="min-h-[150px]"
              defaultValue="John is good at coding. He always gets his work done on time and helps others. I think he would be a good addition to your program because he is smart and hardworking."
            />
            <Button className="mt-4 bg-teal-600 hover:bg-teal-700 w-full">
              Analyze & Suggest Improvements
            </Button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Professional Tone Suggestions</h3>
          
          <div className="space-y-6">
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-teal-700 dark:text-teal-400 mb-2">Original Text</h4>
              <p className="text-gray-700 dark:text-gray-300">
                John is good at coding. He always gets his work done on time and helps others. I think he would be a good addition to your program because he is smart and hardworking.
              </p>
            </div>
            
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-teal-700 dark:text-teal-400 mb-2">Enhanced Professional Version</h4>
              <p className="text-gray-700 dark:text-gray-300">
                John demonstrates exceptional proficiency in software development, consistently exhibiting technical expertise that places him among the top performers in his cohort. His commitment to meeting deadlines is exemplary, and he routinely extends his knowledge to assist colleagues facing technical challenges. Based on his demonstrated intellectual capacity and unparalleled work ethic, I am confident that John would make a significant contribution to your program and emerge as a standout member of your academic community.
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">Revise</Button>
                <Button variant="outline" size="sm">Copy</Button>
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700">Use in Letter</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Key Improvements</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <h5 className="font-medium text-teal-700 dark:text-teal-400 mb-2">Vocabulary Elevation</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Replaced basic descriptors with precise, professional terminology.
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-red-500 line-through">good at coding</span> → 
                    <span className="text-green-600 ml-2">exceptional proficiency in software development</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <h5 className="font-medium text-teal-700 dark:text-teal-400 mb-2">Evidence-Based Language</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Added context and specificity to strengthen claims.
                  </p>
                  <div className="mt-2 text-sm">
                    <span className="text-red-500 line-through">smart and hardworking</span> → 
                    <span className="text-green-600 ml-2">demonstrated intellectual capacity and unparalleled work ethic</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="bg-teal-600 hover:bg-teal-700 w-full">
              Analyze Another Section
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAiHumanizer = () => (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Wand2 className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">AI Humanizer</h2>
              <p className="text-lg font-light">Transform AI-generated text into natural, authentic writing</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <Upload className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Your Letter</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Upload a .docx or .pdf file containing your letter
              </p>
              <Button variant="outline">Select File</Button>
            </div>
            
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Paste Your Letter</h3>
              <Textarea 
                placeholder="Paste your LOR content here..."
                className="min-h-[180px]"
              />
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Humanization Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Writing Style
                </label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
                  <option>Academic</option>
                  <option>Professional</option>
                  <option>Conversational</option>
                  <option>Enthusiastic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Personalization Level
                </label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
                  <option>High - Very Personal</option>
                  <option>Medium - Balanced</option>
                  <option>Low - Formal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Include Specific Details
                </label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2">
                  <option>Keep All Details</option>
                  <option>Enhance Existing Details</option>
                  <option>Focus on Key Points</option>
                </select>
              </div>
            </div>
            
            <Button className="bg-indigo-600 hover:bg-indigo-700 w-full mt-6">
              Humanize My Letter
            </Button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Original AI Text</h4>
              <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400">
                <p>I am writing to recommend John Smith for admission to your Master's program in Computer Science. John was my student in Advanced Algorithms and Database Systems. He performed excellently in both courses, achieving grades of A and A-. His final project on query optimization was impressive.</p>
                <p>John possesses strong analytical skills and programming abilities. He is hardworking and consistently meets deadlines. His work is thorough and demonstrates attention to detail. John also works well in team settings and has good communication skills.</p>
                <p>I believe John would be successful in your program due to his technical skills and academic performance. He has the necessary background and motivation to excel in graduate studies.</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800/30 rounded-lg p-4">
              <h4 className="text-md font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Humanized Version</h4>
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                <p>It is with genuine enthusiasm that I recommend John Smith for admission to your Master's program in Computer Science. Having taught John in both my Advanced Algorithms course and the challenging Database Systems seminar last year, I was consistently impressed by his intellectual curiosity and analytical approach. He not only earned outstanding grades (A and A- respectively) but, more importantly, he approached complex problems with a refreshing combination of methodical thinking and creative insights.</p>
                <p>What particularly stands out in my memory is John's final project on query optimization, where he went beyond the basic requirements by incorporating real-world performance constraints that showed remarkable practical understanding. During project discussions, he would ask thoughtful questions that often opened up new avenues of exploration for the entire class.</p>
                <p>Beyond his technical prowess, John has that rare ability to translate complex concepts into clear explanations—a skill I observed firsthand when he helped peers who were struggling with particularly difficult assignments. His collaborative nature, combined with his meticulous attention to detail and unfailing reliability with deadlines, makes him not just a strong individual contributor but someone who elevates the work of those around him.</p>
                <p>Based on our interactions over the past two years, I am confident that John will bring both the technical foundation and the intellectual curiosity necessary to thrive in your program's rigorous environment. I would welcome the opportunity to discuss his qualifications further.</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">Re-Humanize</Button>
                <Button variant="outline" size="sm">Copy</Button>
                <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Download</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">What Was Improved</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    1
                  </div>
                  <h5 className="font-medium text-gray-800 dark:text-gray-200">Added Personal Observations</h5>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Incorporated specific memories and interactions that show genuine familiarity with the student
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    2
                  </div>
                  <h5 className="font-medium text-gray-800 dark:text-gray-200">Varied Sentence Structure</h5>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Created more natural rhythm with diverse sentence patterns and transitional phrases
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-850 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    3
                  </div>
                  <h5 className="font-medium text-gray-800 dark:text-gray-200">Emotional Authenticity</h5>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Incorporated appropriate enthusiasm and professional warmth that feels genuinely human
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case "guidance":
        return renderGuidance();
      case "samples":
        return renderSamples();
      case "myLORs":
        return renderMyLORsContent();
      case "aiImprovement":
        return renderAiImprovement();
      case "highlightStrengths":
        return renderHighlightStrengths();
      case "professionalTone":
        return renderProfessionalTone();
      case "aiHumanizer":
        return renderAiHumanizer();
      default:
        return <div>No content available</div>;
    }
  };

  return (
    <div className="animate-fade-in">
      <Tabs 
        defaultValue="guidance" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="relative border-b border-gray-200 dark:border-gray-700">
          <TabsList className="w-full h-auto px-2 py-1 bg-transparent overflow-x-auto flex justify-start">
            {lorTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`
                  px-4 py-3 flex items-center gap-2 whitespace-nowrap relative font-medium transition-all duration-300
                  ${activeTab === tab.id ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
                `}
              >
                {tab.icon}
                {tab.name}
                {activeTab === tab.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400" 
                    layoutId="activeLorTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Content */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {/* Content based on active tab */}
          <div className="p-4">
            {renderTabContent()}
          </div>
        </motion.div>
      </Tabs>

      {/* Mobile Step Selection when on myLORs tab */}
      {activeTab === "myLORs" && (
        <div className="md:hidden fixed bottom-4 left-0 right-0 mx-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-3 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>Step {activeStep}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-2"><path d="m6 9 6 6 6-6"/></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {lorCreationSteps.map((step) => (
                <DropdownMenuItem key={step.id} onClick={() => setActiveStep(step.id)}>
                  <div className="flex items-center gap-2">
                    {step.icon}
                    <span>{step.name}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Desktop Steps Sidebar when on myLORs tab */}
      {activeTab === "myLORs" && (
        <div className="hidden md:flex fixed left-4 top-1/2 transform -translate-y-1/2 flex-col gap-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-2 z-50">
          {lorCreationSteps.map((step, index) => (
            <Button
              key={step.id}
              variant={activeStep === step.id ? "default" : "ghost"}
              className={`flex items-center gap-2 justify-start px-3 ${activeStep === step.id ? 'bg-purple-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}
              onClick={() => setActiveStep(step.id)}
              size="sm"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 text-xs font-bold">
                {index + 1}
              </div>
              <span className="text-sm">{step.name}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateLOR;
