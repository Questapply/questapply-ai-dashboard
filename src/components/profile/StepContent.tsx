
import React from "react";
import CitizenshipResidency from "./CitizenshipResidency";
import Education from "./Education";
import StudyGoals from "./StudyGoals";
import LanguageProficiency from "./LanguageProficiency";
import StandardizedTests from "./StandardizedTests";
import ApplicationPriorities from "./ApplicationPriorities";
import FinancialStatus from "./FinancialStatus";
import NumberOfPrograms from "./NumberOfPrograms";
import ProfileComplete from "./ProfileComplete";
import { ProfileStep, StepData } from "./ProfileTypes";

interface StepContentProps {
  currentStep: ProfileStep;
  onNext: (data: any) => void;
  data: StepData;
}

const StepContent: React.FC<StepContentProps> = ({ currentStep, onNext, data }) => {
  // Render the appropriate step component based on current step
  const renderStep = () => {
    switch (currentStep) {
      case "citizenship":
        return <CitizenshipResidency onNext={onNext} data={data.citizenship} />;
      case "education":
        return <Education onNext={onNext} data={data.education} />;
      case "goals":
        return <StudyGoals onNext={onNext} data={data.goals} />;
      case "language":
        return <LanguageProficiency onNext={onNext} data={data.language} />;
      case "tests":
        return <StandardizedTests onNext={onNext} data={data.tests} />;
      case "priorities":
        return <ApplicationPriorities onNext={onNext} data={data.priorities} />;
      case "financial":
        return <FinancialStatus onNext={onNext} data={data.financial} />;
      case "programs":
        return <NumberOfPrograms onNext={onNext} data={data.programs} />;
      case "complete":
        return <ProfileComplete onNext={onNext} profileData={data} />;
      default:
        return <CitizenshipResidency onNext={onNext} data={data.citizenship} />;
    }
  };

  return (
    <div className="w-full">
      {renderStep()}
    </div>
  );
};

export default StepContent;
