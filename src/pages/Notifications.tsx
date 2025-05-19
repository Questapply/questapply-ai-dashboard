
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "message" | "update" | "alert" | "success";
  date: string;
}

// Sample notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Application Update",
    message: "Your application to MIT has been updated. The admissions office has requested additional documents.",
    time: "2 min ago",
    date: "May 19, 2025",
    read: false,
    type: "update"
  },
  {
    id: "2",
    title: "Professor Response",
    message: "Dr. Smith has replied to your email regarding research opportunities in the AI department.",
    time: "1 hour ago",
    date: "May 19, 2025",
    read: false,
    type: "message"
  },
  {
    id: "3",
    title: "Document Approved",
    message: "Your Statement of Purpose has been approved by the advisor. You can now proceed with your application submission.",
    time: "3 hours ago",
    date: "May 19, 2025",
    read: true,
    type: "success"
  },
  {
    id: "4",
    title: "Deadline Reminder",
    message: "Application deadline for Stanford University is in 3 days. Make sure to complete all sections of your application.",
    time: "5 hours ago",
    date: "May 19, 2025",
    read: true,
    type: "alert"
  },
  {
    id: "5",
    title: "New Program Match",
    message: "We found a new program matching your profile: Master of Science in Data Science at University of Washington.",
    time: "1 day ago",
    date: "May 18, 2025",
    read: true,
    type: "update"
  },
  {
    id: "6",
    title: "Payment Confirmed",
    message: "Your payment for the premium subscription has been received. You now have access to all premium features.",
    time: "2 days ago",
    date: "May 17, 2025",
    read: true,
    type: "success"
  },
  {
    id: "7",
    title: "New School Added",
    message: "Columbia University has been added to your schools of interest based on your profile.",
    time: "3 days ago",
    date: "May 16, 2025",
    read: true,
    type: "update"
  }
];

const Notifications = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "message":
        return <div className="h-3 w-3 rounded-full bg-blue-500"></div>;
      case "update":
        return <div className="h-3 w-3 rounded-full bg-purple-500"></div>;
      case "alert":
        return <div className="h-3 w-3 rounded-full bg-amber-500"></div>;
      case "success":
        return <div className="h-3 w-3 rounded-full bg-green-500"></div>;
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-500"></div>;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const allCount = notifications.length;

  return (
    <DashboardLayout 
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Notifications</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Stay updated with your application progress and important alerts
            </p>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button 
              variant="outline" 
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClearAll}
              disabled={allCount === 0}
            >
              Clear all
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All ({allCount})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 ${!notification.read ? "bg-blue-50/50 dark:bg-blue-900/10" : ""}`}
                    >
                      <div className="flex">
                        <div className="mr-4 mt-1.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className={`text-sm font-medium ${!notification.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {notification.date}
                            </span>
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300" 
                                onClick={() => handleMarkAsRead(notification.id)}
                              >
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No notifications</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
                    When you have new notifications, they will appear here
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="unread">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {notifications.filter(n => !n.read).length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {notifications.filter(n => !n.read).map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-blue-50/50 dark:bg-blue-900/10"
                    >
                      <div className="flex">
                        <div className="mr-4 mt-1.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400 dark:text-gray-500">
                              {notification.date}
                            </span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-xs text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300" 
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">All caught up!</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
                    You have no unread notifications
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
