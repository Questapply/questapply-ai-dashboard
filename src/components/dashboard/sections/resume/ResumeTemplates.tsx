
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Star } from "lucide-react";

const resumeTemplates = [
  { 
    id: "academic", 
    name: "Academic CV", 
    description: "Ideal for PhD applications and research positions",
    image: "/placeholder.svg",
    popular: true
  },
  { 
    id: "professional", 
    name: "Professional Resume", 
    description: "Clean, modern design for industry applications",
    image: "/placeholder.svg",
    popular: false
  },
  { 
    id: "creative", 
    name: "Creative Resume", 
    description: "Stand out with a unique yet professional design",
    image: "/placeholder.svg",
    popular: false
  },
  { 
    id: "minimal", 
    name: "Minimal Resume", 
    description: "Simple and elegant design focusing on content",
    image: "/placeholder.svg",
    popular: false
  },
  { 
    id: "modern", 
    name: "Modern Resume", 
    description: "Contemporary style with bold typography",
    image: "/placeholder.svg",
    popular: false
  },
  { 
    id: "technical", 
    name: "Technical Resume", 
    description: "Optimized for technical and engineering roles",
    image: "/placeholder.svg",
    popular: true
  },
  { 
    id: "research", 
    name: "Research CV", 
    description: "Focused on academic research achievements",
    image: "/placeholder.svg",
    popular: false
  },
  { 
    id: "executive", 
    name: "Executive Resume", 
    description: "Sophisticated design for senior positions",
    image: "/placeholder.svg",
    popular: false
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ResumeTemplates = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Choose Your Template</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
          Select from our professionally designed templates to create a standout resume that matches your career goals and personal style.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {resumeTemplates.map((template) => (
          <motion.div
            key={template.id}
            variants={item}
            whileHover={{ 
              y: -8,
              transition: { type: "spring", stiffness: 300, damping: 20 } 
            }}
          >
            <Card className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img 
                  src={template.image} 
                  alt={template.name} 
                  className="w-full h-48 object-cover object-top"
                />
                {template.popular && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                    <Star className="w-3 h-3 mr-1" fill="white" />
                    Popular
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{template.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 h-10">{template.description}</p>
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                    Use Template
                  </Button>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center mt-10"
      >
        <Button 
          variant="outline" 
          className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600"
        >
          <Download className="mr-2 h-4 w-4" />
          Import Existing Resume
        </Button>
      </motion.div>
    </div>
  );
};

export default ResumeTemplates;
