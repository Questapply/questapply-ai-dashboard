
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
  color?: "purple" | "blue" | "green" | "red" | "yellow" | "gray";
  showValue?: boolean;
  label?: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = "md",
  strokeWidth = 6,
  color = "purple",
  showValue = true,
  label,
  className,
  valueClassName,
  labelClassName
}) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    setProgress(value);
  }, [value]);
  
  // Size configs
  const sizeMap = {
    sm: {
      width: 64,
      height: 64,
      textSize: "text-lg",
      labelSize: "text-xs"
    },
    md: {
      width: 80,
      height: 80,
      textSize: "text-xl",
      labelSize: "text-sm"
    },
    lg: {
      width: 120,
      height: 120,
      textSize: "text-3xl",
      labelSize: "text-sm"
    }
  };
  
  // Color configs
  const colorMap = {
    purple: {
      stroke: "stroke-purple-600 dark:stroke-purple-400",
      bg: "stroke-purple-200 dark:stroke-purple-900",
      text: "text-purple-600 dark:text-purple-400"
    },
    blue: {
      stroke: "stroke-blue-600 dark:stroke-blue-400",
      bg: "stroke-blue-200 dark:stroke-blue-900",
      text: "text-blue-600 dark:text-blue-400"
    },
    green: {
      stroke: "stroke-green-600 dark:stroke-green-400",
      bg: "stroke-green-200 dark:stroke-green-900",
      text: "text-green-600 dark:text-green-400"
    },
    red: {
      stroke: "stroke-red-600 dark:stroke-red-400",
      bg: "stroke-red-200 dark:stroke-red-900",
      text: "text-red-600 dark:text-red-400"
    },
    yellow: {
      stroke: "stroke-yellow-600 dark:stroke-yellow-400",
      bg: "stroke-yellow-200 dark:stroke-yellow-900",
      text: "text-yellow-600 dark:text-yellow-400"
    },
    gray: {
      stroke: "stroke-gray-600 dark:stroke-gray-400",
      bg: "stroke-gray-200 dark:stroke-gray-900",
      text: "text-gray-600 dark:text-gray-400"
    }
  };
  
  const selectedSize = sizeMap[size];
  const selectedColor = colorMap[color];
  
  const radius = (selectedSize.width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: selectedSize.width, height: selectedSize.height }}>
        <svg 
          width={selectedSize.width}
          height={selectedSize.height}
          viewBox={`0 0 ${selectedSize.width} ${selectedSize.height}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={selectedSize.width / 2}
            cy={selectedSize.height / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            className={selectedColor.bg}
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={selectedSize.width / 2}
            cy={selectedSize.height / 2}
            r={radius}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className={selectedColor.stroke}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference
            }}
          />
        </svg>
        
        {/* Text in the center of the circle */}
        {showValue && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className={cn(selectedSize.textSize, "font-semibold", selectedColor.text, valueClassName)}>
              {progress}%
            </span>
          </motion.div>
        )}
      </div>
      
      {label && (
        <span className={cn("mt-2", selectedSize.labelSize, "text-gray-500 dark:text-gray-400", labelClassName)}>
          {label}
        </span>
      )}
    </div>
  );
};

export default ProgressCircle;
