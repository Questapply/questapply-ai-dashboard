
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FeedbackQuestion {
  id: string;
  question: string;
  category: string;
}

// These are the five key feedback questions
const feedbackQuestions: FeedbackQuestion[] = [
  {
    id: "q1",
    question: "How satisfied are you with QuestApply's AI-powered recommendation engine for finding suitable programs?",
    category: "Application Process",
  },
  {
    id: "q2",
    question: "What features would make your application preparation with QuestApply more efficient?",
    category: "User Needs",
  },
  {
    id: "q3",
    question: "How helpful has the professor recommendation tool been for your academic connections?",
    category: "Chat Interactions",
  },
  {
    id: "q4",
    question: "What challenges do you face when tracking multiple application deadlines?",
    category: "Dashboard Activity",
  },
  {
    id: "q5",
    question: "Based on your profile, would you prefer more personalized program matches or broader search options?",
    category: "User Profile",
  },
];

interface FeedbackPromptProps {
  show: boolean;
  onClose: () => void;
}

const FeedbackPrompt = ({ show, onClose }: FeedbackPromptProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [question, setQuestion] = useState<FeedbackQuestion | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState<number>(0);
  
  // Select a random question when the component mounts
  useEffect(() => {
    if (show) {
      // Get seen questions from local storage
      const seenQuestions = JSON.parse(localStorage.getItem("seenFeedbackQuestions") || "[]");
      
      // Filter out questions that have been seen
      const unseenQuestions = feedbackQuestions.filter(q => !seenQuestions.includes(q.id));
      
      // If all questions have been seen, reset
      const availableQuestions = unseenQuestions.length > 0 ? unseenQuestions : feedbackQuestions;
      
      // Pick a random question
      const randomIndex = Math.floor(Math.random() * availableQuestions.length);
      setQuestion(availableQuestions[randomIndex]);
    }
  }, [show]);
  
  const handleSkip = () => {
    // Just close the prompt
    onClose();
    
    toast({
      title: "Question skipped",
      description: "We'll ask you another question later.",
    });
  };
  
  const handleSubmit = () => {
    if (!question) return;
    
    // Add the question ID to seen questions in local storage
    const seenQuestions = JSON.parse(localStorage.getItem("seenFeedbackQuestions") || "[]");
    seenQuestions.push(question.id);
    localStorage.setItem("seenFeedbackQuestions", JSON.stringify(seenQuestions));
    
    // Close the prompt
    onClose();
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your insights help us improve QuestApply.",
    });
  };
  
  const handleViewAllFeedback = () => {
    onClose();
    navigate("/feedback");
  };
  
  if (!show || !question) return null;
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <Card className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border-0">
            <div className="p-6 relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Quick Feedback
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Help us improve QuestApply with your insights
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4 mb-6 border border-purple-100 dark:border-purple-800/30">
                <p className="text-gray-800 dark:text-gray-200">
                  {question.question}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Category: {question.category}
                </p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-4">Rate your experience:</p>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          rating >= value 
                            ? 'bg-purple-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => setRating(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                
                <textarea
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Add any additional comments (optional)..."
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                ></textarea>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto order-2 sm:order-1"
                  onClick={handleSkip}
                >
                  Skip for now
                </Button>
                <div className="flex gap-2 w-full sm:w-auto order-1 sm:order-2">
                  <Button
                    variant="outline"
                    className="text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                    onClick={handleViewAllFeedback}
                  >
                    View all
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
                    onClick={handleSubmit}
                    disabled={rating === 0}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackPrompt;
