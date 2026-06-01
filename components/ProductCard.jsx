"use client";

import { useState } from 'react';
import { ShoppingCart, Send, Plus, Minus, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  // "Acheter maintenant" - Direct WhatsApp order link
  const handleBuyNow = () => {
    const whatsappNumber = '237698248160';
    const totalPrice = selectedSize.price * quantity;
    const text = `Bonjour Viny Natural Juice ! 🍹\n\nJe souhaite commander :\n- *${product.name}* (${selectedSize.label}) x ${quantity} — *${totalPrice.toLocaleString()} FCFA*\n\nMerci !`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-nature/5 hover:border-nature/20 transition-all duration-300 flex flex-col h-full"
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-square overflow-hidden bg-natural-gray">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Floating Category Badge */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-nature-dark font-bold text-xs uppercase px-3 py-1.5 rounded-full border border-nature/10 shadow-sm z-10">
          {product.category}
        </span>

        {/* Favorite Icon */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-500 hover:text-red-500 transition-colors shadow-sm z-10 hover:scale-110"
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Rating overlay */}
        <div className="absolute bottom-3 left-3 bg-nature-dark/80 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 text-white text-xs font-bold shadow-md z-10">
          <Star className="w-3.5 h-3.5 fill-tropical-yellow text-tropical-yellow" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-xl text-nature-dark mb-2 group-hover:text-nature transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
            {product.description}
          </p>

          {/* Format/Size selector */}
          <div className="mb-4">
            <span className="text-xs text-gray-400 font-bold block mb-2">Choisir le format :</span>
            <div className="flex gap-2">
              {product.sizes.map((size) => {
                const isSelected = selectedSize.label === size.label;
                return (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-nature border-nature text-white'
                        : 'bg-white border-nature/10 text-nature-dark hover:border-nature/30'
                    }`}
                  >
                    {size.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          {/* Price & Quantity Selector */}
          <div className="flex items-center justify-between mb-4 border-t border-nature/10 pt-4">
            <span className="text-2xl font-display font-black text-nature">
              {selectedSize.price.toLocaleString()} <span className="text-sm font-semibold">FCFA</span>
            </span>

            {/* Quantity */}
            <div className="flex items-center border border-nature/20 rounded-xl px-2 py-1 bg-natural-cream shadow-inner">
              <button
                onClick={handleDecrement}
                className="p-1 text-nature hover:text-tropical-orange hover:scale-110 transition-all"
                aria-label="Diminuer la quantité"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-nature-dark">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="p-1 text-nature hover:text-tropical-orange hover:scale-110 transition-all"
                aria-label="Augmenter la quantité"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product, quantity, selectedSize)}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-nature-pastel/20 text-nature-dark hover:bg-nature-pastel/40 font-bold transition-all text-sm group-hover:scale-[1.01]"
            >
              <ShoppingCart className="w-4 h-4 text-nature" />
              Panier
            </button>

            <button
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-tropical-orange to-tropical-red text-white hover:from-tropical-red hover:to-tropical-orange font-bold transition-all text-sm shadow-md shadow-tropical-orange/20"
            >
              <Send className="w-4 h-4" />
              Acheter
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
