
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GradientCard } from "@/components/ui/gradient-card";
import { Sparkles } from "lucide-react";

const CallToAction = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Create the particle canvas effect
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Create particles
    const particles: {
      x: number; 
      y: number; 
      size: number; 
      speedX: number; 
      speedY: number; 
      opacity: number;
      color: string;
    }[] = [];
    
    const particleCount = 70;
    const colors = ['rgba(255, 255, 255, ', 'rgba(168, 85, 247, ', 'rgba(99, 102, 241, '];
    
    for (let i = 0; i < particleCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomOpacity = Math.random() * 0.3 + 0.1;
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: randomOpacity,
        color: `${randomColor}${randomOpacity})`
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
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const sparkleVariants = {
    initial: { opacity: 0.3 },
    animate: { 
      opacity: [0.3, 1, 0.3],
      transition: { 
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };
  
  const buttonVariants = {
    initial: { scale: 1, boxShadow: "0px 0px 0px 0px rgba(0, 221, 235, 0)" },
    hover: { 
      scale: 1.05,
      boxShadow: "0px 0px 20px 5px rgba(79, 70, 229, 0.4)",
      transition: { 
        duration: 0.3,
        yoyo: Infinity
      }
    }
  };

  const mainTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const sparkleContainerVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  };

  const sparkleItemVariants = {
    initial: { opacity: 0.2, scale: 0.8 },
    animate: { 
      opacity: [0.2, 1, 0.2],
      scale: [0.8, 1.2, 0.8],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-20 md:py-24 overflow-hidden bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-900"
    >
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-900" />
      
      {/* Enhanced Particle Animation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      
      {/* Cosmic Accents - Star sparkles */}
      <motion.div 
        className="absolute top-10 left-1/4 text-white opacity-70"
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div 
        className="absolute top-20 right-1/4 text-white opacity-60"
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.5 }}
      >
        <Sparkles className="w-4 h-4" />
      </motion.div>
      <motion.div 
        className="absolute bottom-16 right-1/3 text-white opacity-50"
        variants={sparkleVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center"
        >
          <GradientCard 
            variant="glowing" 
            className="w-full max-w-4xl mx-auto px-8 py-14 md:py-16 flex flex-col items-center justify-center border-purple-500/30 shadow-xl"
          >
            {/* Decorative Sparkles at the top - matching image */}
            <motion.div 
              variants={sparkleContainerVariants}
              initial="initial"
              animate="animate"
              className="flex space-x-6 mb-4"
            >
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  variants={sparkleItemVariants}
                  custom={i}
                  className={`text-white ${i % 2 === 0 ? 'mt-2' : 'mb-2'}`}
                >
                  <Sparkles className={`h-${i % 2 === 0 ? '5' : '4'} w-${i % 2 === 0 ? '5' : '4'}`} />
                </motion.div>
              ))}
            </motion.div>
            
            {/* Title with enhanced glow effect */}
            <motion.h2 
              variants={mainTextVariants}
              className="text-4xl md:text-5xl xl:text-6xl font-bold text-center mb-6 md:mb-8 text-white drop-shadow-[0_0_10px_rgba(183,148,244,0.8)] font-heading tracking-tight"
            >
              Begin Your Academic Journey Today
            </motion.h2>
            
            {/* Description with enhanced styling */}
            <motion.p
              variants={mainTextVariants}
              className="text-lg md:text-xl text-purple-100 text-center mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              QuestApply uses AI to match you with your ideal universities, streamline your application process, 
              and maximize your chances of acceptance at top institutions worldwide.
            </motion.p>
            
            {/* CTA Button with enhanced effects */}
            <motion.div variants={mainTextVariants}>
              <Link to="/auth?mode=signup">
                <motion.div
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  className="inline-block"
                >
                  <Button 
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white text-lg py-7 px-10 rounded-md shadow-[0_4px_20px_rgba(105,79,255,0.5)] transition-all duration-300"
                  >
                    Create Your Free Account
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            {/* Trust badges */}
            <motion.div 
              variants={staggerChildren}
              className="mt-10 pt-6 border-t border-purple-500/20 w-full flex flex-wrap justify-center gap-6 items-center"
            >
              <motion.div variants={mainTextVariants} className="text-purple-200/80 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                No credit card required
              </motion.div>
              <motion.div variants={mainTextVariants} className="text-purple-200/80 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Join 10,000+ students
              </motion.div>
              <motion.div variants={mainTextVariants} className="text-purple-200/80 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                Success rate 94%
              </motion.div>
            </motion.div>
          </GradientCard>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
