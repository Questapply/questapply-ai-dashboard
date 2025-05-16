
export interface School {
  id: number;
  name: string;
  location: string;
  logo: string;
  ranking: Record<string, number>;
  programs: string[];
  acceptance: number;
  graduation: number;
  cost: {
    inState: number;
    outState: number;
  };
  favorite: boolean;
}

export const schools: School[] = [
  {
    id: 1,
    name: "Harvard University",
    location: "Cambridge, Massachusetts",
    logo: "/placeholder.svg",
    ranking: {
      qs: 1,
      usNews: 3,
      forbes: 15,
      shanghai: 1,
      the: 1
    },
    programs: ["Ph.D: 74 Programs", "Master: 13 Programs", "Bachelor: 62 Programs"],
    acceptance: 5,
    graduation: 98,
    cost: {
      inState: 22441,
      outState: 91403
    },
    favorite: false,
  },
  {
    id: 2,
    name: "Stanford University",
    location: "Stanford, California",
    logo: "/placeholder.svg",
    ranking: {
      qs: 2,
      usNews: 4,
      forbes: 10,
      shanghai: 2,
      the: 3
    },
    programs: ["Ph.D: 74 Programs", "Master: 51 Programs", "Bachelor: 58 Programs"],
    acceptance: 4,
    graduation: 96,
    cost: {
      inState: 18491,
      outState: 77740
    },
    favorite: false,
  },
  {
    id: 3,
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, Massachusetts",
    logo: "/placeholder.svg",
    ranking: {
      qs: 3,
      usNews: 2,
      forbes: 4, 
      shanghai: 4,
      the: 2
    },
    programs: ["Ph.D: 65 Programs", "Master: 46 Programs", "Bachelor: 55 Programs"],
    acceptance: 7,
    graduation: 95,
    cost: {
      inState: 20454,
      outState: 83250
    },
    favorite: true,
  }
];
