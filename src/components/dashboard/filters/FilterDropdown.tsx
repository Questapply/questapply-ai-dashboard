
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FilterDropdownProps {
  label: string;
  icon: React.ReactNode;
  options: Array<string | { label: string; value: string; icon?: string }>;
  onSelect: (value: string) => void;
  selectedValue?: string;
  className?: string;
  buttonClassName?: string;
}

const FilterDropdown = ({
  label,
  icon,
  options,
  onSelect,
  selectedValue,
  className,
  buttonClassName
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const getSelectedLabel = () => {
    if (!selectedValue) return label;

    const option = options.find(opt => {
      if (typeof opt === "string") return opt === selectedValue;
      return opt.value === selectedValue;
    });

    if (!option) return label;

    if (typeof option === "string") return option;
    return option.label;
  };

  const getSelectedIcon = () => {
    if (!selectedValue) return null;

    const option = options.find(opt => {
      if (typeof opt === "string") return false;
      return opt.value === selectedValue && opt.icon;
    });

    if (!option || typeof option === "string") return null;
    return option.icon;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ y: -3 }}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm border",
            "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300",
            "hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-sm",
            "transition-all duration-300 ease-in-out focus:outline-none",
            selectedValue && "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700",
            className,
            buttonClassName
          )}
          aria-label={`Filter by ${label}`}
        >
          <span>{icon}</span>
          <span className="max-w-[120px] truncate">
            {getSelectedIcon() ? (
              <span className="mr-1">{getSelectedIcon()}</span>
            ) : null}
            {getSelectedLabel()}
          </span>
          <ChevronDown className="h-3.5 w-3.5 ml-1" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[200px] max-h-[300px] overflow-y-auto">
        {options.map((option, index) => {
          const isString = typeof option === "string";
          const optionValue = isString ? option : option.value;
          const optionLabel = isString ? option : option.label;
          const optionIcon = !isString && option.icon ? option.icon : null;
          
          return (
            <DropdownMenuItem
              key={index}
              className={cn(
                "flex items-center justify-between cursor-pointer",
                selectedValue === optionValue && "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              )}
              onClick={() => handleSelect(optionValue)}
            >
              <div className="flex items-center gap-2">
                {optionIcon && <span>{optionIcon}</span>}
                <span>{optionLabel}</span>
              </div>
              {selectedValue === optionValue && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
