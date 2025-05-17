
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuthForm from "@/components/auth/AuthForm";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    // Get current mode from document
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
  }, []);

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-indigo-950' : 'bg-gradient-to-br from-blue-50 to-purple-100'}`}>
      <div className="w-full max-w-md">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <AuthForm 
            mode={mode} 
            onToggleMode={toggleMode} 
            isDarkMode={isDarkMode} 
          />
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-purple-500 rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500 rounded-full opacity-10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
    </div>
  );
};

export default Auth;
