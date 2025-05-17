
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Upload, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { getDocumentCompletionPercentage } from "./ApplicationDetails";

interface SubmitWithUsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeApplication: number | null;
  applications: any[];
}

const SubmitWithUsDialog = ({ 
  open, 
  onOpenChange,
  activeApplication,
  applications
}: SubmitWithUsDialogProps) => {
  const { toast } = useToast();
  const applicationData = applications.find(app => app.id === activeApplication);

  // The application timeline steps
  const applicationSteps = [
    { label: "Prepare Application", status: "completed" },
    { label: "Review Documents", status: "current" },
    { label: "Submission", status: "pending" },
    { label: "Decision", status: "pending" },
    { label: "Post-Decision Requirements", status: "pending" },
    { label: "Enrollment Confirmation", status: "pending" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Submit with QuestApply</DialogTitle>
          <DialogDescription>
            We'll help you prepare and submit your application to increase your chances of acceptance.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {activeApplication !== null && applicationData && (
            <div className="space-y-6">
              {/* Application Timeline */}
              <div className="relative flex justify-between mb-6">
                {applicationSteps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center relative">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                      ${step.status === 'completed' ? 'bg-green-500 text-white' : 
                        step.status === 'current' ? 'bg-blue-500 text-white' : 
                        'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                    <span className="text-xs mt-2 text-center w-24 truncate" title={step.label}>
                      {step.label}
                    </span>
                    
                    {/* Connection line */}
                    {i < applicationSteps.length - 1 && (
                      <div className={`absolute top-4 w-full h-[2px] left-1/2 
                        ${step.status === 'completed' ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Alert message if payment needed */}
              <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-700 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Application will not be processed until payment is received.
                </p>
              </div>
                
              {/* Required Documents */}
              <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Required Documents</h3>
                
                <div className="space-y-3">
                  {applicationData.documents.map((doc: any, i: number) => (
                    <div 
                      key={i} 
                      className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center 
                          ${doc.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20 text-green-500' : 
                            'bg-red-100 dark:bg-red-900/20 text-red-500'}`}>
                          {doc.status === 'completed' ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <X className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {doc.description || (doc.status === 'completed' ? 'Already uploaded' : 'Required for submission')}
                          </p>
                        </div>
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
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Submission Progress</h4>
                    <span className="text-sm font-medium">
                      {getDocumentCompletionPercentage(applicationData.documents)}%
                    </span>
                  </div>
                  <Progress 
                    value={getDocumentCompletionPercentage(applicationData.documents)} 
                    className="h-2"
                  />
                </div>
              </div>
              
              {/* Application & Submission Fee */}
              <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Application & Submission Fees</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Application Fee</span>
                    <span>${applicationData.fees?.application || '75'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Submission Fee</span>
                    <span>${applicationData.fees?.submission || '100'}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total Fee</span>
                    <span>${(applicationData.fees?.application || 75) + (applicationData.fees?.submission || 100)}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Add to cart - ${(applicationData.fees?.application || 75) + (applicationData.fees?.submission || 100)}
                </Button>
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
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
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
  );
};

export default SubmitWithUsDialog;
