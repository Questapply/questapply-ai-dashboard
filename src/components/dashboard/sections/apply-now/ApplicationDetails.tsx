
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileX, Eye, School, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import ProgressCircle from "@/components/ui/progress-circle";

interface ApplicationDetailsProps {
  application: any;
  isExpanded: boolean;
}

export const getDocumentCompletionPercentage = (documents: any[]) => {
  const completed = documents.filter(doc => doc.status === "completed").length;
  return Math.round((completed / documents.length) * 100);
};

const ApplicationDetails = ({ application, isExpanded }: ApplicationDetailsProps) => {
  const { toast } = useToast();
  
  return (
    <AnimatePresence>
      {isExpanded && (
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
                    {application.documents.map((doc: any, i: number) => (
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
  );
};

export default ApplicationDetails;
