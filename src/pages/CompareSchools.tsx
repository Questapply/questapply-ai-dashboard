
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, Plus, ListOrdered, School, BookOpen, DollarSign, Users, GraduationCap, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { schools } from "@/components/dashboard/sections/find-schools/SchoolsData";

const CompareSchools = () => {
  const { schoolIds } = useParams<{ schoolIds: string }>();
  const [selectedSchools, setSelectedSchools] = useState<any[]>([]);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (schoolIds) {
      const ids = schoolIds.split(',').map(id => parseInt(id, 10));
      const filtered = schools.filter(school => ids.includes(school.id));
      setSelectedSchools(filtered);
    }
  }, [schoolIds]);

  const removeSchool = (id: number) => {
    const updatedSchools = selectedSchools.filter(school => school.id !== id);
    if (updatedSchools.length === 0) {
      navigate('/dashboard');
      return;
    }
    
    const newSchoolIds = updatedSchools.map(school => school.id).join(',');
    navigate(`/compare-schools/${newSchoolIds}`);
  };

  const addNewSchool = () => {
    navigate('/dashboard');
  };

  // Mock data for additional comparison metrics
  const getComparisonData = (schoolId: number) => {
    // This would ideally come from your backend or a more comprehensive data source
    const testScores = {
      1: { toefl: true, gre: true, duolingo: false, sat: true, ielts: true, pte: false },
      2: { toefl: true, gre: true, duolingo: true, sat: false, ielts: true, pte: true },
      3: { toefl: false, gre: true, duolingo: true, sat: true, ielts: false, pte: true }
    };
    
    const admissionsData = {
      1: { 
        medianGpa: '3.9/4.0', 
        medianSatScore: '1510', 
        acceptanceRate: '5%',
        applicantsTotal: '57,435', 
        enrollmentRate: '82%',
        classSize: '1,650'
      },
      2: { 
        medianGpa: '3.7/4.0', 
        medianSatScore: '1440', 
        acceptanceRate: '7%',
        applicantsTotal: '43,489', 
        enrollmentRate: '78%',
        classSize: '1,100'
      },
      3: { 
        medianGpa: '3.8/4.0',  
        medianSatScore: '1470', 
        acceptanceRate: '4%',
        applicantsTotal: '51,234', 
        enrollmentRate: '85%',
        classSize: '1,200'
      }
    };
    
    const costData = {
      1: {
        tuitionInState: '$54,002',
        tuitionOutState: '$56,002',
        roomAndBoard: '$19,501',
        booksAndSupplies: '$1,000',
        otherExpenses: '$3,694',
        totalInState: '$78,197',
        totalOutState: '$80,197'
      },
      2: {
        tuitionInState: '$48,452',
        tuitionOutState: '$51,832',
        roomAndBoard: '$18,100',
        booksAndSupplies: '$955',
        otherExpenses: '$3,288',
        totalInState: '$70,795',
        totalOutState: '$74,175'
      },
      3: {
        tuitionInState: '$49,653',
        tuitionOutState: '$53,453',
        roomAndBoard: '$18,450',
        booksAndSupplies: '$975',
        otherExpenses: '$3,500',
        totalInState: '$72,578',
        totalOutState: '$76,378'
      }
    };
    
    const sceneData = {
      1: {
        total: '14,000',
        women: '45.5%',
        menTrans: '54.5%',
        international: '11.5%',
        transfers: '4.7%',
        outOfState: '29.0%'
      },
      2: {
        total: '8,000',
        women: '46.5%',
        menTrans: '53.5%',
        international: '10.8%',
        transfers: '2.7%',
        outOfState: '68.3%'
      },
      3: {
        total: '10,500',
        women: '48.0%',
        menTrans: '52.0%',
        international: '15.0%',
        transfers: '3.6%',
        outOfState: '72.1%'
      }
    };
    
    const diversityData = {
      1: {
        asian: '28',
        black: '13',
        hispanic: '15',
        nativeAmerican: '2',
        white: '37',
        other: '5'
      },
      2: {
        asian: '35',
        black: '7',
        hispanic: '18',
        nativeAmerican: '1',
        white: '32',
        other: '7'
      },
      3: {
        asian: '32',
        black: '10',
        hispanic: '16',
        nativeAmerican: '2',
        white: '35',
        other: '5'
      }
    };
    
    return {
      testScores: testScores[schoolId as keyof typeof testScores] || {},
      admissions: admissionsData[schoolId as keyof typeof admissionsData] || {},
      cost: costData[schoolId as keyof typeof costData] || {},
      scene: sceneData[schoolId as keyof typeof sceneData] || {},
      diversity: diversityData[schoolId as keyof typeof diversityData] || {},
    };
  };

  // Function to render YES/NO indicators
  const renderYesNo = (value: boolean) => {
    return value ? (
      <span className="flex items-center justify-center">
        <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
          ✓
        </span>
      </span>
    ) : (
      <span className="flex items-center justify-center">
        <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
          ✕
        </span>
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Compare Schools
        </motion.h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            {/* School Selection Cards */}
            {selectedSchools.map((school) => (
              <motion.div
                key={school.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => removeSchool(school.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                >
                  <X size={18} />
                </button>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center overflow-hidden mb-3">
                    <img
                      src={school.logo}
                      alt={`${school.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-center">{school.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{school.location}</p>
                </div>
              </motion.div>
            ))}
            
            {/* Add New School Card (if less than 3 schools) */}
            {selectedSchools.length < 3 && (
              <motion.div
                className="bg-gray-50 dark:bg-gray-900/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                onClick={addNewSchool}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-16 h-16 flex items-center justify-center mb-3">
                  <Plus size={30} className="text-green-500" />
                </div>
                <h3 className="font-semibold text-gray-600 dark:text-gray-300 text-center">Add School</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Click to add another school</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Comparison Sections */}
        <div className="space-y-8">
          {/* Rankings Section */}
          <ComparisonSection 
            title="Rankings" 
            icon={<ListOrdered className="h-5 w-5 text-purple-500 mr-2" />}
            schools={selectedSchools}
            renderContent={() => (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/80">
                    <TableHead className="w-[250px]">Ranking</TableHead>
                    {selectedSchools.map(school => (
                      <TableHead key={`header-${school.id}`}>{school.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">QS Ranking</TableCell>
                    {selectedSchools.map(school => (
                      <TableCell key={`qs-${school.id}`} className="font-medium">#{school.ranking.qs}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                    <TableCell className="font-medium">US News Ranking</TableCell>
                    {selectedSchools.map(school => (
                      <TableCell key={`usNews-${school.id}`} className="font-medium">#{school.ranking.usNews}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Forbes Ranking</TableCell>
                    {selectedSchools.map(school => (
                      <TableCell key={`forbes-${school.id}`} className="font-medium">#{school.ranking.forbes}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                    <TableCell className="font-medium">Shanghai Ranking</TableCell>
                    {selectedSchools.map(school => (
                      <TableCell key={`shanghai-${school.id}`} className="font-medium">#{school.ranking.shanghai}</TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">THE Ranking</TableCell>
                    {selectedSchools.map(school => (
                      <TableCell key={`the-${school.id}`} className="font-medium">#{school.ranking.the}</TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            )}
          />

          {/* Test Scores Section */}
          <ComparisonSection 
            title="Test Requirements" 
            icon={<BookOpen className="h-5 w-5 text-green-500 mr-2" />}
            schools={selectedSchools}
            renderContent={() => (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/80">
                    <TableHead className="w-[250px]">Test</TableHead>
                    {selectedSchools.map(school => (
                      <TableHead key={`header-test-${school.id}`}>{school.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {['TOEFL', 'GRE', 'Duolingo', 'SAT', 'IELTS', 'PTE'].map((test, index) => {
                    const testKey = test.toLowerCase();
                    return (
                      <TableRow key={test} className={index % 2 === 1 ? "bg-gray-50 dark:bg-gray-800/50" : ""}>
                        <TableCell className="font-medium">{test}</TableCell>
                        {selectedSchools.map(school => {
                          const data = getComparisonData(school.id);
                          return (
                            <TableCell key={`${test}-${school.id}`}>
                              {renderYesNo(data.testScores[testKey as keyof typeof data.testScores] || false)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          />

          {/* Admissions Section */}
          <ComparisonSection 
            title="Admissions" 
            icon={<GraduationCap className="h-5 w-5 text-blue-500 mr-2" />}
            schools={selectedSchools}
            renderContent={() => (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/80">
                    <TableHead className="w-[250px]">Factor</TableHead>
                    {selectedSchools.map(school => (
                      <TableHead key={`header-adm-${school.id}`}>{school.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { label: 'Median GPA', key: 'medianGpa' },
                    { label: 'Median SAT Score', key: 'medianSatScore' },
                    { label: 'Acceptance Rate', key: 'acceptanceRate' },
                    { label: 'Applicants Total', key: 'applicantsTotal' },
                    { label: 'Enrollment Rate', key: 'enrollmentRate' },
                    { label: 'Class Size', key: 'classSize' }
                  ].map((item, index) => (
                    <TableRow key={item.key} className={index % 2 === 1 ? "bg-gray-50 dark:bg-gray-800/50" : ""}>
                      <TableCell className="font-medium">{item.label}</TableCell>
                      {selectedSchools.map(school => {
                        const data = getComparisonData(school.id);
                        return (
                          <TableCell key={`${item.key}-${school.id}`} className="font-medium">
                            {data.admissions[item.key as keyof typeof data.admissions]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          />

          {/* Cost Section */}
          <ComparisonSection 
            title="Cost" 
            icon={<DollarSign className="h-5 w-5 text-emerald-500 mr-2" />}
            schools={selectedSchools}
            renderContent={() => (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/80">
                    <TableHead className="w-[250px]">Expense</TableHead>
                    {selectedSchools.map(school => (
                      <TableHead key={`header-cost-${school.id}`}>{school.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { label: 'Tuition (In State)', key: 'tuitionInState' },
                    { label: 'Tuition (Out of State)', key: 'tuitionOutState' },
                    { label: 'Room and Board', key: 'roomAndBoard' },
                    { label: 'Books and Supplies', key: 'booksAndSupplies' },
                    { label: 'Other Expenses', key: 'otherExpenses' },
                    { label: 'Total (In State)', key: 'totalInState', highlight: true },
                    { label: 'Total (Out of State)', key: 'totalOutState', highlight: true }
                  ].map((item, index) => (
                    <TableRow 
                      key={item.key} 
                      className={`${index % 2 === 1 ? "bg-gray-50 dark:bg-gray-800/50" : ""} ${
                        item.highlight ? "border-t-2 border-gray-300 dark:border-gray-600" : ""
                      }`}
                    >
                      <TableCell className={`font-medium ${item.highlight ? "font-semibold" : ""}`}>
                        {item.label}
                      </TableCell>
                      {selectedSchools.map(school => {
                        const data = getComparisonData(school.id);
                        return (
                          <TableCell 
                            key={`${item.key}-${school.id}`} 
                            className={`font-medium ${item.highlight ? "font-semibold text-purple-700 dark:text-purple-400" : ""}`}
                          >
                            {data.cost[item.key as keyof typeof data.cost]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          />

          {/* Scene Section */}
          <ComparisonSection 
            title="Campus Demographics" 
            icon={<Users className="h-5 w-5 text-orange-500 mr-2" />}
            schools={selectedSchools}
            renderContent={() => (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/80">
                    <TableHead className="w-[250px]">Demographic</TableHead>
                    {selectedSchools.map(school => (
                      <TableHead key={`header-scene-${school.id}`}>{school.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { label: 'Total Students', key: 'total' },
                    { label: 'Women', key: 'women' },
                    { label: 'Men & Trans', key: 'menTrans' },
                    { label: 'International', key: 'international' },
                    { label: 'Transfers', key: 'transfers' },
                    { label: 'Out of State', key: 'outOfState' }
                  ].map((item, index) => (
                    <TableRow key={item.key} className={index % 2 === 1 ? "bg-gray-50 dark:bg-gray-800/50" : ""}>
                      <TableCell className="font-medium">{item.label}</TableCell>
                      {selectedSchools.map(school => {
                        const data = getComparisonData(school.id);
                        return (
                          <TableCell key={`${item.key}-${school.id}`} className="font-medium">
                            {data.scene[item.key as keyof typeof data.scene]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          />

          {/* Diversity Section */}
          <ComparisonSection 
            title="Race & Ethnicity" 
            icon={<Building className="h-5 w-5 text-pink-500 mr-2" />}
            schools={selectedSchools}
            renderContent={() => (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800/80">
                    <TableHead className="w-[250px]">Group</TableHead>
                    {selectedSchools.map(school => (
                      <TableHead key={`header-div-${school.id}`}>{school.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { label: 'Asian & Pacific Islander', key: 'asian' },
                    { label: 'Black', key: 'black' },
                    { label: 'Hispanic', key: 'hispanic' },
                    { label: 'Native American', key: 'nativeAmerican' },
                    { label: 'White', key: 'white' },
                    { label: 'Other', key: 'other' }
                  ].map((item, index) => (
                    <TableRow key={item.key} className={index % 2 === 1 ? "bg-gray-50 dark:bg-gray-800/50" : ""}>
                      <TableCell className="font-medium">{item.label}</TableCell>
                      {selectedSchools.map(school => {
                        const data = getComparisonData(school.id);
                        return (
                          <TableCell key={`${item.key}-${school.id}`} className="font-medium">
                            {data.diversity[item.key as keyof typeof data.diversity]}%
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          />

          {/* Programs Section */}
          <ComparisonSection 
            title="Available Programs" 
            icon={<School className="h-5 w-5 text-green-500 mr-2" />}
            schools={selectedSchools}
            renderContent={() => (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedSchools.map((school) => (
                  <div 
                    key={`programs-${school.id}`} 
                    className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg"
                  >
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">{school.name}</h3>
                    <div className="space-y-2">
                      {school.programs.map((program, idx) => (
                        <div 
                          key={`${school.id}-program-${idx}`} 
                          className="bg-white dark:bg-gray-800 px-3 py-2 rounded-md text-sm border border-gray-200 dark:border-gray-700"
                        >
                          {program}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

// Reusable comparison section component
interface ComparisonSectionProps {
  title: string;
  icon: React.ReactNode;
  schools: any[];
  renderContent: () => React.ReactNode;
}

const ComparisonSection = ({ title, icon, schools, renderContent }: ComparisonSectionProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center">
        {icon}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default CompareSchools;
