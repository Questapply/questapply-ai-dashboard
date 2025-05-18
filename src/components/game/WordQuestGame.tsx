
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Award, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { wordData } from "./wordData";

interface WordQuestGameProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WordQuestGame = ({ open, onOpenChange }: WordQuestGameProps) => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [character, setCharacter] = useState("explorer");
  const [characterPosition, setCharacterPosition] = useState(0);
  
  const maxQuestions = 20;
  const maxMistakes = 3;
  
  // Game environments that change every 5 questions
  const environments = [
    "Forest of Fundamentals",
    "Valley of Vocabulary",
    "Mountains of Meaning",
    "City of Communication"
  ];
  
  const getCurrentEnvironment = () => {
    return environments[Math.floor(currentQuestionIndex / 5)];
  };
  
  const getCurrentQuestion = () => {
    return wordData[currentQuestionIndex];
  };
  
  const playSound = (type: "correct" | "wrong" | "levelUp" | "gameOver" | "gameWon") => {
    // In a real implementation, we would play actual sounds here
    console.log(`Playing ${type} sound`);
  };
  
  const checkAnswer = (answer: string) => {
    const currentQuestion = getCurrentQuestion();
    const correct = answer === currentQuestion.correctAnswer;
    
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    setShowFeedback(true);
    
    setTimeout(() => {
      if (correct) {
        playSound("correct");
        setScore(score + 1);
        
        // Check if we're moving to a new environment (every 5 questions)
        if ((currentQuestionIndex + 1) % 5 === 0 && currentQuestionIndex < maxQuestions - 1) {
          playSound("levelUp");
          toast({
            title: "Level Up!",
            description: `You've reached ${environments[Math.floor((currentQuestionIndex + 1) / 5)]}!`,
            variant: "default",
          });
        }
        
        // Move character
        setCharacterPosition(characterPosition + 5);
      } else {
        playSound("wrong");
        setMistakes(mistakes + 1);
        
        if (mistakes + 1 >= maxMistakes) {
          setGameOver(true);
          playSound("gameOver");
        }
      }
      
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        
        // Move to next question or end game
        if (currentQuestionIndex + 1 < maxQuestions && mistakes + (correct ? 0 : 1) < maxMistakes) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (currentQuestionIndex + 1 >= maxQuestions) {
          setGameWon(true);
          playSound("gameWon");
        }
      }, 1000);
    }, 1000);
  };
  
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setMistakes(0);
    setGameOver(false);
    setGameWon(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setCharacterPosition(0);
  };

  // Handle escape key and cleanup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onOpenChange]);

  // Close the game dialog when user clicks outside
  const handleClose = () => {
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Word Quest Adventure
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Game environment */}
          <div className="relative h-32 rounded-xl overflow-hidden bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-800">
            <div className="absolute inset-0 h-full w-full">
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-300/30 to-transparent dark:from-green-900/30"></div>
              
              {/* Character */}
              <motion.div 
                className="absolute bottom-4"
                animate={{ x: `${characterPosition}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="relative w-12 h-12">
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold"
                  >
                    {character === "explorer" ? "🧙" : "🦸"}
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Environment label */}
              <div className="absolute top-2 left-2">
                <Badge variant="outline" className="bg-white/80 dark:bg-black/50">
                  {getCurrentEnvironment()}
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Game status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-lg font-semibold">
                Question: {currentQuestionIndex + 1}/{maxQuestions}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600 dark:text-green-400 font-semibold">Score: {score}</span>
              <span className="text-red-600 dark:text-red-400 font-semibold">
                Mistakes: {mistakes}/{maxMistakes}
              </span>
            </div>
          </div>
          
          {/* Progress */}
          <Progress value={(currentQuestionIndex / maxQuestions) * 100} className="h-2" />
          
          {/* Game content: Question or Results */}
          {!gameOver && !gameWon ? (
            <div className="space-y-6">
              {/* Current word */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {getCurrentQuestion().word}
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full"
                      onClick={() => console.log("Play pronunciation")}
                    >
                      <Volume2 className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="text-lg text-gray-700 dark:text-gray-300">
                    Select the correct meaning:
                  </div>
                  
                  {/* Answer options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getCurrentQuestion().options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={showFeedback}
                        onClick={() => checkAnswer(option)}
                        className={`p-4 rounded-lg border transition-colors ${
                          selectedAnswer === option 
                            ? isCorrect 
                              ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-700" 
                              : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-700"
                            : "bg-white hover:bg-purple-50 border-gray-200 dark:bg-gray-800 dark:hover:bg-purple-900/10 dark:border-gray-700"
                        } relative`}
                      >
                        <span className="block text-left">{option}</span>
                        {selectedAnswer === option && showFeedback && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2"
                          >
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                            )}
                          </motion.span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                  
                  {/* Word usage example (shows after answering) */}
                  {showFeedback && isCorrect && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
                    >
                      <div className="font-medium text-purple-800 dark:text-purple-300">
                        Example:
                      </div>
                      <div className="text-gray-700 dark:text-gray-300 italic">
                        "{getCurrentQuestion().example}"
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              {gameWon ? (
                <>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1 }}
                    className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center"
                  >
                    <Award className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-center">Congratulations!</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You completed the Word Quest Adventure with a score of {score} out of {maxQuestions}.
                  </p>
                </>
              ) : (
                <>
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mx-auto text-5xl"
                  >
                    😢
                  </motion.div>
                  <h3 className="text-2xl font-bold text-center">Game Over</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You made {maxMistakes} mistakes. Your final score is {score}.
                  </p>
                </>
              )}
              
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={resetGame}
                  className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-400"
                >
                  Play Again
                </Button>
                <Button 
                  onClick={handleClose}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WordQuestGame;
