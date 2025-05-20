
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Professor {
  id: number;
  name: string;
  title: string;
  university: string;
  email: string;
  photoUrl: string;
}

interface ProfessorReminderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  professor: Professor;
}

const ProfessorReminderDialog = ({ open, onOpenChange, professor }: ProfessorReminderDialogProps) => {
  const [subject, setSubject] = useState(`Follow up on previous email - ${professor.name}`);
  const [message, setMessage] = useState(
    `Dear ${professor.name},\n\nI hope this email finds you well. I wanted to follow up on my previous email regarding...\n\nBest regards,\n[Your Name]`
  );
  const { toast } = useToast();

  const handleSendReminder = () => {
    // Here we would normally send the actual email
    console.log("Sending reminder to:", professor.email);
    console.log("Subject:", subject);
    console.log("Message:", message);
    
    // Show success message
    toast({
      title: "Reminder email sent",
      description: `Your follow-up email was sent to ${professor.name}`,
      variant: "default",
    });
    
    // Close dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Reminder - Follow up on a previous email</DialogTitle>
          <DialogDescription>
            Send a follow-up email to {professor.name} at {professor.university}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start gap-4 mb-4">
          <img 
            src={professor.photoUrl} 
            alt={professor.name}
            className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700"
          />
          <div>
            <div className="font-semibold">{professor.name}</div>
            <div className="text-sm text-gray-500">{professor.title}</div>
            <div className="text-sm text-gray-500">{professor.email}</div>
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input 
              id="subject" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              className="w-full"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              rows={8} 
              className="w-full"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSendReminder}>Send Reminder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfessorReminderDialog;
