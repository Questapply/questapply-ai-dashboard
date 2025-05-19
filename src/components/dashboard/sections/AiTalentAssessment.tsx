
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

// Questions for the talent assessment
const talentQuestions = [
  {
    id: 1,
    question: "When faced with a complex problem, you prefer to:",
    options: [
      "Break it down into smaller parts and analyze methodically",
      "Brainstorm creative solutions with others",
      "Look for patterns based on past experiences",
      "Find innovative approaches no one has tried"
    ],
  },
  {
    id: 2,
    question: "In a group project, you naturally take on the role of:",
    options: [
      "The leader who organizes and delegates tasks",
      "The creative who comes up with unique ideas",
      "The analyst who evaluates different approaches",
      "The communicator who ensures everyone is aligned"
    ],
  },
  {
    id: 3,
    question: "When learning something new, you prefer:",
    options: [
      "Hands-on practice and experimentation",
      "Reading comprehensive materials and research",
      "Visual demonstrations and diagrams",
      "Discussion and verbal explanation"
    ],
  },
  {
    id: 4,
    question: "Your approach to deadlines is typically:",
    options: [
      "Creating detailed schedules well in advance",
      "Working intensely as the deadline approaches",
      "Breaking the work into smaller milestones",
      "Adapting your timeline as the project evolves"
    ],
  },
  {
    id: 5,
    question: "You find the most satisfaction in:",
    options: [
      "Solving complex technical challenges",
      "Creating something innovative and unique",
      "Leading a team to successful outcomes",
      "Helping others achieve their goals"
    ],
  },
];

// Talent areas with descriptions
const talentAreas = [
  { name: "Analytical Thinking", score: 85, color: "from-blue-400 to-cyan-400" },
  { name: "Creative Problem Solving", score: 72, color: "from-purple-400 to-blue-400" },
  { name: "Communication Skills", score: 68, color: "from-purple-400 to-pink-400" },
  { name: "Leadership Potential", score: 79, color: "from-blue-400 to-purple-400" },
];

// Recommended programs based on talents
const recommendedPrograms = [
  { name: "Data Science", match: "95%" },
  { name: "Business Analytics", match: "92%" },
  { name: "Artificial Intelligence", match: "88%" },
  { name: "Technology Leadership", match: "85%" },
];

// Top universities for these programs
const topUniversities = [
  { name: "Massachusetts Institute of Technology", location: "Cambridge, MA" },
  { name: "Stanford University", location: "Stanford, CA" },
  { name: "Carnegie Mellon University", location: "Pittsburgh, PA" },
  { name: "University of California, Berkeley", location: "Berkeley, CA" },
];

const AiTalentAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showUniversities, setShowUniversities] = useState(false);
  const [aiAnalysisVisible, setAiAnalysisVisible] = useState(false);
  const [restartAnimation, setRestartAnimation] = useState(false);
  const animationTimer = useRef<NodeJS.Timeout | null>(null);

  // Progress through the questions and show results
  useEffect(() => {
    // Function to handle the automated flow
    const automateAssessment = () => {
      if (restartAnimation) {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setShowResults(false);
        setShowUniversities(false);
        setAiAnalysisVisible(false);
        setRestartAnimation(false);
        return;
      }

      if (currentQuestion < talentQuestions.length) {
        // Select an option after a delay (like a user making a choice)
        const optionTimer = setTimeout(() => {
          setSelectedOption(Math.floor(Math.random() * 4));
          
          // Move to next question after a delay
          const nextQuestionTimer = setTimeout(() => {
            if (currentQuestion < talentQuestions.length - 1) {
              setCurrentQuestion(prev => prev + 1);
              setSelectedOption(null);
            } else {
              setShowResults(true);
              
              // Show universities after showing results
              const universitiesTimer = setTimeout(() => {
                setShowUniversities(true);
                
                // Show AI analysis after universities
                const analysisTimer = setTimeout(() => {
                  setAiAnalysisVisible(true);
                  
                  // Restart the animation after completing full cycle
                  const restartTimer = setTimeout(() => {
                    setRestartAnimation(true);
                  }, 6000);
                  
                  return () => clearTimeout(restartTimer);
                }, 3000);
                
                return () => clearTimeout(analysisTimer);
              }, 3000);
              
              return () => clearTimeout(universitiesTimer);
            }
          }, 1500);
          
          return () => clearTimeout(nextQuestionTimer);
        }, 1500);
        
        return () => clearTimeout(optionTimer);
      }
    };

    animationTimer.current = setTimeout(automateAssessment, 1000);
    
    return () => {
      if (animationTimer.current) {
        clearTimeout(animationTimer.current);
      }
    };
  }, [currentQuestion, restartAnimation]);

  return (
    <div className="w-full py-16 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-purple-800/40 backdrop-blur-sm rounded-full px-4 py-1 mb-4 border border-purple-500/30"
          >
            <span className="text-purple-300 text-sm font-medium">AI-Powered Analysis</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-300"
          >
            Discover Your Hidden Talents with AI
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-white/90 max-w-3xl mx-auto"
          >
            Our advanced AI algorithms analyze your skills, interests, and achievements to identify your unique talents and potential. Go beyond traditional assessments and discover what makes you special.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 space-y-3 max-w-md mx-auto text-left"
          >
            {[
              "Personalized talent assessments",
              "Skills and personality analysis",
              "Career path recommendations",
              "Strengths and growth opportunities"
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="ml-2 text-gray-200">{item}</span>
              </div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Button 
              className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white px-6 py-2.5 h-auto text-lg rounded-md"
            >
              Discover Your Talents
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          {/* Left column: Assessment animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl border border-gray-700/50 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">AI Talent Assessment</h3>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-green-400">Live Analysis</span>
              </div>
            </div>

            {!showResults ? (
              <div className="min-h-[400px]">
                <div className="mb-8">
                  <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${(currentQuestion + (selectedOption !== null ? 0.5 : 0)) / talentQuestions.length * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 text-right">
                    Question {currentQuestion + 1} of {talentQuestions.length}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-medium text-white mb-4">
                    {talentQuestions[currentQuestion].question}
                  </h4>
                  <div className="space-y-3">
                    {talentQuestions[currentQuestion].options.map((option, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedOption === idx 
                            ? "border-blue-500 bg-blue-500/20" 
                            : "border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                            selectedOption === idx 
                              ? "bg-blue-500" 
                              : "bg-gray-700"
                          }`}>
                            {selectedOption === idx && (
                              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className="text-gray-200">{option}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[400px]">
                {talentAreas.map((talent, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="mb-6"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{talent.name}</span>
                      <span className="text-purple-300 font-semibold">{talent.score}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${talent.score}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${talent.color}`}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}

                {aiAnalysisVisible && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 p-4 bg-gray-800/70 border border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold">
                        AI
                      </div>
                      <div className="text-gray-300 font-medium">Assessment Analysis</div>
                    </div>
                    <p className="text-gray-300">
                      Based on your assessment, you show exceptional talent in analytical thinking and leadership. These skills are highly sought after in fields like Data Science and Business Analytics.
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* Right column: Results and recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {showUniversities && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-purple-900/80 to-indigo-900/80 rounded-2xl border border-purple-700/50 p-6 shadow-xl"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Recommended Programs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {recommendedPrograms.map((program, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-3 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{program.name}</span>
                          <span className="text-green-400 text-sm font-semibold">{program.match} Match</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-indigo-900/80 to-blue-900/80 rounded-2xl border border-indigo-700/50 p-6 shadow-xl"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Top Universities</h3>
                  <div className="space-y-3">
                    {topUniversities.map((university, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-3 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all"
                      >
                        <div className="flex flex-col">
                          <span className="text-white font-medium">{university.name}</span>
                          <span className="text-gray-400 text-sm">{university.location}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AiTalentAssessment;
