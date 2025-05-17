
import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";

interface ApplyYourselfDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplyYourselfDialog = ({ open, onOpenChange }: ApplyYourselfDialogProps) => {
  const { toast } = useToast();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
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
  );
};

export default ApplyYourselfDialog;
