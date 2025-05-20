
import { useState, useRef, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, Check } from "lucide-react";

type FilterOption = string | { value: string; label: string; icon?: string };

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  icon?: React.ReactNode;
  buttonClassName?: string;
}

const FilterDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  icon,
  buttonClassName
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: FilterOption) => {
    const optionValue = typeof option === 'string' ? option : option.value;
    onSelect(optionValue);
    setIsOpen(false);
  };

  // Helper function to get display text for an option
  const getOptionLabel = (option: FilterOption): string => {
    return typeof option === 'string' ? option : option.label;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={buttonClassName || `inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        <span>{label}</span>
        {selectedValue && (
          <span className="ml-1 text-blue-600 dark:text-blue-400">: {selectedValue}</span>
        )}
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div className="py-1 max-h-60 overflow-auto" role="menu" aria-orientation="vertical">
            {options.map((option, index) => {
              const optionLabel = getOptionLabel(option);
              const optionValue = typeof option === 'string' ? option : option.value;
              
              return (
                <div
                  key={index}
                  className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => handleOptionClick(option)}
                >
                  <Checkbox
                    id={`${label}-${optionValue}`}
                    checked={selectedValue === optionValue}
                    className="mr-2 h-4 w-4"
                  />
                  <label
                    htmlFor={`${label}-${optionValue}`}
                    className="flex-grow cursor-pointer text-gray-700 dark:text-gray-300"
                  >
                    {optionLabel}
                  </label>
                  {selectedValue === optionValue && (
                    <Check className="h-4 w-4 text-blue-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
