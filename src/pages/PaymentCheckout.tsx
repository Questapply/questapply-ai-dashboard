
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, CreditCard, ChevronLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

const PaymentCheckout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Payment Successful!",
        description: "Your subscription has been activated.",
        variant: "default",
      });
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="mr-4 border-gray-200 dark:border-gray-700"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content - Payment Form */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment Details
                </h2>
              </div>

              <form onSubmit={handlePayment} className="p-6 space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Payment Method
                  </Label>
                  <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-3">
                    <div>
                      <RadioGroupItem
                        value="card"
                        id="card"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="card"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <CreditCard className="mb-3 h-6 w-6" />
                        <span className="text-sm font-medium">Credit Card</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="paypal"
                        id="paypal"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="paypal"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <svg
                          className="mb-3 h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.5 19.5C3.75 19.5 1 16.5 1 13C1 9.5 3.75 6.5 7.5 6.5C11.25 6.5 14 9.5 14 13C14 16.5 11.25 19.5 7.5 19.5ZM7.5 8.5C4.75 8.5 3 10.5 3 13C3 15.5 4.75 17.5 7.5 17.5C10.25 17.5 12 15.5 12 13C12 10.5 10.25 8.5 7.5 8.5Z"
                            fill="currentColor"
                          />
                          <path
                            d="M16.5 17.5C12.75 17.5 10 14.5 10 11C10 7.5 12.75 4.5 16.5 4.5C20.25 4.5 23 7.5 23 11C23 14.5 20.25 17.5 16.5 17.5ZM16.5 6.5C13.75 6.5 12 8.5 12 11C12 13.5 13.75 15.5 16.5 15.5C19.25 15.5 21 13.5 21 11C21 8.5 19.25 6.5 16.5 6.5Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-sm font-medium">PayPal</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="apple"
                        id="apple"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="apple"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <svg
                          className="mb-3 h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.5 12.5C17.5 8.5 21 7.5 21 7.5C21 7.5 19.5 4 16 4C12.5 4 11 7.5 11 7.5C11 7.5 9.5 4 6 4C2.5 4 1 7.5 1 7.5C1 7.5 4.5 8.5 4.5 12.5C4.5 16.5 1 17.5 1 17.5C1 17.5 2.5 21 6 21C9.5 21 11 17.5 11 17.5C11 17.5 12.5 21 16 21C19.5 21 21 17.5 21 17.5C21 17.5 17.5 16.5 17.5 12.5Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="text-sm font-medium">Apple Pay</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Card Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number">Card Number</Label>
                      <Input
                        id="number"
                        placeholder="4242 4242 4242 4242"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required />
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Billing Address</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main St" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="San Francisco" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="CA" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input id="zip" placeholder="94103" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="United States" required />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      "Complete Payment"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden sticky top-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order Summary
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center">
                  <Shield className="h-10 w-10 text-purple-500 mr-4" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      QuestApply Pro
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Annual Subscription
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Subscription
                    </span>
                    <span className="text-gray-900 dark:text-white">$99.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Tax</span>
                    <span className="text-gray-900 dark:text-white">$8.00</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-medium text-lg">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">$107.99</span>
                </div>

                <div className="mt-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <p>
                        You'll be charged $107.99 today. Your subscription will
                        automatically renew annually.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                  <svg
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 8V13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.995 16H12.005"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Secure payment processing</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCheckout;
