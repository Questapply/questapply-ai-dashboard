import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { RotateCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateLOR = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    universityName: "",
    programName: "",
    relationship: "",
    studentSkills: "",
    letterBody: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    toast({
      title: "LOR Preview Generated",
      description: "Your Letter of Recommendation preview has been generated successfully.",
      variant: "default",  // Changed from 'success' to 'default'
    });
  };

  return (
    <motion.div
      className="min-h-screen p-6 animate-fade-in"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h1
        className="text-2xl font-bold text-gray-900 dark:text-white mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create LOR
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="studentName">Student's Name</Label>
          <Input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter student's full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="universityName">University Name</Label>
          <Input
            type="text"
            id="universityName"
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            placeholder="Enter the university name"
            required
          />
        </div>

        <div>
          <Label htmlFor="programName">Program Name</Label>
          <Input
            type="text"
            id="programName"
            name="programName"
            value={formData.programName}
            onChange={handleChange}
            placeholder="Enter the program name"
            required
          />
        </div>

        <div>
          <Label htmlFor="relationship">Your Relationship to Student</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professor">Professor</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="mentor">Mentor</SelectItem>
              <SelectItem value="advisor">Advisor</SelectItem>
              <SelectItem value="employer">Employer</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="studentSkills">Student's Key Skills</Label>
          <Input
            type="text"
            id="studentSkills"
            name="studentSkills"
            value={formData.studentSkills}
            onChange={handleChange}
            placeholder="Enter key skills separated by commas"
            required
          />
        </div>

        <div>
          <Label htmlFor="letterBody">Letter Body</Label>
          <Textarea
            id="letterBody"
            name="letterBody"
            value={formData.letterBody}
            onChange={handleChange}
            placeholder="Enter the body of the letter"
            rows={6}
            required
          />
        </div>

        <Button disabled={isLoading}>
          {isLoading && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          Generate LOR Preview
        </Button>
      </form>
    </motion.div>
  );
};

export default CreateLOR;
