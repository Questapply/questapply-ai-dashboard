
import React from "react";

interface ProgressCircleProps {
  value: number;
  size?: "sm" | "md" | "lg";
  color?: "red" | "green" | "blue" | "purple" | "orange";
  label?: string;
  strokeWidth?: number;
  isPercentage?: boolean;
}

const ProgressCircle = ({
  value,
  size = "md",
  color = "blue",
  label,
  strokeWidth = 4,
  isPercentage = true
}: ProgressCircleProps) => {
  const sizeMap = {
    sm: 60,
    md: 80,
    lg: 100
  };

  const fontSizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };

  const colorMap = {
    red: {
      stroke: "stroke-red-500",
      text: "text-red-400",
      bgStroke: "stroke-red-900/30"
    },
    green: {
      stroke: "stroke-green-500",
      text: "text-green-400",
      bgStroke: "stroke-green-900/30"
    },
    blue: {
      stroke: "stroke-blue-500",
      text: "text-blue-400",
      bgStroke: "stroke-blue-900/30"
    },
    purple: {
      stroke: "stroke-purple-500",
      text: "text-purple-400",
      bgStroke: "stroke-purple-900/30"
    },
    orange: {
      stroke: "stroke-orange-500",
      text: "text-orange-400",
      bgStroke: "stroke-orange-900/30"
    }
  };

  // SVG circle parameters
  const actualSize = sizeMap[size];
  const radius = (actualSize / 2) - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: actualSize, height: actualSize }}>
        {/* Background circle */}
        <svg
          width={actualSize}
          height={actualSize}
          viewBox={`0 0 ${actualSize} ${actualSize}`}
          className="rotate-[-90deg]"
        >
          <circle
            cx={actualSize / 2}
            cy={actualSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className={`fill-transparent ${colorMap[color].bgStroke}`}
          />
          <circle
            cx={actualSize / 2}
            cy={actualSize / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className={`fill-transparent ${colorMap[color].stroke}`}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center ${fontSizeMap[size]} ${colorMap[color].text} font-bold`}>
          {isPercentage ? `${value}%` : value}
        </div>
      </div>
      {label && <div className="mt-2 text-sm text-gray-400">{label}</div>}
    </div>
  );
};

export default ProgressCircle;
