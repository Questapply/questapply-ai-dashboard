
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";

interface RecommenderRequestFormProps {
  onBack: () => void;
  onComplete: () => void;
}

const RecommenderRequestForm: React.FC<RecommenderRequestFormProps> = ({ onBack, onComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    deadline: "",
    message: `Dear [Recommender's Name],

I hope this message finds you well. I am applying to [specific program/job] and was wondering if you would be willing to write me a strong letter of recommendation.

I truly value the guidance and mentorship you've provided, and I believe your insights could greatly enhance my application.

If you'd like, I can provide additional information about my qualifications or the program to assist with your letter.

Please let me know if you need anything else.

Thanks,
[Your Name]`
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    type: false,
    deadline: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error on change
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [id]: false
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
    
    // Clear error
    if (errors.type) {
      setErrors(prev => ({
        ...prev,
        type: false
      }));
    }
  };

  const handleSubmit = () => {
    // Validate form
    const newErrors = {
      name: formData.name === "",
      email: formData.email === "",
      type: formData.type === "",
      deadline: formData.deadline === ""
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(error => error)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form
    toast({
      title: "Request Sent",
      description: "Your recommendation request has been sent successfully",
    });
    
    onComplete();
  };

  const handleClear = () => {
    setFormData({
      ...formData,
      message: ""
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Collect information about the recommender:</h2>
        
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4 mb-6">
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            <strong>Note:</strong> Please ensure the Recommender's Name, Recommender's Email, Type of Recommender, and Deadline Date
            are correct, as these are required to send the request.
          </p>
          <p className="text-amber-800 dark:text-amber-300 text-sm mt-2">
            <strong>Deadline Date:</strong> This is the last date your recommender has to submit the recommendation letter. Make sure to set a
            realistic deadline.
          </p>
        </div>
        
        <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-md p-4 mb-6">
          <p className="text-pink-800 dark:text-pink-300 text-sm">
            <strong>Note:</strong> You can submit 3 recommendation requests. You have currently submitted 1 requests. You have 2 request left.
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="flex items-center">
            Recommender's Name <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input 
            id="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        </div>
        
        <div>
          <Label htmlFor="email" className="flex items-center">
            Recommender's Email <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={handleInputChange}
            className={errors.email ? "border-red-500" : ""} 
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        </div>
        
        <div>
          <Label htmlFor="type" className="flex items-center">
            Type of Recommender <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select value={formData.type} onValueChange={handleSelectChange}>
            <SelectTrigger id="type" className={errors.type ? "border-red-500" : ""}>
              <SelectValue placeholder="Select recommender type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professor">Professor</SelectItem>
              <SelectItem value="employer">Employer</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="colleague">Colleague</SelectItem>
              <SelectItem value="advisor">Academic Advisor</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        </div>
        
        <div>
          <Label htmlFor="deadline" className="flex items-center">
            Deadline Date <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input 
            id="deadline" 
            type="date" 
            value={formData.deadline} 
            onChange={handleInputChange}
            className={errors.deadline ? "border-red-500" : ""} 
          />
          {errors.deadline && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        </div>
        
        <div>
          <Label htmlFor="message" className="flex items-center mb-1">
            Template <span className="text-red-500 ml-1">*</span>
          </Label>
          
          <div className="flex justify-end mb-2 gap-2">
            <Button size="sm" variant="outline" className="text-xs px-3 py-1 h-7">Visual</Button>
            <Button size="sm" variant="outline" className="text-xs px-3 py-1 h-7">Code</Button>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-md">
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700 p-2 gap-2 overflow-x-auto">
              {/* Basic text editor toolbar - simplified version */}
              {['B', 'I', 'U', '"', '←→', '•', '⚫', '⚙', '≡', '↩', '↪', '🔗', '✕'].map((item, index) => (
                <Button 
                  key={index} 
                  variant="ghost" 
                  size="sm" 
                  className="w-7 h-7 p-0 min-w-7"
                >
                  {item}
                </Button>
              ))}
            </div>
            <Textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              className="min-h-[200px] border-0 rounded-t-none focus-visible:ring-0 resize-y"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </div>
        <Button onClick={handleSubmit} className="bg-purple-500 hover:bg-purple-600">
          Send Request
        </Button>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Your Requests:</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-300">Recommender Name</th>
                <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-300">Recommender Email</th>
                <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-300">Recommender Type</th>
                <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-300">Deadline Date</th>
                <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                <th className="text-left py-2 px-4 font-medium text-gray-600 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4">Reza</td>
                <td className="py-3 px-4">rezajanjani@gmail.com</td>
                <td className="py-3 px-4">Professor</td>
                <td className="py-3 px-4">2024-12-21</td>
                <td className="py-3 px-4">Sent</td>
                <td className="py-3 px-4">
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">Remind</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecommenderRequestForm;
