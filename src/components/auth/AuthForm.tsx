
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Validation schemas
const signupSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  userType: z.string().optional(),
  referralCode: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms"
  })
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional()
});

type SignupValues = z.infer<typeof signupSchema>;
type LoginValues = z.infer<typeof loginSchema>;

interface AuthFormProps {
  mode: "login" | "signup";
  onToggleMode: () => void;
  isDarkMode: boolean;
}

const AuthForm = ({ mode, onToggleMode, isDarkMode }: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize the correct form based on mode
  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const signupForm = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      userType: "",
      referralCode: "",
      agreeTerms: false
    }
  });

  const form = mode === "login" ? loginForm : signupForm;

  const onSubmit = async (values: SignupValues | LoginValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success toast
      toast({
        title: mode === "login" ? "Login successful!" : "Account created!",
        description: mode === "login" 
          ? "Welcome back to QuestApply." 
          : "Your account has been created successfully.",
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white border-gray-800' : 'bg-white'} rounded-xl shadow-xl border border-opacity-10`}>
      <CardContent className="p-0">
        <motion.div 
          className="flex flex-col items-center p-8"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          {/* Logo */}
          <motion.div variants={logoVariants} className="mb-6">
            <div className="text-4xl font-bold text-center">
              <span className="text-purple-500">Quest</span>
              <span className={isDarkMode ? "text-gray-200" : "text-gray-700"}>Apply</span>
            </div>
          </motion.div>
          
          {/* Title */}
          <motion.h1 
            variants={itemVariants}
            className={`text-2xl font-bold mb-2 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          >
            {mode === "login" ? "Hello Again!" : "Welcome!"}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className={`text-center mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            {mode === "login" 
              ? "You have more access by logging into your account."
              : "You have more access by creating an account"}
          </motion.p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
              {/* Sign Up Form Fields */}
              {mode === "signup" && (
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Full Name *"
                              className={`h-12 pl-10 pr-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'}`}
                            />
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}

              {/* Email Field - Both Login & Sign Up */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Email *"
                            type="email"
                            className={`h-12 pl-10 pr-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'}`}
                          />
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Password Field - Both Login & Sign Up */}
              <motion.div variants={itemVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password *"
                            className={`h-12 pl-10 pr-10 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'}`}
                          />
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-500"
                          >
                            {showPassword ? 
                              <EyeOff className="h-5 w-5" /> : 
                              <Eye className="h-5 w-5" />
                            }
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              {/* Additional Sign Up Fields */}
              {mode === "signup" && (
                <>
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={signupForm.control}
                      name="userType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <select
                                {...field}
                                className={`w-full h-12 pl-10 pr-4 rounded-md ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 text-gray-900'} border border-input`}
                              >
                                <option value="">Who are you? *</option>
                                <option value="student">Student</option>
                                <option value="parent">Parent</option>
                                <option value="counselor">Counselor</option>
                                <option value="other">Other</option>
                              </select>
                              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={signupForm.control}
                      name="referralCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="Referral Code"
                                className={`h-12 pl-10 pr-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50'}`}
                              />
                              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={signupForm.control}
                      name="agreeTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
                          <FormControl>
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4"
                                checked={field.value}
                                onChange={field.onChange}
                                id="terms"
                              />
                              <label 
                                htmlFor="terms" 
                                className={`text-sm ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                              >
                                I agree to the <span className="text-purple-500 hover:underline cursor-pointer">QA terms</span>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </>
              )}

              {/* Login Additional Fields */}
              {mode === "login" && (
                <motion.div variants={itemVariants} className="flex items-center justify-between mt-2">
                  <FormField
                    control={loginForm.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4" 
                              checked={field.value}
                              onChange={field.onChange}
                              id="remember"
                            />
                            <label 
                              htmlFor="remember" 
                              className={`text-sm ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                            >
                              Remember Me
                            </label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="text-purple-500 text-sm hover:underline cursor-pointer">
                    Recovery Password
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 rounded-md text-white font-medium text-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {mode === "login" ? "Logging in..." : "Signing up..."}
                    </div>
                  ) : (
                    mode === "login" ? "Login" : "Sign Up"
                  )}
                </Button>
              </motion.div>

              {/* Toggle mode link */}
              <motion.div
                variants={itemVariants}
                className="text-center mt-4"
              >
                {mode === "login" ? (
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    Don't have an account yet?{" "}
                    <span 
                      onClick={onToggleMode}
                      className="text-purple-500 font-medium hover:underline cursor-pointer"
                    >
                      Sign Up
                    </span>
                  </p>
                ) : (
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    Already have an account?{" "}
                    <span 
                      onClick={onToggleMode}
                      className="text-purple-500 font-medium hover:underline cursor-pointer"
                    >
                      Login
                    </span>
                  </p>
                )}
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
