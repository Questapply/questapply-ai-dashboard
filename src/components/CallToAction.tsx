
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Container */}
        <motion.div 
          className="rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 shadow-xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-2xl">
              {/* Title - Styled to match Heroes section */}
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Start Your Academic Journey Today
              </motion.h2>
              
              {/* Subtitle - Styled to match Heroes section subtitle */}
              <motion.p 
                className="text-lg md:text-xl mb-8 text-purple-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join thousands of students who have transformed their education with QuestApply's
                AI-powered university application platform.
              </motion.p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-none text-lg px-8"
                >
                  Get Started Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-purple-400 dark:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/50 text-white text-lg px-8 flex items-center gap-2"
                >
                  Schedule Demo <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Right Content - Stats */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">95%</div>
                <p className="text-purple-200">Acceptance Rate</p>
              </div>
              <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">10k+</div>
                <p className="text-purple-200">Students</p>
              </div>
              <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">500+</div>
                <p className="text-purple-200">Universities</p>
              </div>
              <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">24/7</div>
                <p className="text-purple-200">AI Support</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
