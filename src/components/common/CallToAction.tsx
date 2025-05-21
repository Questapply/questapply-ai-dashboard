
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallToActionProps {
  isDarkMode: boolean;
}

const CallToAction = ({ isDarkMode }: CallToActionProps) => {
  return (
    <section className="w-full bg-gradient-to-br from-[#2A1F4D] via-indigo-900 to-[#1E3A8A] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Cosmic particle effect */}
      <div className="absolute inset-0 w-full h-full">
        <div className="cosmic-particles"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mx-auto max-w-4xl bg-black/20 backdrop-blur-sm rounded-2xl p-12 border border-white/10 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Star icons with twinkle animation */}
          <div className="flex justify-center mb-4 space-x-5">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [0.9, 1.1, 0.9]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                <Star size={10} className="text-white/50" />
              </motion.div>
            ))}
          </div>

          {/* Title - styled with glow effect */}
          <motion.h2 
            className={cn(
              "text-3xl md:text-4xl lg:text-[48px] font-bold text-center mb-4 text-white",
              "drop-shadow-[0_2px_2px_rgba(183,148,244,0.8)]"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            Ready to Reach Your Dream University?
          </motion.h2>
          
          {/* Subtitle - styled with lighter purple */}
          <motion.p 
            className="text-[18px] text-center mb-6 text-[#E9D8FD] max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            Let QuestApply's AI guide you to top universities with personalized 
            recommendations and automated applications!
          </motion.p>

          {/* CTA Button - enhanced with gradient and animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center"
            animate={{ 
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Link to="/auth?mode=signup">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7F00FF] to-[#00DDEB] rounded-[10px] opacity-75 blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-button-glow"></div>
                <Button 
                  className="relative w-[200px] h-[50px] bg-gradient-to-r from-[#7F00FF] to-[#00DDEB] hover:from-[#9500FF] hover:to-[#00F0FF] text-white text-[16px] font-bold rounded-[10px] px-8 py-0 flex items-center justify-center gap-2 transform hover:scale-110 transition-all duration-300"
                >
                  Start Your Journey Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
