
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  School, 
  Book, 
  ListOrdered, 
  MapPin, 
  Star, 
  Info, 
  GitCompare,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { schools } from "@/components/dashboard/sections/find-schools/SchoolsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SchoolIntroVideo from "@/components/dashboard/sections/find-schools/SchoolIntroVideo";
import ProgramCategories from "@/components/dashboard/sections/find-schools/ProgramCategories";
import RequirementsTable from "@/components/dashboard/sections/find-schools/RequirementsTable";
import StudentDemographics from "@/components/dashboard/sections/find-schools/StudentDemographics";

const SchoolDetails = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  const [school, setSchool] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (schoolId) {
      const id = parseInt(schoolId, 10);
      const foundSchool = schools.find(school => school.id === id);
      if (foundSchool) {
        setSchool(foundSchool);
        setIsFavorite(foundSchool.favorite);
      } else {
        navigate('/dashboard');
      }
    }
  }, [schoolId, navigate]);

  const handleCompare = () => {
    if (school) {
      navigate(`/compare-schools/${school.id}`);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Loading...</h2>
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Button 
              variant="outline" 
              className="mr-3 border-gray-300 dark:border-gray-700"
              onClick={() => navigate('/dashboard')}
            >
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{school.name}</h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex space-x-3 mt-4 md:mt-0"
          >
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={toggleFavorite}
            >
              <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-400 dark:text-gray-500"}`} />
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </Button>
            <Button 
              onClick={handleCompare}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <GitCompare className="h-4 w-4" />
              Compare
            </Button>
          </motion.div>
        </div>

        {/* School Header */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={school.logo} 
                  alt={`${school.name} logo`}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{school.name}</h2>
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{school.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">QS: #{school.ranking.qs}</span>
                  </div>
                  <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">US News: #{school.ranking.usNews}</span>
                  </div>
                  <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                    <span className="font-medium">Shanghai: #{school.ranking.shanghai}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Acceptance Rate</div>
                  <div className="mt-1">
                    <Progress value={school.acceptance} className="h-2" />
                    <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{school.acceptance}%</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Graduation Rate</div>
                  <div className="mt-1">
                    <Progress value={school.graduation} className="h-2" />
                    <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">{school.graduation}%</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Cost (In-State / Out-of-State)</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">{formatCurrency(school.cost.inState)}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">{formatCurrency(school.cost.outState)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30">Overview</TabsTrigger>
              <TabsTrigger value="programs" className="data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30">Programs</TabsTrigger>
              <TabsTrigger value="rankings" className="data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30">Rankings</TabsTrigger>
              <TabsTrigger value="financials" className="data-[state=active]:bg-orange-100 dark:data-[state=active]:bg-orange-900/30">Financials</TabsTrigger>
              <TabsTrigger value="admissions" className="data-[state=active]:bg-indigo-100 dark:data-[state=active]:bg-indigo-900/30">Admissions</TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30">Students</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {/* Add School Intro Video */}
              <SchoolIntroVideo schoolName={school.name} />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <Info className="h-5 w-5 text-purple-500 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">School Overview</h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      {school.description || `${school.name} is a prestigious institution located in ${school.location}.`}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Founded</h4>
                        <p className="text-gray-800 dark:text-gray-200">{school.founded || "1636"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</h4>
                        <p className="text-gray-800 dark:text-gray-200">{school.type || "Private Research University"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h4>
                        <p className="text-gray-800 dark:text-gray-200">{school.address || school.location}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</h4>
                        <p className="text-gray-800 dark:text-gray-200">{school.phone || "Not Available"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <School className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Key Statistics</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Acceptance Rate</h4>
                        <div className="mt-2 flex items-center">
                          <div className="flex-grow">
                            <Progress value={school.acceptance} className="h-3" />
                          </div>
                          <span className="ml-3 text-lg font-medium text-gray-800 dark:text-gray-200">{school.acceptance}%</span>
                        </div>
                        <div className="mt-1 flex items-center justify-end text-xs text-gray-500 dark:text-gray-400">
                          <ArrowDown className="h-3 w-3 mr-1 text-green-500" />
                          <span>More selective</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Graduation Rate</h4>
                        <div className="mt-2 flex items-center">
                          <div className="flex-grow">
                            <Progress value={school.graduation} className="h-3" />
                          </div>
                          <span className="ml-3 text-lg font-medium text-gray-800 dark:text-gray-200">{school.graduation}%</span>
                        </div>
                        <div className="mt-1 flex items-center justify-end text-xs text-gray-500 dark:text-gray-400">
                          <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                          <span>Higher than average</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Student Population</h4>
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                          {school.studentDemographics?.total.toLocaleString() || "21,000+"}
                        </p>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>Undergraduate: {school.studentDemographics?.level?.undergraduate.toLocaleString() || "6,700"}</span>
                          <span className="mx-1">|</span>
                          <span>Graduate: {school.studentDemographics?.level?.graduate.toLocaleString() || "14,300"}</span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Campus Size</h4>
                        <p className="text-lg font-medium text-gray-800 dark:text-gray-200">5,076 acres</p>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>Urban campus setting</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="programs">
              {/* Add Categories with Images and Expandable Programs */}
              {school.programCategories ? (
                <ProgramCategories categories={school.programCategories} />
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <Book className="h-5 w-5 text-blue-500 mr-2" />
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Academic Programs</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {school.programs.map((program, idx) => {
                        const type = program.split(':')[0];
                        const count = program.split(':')[1].trim();
                        
                        return (
                          <div 
                            key={idx}
                            className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg p-5"
                          >
                            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">{type}</h3>
                            <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">{count}</p>
                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">Arts & Humanities</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">12</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">STEM</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">28</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">Business</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">8</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="mt-4 w-full">
                              View All Programs
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="rankings">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
                  <ListOrdered className="h-5 w-5 text-green-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Rankings Details</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Global Rankings</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center rounded-md text-yellow-700 dark:text-yellow-300 font-semibold">
                                QS
                              </div>
                              <div className="ml-3">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">QS World Rankings</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">2023</p>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">#{school.ranking.qs}</div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 flex items-center justify-center rounded-md text-green-700 dark:text-green-300 font-semibold">
                                SH
                              </div>
                              <div className="ml-3">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Shanghai Rankings</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">2023</p>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">#{school.ranking.shanghai}</div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center rounded-md text-purple-700 dark:text-purple-300 font-semibold">
                                THE
                              </div>
                              <div className="ml-3">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Times Higher Education</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">2023</p>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">#{school.ranking.the}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">National Rankings</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 flex items-center justify-center rounded-md text-red-700 dark:text-red-300 font-semibold">
                                US
                              </div>
                              <div className="ml-3">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">US News Rankings</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">2023</p>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">#{school.ranking.usNews}</div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center rounded-md text-blue-700 dark:text-blue-300 font-semibold">
                                FB
                              </div>
                              <div className="ml-3">
                                <h4 className="font-medium text-gray-800 dark:text-gray-200">Forbes Rankings</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">2023</p>
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">#{school.ranking.forbes || 15}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="financials">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
                  <Info className="h-5 w-5 text-orange-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Financial Information</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Tuition and Fees</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">In-State Tuition</h4>
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {formatCurrency(school.cost.inState)}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Per academic year</p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Out-of-State Tuition</h4>
                          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {formatCurrency(school.cost.outState)}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Per academic year</p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Room and Board</h4>
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {formatCurrency(school.costBreakdown?.roomAndBoard || 18000)}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Per academic year</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Financial Aid</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Students Receiving Aid</h4>
                          <div className="flex items-center">
                            <div className="flex-grow">
                              <Progress value={70} className="h-3" />
                            </div>
                            <span className="ml-3 text-lg font-medium text-gray-800 dark:text-gray-200">70%</span>
                          </div>
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Approximately 70% of students receive some form of financial aid
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Average Financial Aid Package</h4>
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {formatCurrency(45000)}
                          </div>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">For students with demonstrated need</p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-green-900 p-4 rounded-lg">
                          <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">Financial Aid Calculator</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            Use our financial aid calculator to estimate your cost of attendance and potential aid package.
                          </p>
                          <Button 
                            className="mt-3 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Calculate Your Aid
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="admissions">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
                  <School className="h-5 w-5 text-indigo-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Admissions</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
                      <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">Admission Requirements</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Application Deadlines</h4>
                          <div className="mt-2 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Early Decision</span>
                              <span className="font-medium text-gray-800 dark:text-gray-200">November 1</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Regular Decision</span>
                              <span className="font-medium text-gray-800 dark:text-gray-200">January 1</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Transfer Students</span>
                              <span className="font-medium text-gray-800 dark:text-gray-200">March 1</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Required Documents</h4>
                          <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            <li>Common Application or Universal College Application</li>
                            <li>School Report and Transcripts</li>
                            <li>Two Teacher Evaluations</li>
                            <li>SAT or ACT (Optional for 2023-2024)</li>
                            <li>TOEFL/IELTS (for international students)</li>
                            <li>Supplemental Essays</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Test Score Ranges (Middle 50%)</h4>
                          <div className="mt-2 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">SAT</span>
                              <span className="font-medium text-gray-800 dark:text-gray-200">1480-1580</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">ACT</span>
                              <span className="font-medium text-gray-800 dark:text-gray-200">33-35</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-lg">
                      <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">Admissions Statistics</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Acceptance Rate</h4>
                          <div className="mt-2 flex items-center">
                            <div className="flex-grow">
                              <Progress value={school.acceptance} className="h-3" />
                            </div>
                            <span className="ml-3 text-lg font-medium text-gray-800 dark:text-gray-200">{school.acceptance}%</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Applicants</h4>
                          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            {school.admissionsData?.applied.toLocaleString() || "57,435"}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Admitted</h4>
                          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            {school.admissionsData?.admitted.toLocaleString() || "2,320"}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Enrolled</h4>
                          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            {school.admissionsData?.enrolled.toLocaleString() || "1,650"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-900 rounded-lg">
                        <h4 className="font-medium text-indigo-700 dark:text-indigo-300">Request Information</h4>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          Interested in learning more about admission to {school.name}?
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-3 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400"
                        >
                          Contact Admissions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Requirements Table */}
              {school.requirements && <RequirementsTable requirements={school.requirements} />}

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mt-8">
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
                  <Info className="h-5 w-5 text-green-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">English Requirements</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    <div className={`p-3 rounded-lg flex flex-col items-center ${
                      school.englishRequirements?.toefl ? 
                      'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 
                      'bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        school.englishRequirements?.toefl ?
                        'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300' :
                        'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                      }`}>
                        {school.englishRequirements?.toefl ? '✓' : '✕'}
                      </div>
                      <p className="mt-2 text-center text-sm font-medium">TOEFL</p>
                    </div>
                    
                    <div className={`p-3 rounded-lg flex flex-col items-center ${
                      school.englishRequirements?.ielts ? 
                      'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 
                      'bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        school.englishRequirements?.ielts ?
                        'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300' :
                        'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                      }`}>
                        {school.englishRequirements?.ielts ? '✓' : '✕'}
                      </div>
                      <p className="mt-2 text-center text-sm font-medium">IELTS</p>
                    </div>
                    
                    <div className={`p-3 rounded-lg flex flex-col items-center ${
                      school.englishRequirements?.duolingo ? 
                      'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 
                      'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        school.englishRequirements?.duolingo ?
                        'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300' :
                        'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300'
                      }`}>
                        {school.englishRequirements?.duolingo ? '✓' : '✕'}
                      </div>
                      <p className="mt-2 text-center text-sm font-medium">Duolingo</p>
                    </div>
                    
                    <div className={`p-3 rounded-lg flex flex-col items-center ${
                      school.englishRequirements?.melab ? 
                      'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 
                      'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        school.englishRequirements?.melab ?
                        'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300' :
                        'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300'
                      }`}>
                        {school.englishRequirements?.melab ? '✓' : '✕'}
                      </div>
                      <p className="mt-2 text-center text-sm font-medium">MELAB</p>
                    </div>
                    
                    <div className={`p-3 rounded-lg flex flex-col items-center ${
                      school.englishRequirements?.pte ? 
                      'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 
                      'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        school.englishRequirements?.pte ?
                        'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300' :
                        'bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300'
                      }`}>
                        {school.englishRequirements?.pte ? '✓' : '✕'}
                      </div>
                      <p className="mt-2 text-center text-sm font-medium">PTE</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="students">
              {/* Add Student Demographics Section */}
              {school.studentDemographics && (
                <StudentDemographics 
                  genderData={{
                    men: school.studentDemographics.gender.men,
                    women: school.studentDemographics.gender.women,
                    total: school.studentDemographics.total
                  }}
                  enrollmentData={{
                    fullTime: school.studentDemographics.enrollment.fullTime,
                    partTime: school.studentDemographics.enrollment.partTime,
                    total: school.studentDemographics.total
                  }}
                  levelData={{
                    undergraduate: school.studentDemographics.level.undergraduate,
                    graduate: school.studentDemographics.level.graduate,
                    total: school.studentDemographics.total
                  }}
                  raceData={school.studentDemographics.raceEthnicity}
                />
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default SchoolDetails;
