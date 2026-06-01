"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ cartCount, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Notre Concept', href: '#concept' },
    { name: 'Le Catalogue', href: '#catalogue' },
    { name: 'Sur Mesure', href: '#custom-drink' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-panel shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#accueil" className="flex items-center group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.jpg"
                alt="Viny Naturel Juice"
                width={180}
                height={80}
                className="object-contain h-14 w-auto"
                priority
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-nature-dark hover:text-tropical-orange transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-tropical-orange after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Cart & Mobile menu button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative p-2.5 rounded-full bg-nature/10 text-nature-dark hover:bg-nature/25 transition-all hover:scale-105"
              aria-label="Voir le panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-tropical-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-nature-dark hover:bg-nature/10 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-nature/10 shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-xl font-medium text-nature-dark hover:bg-nature/10 hover:text-tropical-orange transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
