
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";
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
              <div className="bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Application Requirements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {applicationData.documents.map((doc: any, i: number) => (
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
                      value={getDocumentCompletionPercentage(applicationData.documents)} 
                      className="h-2 flex-grow"
                    />
                    <span className="text-sm">
                      {getDocumentCompletionPercentage(applicationData.documents)}%
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
