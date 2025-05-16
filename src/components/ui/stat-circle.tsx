
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCircleProps {
  value: number | string;
  label: string;
  size?: "sm" | "md" | "lg"; 
  color?: "purple" | "blue" | "green" | "red" | "yellow" | "gray";
  strokeWidth?: number;
  className?: string;
  isPercentage?: boolean;
  valueClassName?: string;
  labelClassName?: string;
}

export const StatCircle: React.FC<StatCircleProps> = ({
  value,
  label,
  size = "md",
  color = "purple",
  strokeWidth = 4,
  className,
  isPercentage = true,
  valueClassName,
  labelClassName
}) => {
  // Get numeric value for animation
  const numericValue = typeof value === "string" ? parseInt(value) : value;
  const displayValue = isPercentage ? `${value}%` : value;
  
  // Colors based on theme
  const colorMap = {
    purple: "border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400",
    blue: "border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400",
    green: "border-green-300 dark:border-green-700 text-green-600 dark:text-green-400",
    red: "border-red-300 dark:border-red-700 text-red-600 dark:text-red-400",
    yellow: "border-yellow-300 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400",
    gray: "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400",
  };
  
  // Size classes
  const sizeMap = {
    sm: "h-16 w-16 text-base",
    md: "h-20 w-20 text-lg",
    lg: "h-24 w-24 text-xl",
  };
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <motion.div 
        className={cn(
          "rounded-full flex items-center justify-center border-4 bg-white dark:bg-gray-800 shadow-sm",
          colorMap[color],
          sizeMap[size]
        )}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1
        }}
        whileHover={{ scale: 1.05 }}
      >
        <span className={cn("font-bold", valueClassName)}>
          {displayValue}
        </span>
      </motion.div>
      <span className={cn("text-xs text-gray-500 dark:text-gray-400 mt-2", labelClassName)}>
        {label}
      </span>
    </div>
  );
};

export default StatCircle;
