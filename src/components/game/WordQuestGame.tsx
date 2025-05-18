import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Award, Volume2, Rocket, Star, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { wordData } from "./wordData";
import AnimatedCard from "../ui/animated-card";

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
  const [character, setCharacter] = useState("luna");
  const [characterPosition, setCharacterPosition] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [companionMessage, setCompanionMessage] = useState("");
  
  const maxQuestions = 20;
  const maxMistakes = 3;
  
  // Game planets that change every 5 questions
  const planets = [
    "Crystal Forest",
    "Fiery Mountains",
    "City of Lights",
    "Starry Ocean",
    "King's Palace"
  ];
  
  const getCurrentPlanet = () => {
    return planets[Math.floor(currentQuestionIndex / 5)];
  };
  
  const getCurrentQuestion = () => {
    return wordData[currentQuestionIndex];
  };
  
  const getPlanetColors = () => {
    const planetIndex = Math.floor(currentQuestionIndex / 5);
    switch (planetIndex) {
      case 0: // Crystal Forest
        return "from-green-200 to-blue-200 dark:from-green-900/30 dark:to-blue-900/30";
      case 1: // Fiery Mountains
        return "from-red-200 to-orange-200 dark:from-red-900/30 dark:to-orange-900/30";
      case 2: // City of Lights
        return "from-yellow-200 to-purple-200 dark:from-yellow-900/30 dark:to-purple-900/30";
      case 3: // Starry Ocean
        return "from-blue-200 to-teal-200 dark:from-blue-900/30 dark:to-teal-900/30";
      default: // King's Palace
        return "from-purple-200 to-indigo-200 dark:from-purple-900/30 dark:to-indigo-900/30";
    }
  };
  
  const getCompanionMessage = () => {
    if (!showFeedback) return "";
    
    const word = getCurrentQuestion().word;
    const messages = [
      `Luna! I think this word "${word}" means ${getCurrentQuestion().correctAnswer}!`,
      `Wow! Another crystal! This one contains the word "${word}"!`,
      `Look Luna! The crystal is glowing with the word "${word}"!`,
      `Hey Luna, I feel like "${word}" is the right answer here!`
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
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
    setCompanionMessage(getCompanionMessage());
    
    setTimeout(() => {
      if (correct) {
        playSound("correct");
        setScore(score + 10); // Each crystal earns 10 points
        
        // Check if we're moving to a new planet (every 5 questions)
        if ((currentQuestionIndex + 1) % 5 === 0 && currentQuestionIndex < maxQuestions - 1) {
          playSound("levelUp");
          toast({
            title: "New Planet Discovered!",
            description: `Luna has reached ${planets[Math.floor((currentQuestionIndex + 1) / 5)]}!`,
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
      }, 2000);
    }, 1500);
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
    setShowIntro(true);
  };

  const startGame = () => {
    setShowIntro(false);
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
            Word Galaxy Explorers
          </DialogTitle>
        </DialogHeader>
        
        {showIntro ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 py-4"
          >
            <AnimatedCard
              className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
              delay={0.2}
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div 
                  className="text-5xl"
                  animate={{ 
                    y: [0, -10, 0], 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  👩‍🚀
                </motion.div>
                <motion.div 
                  className="ml-3 text-4xl"
                  animate={{ 
                    y: [0, -5, 0], 
                    x: [0, 3, 0, -3, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  👾
                </motion.div>
              </div>
              
              <h3 className="text-xl font-bold text-center mb-4">Luna's Adventure Begins!</h3>
              
              <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
                Luna, a 10-year-old astronaut, is lost in her spaceship "Word Star" in an unknown galaxy. 
                She received a message from "Starlight", the King of the Galaxy:
              </p>
              
              <motion.div 
                className="p-4 bg-purple-100 dark:bg-purple-900/40 rounded-lg border border-purple-300 dark:border-purple-700 mb-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="italic text-center text-purple-700 dark:text-purple-300">
                  "Luna! Our galaxy is fading because the word crystals have been stolen! 
                  You must find them, or everything will be destroyed!"
                </p>
              </motion.div>
              
              <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                Help Luna travel across 5 different planets, battle strange creatures, and 
                collect the word crystals to save the galaxy and find her way home!
              </p>
              
              <div className="flex justify-center">
                <Button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Rocket className="h-5 w-5 mr-2" />
                  Begin Adventure
                </Button>
              </div>
            </AnimatedCard>
          </motion.div>
        ) : !gameOver && !gameWon ? (
          <div className="space-y-6 py-4">
            {/* Game environment */}
            <div className={`relative h-32 rounded-xl overflow-hidden bg-gradient-to-r ${getPlanetColors()} border border-purple-200 dark:border-purple-800`}>
              <div className="absolute inset-0 h-full w-full">
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-green-300/40 to-transparent dark:from-green-900/40"></div>
                
                {/* Character */}
                <motion.div 
                  className="absolute bottom-4"
                  animate={{ x: `${characterPosition}%` }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="relative">
                    <motion.div 
                      initial={{ y: 0 }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-12 h-12 bg-purple-600/80 dark:bg-purple-700/80 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                    >
                      <span role="img" aria-label="luna" className="text-xl">👩‍🚀</span>
                    </motion.div>
                    
                    {/* Companion */}
                    <motion.div 
                      initial={{ x: 10, y: -10 }}
                      animate={{ x: [10, 15, 10], y: [-10, -15, -10] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                      className="absolute -top-4 -right-2"
                    >
                      <div className="w-8 h-8 bg-blue-500/80 dark:bg-blue-600/80 rounded-full flex items-center justify-center text-white shadow-md">
                        <span role="img" aria-label="nebula" className="text-sm">👾</span>
                      </div>
                    </motion.div>
                    
                    {/* Companion speech bubble */}
                    {showFeedback && isCorrect && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute -top-16 -right-20 w-40 bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-md speech-bubble"
                      >
                        <p className="text-xs text-gray-700 dark:text-gray-300">{companionMessage}</p>
                        <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800"></div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
                
                {/* Planet label */}
                <div className="absolute top-2 left-2">
                  <Badge variant="outline" className="bg-white/80 dark:bg-black/50 border-purple-300 dark:border-purple-700">
                    <Globe className="w-3 h-3 mr-1 text-purple-500" />
                    {getCurrentPlanet()}
                  </Badge>
                </div>
                
                {/* Crystal animation */}
                <motion.div 
                  className="absolute top-4 right-4"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="text-2xl">💎</div>
                </motion.div>
              </div>
            </div>
            
            {/* Game status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-lg font-semibold">
                  Planet {Math.floor(currentQuestionIndex / 5) + 1} - Crystal {(currentQuestionIndex % 5) + 1}/5
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">{score}</span>
                </div>
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  Mistakes: {mistakes}/{maxMistakes}
                </span>
              </div>
            </div>
            
            {/* Progress */}
            <Progress value={(currentQuestionIndex / maxQuestions) * 100} className="h-2" />
            
            {/* Game content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Current word crystal */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <motion.div
                      animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
                      className="mr-3 text-3xl"
                    >
                      💎
                    </motion.div>
                    <h3 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                      {getCurrentQuestion().word}
                    </h3>
                  </div>
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
                  Help Luna choose the correct meaning to collect the word crystal:
                </div>
                
                {/* Answer options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 game-options-grid">
                  {getCurrentQuestion().options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={showFeedback}
                      onClick={() => checkAnswer(option)}
                      className={`p-5 rounded-lg border transition-colors ${
                        selectedAnswer === option 
                          ? isCorrect 
                            ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-700" 
                            : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-700"
                          : "bg-white hover:bg-purple-50 border-gray-200 dark:bg-gray-800 dark:hover:bg-purple-900/10 dark:border-gray-700"
                      } relative game-character`}
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
                
                {/* Word usage example */}
                {showFeedback && isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-5 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700"
                  >
                    <div className="flex items-center mb-2">
                      <Moon className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" /> 
                      <div className="font-medium text-purple-800 dark:text-purple-300">
                        Crystal Knowledge:
                      </div>
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
                  transition={{ duration: 2 }}
                  className="mx-auto w-24 h-24 bg-gradient-to-r from-yellow-400 to-purple-600 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Award className="h-12 w-12 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-center">Congratulations!</h3>
                <p className="text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                  Luna has collected all the word crystals and saved the galaxy! The King of the Galaxy, Starlight, welcomes Luna to his palace for a grand celebration!
                </p>
                <motion.div
                  className="text-5xl mx-auto"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🎉
                </motion.div>
                <p className="font-medium text-purple-700 dark:text-purple-300">
                  Final Score: {score} points
                </p>
              </>
            ) : (
              <>
                <motion.div 
                  animate={{ y: [0, -5, 0], rotate: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="mx-auto text-5xl"
                >
                  😢
                </motion.div>
                <h3 className="text-2xl font-bold text-center">Oh no!</h3>
                <p className="text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                  Luna has made too many mistakes and her spaceship "Word Star" needs to recharge. Don't worry, she can try again!
                </p>
                <p className="font-medium text-purple-700 dark:text-purple-300">
                  Score: {score} points
                </p>
              </>
            )}
            
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={resetGame}
                className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-400"
              >
                <Rocket className="h-4 w-4 mr-2" />
                New Adventure
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
      </DialogContent>
    </Dialog>
  );
};

export default WordQuestGame;
