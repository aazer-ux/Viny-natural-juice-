"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Play, Compass, Music, Flame } from 'lucide-react';

export default function Hero() {
  const floatingLeaves = Array.from({ length: 6 });

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12 bg-gradient-to-br from-natural-cream via-nature-pale/20 to-tropical-yellow/10">
      
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-nature-pastel/30 rounded-full filter blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-tropical-orange/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-tropical-yellow/30 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Floating Leafs background */}
      {floatingLeaves.map((_, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block text-nature-light/10 pointer-events-none"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, -15, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Leaf className="w-12 h-12" />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* Left content column */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center text-left"
        >
          {/* Tagline badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-nature-light/10 text-nature-dark w-fit text-sm font-semibold mb-6 border border-nature-pastel/20">
            <Flame className="w-4 h-4 text-tropical-orange animate-pulse" />
            <span>Énergie 100% Naturelle & Fraîche</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-tight text-nature-dark mb-6">
            L'harmonie pure <br />
            de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature to-tropical-orange">Nature</span> en bouteille !
          </h1>

          {/* Paragraph */}
          <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
            Viny Natural Juice, c'est la symphonie parfaite entre fruits frais, soleil tropical et énergie vibrante. Pressé à froid à Douala pour conserver toutes les vitamines et vous faire voyager à chaque gorgée. 🍹
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a 
              href="#catalogue"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-nature to-nature-light text-white font-bold text-lg hover:shadow-lg hover:shadow-nature/30 transform hover:-translate-y-0.5 transition-all"
            >
              Découvrir nos jus
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <a 
              href="#concept"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-nature-pastel/30 text-nature-dark font-semibold text-lg hover:bg-nature-light/5 hover:border-nature transition-all"
            >
              Notre concept
            </a>
          </div>

          {/* Core Values Icons */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-nature-pastel/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-tropical-orange/10 rounded-xl text-tropical-orange">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-nature-dark">Voyage</h4>
                <p className="text-xs text-gray-500">Saveurs exotiques</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-nature/10 rounded-xl text-nature">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-nature-dark">Harmonie</h4>
                <p className="text-xs text-gray-500">Rhythm & Juice</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-tropical-yellow/15 rounded-xl text-tropical-orange">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-nature-dark">100% Bio</h4>
                <p className="text-xs text-gray-500">Sans additifs</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right graphic/mockup column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          {/* Main Visual Frame */}
          <div className="relative w-80 h-80 sm:w-[420px] sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-[#FFF] transform rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* Displaying one of the images as a hero showcase, e.g. 1.jpeg */}
            <img 
              src="/images/Produit Phare.png" 
              alt="Jus naturel de baobab" 
              className="w-full h-full object-cover"
            />
            {/* Overlay Glass Badge */}
            <div className="absolute bottom-4 left-4 right-4 glass-panel p-4 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Produit Phare</p>
                <h3 className="font-display font-bold text-lg text-nature-dark">Jus naturel de baobab</h3>
              </div>
              <span className="px-3 py-1 bg-nature text-white text-sm font-bold rounded-lg">100% Pur Jus</span>
            </div>
          </div>

          {/* Floating badge 1: Music note */}
          <motion.div 
            className="absolute -top-6 -left-6 glass-panel p-4 rounded-2xl flex items-center gap-3 shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-tropical-orange to-tropical-yellow text-white flex items-center justify-center font-bold">
              <Music className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 font-bold uppercase">Symphonie</p>
              <p className="text-sm font-bold text-nature-dark">Fruité & Mélodique</p>
            </div>
          </motion.div>

          {/* Floating badge 2: Ratings */}
          <motion.div 
            className="absolute -bottom-6 -right-4 glass-panel p-3.5 rounded-2xl flex items-center gap-2 shadow-lg"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="flex text-tropical-yellow font-bold text-lg">★ 4.9</div>
            <div className="text-xs font-bold text-nature-dark">Note des clients (Douala)</div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
