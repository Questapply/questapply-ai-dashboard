
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CopyCheck, Download, Sparkles } from "lucide-react";

interface EmailCompositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  professorName: string;
  professorEmail: string;
  defaultTemplate?: string;
  isReminder?: boolean;
  onCreateByExpert?: () => void;
  title?: string;
}

const EmailCompositionDialog = ({
  open,
  onOpenChange,
  professorName,
  professorEmail,
  defaultTemplate,
  isReminder = false,
  onCreateByExpert,
  title
}: EmailCompositionDialogProps) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState(
    isReminder 
      ? `Re: Research inquiry - follow up`
      : `Research inquiry from a prospective student`
  );
  const [emailContent, setEmailContent] = useState(
    defaultTemplate || (isReminder
      ? `Dear Professor ${professorName},\n\nI hope this email finds you well. I am writing to follow up on my previous message regarding my interest in your research on [research area]. I understand you must be very busy, but I wanted to check if you had a chance to review my inquiry.\n\nI remain very interested in your work and would appreciate any guidance or feedback you might provide.\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]`
      : `Dear Professor ${professorName},\n\nI hope this email finds you well. My name is [Your Name], and I am a [Your Current Status] student at [Your Institution], majoring in [Your Major].\n\nI am writing to express my interest in your research on [Professor's Research Area]. I have read your paper titled "[Paper Title]", and I found your methodology and conclusions particularly fascinating.\n\nI am currently planning to apply for [Degree Program] in [Field of Study], and I am very interested in the possibility of working with you. I believe that your expertise in [Research Area] aligns perfectly with my research interests.\n\nMay I inquire if you are accepting students for the upcoming academic year? I would be grateful for any guidance or advice you might offer regarding the application process or research opportunities in your lab.\n\nThank you for your time and consideration. I look forward to hearing from you.\n\nBest regards,\n[Your Name]`)
  );
  
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(emailContent);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
    
    toast({
      title: "Email copied to clipboard",
      description: "You can now paste it into your email client."
    });
  };
  
  const handleSend = () => {
    // This would typically send through an email API, but for now we'll just open the mail client
    const emailLink = `mailto:${professorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
    window.open(emailLink);
    
    toast({
      title: "Email opened in your default mail client",
      description: "Review and send your email from your mail application."
    });
  };

  const handleExportAsDoc = () => {
    // This is a simple export to .doc - in a real app, use a library like docx
    const blob = new Blob([emailContent], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Email to Professor ${professorName}.doc`;
    link.click();
    
    toast({
      title: "Email exported as .doc",
      description: "The document has been downloaded to your device."
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {title || (isReminder ? "Send Reminder Email" : "Compose Email")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="to" className="text-right">
              To
            </Label>
            <Input
              id="to"
              value={professorEmail}
              readOnly
              className="col-span-3 bg-gray-50 dark:bg-gray-800"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="message" className="text-right pt-2">
              Message
            </Label>
            <Textarea
              id="message"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="col-span-3 min-h-[300px] font-mono text-sm"
            />
          </div>
        </div>
        
        <DialogFooter className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex gap-2">
            {onCreateByExpert && (
              <Button variant="outline" onClick={onCreateByExpert}>
                <Sparkles className="mr-2 h-4 w-4" />
                Create with AI
              </Button>
            )}
            <Button variant="outline" onClick={handleExportAsDoc}>
              <Download className="mr-2 h-4 w-4" />
              Export as Doc
            </Button>
            <Button variant="outline" onClick={handleCopy}>
              <CopyCheck className={`mr-2 h-4 w-4 ${copied ? "text-green-500" : ""}`} />
              {copied ? "Copied!" : "Copy Email"}
            </Button>
          </div>
          
          <Button onClick={handleSend}>
            Send Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCompositionDialog;
