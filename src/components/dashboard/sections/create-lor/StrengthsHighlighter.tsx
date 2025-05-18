
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const StrengthsHighlighter = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4">Highlight Student Strengths</h2>
        <p className="mb-4">Answer these questions to help identify and articulate the student's key strengths.</p>
      </div>

      <div className="space-y-8">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Academic Excellence</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="academic-strength">What is the student's greatest academic strength?</Label>
              <Input 
                id="academic-strength"
                placeholder="E.g., analytical thinking, research methodology"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="academic-achievement">Describe a specific academic achievement that stands out:</Label>
              <Textarea 
                id="academic-achievement"
                placeholder="E.g., Their research paper on quantum computing was published in..."
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Leadership & Teamwork</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="leadership-example">Provide an example of the student's leadership abilities:</Label>
              <Textarea 
                id="leadership-example"
                placeholder="E.g., Led a team of 5 students to complete..."
                className="mt-2"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="teamwork-skill">How does the student contribute in team settings?</Label>
              <Textarea 
                id="teamwork-skill"
                placeholder="E.g., Always ensures all team members are heard and incorporated in decisions..."
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Character & Work Ethic</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="personal-qualities">What personal qualities make this student exceptional?</Label>
              <Input 
                id="personal-qualities"
                placeholder="E.g., perseverance, integrity, curiosity"
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="challenge-example">Describe how the student overcame a significant challenge:</Label>
              <Textarea 
                id="challenge-example"
                placeholder="E.g., When faced with a setback in their research, they..."
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
        </div>

        <Button 
          className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
        >
          Generate Strengths Summary
        </Button>
      </div>
    </div>
  );
};

export default StrengthsHighlighter;
