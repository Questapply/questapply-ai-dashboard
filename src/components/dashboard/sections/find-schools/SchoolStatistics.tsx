
import ProgressCircle from "@/components/ui/progress-circle";

interface SchoolStatisticsProps {
  acceptance: number;
  graduation: number;
}

const SchoolStatistics = ({ acceptance, graduation }: SchoolStatisticsProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Statistics</h4>
      <div className="flex justify-around items-center">
        <div>
          <ProgressCircle 
            value={acceptance}
            size={70}
            color="rgba(239, 68, 68, 0.7)"
            bgColor="rgba(239, 68, 68, 0.1)"
            strokeWidth={6}
          />
          <div className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">Acceptance</div>
        </div>
        <div>
          <ProgressCircle 
            value={graduation}
            size={70}
            color="rgba(34, 197, 94, 0.7)"
            bgColor="rgba(34, 197, 94, 0.1)"
            strokeWidth={6}
          />
          <div className="text-xs text-center mt-1 text-gray-500 dark:text-gray-400">Graduation</div>
        </div>
      </div>
    </div>
  );
};

export default SchoolStatistics;
