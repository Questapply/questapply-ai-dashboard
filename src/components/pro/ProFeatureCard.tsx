
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface ProFeatureCardProps {
  feature: Feature;
  delay?: number;
}

const ProFeatureCard: React.FC<ProFeatureCardProps> = ({ feature, delay = 0 }) => {
  const { title, description, icon: Icon, color } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full overflow-hidden border border-purple-100 dark:border-purple-900/50 hover:shadow-md transition-all duration-300">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className={`p-3 rounded-full bg-gradient-to-r ${color} mb-4`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProFeatureCard;
