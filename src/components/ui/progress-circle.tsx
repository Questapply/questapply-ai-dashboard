
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  className?: string;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  size = 80,
  strokeWidth = 8,
  color = "hsl(var(--primary))",
  bgColor = "hsl(var(--muted))",
  className,
  showValue = true,
  valuePrefix = "",
  valueSuffix = "%"
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [value]);
  
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          strokeLinecap="round"
        />
      </svg>
      
      {showValue && (
        <motion.div 
          className="absolute text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            className="text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {valuePrefix}
            <motion.span
              initial={{ count: 0 }}
              animate={{ count: displayValue }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {Math.round(displayValue)}
            </motion.span>
            {valueSuffix}
          </motion.span>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressCircle;
