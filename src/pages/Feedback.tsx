
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, CheckCircle2, AlertCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface FeedbackQuestion {
  id: string;
  question: string;
  category: string;
  answered: boolean;
  answeredOn?: Date;
}

const mockQuestions: FeedbackQuestion[] = [
  {
    id: "q1",
    question: "How satisfied are you with QuestApply's AI-powered recommendation engine for finding suitable programs?",
    category: "Application Process",
    answered: true,
    answeredOn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  },
  {
    id: "q2",
    question: "What features would make your application preparation with QuestApply more efficient?",
    category: "User Needs",
    answered: false,
  },
  {
    id: "q3",
    question: "How helpful has the professor recommendation tool been for your academic connections?",
    category: "Chat Interactions",
    answered: false,
  },
  {
    id: "q4",
    question: "What challenges do you face when tracking multiple application deadlines?",
    category: "Dashboard Activity",
    answered: false,
  },
  {
    id: "q5",
    question: "Based on your profile, would you prefer more personalized program matches or broader search options?",
    category: "User Profile",
    answered: false,
  },
];

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<FeedbackQuestion[]>(mockQuestions);
  const [activeFeedback, setActiveFeedback] = useState<FeedbackQuestion | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);

  const pendingQuestions = questions.filter(q => !q.answered);
  const answeredQuestions = questions.filter(q => q.answered);
  
  const handleStartFeedback = (question: FeedbackQuestion) => {
    setActiveFeedback(question);
    setFeedback("");
    setRating(null);
  };
  
  const handleSubmitFeedback = () => {
    if (!activeFeedback) return;
    
    // Update the questions array to mark this question as answered
    setQuestions(questions.map(q => 
      q.id === activeFeedback.id 
        ? { ...q, answered: true, answeredOn: new Date() } 
        : q
    ));
    
    // Reset the active feedback
    setActiveFeedback(null);
    setFeedback("");
    setRating(null);
    
    // Show success toast
    toast({
      title: "Thank you for your feedback!",
      description: "Your insights help us improve QuestApply.",
    });
  };
  
  const renderStarRating = () => {
    return (
      <div className="flex items-center justify-center space-x-2 my-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`transition-transform hover:scale-110 ${rating && rating >= star ? "text-yellow-400 dark:text-yellow-300" : "text-gray-300 dark:text-gray-600"}`}
          >
            <Star className="h-8 w-8 fill-current" />
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto py-8 px-4">
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feedback Center</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl">
            Your feedback helps us make QuestApply better for everyone. Take a moment to answer a few questions about your experience.
          </p>
        </header>

        {activeFeedback ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
              <CardHeader className="bg-purple-50 dark:bg-purple-900/20 border-b border-purple-100 dark:border-purple-800/30">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <MessageSquare className="h-6 w-6 mr-3 text-purple-500 dark:text-purple-400" />
                    {activeFeedback.question}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 pb-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Category: <span className="font-medium">{activeFeedback.category}</span>
                </p>
                
                {renderStarRating()}
                
                <div className="mb-6">
                  <label htmlFor="feedback" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your detailed feedback (optional)
                  </label>
                  <textarea
                    id="feedback"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Share your thoughts, suggestions, or experiences..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveFeedback(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitFeedback}
                    disabled={rating === null}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="pending" className="text-sm">
                Pending Questions ({pendingQuestions.length})
              </TabsTrigger>
              <TabsTrigger value="answered" className="text-sm">
                Answered Questions ({answeredQuestions.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <div className="space-y-4">
                {pendingQuestions.length > 0 ? (
                  pendingQuestions.map((question) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="cursor-pointer hover:border-purple-300 dark:hover:border-purple-700 transition-colors border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                        onClick={() => handleStartFeedback(question)}
                      >
                        <CardContent className="p-6">
                          <div className="flex">
                            <div className="mr-4 mt-0.5">
                              <AlertCircle className="h-5 w-5 text-amber-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                {question.question}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Category: {question.category}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                            >
                              Answer Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      All caught up!
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      You've answered all the feedback questions. Thank you for helping us improve!
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="answered">
              <div className="space-y-4">
                {answeredQuestions.length > 0 ? (
                  answeredQuestions.map((question) => (
                    <motion.div
                      key={question.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <CardContent className="p-6">
                          <div className="flex">
                            <div className="mr-4 mt-0.5">
                              <CheckCircle2 className="h-5 w-5 text-green-500" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                                {question.question}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Category: {question.category}
                              </p>
                              {question.answeredOn && (
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                  Answered on {question.answeredOn.toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                      No answered questions yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Once you answer feedback questions, they will appear here.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default Feedback;
