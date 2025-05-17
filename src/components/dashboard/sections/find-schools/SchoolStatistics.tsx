
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
              <span className="text-sm font-medium">{school.acceptanceRate}%</span>
            </div>
            <Progress value={school.acceptanceRate} className="h-2" color="red" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Graduation Rate</span>
              <span className="text-sm font-medium">{school.graduationRate}%</span>
            </div>
            <Progress value={school.graduationRate} className="h-2" color="green" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Student-Faculty Ratio</span>
              <span className="text-sm font-medium">{school.studentFacultyRatio}:1</span>
            </div>
            <Progress value={school.studentFacultyRatio * 5} max={100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">International Students</span>
              <span className="text-sm font-medium">{school.internationalStudents}%</span>
            </div>
            <Progress value={school.internationalStudents} className="h-2" color="blue" />
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  );
};

export default SchoolStatistics;
