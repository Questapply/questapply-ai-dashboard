
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  testimonial: string;
  rating: number;
  avatarFallback: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Data Science Student",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    testimonial: "QuestApply helped me identify universities that perfectly matched my profile. I got accepted to my dream program!",
    rating: 5,
    avatarFallback: "AJ"
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "MBA Candidate",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    testimonial: "The 7-stage process simplified what would have been months of research and preparation. The AI assistant guided me through every step, from finding the right business schools to crafting a compelling personal statement.",
    rating: 5,
    avatarFallback: "SC"
  },
  {
    id: 3,
    name: "Marcus Taylor",
    role: "Computer Science Major",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    testimonial: "I was lost in the maze of university applications until I found QuestApply. The AI not only helped me discover my passion for AI development but also streamlined my applications to top tech universities.",
    rating: 5,
    avatarFallback: "MT"
  }
];

const SuccessStories = () => {
  const renderStars = (count: number) => {
    return Array(count)
      .fill(null)
      .map((_, index) => (
        <Star key={index} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      ));
  };

  return (
    <section className="w-full bg-gradient-to-br from-purple-800 via-indigo-900 to-purple-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Title - Styled to match Heroes section */}
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-[4.5rem] font-bold text-center mb-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Success Stories
        </motion.h2>
        
        {/* Subtitle - Styled to match Heroes section subtitle */}
        <motion.p 
          className="text-lg md:text-xl text-center mb-16 text-purple-200 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Don't just take our word for it. Hear from students who transformed their university
          application journey with QuestApply.
        </motion.p>
        
        {/* Testimonials Container */}
        <div className="w-full max-w-[1216px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* First Testimonial - Lower position */}
            <div className="md:mt-24">
              <motion.div 
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 h-full shadow-xl dark:bg-gray-900/50 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <p className="text-white dark:text-gray-200 mb-6">"{testimonials[0].testimonial}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-purple-300 dark:border-purple-700">
                      <AvatarImage src={testimonials[0].avatar} alt={testimonials[0].name} />
                      <AvatarFallback className="bg-purple-200 text-purple-800">{testimonials[0].avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white dark:text-white">{testimonials[0].name}</h4>
                      <p className="text-sm text-cyan-400">{testimonials[0].role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex mt-3">
                  {renderStars(testimonials[0].rating)}
                </div>
              </motion.div>
            </div>

            {/* Second Testimonial - Higher position */}
            <div className="md:-mt-12">
              <motion.div 
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 h-full shadow-xl dark:bg-gray-900/50 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <p className="text-white dark:text-gray-200 mb-6">"{testimonials[1].testimonial}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-purple-300 dark:border-purple-700">
                      <AvatarImage src={testimonials[1].avatar} alt={testimonials[1].name} />
                      <AvatarFallback className="bg-purple-200 text-purple-800">{testimonials[1].avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white dark:text-white">{testimonials[1].name}</h4>
                      <p className="text-sm text-cyan-400">{testimonials[1].role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex mt-3">
                  {renderStars(testimonials[1].rating)}
                </div>
              </motion.div>
            </div>

            {/* Third Testimonial - Lower position */}
            <div className="md:mt-24">
              <motion.div 
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-6 h-full shadow-xl dark:bg-gray-900/50 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">
                  <p className="text-white dark:text-gray-200 mb-6">"{testimonials[2].testimonial}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-purple-300 dark:border-purple-700">
                      <AvatarImage src={testimonials[2].avatar} alt={testimonials[2].name} />
                      <AvatarFallback className="bg-purple-200 text-purple-800">{testimonials[2].avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white dark:text-white">{testimonials[2].name}</h4>
                      <p className="text-sm text-cyan-400">{testimonials[2].role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex mt-3">
                  {renderStars(testimonials[2].rating)}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
