
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedCard from "@/components/ui/animated-card";
import { Progress } from "@/components/ui/progress";
import { School } from "./SchoolsData";

interface SchoolStatisticsProps {
  school: School;
}

const SchoolStatistics = ({ school }: SchoolStatisticsProps) => {
  return (
    <AnimatedCard className="col-span-12 md:col-span-6 lg:col-span-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg font-bold">School Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Acceptance Rate</span>
              <span className="text-sm font-medium">{school.acceptance}%</span>
            </div>
            <Progress value={school.acceptance} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Graduation Rate</span>
              <span className="text-sm font-medium">{school.graduation}%</span>
            </div>
            <Progress value={school.graduation} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default SchoolStatistics;
