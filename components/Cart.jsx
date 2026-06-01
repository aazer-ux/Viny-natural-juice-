"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, Send, ArrowRight } from 'lucide-react';

export default function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const whatsappNumber = '237698248160';
    let orderDetails = '';
    cartItems.forEach((item) => {
      orderDetails += `- *${item.name}* (${item.selectedSize}) x ${item.quantity} — *${(item.price * item.quantity).toLocaleString()} FCFA*\n`;
    });

    const text = `Bonjour Viny Natural Juice ! 🍹\n\nJe souhaite passer une commande :\n\n${orderDetails}\n💵 *Total de la commande : ${totalPrice.toLocaleString()} FCFA*\n\nMerci de confirmer la disponibilité et le délai de livraison.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-natural-cream shadow-2xl z-50 flex flex-col border-l border-nature/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-nature/10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3 text-nature-dark">
                <ShoppingBag className="w-6 h-6" />
                <h2 className="font-display font-bold text-xl">Mon Panier</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-natural-gray text-gray-500 hover:text-nature transition-colors"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-500">
                  <div className="p-6 bg-nature-pale/35 rounded-full text-nature mb-2">
                    <ShoppingBag className="w-12 h-12" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-nature-dark">Votre panier est vide</h3>
                  <p className="text-sm max-w-xs">
                    Laissez l'harmonie et l'énergie des fruits frais vous guider vers nos délicieuses créations !
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-nature text-white rounded-full font-bold text-sm hover:bg-nature-dark transition-all mt-4"
                  >
                    Voir le catalogue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.cartItemId}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-white rounded-2xl border border-nature/5 shadow-sm flex items-center gap-4"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-natural-gray flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-nature-dark text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-gray-400 font-medium">Format: {item.selectedSize}</p>
                      <p className="text-nature font-bold text-xs mt-0.5">
                        {item.price.toLocaleString()} FCFA
                      </p>

                      {/* Quantity edit */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-nature/10 rounded-lg px-1.5 py-0.5 bg-natural-cream scale-90 -ml-1">
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-0.5 text-nature hover:text-tropical-orange transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-bold text-xs text-nature-dark">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                            className="p-0.5 text-nature hover:text-tropical-orange transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.cartItemId)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Supprimer le produit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Action */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-nature/10 bg-white space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Sous-total</span>
                    <span>{totalPrice.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Livraison (Douala)</span>
                    <span className="font-semibold text-nature-dark">Calculée à la commande</span>
                  </div>
                  <div className="border-t border-dashed border-nature/15 my-2"></div>
                  <div className="flex justify-between items-center text-lg font-black text-nature-dark font-display">
                    <span>Total</span>
                    <span className="text-nature">{totalPrice.toLocaleString()} FCFA</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-nature to-nature-light text-white font-bold text-md rounded-2xl hover:shadow-lg hover:shadow-nature/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-5 h-5 animate-pulse" />
                  Commander via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
