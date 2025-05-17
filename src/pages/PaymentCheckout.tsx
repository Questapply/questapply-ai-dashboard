
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  Sun, 
  Moon, 
  Lock, 
  Shield, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  CreditCardIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits").max(19, "Card number must be at most 19 digits"),
  expiryDate: z.string().min(5, "Expiry date must be in MM/YY format"),
  cvc: z.string().min(3, "CVC must be 3 or 4 digits").max(4, "CVC must be 3 or 4 digits"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  saveCard: z.boolean().default(false),
});

const PaymentCheckout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      country: "",
      postalCode: "",
      saveCard: true,
    },
  });

  const handlePaymentSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Payment Successful!",
      description: "You've successfully subscribed to QuestApply Pro!",
      variant: "success",
    });
    
    // Simulate processing time
    setTimeout(() => {
      navigate("/payments");
    }, 1500);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/40">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                QuestApply
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sun className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
                <Switch 
                  checked={isDarkMode} 
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Moon className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow py-8 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link to="/pro" className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Pro Plans
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Complete Your Subscription</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Subscribe to QuestApply Pro to access all premium features</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form Column */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePaymentSubmit)} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-bold">Payment Information</CardTitle>
                        <div className="flex space-x-2">
                          <CreditCard className="h-6 w-6 text-gray-400" />
                          <Lock className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <CardDescription>Enter your payment details securely</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name on Card</FormLabel>
                              <FormControl>
                                <Input placeholder="John Smith" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    placeholder="1234 5678 9012 3456"
                                    {...field}
                                    onChange={(e) => {
                                      const value = formatCardNumber(e.target.value);
                                      field.onChange(value);
                                    }}
                                    maxLength={19}
                                  />
                                  <CreditCardIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      placeholder="MM/YY"
                                      {...field}
                                      onChange={(e) => {
                                        const value = formatExpiryDate(e.target.value);
                                        field.onChange(value);
                                      }}
                                      maxLength={5}
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cvc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123"
                                    {...field}
                                    type="password"
                                    maxLength={4}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input placeholder="United States" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="12345" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="saveCard"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                              <div className="space-y-1 leading-none">
                                <FormLabel>Save card for future payments</FormLabel>
                                <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
                                  Your payment information is secured
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col items-start space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 p-4 rounded-md w-full flex items-start space-x-2">
                        <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">Secure Payment</p>
                          <p>Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.</p>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                        size="lg"
                      >
                        Pay $100.00 and Subscribe
                      </Button>

                      <div className="text-xs text-center text-gray-500 dark:text-gray-400 w-full">
                        By subscribing, you agree to our Terms of Service and Privacy Policy
                      </div>
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </div>

            {/* Order Summary Column */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">QuestApply Pro</span>
                    <Badge variant="secondary" className="text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/50">Monthly</Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Professor Access
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Resume Creation & Improvement
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      SOP Creation & Improvement
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      LOR Creation & Improvement
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      Unlimited Applications
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>$100.00</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total (USD)</span>
                      <span>$100.00</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Billed monthly. Cancel anytime.
                    </div>
                  </div>

                  <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md text-sm">
                    <p className="font-medium text-gray-700 dark:text-gray-300">Need help?</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Contact our support team at{" "}
                      <Link to="/help-center" className="text-purple-600 dark:text-purple-400 hover:underline">
                        support@questapply.com
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-purple-100 dark:border-purple-900/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} QuestApply. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentCheckout;
