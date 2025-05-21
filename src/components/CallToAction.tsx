
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Container */}
        <motion.div 
          className="rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 shadow-xl p-10 md:p-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Title with glow effect */}
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white drop-shadow-[0_0_15px_rgba(101,255,219,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-300">
                Ready to Transform Your
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-cyan-300">
                University Journey?
              </span>
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p 
              className="text-lg md:text-xl text-center max-w-3xl text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join thousands of students who discovered their talents and got accepted
              to their dream universities with QuestApply.
            </motion.p>
            
            {/* CTA Button - Styled to match Hero section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button 
                className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 text-white text-lg font-medium px-10 py-6 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-none"
              >
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
