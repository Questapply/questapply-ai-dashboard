import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Download, Edit, FileText, Save, Share, Star, Trash } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Mock SOPs data
const mockSOPs = [
  {
    id: "sop1",
    title: "Computer Science MS Application",
    university: "Stanford University",
    program: "MS in Computer Science",
    lastEdited: "2023-05-15",
    status: "Complete",
  },
  {
    id: "sop2",
    title: "Data Science PhD Application",
    university: "MIT",
    program: "PhD in Data Science",
    lastEdited: "2023-05-10",
    status: "In Progress",
  },
];

// Sample SOPs data
const sopSamples = [
  {
    id: 1,
    title: "Computer Science Ph.D.",
    university: "Stanford University",
    content: "My interest in computer science began when I built my first program at age 13...",
    rating: 5
  },
  {
    id: 2,
    title: "Molecular Biology Master's",
    university: "MIT",
    content: "The complex mechanisms of cellular function have fascinated me since my undergraduate research...",
    rating: 5
  },
  {
    id: 3,
    title: "Economics Ph.D.",
    university: "Harvard University",
    content: "Working at the intersection of behavioral economics and public policy has shown me...",
    rating: 4
  },
  {
    id: 4,
    title: "Mechanical Engineering Master's",
    university: "UC Berkeley",
    content: "My experience designing sustainable energy solutions has prepared me to contribute to...",
    rating: 4
  },
  {
    id: 5,
    title: "Psychology Ph.D.",
    university: "University of Michigan",
    content: "Through my clinical experience and research in cognitive development, I've observed...",
    rating: 5
  },
  {
    id: 6,
    title: "Business MBA",
    university: "Wharton School",
    content: "Leading teams in technology startups has honed my understanding of organizational...",
    rating: 4
  }
];

const MySOP = () => {
  const [activeId, setActiveId] = useState<string | null>("sop1");
  const [editing, setEditing] = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("my-sop");
  
  // Form states
  const [hook, setHook] = useState<string>("Personal Anecdote");
  const [motivations, setMotivations] = useState<string[]>(["Intellectual curiosity"]);
  const [challenges, setChallenges] = useState<string[]>(["No"]);
  
  const [editedContent, setEditedContent] = useState("");

  const handleEdit = (section: string, content: string) => {
    setEditSection(section);
    setEditedContent(content);
  };

  const handleSave = () => {
    // In a real app, this would save to the database
    setEditSection(null);
  };

  const handleCheckboxChange = (value: string, currentValues: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (currentValues.includes(value)) {
      setter(currentValues.filter(item => item !== value));
    } else {
      setter([...currentValues, value]);
    }
  };

  // Render star ratings
  const renderRating = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Create Your Statement of Purpose</h2>
          <p className="text-sm text-muted-foreground mt-1">You can type in any language.</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            New SOP
          </Button>
          <Button size="sm">Save Draft</Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex overflow-x-auto pb-px border-b border-gray-200 dark:border-gray-700 w-full rounded-none bg-transparent h-auto">
          <TabsTrigger 
            value="guidance" 
            className="px-4 py-3 flex items-center gap-2 whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:-mb-px rounded-none bg-transparent"
          >
            <FileText className="h-4 w-4" />
            Guidance
          </TabsTrigger>
          <TabsTrigger 
            value="samples" 
            className="px-4 py-3 flex items-center gap-2 whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:-mb-px rounded-none bg-transparent"
          >
            <FileText className="h-4 w-4" />
            Samples
          </TabsTrigger>
          <TabsTrigger 
            value="my-sop" 
            className="px-4 py-3 flex items-center gap-2 whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:-mb-px rounded-none bg-transparent"
          >
            <FileText className="h-4 w-4" />
            My SOP
          </TabsTrigger>
          <TabsTrigger 
            value="ai-improvement" 
            className="px-4 py-3 flex items-center gap-2 whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:-mb-px rounded-none bg-transparent"
          >
            <FileText className="h-4 w-4" />
            AI Improvement
          </TabsTrigger>
          <TabsTrigger 
            value="university-match" 
            className="px-4 py-3 flex items-center gap-2 whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:-mb-px rounded-none bg-transparent"
          >
            <FileText className="h-4 w-4" />
            Match with University
          </TabsTrigger>
          <TabsTrigger 
            value="success-stories" 
            className="px-4 py-3 flex items-center gap-2 whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:-mb-px rounded-none bg-transparent"
          >
            <FileText className="h-4 w-4" />
            Success Stories
          </TabsTrigger>
          <TabsTrigger 
            value="ai-humanizer" 
            className="px-4 py-3 flex items-center gap-2 whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500 data-[state=active]:-mb-px rounded-none bg-transparent"
          >
            <FileText className="h-4 w-4" />
            AI Humanizer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="samples" className="pt-6 mt-0">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Sample Statements of Purpose</h2>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Degree Level</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="All Degrees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Degrees</SelectItem>
                    <SelectItem value="phd">PhD</SelectItem>
                    <SelectItem value="masters">Master's</SelectItem>
                    <SelectItem value="mba">MBA</SelectItem>
                    <SelectItem value="bachelors">Bachelor's</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Field of Study</h3>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <SelectValue placeholder="All Fields" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="psychology">Psychology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Sample SOPs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sopSamples.map((sample) => (
                <div
                  key={sample.id}
                  className="rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{sample.title}</h3>
                      {renderRating(sample.rating)}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{sample.university}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">{sample.content}</p>
                    <div className="flex justify-between items-center">
                      <Button size="sm" variant="outline" className="text-purple-600 border-purple-200 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-800 dark:hover:bg-purple-900/20">
                        Read More
                      </Button>
                      <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                        <Share className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                Load More Samples
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-sop" className="pt-6 mt-0">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4 lg:col-span-3 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">My Documents</h3>
                  <div className="space-y-3">
                    {mockSOPs.map((sop) => (
                      <div
                        key={sop.id}
                        className={`p-2 rounded-md cursor-pointer flex justify-between items-center ${
                          activeId === sop.id
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-accent"
                        }`}
                        onClick={() => setActiveId(sop.id)}
                      >
                        <div>
                          <p className="font-medium text-sm">{sop.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {sop.university} • {sop.status}
                          </p>
                        </div>
                        {activeId === sop.id && (
                          <Button size="icon" variant="ghost">
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Introduction / Hook</h3>
                    <div className="flex gap-2">
                      {editSection === "introduction" ? (
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handleEdit(
                              "introduction",
                              "I've always been fascinated by the intersection of technology and healthcare..."
                            )
                          }
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      )}
                    </div>
                  </div>

                  {editSection === "introduction" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Hook Type
                        </label>
                        <Select value={hook} onValueChange={setHook}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select hook type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Personal Anecdote">Personal Anecdote</SelectItem>
                            <SelectItem value="Personal Experience">Personal Experience</SelectItem>
                            <SelectItem value="Contributions to Society">Contributions to Society</SelectItem>
                            <SelectItem value="Future Goals">Future Goals</SelectItem>
                            <SelectItem value="Career Goals">Career Goals</SelectItem>
                            <SelectItem value="Community Involvement">Community Involvement</SelectItem>
                            <SelectItem value="Relevant Experience">Relevant Experience</SelectItem>
                            <SelectItem value="Research Interests">Research Interests</SelectItem>
                            <SelectItem value="Unique Perspective">Unique Perspective</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        rows={8}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Hook Type: {hook}
                      </p>
                      <p>
                        I've always been fascinated by the intersection of technology
                        and healthcare. Growing up with a mother who was a nurse and a
                        father who was a software engineer, I was exposed to both
                        worlds from an early age...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Journey and Motivation</h3>
                    <div className="flex gap-2">
                      {editSection === "motivation" ? (
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handleEdit(
                              "motivation",
                              "My academic journey began when I conducted my first independent research project..."
                            )
                          }
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      )}
                    </div>
                  </div>

                  {editSection === "motivation" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Motivations (select multiple)
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              {motivations.length > 0 
                                ? `${motivations.length} selected`
                                : "Select motivations"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Motivations</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {["Intellectual curiosity", "Career advancement", "Personal growth", "Social impact", "Family expectations", "Industry trends"].map((item) => (
                              <DropdownMenuCheckboxItem
                                key={item}
                                checked={motivations.includes(item)}
                                onCheckedChange={() => 
                                  handleCheckboxChange(item, motivations, setMotivations)
                                }
                              >
                                {item}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        rows={8}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Motivations: {motivations.join(", ")}
                      </p>
                      <p>
                        My academic journey began when I conducted my first
                        independent research project during my undergraduate studies.
                        This experience ignited my passion for discovering new
                        knowledge and solving complex problems...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Any Challenges</h3>
                    <div className="flex gap-2">
                      {editSection === "challenges" ? (
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            handleEdit(
                              "challenges",
                              "During my undergraduate studies, I faced a significant personal challenge..."
                            )
                          }
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      )}
                    </div>
                  </div>

                  {editSection === "challenges" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Challenges (select multiple)
                        </label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-start">
                              {challenges.length > 0 
                                ? `${challenges.length} selected`
                                : "Select challenges"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Challenges</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {[
                              "No",
                              "Low GPA",
                              "Low grades in certain subjects",
                              "Low grade in one or a few courses",
                              "Academic probation",
                              "Course withdrawals",
                              "Gaps in education"
                            ].map((item) => (
                              <DropdownMenuCheckboxItem
                                key={item}
                                checked={challenges.includes(item)}
                                onCheckedChange={() => 
                                  handleCheckboxChange(item, challenges, setChallenges)
                                }
                              >
                                {item}
                              </DropdownMenuCheckboxItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        rows={8}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Challenges: {challenges.join(", ")}
                      </p>
                      <p>
                        During my undergraduate studies, I faced a significant
                        personal challenge when my father was diagnosed with a serious
                        illness. This led to a temporary dip in my academic
                        performance...
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Research Interests</h3>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                  </div>

                  <div>
                    <p>
                      My research interests lie at the intersection of machine
                      learning and healthcare informatics. Specifically, I am
                      fascinated by how AI can be applied to improve patient
                      outcomes...
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-3">
                <Button variant="outline">Save Draft</Button>
                <Button>Generate Final SOP</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MySOP;
