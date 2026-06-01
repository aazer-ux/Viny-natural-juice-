"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Phone, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Commande spéciale',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;

    const whatsappNumber = '237698248160';
    const text = `Bonjour Viny Natural Juice ! 🍹\n\nNouveau message de contact :\n👤 *Nom :* ${formData.name}\n📞 *Téléphone :* ${formData.phone}\n📝 *Sujet :* ${formData.subject}\n💬 *Message :*\n${formData.message}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    
    // Simulate successful form state first, then open WhatsApp
    setSubmitted(true);
    setTimeout(() => {
      window.open(url, '_blank');
      setSubmitted(false);
      setFormData({ name: '', phone: '', subject: 'Commande spéciale', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-tr from-nature-pale/20 via-[#FFF] to-tropical-yellow/5">
      {/* Decorative Blobs */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-nature-pastel/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-tropical-orange/15 rounded-full filter blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-bold text-sm text-nature uppercase tracking-widest bg-nature-light/10 px-4 py-1.5 rounded-full">
            Échangeons !
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl text-nature-dark mt-4 mb-4">
            Contactez Viny Natural Juice
          </h2>
          <p className="text-gray-500">
            Une question ? Une commande spéciale pour un événement ? Ou simplement envie de discuter ? Écrivez-nous directement ici ou via WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info cards - 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-nature/5 shadow-sm space-y-8 flex-1"
            >
              <h3 className="font-display font-bold text-2xl text-nature-dark">Nos Coordonnées</h3>
              
              {/* Phone info */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-nature/10 text-nature rounded-2xl flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-nature-dark">Téléphone & WhatsApp</h4>
                  <a href="https://wa.me/237698248160" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-tropical-orange font-medium transition-colors">
                    +237 6 98 24 81 60
                  </a>
                  <p className="text-xs text-nature mt-1 font-semibold">📍 Commandes directes 7j/7</p>
                </div>
              </div>

              {/* Location info */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-tropical-orange/10 text-tropical-orange rounded-2xl flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-nature-dark">Notre Localisation</h4>
                  <p className="text-gray-600 font-medium">Douala, Cameroun</p>
                  <p className="text-xs text-gray-400">Livraison rapide dans tous les arrondissements</p>
                </div>
              </div>

              {/* Hours info */}
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-tropical-yellow/20 text-tropical-orange rounded-2xl flex-shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-nature-dark">Heures de Service</h4>
                  <p className="text-gray-600 font-medium">Lundi – Samedi : 8h – 19h</p>
                  <p className="text-xs text-gray-400">Dimanche : Commandes en ligne uniquement</p>
                </div>
              </div>
            </motion.div>

            {/* Quick WhatsApp CTA Card */}
            <motion.a
              href="https://wa.me/237698248160"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-tropical-orange to-tropical-red text-white p-6 rounded-3xl shadow-lg shadow-tropical-orange/15 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl text-white">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg leading-tight">Discuter sur WhatsApp</h4>
                  <p className="text-xs text-white/80">Réponse en moins de 10 minutes</p>
                </div>
              </div>
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Contact form - 7 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white rounded-3xl p-8 border border-nature/5 shadow-sm relative"
          >
            <h3 className="font-display font-bold text-2xl text-nature-dark mb-6">Envoyez-nous un Message</h3>
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-nature mb-4 animate-bounce" />
                  <h4 className="font-display font-bold text-xl text-nature-dark mb-2">Message Prêt !</h4>
                  <p className="text-gray-500 max-w-sm text-sm">
                    Redirection vers WhatsApp pour envoyer votre message sécurisé...
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-nature-dark mb-2">Votre Nom Complet</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex. Jean Dupont"
                      className="w-full px-4 py-3 rounded-2xl border border-nature/10 bg-natural-cream focus:outline-none focus:border-nature focus:ring-1 focus:ring-nature transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-nature-dark mb-2">Votre Numéro de Téléphone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Ex. +237 6xx xx xx xx"
                      className="w-full px-4 py-3 rounded-2xl border border-nature/10 bg-natural-cream focus:outline-none focus:border-nature focus:ring-1 focus:ring-nature transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-nature-dark mb-2">Sujet de votre message</label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-2xl border border-nature/10 bg-natural-cream focus:outline-none focus:border-nature focus:ring-1 focus:ring-nature transition-all text-sm"
                    >
                      <option value="Commande spéciale">Commande spéciale (Événement, Anniversaire)</option>
                      <option value="Partenariat / Événement">Partenariat ou distribution</option>
                      <option value="Feedback / Question">Question générale ou suggestion</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-nature-dark mb-2">Votre Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Que souhaitez-vous nous dire ?"
                      className="w-full px-4 py-3 rounded-2xl border border-nature/10 bg-natural-cream focus:outline-none focus:border-nature focus:ring-1 focus:ring-nature transition-all text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-nature hover:bg-nature-dark text-white font-bold rounded-2xl shadow-md transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer & Ouvrir WhatsApp
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
