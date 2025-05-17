
export type ProfileStep = 'citizenship' | 'education' | 'goals' | 'language' | 'tests' | 'complete';

export interface Step {
  id: string;
  title: string;
  icon: string;
}

export interface CitizenshipData {
  country: string;
  residence: string;
}

export interface EducationData {
  degree: string;
  university: string;
  major: string;
  gpa: string;
}

export interface GoalsData {
  country: string;
  level: string;
  field: string;
}

export interface LanguageData {
  test: string;
  score: string;
}

export interface TestData {
  type: string;
  scores: Record<string, any>;
}

export interface StepData {
  citizenship: CitizenshipData;
  education: EducationData;
  goals: GoalsData;
  language: LanguageData;
  tests: TestData;
}

export interface ProfileCompleteProps {
  onNext: (data: any) => void;
  profileData: StepData;
}
