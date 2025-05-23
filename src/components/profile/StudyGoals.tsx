import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { studyCountries, studyLevels, studyFields } from "@/lib/study-options";

interface StudyGoalsProps {
  onNext: (data: any) => void;
  data: {
    country: string;
    level: string;
    field: string;
  };
}

const StudyGoals: React.FC<StudyGoalsProps> = ({ onNext, data }) => {
  const [country, setCountry] = useState(data.country || "");
  const [level, setLevel] = useState(data.level || "");
  const [field, setField] = useState(data.field || "");
  const [errors, setErrors] = useState({
    country: false,
    level: false,
    field: false
  });

  const handleNext = () => {
    // Validate
    const newErrors = {
      country: !country,
      level: !level,
      field: !field
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).includes(true)) {
      onNext({ country, level, field });
    }
  };

  const handlePrevious = () => {
    // Go back to the previous section (Education)
    onNext({ type: "back" });
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const globeAnimation = {
    hidden: { scale: 0.8, opacity: 0, rotate: -30 },
    show: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1
      }
    }
  };

  // Get the flag emoji for the selected country
  const getCountryFlag = (countryName) => {
    const countryEntry = studyCountries.find(c => c.name === countryName);
    return countryEntry ? countryEntry.flag : '🌍';
  };

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center">
          <div className="flex justify-center mb-4">
            <motion.div
              variants={globeAnimation}
              className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
            >
              <Globe className="w-10 h-10 text-green-600 dark:text-green-400" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Study Abroad Goals</h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Tell us where and what you'd like to study so we can help you find the perfect program.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="country">Which country do you want to study in?</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country" className={`w-full ${errors.country ? 'border-red-500 dark:border-red-500' : ''}`}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {studyCountries.map(country => (
                  <SelectItem key={country.name} value={country.name}>
                    <div className="flex items-center gap-2">
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-red-500 text-sm">Please select a country</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">What level do you want to study?</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level" className={`w-full ${errors.level ? 'border-red-500 dark:border-red-500' : ''}`}>
                <SelectValue placeholder="Select degree level" />
              </SelectTrigger>
              <SelectContent>
                {studyLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.level && (
              <p className="text-red-500 text-sm">Please select a degree level</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="field">What field do you want to study?</Label>
            <Select value={field} onValueChange={setField}>
              <SelectTrigger id="field" className={`w-full ${errors.field ? 'border-red-500 dark:border-red-500' : ''}`}>
                <SelectValue placeholder="Select field of study" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {studyFields.map(field => (
                  <SelectItem key={field} value={field}>{field}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.field && (
              <p className="text-red-500 text-sm">Please select a field of study</p>
            )}
          </div>
        </motion.div>

        {country && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800/30"
          >
            <div className="flex items-center justify-center space-x-4">
              <span className="text-5xl">{getCountryFlag(country)}</span>
              <div className="text-left">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{country}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {level} in {field}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            className="px-8"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default StudyGoals;
