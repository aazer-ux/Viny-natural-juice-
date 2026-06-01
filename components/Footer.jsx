"use client";

import { Facebook, Instagram, Twitter, MessageSquare, ArrowUp, Leaf } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-nature-dark text-white pt-16 pb-8 relative overflow-hidden border-t border-nature-light/10">
      
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-tropical-orange rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="/images/logo.jpg"
                alt="Viny Naturel Juice"
                className="object-contain h-12 w-auto rounded-xl"
              />
            </div>
            <p className="text-sm text-nature-pale/80 leading-relaxed">
              L'harmonie pure de la nature, de la musique et des fruits exotiques capturée dans chaque bouteille de jus fraîchement pressé à Douala.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-nature-pale hover:text-white transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-nature-pale hover:text-white transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-nature-pale hover:text-white transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/237698248160"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-nature-pale hover:text-white transition-all hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg border-b border-white/10 pb-2">Menu Rapide</h4>
            <ul className="space-y-2 text-sm text-nature-pale/80">
              <li>
                <a href="#accueil" className="hover:text-tropical-orange transition-colors flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" /> Accueil
                </a>
              </li>
              <li>
                <a href="#concept" className="hover:text-tropical-orange transition-colors flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" /> Notre Concept
                </a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-tropical-orange transition-colors flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" /> Le Catalogue
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-tropical-orange transition-colors flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5" /> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Products Categories */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg border-b border-white/10 pb-2">Nos Catégories</h4>
            <ul className="space-y-2 text-sm text-nature-pale/80">
              <li>
                <a href="#catalogue" className="hover:text-tropical-orange transition-colors">🍹 Cocktail Exotique</a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-tropical-orange transition-colors">🌿 Cure Détox Nature</a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-tropical-orange transition-colors">🔥 Booster Énergisant</a>
              </li>
              <li>
                <a href="#catalogue" className="hover:text-tropical-orange transition-colors">🌱 Recettes Traditionnelles</a>
              </li>
            </ul>
          </div>

          {/* Contact Details Recap */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg border-b border-white/10 pb-2">Notre Service</h4>
            <div className="text-sm text-nature-pale/80 space-y-2">
              <p>📍 Douala, Cameroun</p>
              <p>📞 +237 6 98 24 81 60</p>
              <p>✉️ hello@viny-juice.com</p>
              <div className="pt-2">
                <span className="inline-block bg-white/10 text-white font-bold text-xs uppercase px-2.5 py-1 rounded">
                  Livraison Partout
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-nature-pale/60 text-center sm:text-left">
            &copy; {currentYear} Viny Natural Juice. Tous droits réservés. Pressé avec amour à Douala, Cameroun.
          </p>
          
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1 text-xs text-nature-pale/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-xl"
            aria-label="Retour en haut"
          >
            Retour en haut <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
