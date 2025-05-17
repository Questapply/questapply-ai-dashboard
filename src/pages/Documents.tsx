
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  File,
  UploadCloud,
  Download,
  FileText,
  Edit3,
  Trash2,
  Plus,
  FileCheck,
  FileX,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Documents = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Sample documents data
  const documents = {
    sop: [
      {
        id: 1,
        title: "Statement of Purpose - CS",
        lastUpdated: "2023-11-10",
        status: "verified",
        size: "1.2 MB",
        type: "PDF",
      },
      {
        id: 2,
        title: "Statement of Purpose - AI",
        lastUpdated: "2023-11-15",
        status: "draft",
        size: "900 KB",
        type: "DOCX",
      }
    ],
    lors: [
      {
        id: 3,
        title: "LOR - Prof. Johnson",
        lastUpdated: "2023-10-25",
        status: "received",
        size: "800 KB",
        type: "PDF",
        professor: "Sarah Johnson",
        university: "MIT"
      },
      {
        id: 4,
        title: "LOR - Prof. Chen",
        lastUpdated: "2023-11-05",
        status: "pending",
        professor: "Michael Chen",
        university: "Stanford University"
      }
    ],
    transcripts: [
      {
        id: 5,
        title: "Undergraduate Transcript",
        lastUpdated: "2023-09-20",
        status: "verified",
        size: "2.1 MB",
        type: "PDF",
        institution: "University of Washington"
      },
      {
        id: 6,
        title: "Graduate Transcript",
        lastUpdated: "2023-09-20",
        status: "rejected",
        size: "1.8 MB",
        type: "PDF",
        institution: "University of California"
      }
    ],
    resumes: [
      {
        id: 7,
        title: "Resume - Research Focus",
        lastUpdated: "2023-11-02",
        status: "verified",
        size: "500 KB",
        type: "PDF"
      },
      {
        id: 8,
        title: "Resume - Industry Focus",
        lastUpdated: "2023-11-18",
        status: "draft",
        size: "450 KB",
        type: "DOCX"
      }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <FileX className="h-5 w-5 text-red-500" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "received":
        return <FileCheck className="h-5 w-5 text-blue-500" />;
      case "draft":
        return <Edit3 className="h-5 w-5 text-gray-500" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "verified":
        return <span className="text-green-600 dark:text-green-400">Verified</span>;
      case "rejected":
        return <span className="text-red-600 dark:text-red-400">Rejected</span>;
      case "pending":
        return <span className="text-amber-600 dark:text-amber-400">Pending</span>;
      case "received":
        return <span className="text-blue-600 dark:text-blue-400">Received</span>;
      case "draft":
        return <span className="text-gray-600 dark:text-gray-400">Draft</span>;
      default:
        return null;
    }
  };

  const renderDocumentCards = (docArray: any[]) => {
    return docArray.map((doc, index) => (
      <motion.div
        key={doc.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  {getStatusIcon(doc.status)}
                </div>
                <div>
                  <h3 className="font-semibold text-base">{doc.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                    </p>
                    {doc.size && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Size: {doc.size}
                      </p>
                    )}
                    {doc.type && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Type: {doc.type}
                      </p>
                    )}
                    {doc.professor && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Professor: {doc.professor}
                      </p>
                    )}
                    {doc.university && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        University: {doc.university}
                      </p>
                    )}
                    {doc.institution && (
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Institution: {doc.institution}
                      </p>
                    )}
                  </div>
                  <p className="mt-2 text-sm">
                    Status: {getStatusText(doc.status)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {doc.type && (
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Download className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Edit3 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ));
  };

  return (
    <DashboardLayout
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            My Documents
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage and organize all your application documents in one place.
          </p>
        </motion.div>

        <div className="flex justify-end">
          <Button className="flex items-center gap-2">
            <UploadCloud className="h-4 w-4" />
            Upload New Document
          </Button>
        </div>

        <Tabs defaultValue="sop" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="sop" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Statements of Purpose</span>
            </TabsTrigger>
            <TabsTrigger value="lors" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Letters of Recommendation</span>
            </TabsTrigger>
            <TabsTrigger value="transcripts" className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Transcripts</span>
            </TabsTrigger>
            <TabsTrigger value="resumes" className="flex items-center gap-2">
              <File className="h-4 w-4" />
              <span>Resumes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sop">
            <div className="space-y-4">
              {renderDocumentCards(documents.sop)}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="outline" className="w-full py-6 border-dashed flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Plus className="h-5 w-5" />
                  Create New Statement of Purpose
                </Button>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="lors">
            <div className="space-y-4">
              {renderDocumentCards(documents.lors)}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="outline" className="w-full py-6 border-dashed flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Plus className="h-5 w-5" />
                  Request New Letter of Recommendation
                </Button>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="transcripts">
            <div className="space-y-4">
              {renderDocumentCards(documents.transcripts)}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="outline" className="w-full py-6 border-dashed flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Plus className="h-5 w-5" />
                  Upload New Transcript
                </Button>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="resumes">
            <div className="space-y-4">
              {renderDocumentCards(documents.resumes)}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button variant="outline" className="w-full py-6 border-dashed flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Plus className="h-5 w-5" />
                  Create New Resume
                </Button>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
