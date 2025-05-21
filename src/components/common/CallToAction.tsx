
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CallToActionProps {
  isDarkMode: boolean;
}

const CallToAction = ({ isDarkMode }: CallToActionProps) => {
  return (
    <section className="w-full bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mx-auto max-w-4xl bg-black/20 backdrop-blur-sm rounded-2xl p-12 border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Title - styled to match Hero section */}
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your University Journey?
          </motion.h2>
          
          {/* Subtitle - styled to match Hero section subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-center mb-12 text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of students who discovered their talents and got accepted 
            to their dream universities with QuestApply.
          </motion.p>

          {/* CTA Button - using same styles as hero button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Link to="/auth?mode=signup">
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-lg px-8 py-6 h-auto flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
