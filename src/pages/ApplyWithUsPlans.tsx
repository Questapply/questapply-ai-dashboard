
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Award,
  DollarSign,
  Plane,
  Users,
  Check,
  ArrowRight,
  Sparkles,
  BookOpen,
  FileText,
  Headphones,
  Clock,
  Mail,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ApplyWithUsPlans = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    toast({
      title: `${plan} Plan Selected`,
      description: "Great choice! Click continue to proceed.",
    });
  };

  const handleContinue = () => {
    if (selectedPlan) {
      navigate("/apply-with-us/dashboard", { state: { plan: selectedPlan } });
    } else {
      toast({
        title: "Please select a plan",
        description: "You need to select a plan before continuing.",
        variant: "destructive",
      });
    }
  };

  const plans = [
    {
      id: "bronze",
      name: "Bronze",
      description: "University Admission Only",
      price: "$799",
      icon: <Award className="h-12 w-12 text-amber-500" />,
      color: "from-amber-500 to-orange-500",
      features: [
        { name: "University Selection Guidance", icon: <BookOpen size={18} /> },
        { name: "Application Strategy", icon: <FileText size={18} /> },
        { name: "Document Review", icon: <Check size={18} /> },
        { name: "Basic Email Support", icon: <Mail size={18} /> },
      ],
    },
    {
      id: "silver",
      name: "Silver",
      description: "Admission + Funding Support",
      price: "$1299",
      icon: <DollarSign className="h-12 w-12 text-slate-400" />,
      color: "from-slate-400 to-slate-500",
      popular: true,
      features: [
        { name: "Everything in Bronze", icon: <Check size={18} /> },
        { name: "Scholarships & Funding Research", icon: <DollarSign size={18} /> },
        { name: "Priority Email Support", icon: <BadgeCheck size={18} /> },
        { name: "2 Personalized Consultation Calls", icon: <Headphones size={18} /> },
        { name: "Application Fee Waivers", icon: <FileText size={18} /> },
      ],
    },
    {
      id: "gold",
      name: "Gold",
      description: "Admission + Funding + Visa Assistance",
      price: "$1999",
      icon: <Sparkles className="h-12 w-12 text-yellow-400" />,
      color: "from-yellow-400 to-amber-600",
      features: [
        { name: "Everything in Silver", icon: <Check size={18} /> },
        { name: "Visa Application Support", icon: <Plane size={18} /> },
        { name: "Accommodation Guidance", icon: <Users size={18} /> },
        { name: "24/7 Priority Support", icon: <Clock size={18} /> },
        { name: "Pre-Departure Orientation", icon: <BookOpen size={18} /> },
        { name: "Travel & Settlement Tips", icon: <Plane size={18} /> },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Choose Your Application Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          >
            Select the plan that best fits your needs and goals. Each plan includes personalized support to help you succeed in your application journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 
                ${selectedPlan === plan.id ? 'ring-2 ring-green-500 transform scale-[1.02]' : ''}
                ${plan.popular ? 'md:transform md:scale-[1.05] z-10' : ''}`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-1 px-4 text-center text-sm font-medium">
                  Most Popular Choice
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    {plan.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-center text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                <p className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-6">{plan.price}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="mr-2 text-green-500 dark:text-green-400">{feature.icon}</span>
                      {feature.name}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-2 rounded-lg transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? "bg-gradient-to-r from-green-600 to-teal-600 text-white"
                      : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedPlan}
            className={`bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-10 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 ${
              !selectedPlan ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            Continue to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplyWithUsPlans;
