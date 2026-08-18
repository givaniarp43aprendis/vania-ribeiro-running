import React from 'react';
import { TESTIMONIALS } from '../data/runningData';
import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#d2e0fe]/20 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-[#ab3600] font-mono-tag uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-3 block">
            Depoimentos
          </span>
          <h3 className="text-[#111c2d] font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Histórias Reais de Superação
          </h3>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white p-7 sm:p-9 rounded-2xl shadow-sm hover:shadow-xl border border-[#d8e3fb] relative flex flex-col justify-between transition-all duration-300 group"
            >
              {/* Quote Mark Icon */}
              <Quote className="text-[#ff5f1f] absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity w-10 h-10" />

              {/* Stars Rating */}
              <div className="flex items-center gap-1 text-[#ff5f1f] mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ff5f1f]" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-[#5b4138] italic mb-8 text-base sm:text-lg leading-relaxed relative z-10">
                {item.quote}
              </p>

              {/* Author Footer */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#f0f3ff]">
                <div className="w-12 h-12 rounded-full bg-[#d8e3fb] text-[#111c2d] font-bold flex items-center justify-center text-base border border-white shadow-sm flex-shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-[#111c2d] text-base leading-tight">
                      {item.name}
                    </p>
                    <CheckCircle2 className="w-4 h-4 text-[#ab3600]" />
                  </div>
                  <p className="text-[11px] text-[#ab3600] font-bold uppercase tracking-wider font-mono-tag mt-0.5">
                    {item.role}
                  </p>
                  {item.distance && (
                    <span className="text-[10px] text-gray-500 font-medium block">
                      {item.distance}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
