
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Filter, X, CheckCircle2, Eye, Upload, FileX, AlertCircle, Clock, User, School, Send } from "lucide-react";
import StatCircle from "@/components/ui/stat-circle";
import ProgressCircle from "@/components/ui/progress-circle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

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

const statuses = [
  { value: "interested", label: "Interested", color: "bg-blue-500" },
  { value: "planning", label: "Planning to Apply", color: "bg-purple-500" },
  { value: "applying", label: "Applying", color: "bg-yellow-500" },
  { value: "applied", label: "Applied", color: "bg-green-500" },
  { value: "waitlisted", label: "Waitlisted", color: "bg-orange-500" },
  { value: "accepted", label: "Accepted", color: "bg-emerald-500" },
  { value: "denied", label: "Denied", color: "bg-red-500" },
  { value: "enrolled", label: "Enrolled", color: "bg-blue-600" }
];

const applications = [
  {
    id: 1,
    program: "Computer Science",
    degree: "Ph.D.",
    school: "Newcastle University",
    logo: "/placeholder.svg",
    deadline: "No Deadline",
    applicationFees: "FREE",
    eligibility: true,
    admissionFit: "High",
    admissionFitPercentage: 85,
    status: "applied",
    actions: ["Submit with Us", "Remove"],
    requirements: {
      gpa: { min: 3.0, student: 3.5 },
      gre: { min: 310, student: 320 },
      ielts: { min: 6.5, student: 7.5 },
      toefl: { min: 90, student: 100 }
    },
    documents: [
      { name: "Resume/CV", status: "completed" },
      { name: "Statement of Purpose", status: "completed" },
      { name: "Transcripts", status: "pending" },
      { name: "Letters of Recommendation", status: "pending" },
      { name: "English Proficiency", status: "completed" }
    ]
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
    admissionFitPercentage: 60,
    status: "applied",
    actions: ["Submit with Us", "Remove"],
    requirements: {
      gpa: { min: 3.0, student: 3.5 },
      gre: { min: 310, student: 315 },
      ielts: { min: 6.5, student: 7.0 },
      toefl: { min: 90, student: 95 }
    },
    documents: [
      { name: "Resume/CV", status: "completed" },
      { name: "Statement of Purpose", status: "pending" },
      { name: "Transcripts", status: "pending" },
      { name: "Letters of Recommendation", status: "not_started" },
      { name: "English Proficiency", status: "completed" }
    ]
  }
];

const ApplyNow = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expandedDetails, setExpandedDetails] = useState<number[]>([]);
  const [applyYourselfOpen, setApplyYourselfOpen] = useState(false);
  const [submitWithUsOpen, setSubmitWithUsOpen] = useState(false);
  const [activeApplication, setActiveApplication] = useState<number | null>(null);
  const { toast } = useToast();

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

  const handleApplyYourself = (applicationId: number) => {
    setActiveApplication(applicationId);
    setApplyYourselfOpen(true);
  };

  const handleSubmitWithUs = (applicationId: number) => {
    setActiveApplication(applicationId);
    setSubmitWithUsOpen(true);
  };

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    // In a real app, you would update the status in your data store
    toast({
      title: "Status Updated",
      description: `Application status changed to ${newStatus}`,
      variant: "default",
    });
  };

  const getStatusColor = (status: string) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj?.color || "bg-gray-500";
  };

  const getStatusLabel = (status: string) => {
    const statusObj = statuses.find(s => s.value === status);
    return statusObj?.label || "Unknown";
  };

  const getDocumentCompletionPercentage = (documents: any[]) => {
    const completed = documents.filter(doc => doc.status === "completed").length;
    return Math.round((completed / documents.length) * 100);
  };

  return (
    <div className="p-6 animate-fade-in">
      <motion.h1 
        className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Applications
      </motion.h1>

      {/* Filters */}
      <motion.div 
        className="flex flex-wrap gap-4 items-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <Filter className="h-5 w-5 text-gray-500 mr-1" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Order by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter, index) => (
              <motion.button
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.name}
              </motion.button>
            ))}
          </div>
        </div>
        <motion.div 
          className="ml-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Filter className="mr-2 h-4 w-4" />
            Filter My Applications
          </Button>
        </motion.div>
      </motion.div>

      {/* Table Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900/50">
              <TableHead className="font-medium">Program</TableHead>
              <TableHead className="font-medium">Deadline</TableHead>
              <TableHead className="font-medium">Application Fees</TableHead>
              <TableHead className="font-medium">Eligibility</TableHead>
              <TableHead className="font-medium">Admission Fit</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application, index) => (
              <React.Fragment key={application.id}>
                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <motion.img 
                        src={application.logo} 
                        alt={`${application.school} logo`} 
                        className="w-10 h-10 object-contain bg-gray-100 dark:bg-gray-800 rounded-md p-2 border border-gray-200 dark:border-gray-700"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900 dark:text-white">{application.program}</span>
                          <Badge className="ml-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            {application.degree}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{application.school}</div>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-sm">
                    {application.deadline}
                  </TableCell>
                  
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {application.applicationFees}
                  </TableCell>
                  
                  <TableCell>
                    {application.eligibility ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <X className="w-6 h-6 text-red-500" />
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={application.admissionFitPercentage} 
                              className="w-24 h-2"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {application.admissionFit}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Admission Fit Score: {application.admissionFitPercentage}%</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center justify-between">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className={`capitalize ${getStatusColor(application.status).replace('bg-', 'border-')} border`}
                          >
                            <span 
                              className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(application.status)}`}
                            />
                            {getStatusLabel(application.status)}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {statuses.map((status) => (
                            <DropdownMenuItem 
                              key={status.value}
                              onClick={() => handleStatusChange(application.id, status.value)}
                              className="flex items-center gap-2"
                            >
                              <span className={`w-2 h-2 rounded-full ${status.color}`} />
                              {status.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => toggleDetails(application.id)}
                      >
                        {expandedDetails.includes(application.id) ? (
                          <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <X className="h-5 w-5" />
                          </motion.div>
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-purple-600 border-purple-300 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/20"
                        onClick={() => handleApplyYourself(application.id)}
                      >
                        <User className="h-4 w-4 mr-1" />
                        Apply Yourself
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-blue-600 border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/20"
                        onClick={() => handleSubmitWithUs(application.id)}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Submit with Us
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                
                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedDetails.includes(application.id) && (
                    <TableRow>
                      <TableCell colSpan={7} className="p-0">
                        <motion.div 
                          className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h3 className="text-lg font-medium mb-4">Application Details</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Requirements Section */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                              <h4 className="text-md font-medium mb-3 flex items-center">
                                <School className="h-4 w-4 mr-2 text-purple-500" />
                                Requirements
                              </h4>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between mb-1 text-sm">
                                    <span>GPA</span>
                                    <div>
                                      <span className="font-medium">Your: {application.requirements.gpa.student}</span>
                                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                                        Min: {application.requirements.gpa.min}
                                      </span>
                                    </div>
                                  </div>
                                  <Progress 
                                    value={Math.min((application.requirements.gpa.student / 4) * 100, 100)} 
                                    className="h-2"
                                  />
                                </div>

                                <div>
                                  <div className="flex justify-between mb-1 text-sm">
                                    <span>GRE</span>
                                    <div>
                                      <span className="font-medium">Your: {application.requirements.gre.student}</span>
                                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                                        Min: {application.requirements.gre.min}
                                      </span>
                                    </div>
                                  </div>
                                  <Progress 
                                    value={Math.min((application.requirements.gre.student / 340) * 100, 100)} 
                                    className="h-2"
                                  />
                                </div>

                                <div>
                                  <div className="flex justify-between mb-1 text-sm">
                                    <span>IELTS</span>
                                    <div>
                                      <span className="font-medium">Your: {application.requirements.ielts.student}</span>
                                      <span className="text-gray-500 dark:text-gray-400 ml-2">
                                        Min: {application.requirements.ielts.min}
                                      </span>
                                    </div>
                                  </div>
                                  <Progress 
                                    value={Math.min((application.requirements.ielts.student / 9) * 100, 100)} 
                                    className="h-2"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Admission Fit Section */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                              <h4 className="text-md font-medium mb-3">Admission Fit</h4>
                              <div className="flex justify-center">
                                <ProgressCircle 
                                  value={application.admissionFitPercentage}
                                  size="md"
                                  color={application.admissionFitPercentage > 70 ? "green" : "yellow"}
                                  showValue
                                  label="Fit Score"
                                />
                              </div>
                              <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                {application.admissionFitPercentage > 80 ? (
                                  <span className="text-green-600 dark:text-green-400">Excellent match for your profile!</span>
                                ) : application.admissionFitPercentage > 60 ? (
                                  <span className="text-yellow-600 dark:text-yellow-400">Good match with some areas to improve</span>
                                ) : (
                                  <span className="text-red-600 dark:text-red-400">Consider strengthening your application</span>
                                )}
                              </div>
                            </div>

                            {/* Documents Tracker */}
                            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                              <h4 className="text-md font-medium mb-3 flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-blue-500" />
                                Application Documents
                              </h4>
                              <div className="mb-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Completion</span>
                                  <span>{getDocumentCompletionPercentage(application.documents)}%</span>
                                </div>
                                <Progress 
                                  value={getDocumentCompletionPercentage(application.documents)} 
                                  className="h-2"
                                />
                              </div>
                              <div className="space-y-2">
                                {application.documents.map((doc, i) => (
                                  <div key={i} className="flex items-center justify-between text-sm">
                                    <span>{doc.name}</span>
                                    {doc.status === 'completed' && (
                                      <Badge className="bg-green-500">Completed</Badge>
                                    )}
                                    {doc.status === 'pending' && (
                                      <Badge className="bg-yellow-500">Pending</Badge>
                                    )}
                                    {doc.status === 'not_started' && (
                                      <Badge variant="outline">Not Started</Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-3 mt-6">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-700 dark:hover:bg-red-900/20"
                              onClick={() => {
                                toast({
                                  title: "Application Removed",
                                  description: "The application has been removed from your list.",
                                  variant: "destructive",
                                });
                              }}
                            >
                              <FileX className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                            <Button
                              className="bg-purple-600 hover:bg-purple-700"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Application Details",
                                  description: "Viewing full application details",
                                });
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              See More Details
                            </Button>
                          </div>
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Apply Yourself Dialog */}
      <Dialog open={applyYourselfOpen} onOpenChange={setApplyYourselfOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply Yourself</DialogTitle>
            <DialogDescription>
              You are about to apply independently to this program without QuestApply's submission assistance.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260,
                damping: 20 
              }}
            >
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-6">
                <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
            </motion.div>
            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
              You will be responsible for submitting all application materials directly to the institution.
            </p>
          </div>
          <DialogFooter className="flex flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setApplyYourselfOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setApplyYourselfOpen(false);
                toast({
                  title: "Application Started",
                  description: "You can now apply directly to the institution",
                  variant: "default",
                });
              }}
            >
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submit With Us Dialog */}
      <Dialog open={submitWithUsOpen} onOpenChange={setSubmitWithUsOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Submit with QuestApply</DialogTitle>
            <DialogDescription>
              We'll help you prepare and submit your application to increase your chances of acceptance.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {activeApplication !== null && (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Application Requirements</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {applications.find(app => app.id === activeApplication)?.documents.map((doc, i) => (
                      <div 
                        key={i} 
                        className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {doc.status === 'completed' ? 'Already uploaded' : 'Required for submission'}
                          </p>
                        </div>
                        {doc.status === 'completed' ? (
                          <Badge className="bg-green-500">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Button size="sm" variant="outline" className="gap-1">
                            <Upload className="h-3 w-3" />
                            Upload
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="font-medium mb-2">Submission Progress</h4>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={getDocumentCompletionPercentage(
                          applications.find(app => app.id === activeApplication)?.documents || []
                        )} 
                        className="h-2 flex-grow"
                      />
                      <span className="text-sm">
                        {getDocumentCompletionPercentage(
                          applications.find(app => app.id === activeApplication)?.documents || []
                        )}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-200 dark:border-blue-900">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">QuestApply Submission Service</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                        Our experts will review your documents, suggest improvements, and handle the submission process for you. 
                        This service increases your chances of acceptance by ensuring all materials meet the program's expectations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setSubmitWithUsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setSubmitWithUsOpen(false);
                toast({
                  title: "Submission Started",
                  description: "Your application is now in our submission queue",
                });
              }}
            >
              Start Submission Process
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplyNow;
