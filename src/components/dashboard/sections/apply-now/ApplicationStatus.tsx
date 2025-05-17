
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ApplicationStatusProps {
  status: string;
  applicationId: number;
  isExpanded: boolean;
  toggleDetails: () => void;
  onStatusChange: (applicationId: number, newStatus: string) => void;
}

export const statuses = [
  { value: "interested", label: "Interested", color: "bg-blue-500" },
  { value: "planning", label: "Planning to Apply", color: "bg-purple-500" },
  { value: "applying", label: "Applying", color: "bg-yellow-500" },
  { value: "applied", label: "Applied", color: "bg-green-500" },
  { value: "waitlisted", label: "Waitlisted", color: "bg-orange-500" },
  { value: "accepted", label: "Accepted", color: "bg-emerald-500" },
  { value: "denied", label: "Denied", color: "bg-red-500" },
  { value: "enrolled", label: "Enrolled", color: "bg-blue-600" }
];

export const getStatusColor = (status: string) => {
  const statusObj = statuses.find(s => s.value === status);
  return statusObj?.color || "bg-gray-500";
};

export const getStatusLabel = (status: string) => {
  const statusObj = statuses.find(s => s.value === status);
  return statusObj?.label || "Unknown";
};

const ApplicationStatus = ({ 
  status, 
  applicationId, 
  isExpanded,
  toggleDetails, 
  onStatusChange 
}: ApplicationStatusProps) => {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={`capitalize ${getStatusColor(status).replace('bg-', 'border-')} border`}
          >
            <span 
              className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(status)}`}
            />
            {getStatusLabel(status)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {statuses.map((statusOption) => (
            <DropdownMenuItem 
              key={statusOption.value}
              onClick={() => onStatusChange(applicationId, statusOption.value)}
              className="flex items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${statusOption.color}`} />
              {statusOption.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-400 hover:text-gray-600"
        onClick={toggleDetails}
      >
        {isExpanded ? (
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
  );
};

export default ApplicationStatus;
