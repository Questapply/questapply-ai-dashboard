
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import ApplicationStatus from "./ApplicationStatus";
import ApplicationActions from "./ApplicationActions";
import ApplicationDetails from "./ApplicationDetails";

interface ApplicationRowProps {
  application: any;
  expandedDetails: number[];
  toggleDetails: (applicationId: number) => void;
  handleApplyYourself: (applicationId: number) => void;
  handleSubmitWithUs: (applicationId: number) => void;
  handleStatusChange: (applicationId: number, newStatus: string) => void;
}

const ApplicationRow = ({ 
  application, 
  expandedDetails, 
  toggleDetails,
  handleApplyYourself,
  handleSubmitWithUs,
  handleStatusChange
}: ApplicationRowProps) => {
  const isExpanded = expandedDetails.includes(application.id);
  
  return (
    <React.Fragment>
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
          <ApplicationStatus 
            status={application.status}
            applicationId={application.id}
            isExpanded={isExpanded}
            toggleDetails={() => toggleDetails(application.id)}
            onStatusChange={handleStatusChange}
          />
        </TableCell>

        <TableCell>
          <ApplicationActions 
            onApplyYourself={() => handleApplyYourself(application.id)}
            onSubmitWithUs={() => handleSubmitWithUs(application.id)}
          />
        </TableCell>
      </TableRow>
      
      {/* Expanded Details */}
      <ApplicationDetails 
        application={application}
        isExpanded={isExpanded}
      />
    </React.Fragment>
  );
};

export default ApplicationRow;
