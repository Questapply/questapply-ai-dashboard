
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { applications } from "./apply-now/ApplicationData";
import { useToast } from "@/hooks/use-toast";
import ApplicationFilters from "./apply-now/ApplicationFilters";
import ApplicationRow from "./apply-now/ApplicationRow";
import ApplyYourselfDialog from "./apply-now/ApplyYourselfDialog";
import SubmitWithUsDialog from "./apply-now/SubmitWithUsDialog";

// Fix for CreateLOR.tsx error by introducing missing variant type export
export type ToastVariant = "default" | "destructive";

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
      <ApplicationFilters 
        activeFilters={activeFilters} 
        toggleFilter={toggleFilter} 
      />

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
            {applications.map((application) => (
              <ApplicationRow 
                key={application.id}
                application={application}
                expandedDetails={expandedDetails}
                toggleDetails={toggleDetails}
                handleApplyYourself={handleApplyYourself}
                handleSubmitWithUs={handleSubmitWithUs}
                handleStatusChange={handleStatusChange}
              />
            ))}
          </TableBody>
        </Table>
      </motion.div>

      {/* Apply Yourself Dialog */}
      <ApplyYourselfDialog
        open={applyYourselfOpen}
        onOpenChange={setApplyYourselfOpen}
      />

      {/* Submit With Us Dialog */}
      <SubmitWithUsDialog
        open={submitWithUsOpen}
        onOpenChange={setSubmitWithUsOpen}
        activeApplication={activeApplication}
        applications={applications}
      />
    </div>
  );
};

export default ApplyNow;
