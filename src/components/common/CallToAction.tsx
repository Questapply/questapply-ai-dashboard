
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientCard } from "@/components/ui/gradient-card";
import { Sparkles } from "lucide-react";

const CallToAction = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Create the particle canvas effect
    const canvas = document.getElementById("particles") as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const container = document.querySelector(".cta-container");
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Create particles
    const particles: {x: number; y: number; size: number; speedX: number; speedY: number; opacity: number;}[] = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Reset position if out of bounds
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const starVariants = {
    initial: { opacity: 0.3 },
    animate: { 
      opacity: [0.3, 1, 0.3],
      transition: { 
        duration: 3,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 0px 15px 5px rgba(0, 221, 235, 0.3)",
      transition: { 
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden cta-container">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 dark:from-purple-950 dark:to-blue-950" />
      
      {/* Particle Animation Canvas */}
      <canvas id="particles" className="absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GradientCard 
          variant="glowing" 
          className="w-full max-w-4xl mx-auto px-6 py-12 md:py-16 flex flex-col items-center justify-center"
        >
          {/* Decorative Stars */}
          <div className="flex space-x-5 mb-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                variants={starVariants}
                initial="initial"
                animate="animate"
                custom={i}
                className="text-white opacity-50"
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
            ))}
          </div>
          
          {/* Title with glow effect */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 md:mb-6 text-white drop-shadow-[0_2px_4px_rgba(183,148,244,0.7)]"
          >
            Ready to Reach Your Dream University?
          </motion.h2>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-purple-100 dark:text-purple-200 text-center mb-8 max-w-2xl"
          >
            Let QuestApply's AI guide you to top universities with personalized recommendations and automated applications!
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link to="/auth?mode=signup">
              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                className="inline-block"
              >
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-lg py-6 px-8 rounded-md shadow-lg transform transition-all duration-300 animate-pulse"
                >
                  Start Your Journey Now
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </GradientCard>
      </div>
    </section>
  );
};

export default CallToAction;
