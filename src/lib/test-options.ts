
import { TestTube } from "lucide-react";

export const languageTests = [
  { value: "TOEFL", label: "TOEFL" },
  { value: "IELTS", label: "IELTS" },
  { value: "Duolingo", label: "Duolingo English Test" },
  { value: "MELAB", label: "MELAB" },
  { value: "PTE", label: "PTE Academic" },
  { value: "Cael", label: "CAEL" },
  { value: "I don't have this", label: "I don't have this" },
  { value: "Not yet, but I will in the future", label: "Not yet, but I will in the future" }
];

export const standardizedTests = [
  {
    id: "gre",
    name: "GRE",
    icon: TestTube,
    description: "The GRE is widely accepted across most disciplines, including business schools, but it is not used for law school applications.",
    scoreFields: [
      { id: "total", label: "GRE Total" },
      { id: "verbal", label: "GRE Verbal" },
      { id: "quantitative", label: "GRE Quantitative" },
      { id: "writing", label: "GRE Writing" }
    ]
  },
  {
    id: "gmat",
    name: "GMAT",
    icon: TestTube,
    description: "The GMAT is specifically designed for business school applications and is not accepted for other fields of study.",
    scoreFields: [
      { id: "total", label: "GMAT Total" },
      { id: "verbal", label: "GMAT Verbal" },
      { id: "quantitative", label: "GMAT Quantitative" },
      { id: "writing", label: "GMAT Writing" }
    ]
  },
  {
    id: "lsat",
    name: "LSAT",
    icon: TestTube,
    description: "The LSAT is exclusively required for law school admissions and is not applicable to other disciplines.",
    scoreFields: [
      { id: "total", label: "LSAT Total" }
    ]
  }
];
