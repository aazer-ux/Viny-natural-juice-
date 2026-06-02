"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Leaf, Compass, Utensils, Star, Search, ShieldCheck, Sparkles, Check, Plus, Minus, Send } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Define the 4 products with their formats/prices and workspace images
const PRODUCTS = [
  {
    id: 1,
    name: "Jus naturel de baobab",
    category: "Énergisant",
    sizes: [
      { label: "0,5 Litre", price: 700 },
      { label: "1 Litre", price: 1300 }
    ],
    description: "Un délice onctueux et riche en nutriments, préparé à partir de la pulpe de baobab naturelle pour un boost d'énergie et de vitalité.",
    image: "/images/3.png",
    rating: "4.9",
  },
  {
    id: 2,
    name: "Jus naturel de corossol",
    category: "Exotique",
    sizes: [
      { label: "1 Litre", price: 2000 },
      { label: "1,5 Litre", price: 3000 }
    ],
    description: "La douceur unique et relaxante du corossol sauvage. Un jus velouté et naturellement rafraîchissant pour apaiser votre esprit.",
    image: "/images/1.png",
    rating: "4.8",
  },
  {
    id: 3,
    name: "Jus naturel de cassimago",
    category: "Détox",
    sizes: [
      { label: "0,5 Litre", price: 700 },
      { label: "1 Litre", price: 1300 }
    ],
    description: "Un goût acidulé et frais incomparable à base de cassimago (prune de Cythère) fraîchement pressé. Riche en vitamine C.",
    image: "/images/4.png",
    rating: "4.7",
  },
  {
    id: 4,
    name: "Jus naturel d'ananas + gingembre",
    category: "Énergisant",
    sizes: [
      { label: "0,5 Litre", price: 700 },
      { label: "1 Litre", price: 1300 }
    ],
    description: "Le duo dynamique classique du Cameroun. La douceur de l'ananas mûr alliée au piquant stimulant du gingembre frais.",
    image: "/images/2.png",
    rating: "4.9",
  }
];

const CATEGORIES = ["Tous", "Exotique", "Détox", "Énergisant"];

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Custom Drink States
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [customFruitsText, setCustomFruitsText] = useState("");
  const [selectedSize, setSelectedSize] = useState({ label: "1 Litre", price: 2000 });
  const [customQuantity, setCustomQuantity] = useState(1);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('viny_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on update
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('viny_cart', JSON.stringify(newCart));
  };

  // Toast helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product, quantity, selectedSize) => {
    const cartItemId = `${product.id}-${selectedSize.label}`;
    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    let newCart;

    if (existingItem) {
      newCart = cart.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { 
        ...product, 
        cartItemId, 
        selectedSize: selectedSize.label, 
        price: selectedSize.price,
        quantity 
      }];
    }

    saveCart(newCart);
    showToast(`Ajouté : ${quantity}x ${product.name} (${selectedSize.label}) au panier ! 🍹`);
  };

  const handleUpdateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    const newCart = cart.map(item =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(newCart);
  };

  const handleRemoveItem = (cartItemId) => {
    const newCart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCart(newCart);
    showToast("Produit retiré du panier");
  };

  // Filter products based on search and category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleToggleFruit = (fruit) => {
    if (selectedFruits.includes(fruit)) {
      setSelectedFruits(selectedFruits.filter(f => f !== fruit));
    } else {
      setSelectedFruits([...selectedFruits, fruit]);
    }
  };

  const handleCustomOrder = () => {
    if (selectedFruits.length === 0) {
      showToast("Veuillez sélectionner au moins un fruit pour votre mélange ! 🍓");
      return;
    }
    const whatsappNumber = '237698248160';
    let fruitsList = selectedFruits.filter(f => f !== "Autre fruit à préciser").join(', ');
    if (selectedFruits.includes("Autre fruit à préciser") && customFruitsText.trim() !== "") {
      fruitsList += ` (Autres fruits spécifiés: ${customFruitsText.trim()})`;
    } else if (selectedFruits.includes("Autre fruit à préciser")) {
      fruitsList += ` (Autre fruit non spécifié)`;
    }
    const totalPrice = selectedSize.price * customQuantity;
    const text = `Bonjour Viny Natural Juice ! 🍹\n\nJe souhaite commander une boisson personnalisée à la demande :\n\n🍓 *Fruits sélectionnés :* ${fruitsList}\n📏 *Format :* ${selectedSize.label} (${selectedSize.price.toLocaleString()} FCFA)\n🔢 *Quantité :* ${customQuantity}\n💵 *Prix Total : ${totalPrice.toLocaleString()} FCFA*\n\nMerci de lancer la préparation de ma recette unique !`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3.5 bg-nature-dark text-white rounded-full font-bold shadow-xl border border-white/10 flex items-center gap-2.5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-tropical-orange animate-ping" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <Header cartCount={totalCartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <Hero />

      {/* Concept / Description Section */}
      <section id="concept" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image / Banner Box */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-nature-pastel/20">
                <img src="/images/inspiration.png" alt="Nature et Jus Viny" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-nature-dark/65 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white max-w-sm">
                  <h3 className="font-display font-bold text-2xl mb-1">Inspirations Croisées</h3>
                  <p className="text-xs text-white/80">
                    Savourer la richesse des voyages tropicaux rythmés par la musique de la nature.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-tropical-yellow/20 rounded-full filter blur-2xl"></div>
            </motion.div>

            {/* Content Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <span className="font-bold text-xs uppercase tracking-widest text-nature bg-nature-light/10 px-3.5 py-1.5 rounded-full">
                Notre Histoire
              </span>
              <h2 className="font-display font-black text-4xl text-nature-dark">
                Viny Natural Juice : L’Artisanat de la Fraîcheur
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Chez Viny Natural Juice, nous croyons que l'alimentation est une partition artistique. Fondée à Douala avec le désir d'offrir le meilleur de la nature camerounaise, notre entreprise propose des jus pressés à froid sans conservateurs, sans eau ajoutée ni sucres artificiels.
              </p>
              
              {/* Concept pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                
                <div className="flex gap-3">
                  <div className="p-2.5 bg-nature-pastel/20 text-nature rounded-xl h-fit">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-nature-dark">Rythme Floral</h4>
                    <p className="text-xs text-gray-500">Un accord harmonieux d'ingrédients frais équilibré avec amour.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2.5 bg-tropical-orange/15 text-tropical-orange rounded-xl h-fit">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-nature-dark">Escale Tropicale</h4>
                    <p className="text-xs text-gray-500">Voyagez des plages de Kribi à nos collines à chaque gorgée.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2.5 bg-tropical-yellow/20 text-tropical-orange rounded-xl h-fit">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-nature-dark">Gourmand & Sain</h4>
                    <p className="text-xs text-gray-500">Des nutriments intacts pour nourrir le corps et réveiller l'esprit.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2.5 bg-nature/10 text-nature-dark rounded-xl h-fit">
                    <Star className="w-5 h-5 fill-tropical-yellow text-tropical-yellow" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-nature-dark">Excellence Notée</h4>
                    <p className="text-xs text-gray-500">La satisfaction client est notre priorité numéro un à Douala.</p>
                  </div>
                </div>

              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* Catalogue & Filters Section */}
      <section id="catalogue" className="py-24 bg-natural-cream border-t border-nature/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-bold text-xs uppercase tracking-widest text-nature bg-nature-light/10 px-3.5 py-1.5 rounded-full">
                Notre Menu
              </span>
              <h2 className="font-display font-black text-4xl text-nature-dark mt-4">
                Explorez Nos Créations
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher un jus (ex: Gingembre...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-nature/10 focus:outline-none focus:border-nature focus:ring-1 focus:ring-nature text-sm shadow-sm"
              />
            </div>
          </div>

          {/* Categories Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === category
                    ? 'bg-nature text-white shadow-md shadow-nature/20'
                    : 'bg-white text-nature-dark border border-nature/10 hover:bg-nature-light/5 hover:border-nature/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-nature/5">
              <p className="text-gray-500 font-medium">Aucun jus ne correspond à votre recherche.</p>
              <button
                onClick={() => { setSelectedCategory("Tous"); setSearchQuery(""); }}
                className="mt-4 text-sm text-nature font-bold underline hover:text-nature-dark"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

        </div>
      </section>

      {/* Custom Drink Section */}
      <section id="custom-drink" className="py-24 bg-white relative overflow-hidden">
        {/* Abstract tropical decorations */}
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-nature-pastel/15 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-tropical-yellow/20 rounded-full filter blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-bold text-xs uppercase tracking-widest text-nature bg-nature-light/10 px-3.5 py-1.5 rounded-full">
              Création Unique
            </span>
            <h2 className="font-display font-black text-4xl text-nature-dark mt-4 mb-2">
              Jus sur Mesure à la Demande
            </h2>
            <p className="text-gray-500 text-sm">
              Sélectionnez vos fruits favoris, déterminez le format désiré, et nous préparons votre mélange sur-mesure pressé à froid !
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-natural-cream rounded-3xl p-8 md:p-12 border border-nature/5 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* Left Column: Choices */}
            <div className="space-y-8">
              {/* Step 1: Fruits selection */}
              <div>
                <h3 className="font-display font-bold text-lg text-nature-dark mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-tropical-orange animate-pulse" />
                  1. Choisissez vos fruits
                </h3>
                <div className="flex flex-wrap gap-2.5 mb-4">
                  {["Ananas", "Gingembre", "Baobab", "Corossol", "Cassimago", "Mangue", "Passion", "Citron", "Menthe", "Foléré", "Papaye", "Goyave", "Autre fruit à préciser"].map((fruit) => {
                    const isSelected = selectedFruits.includes(fruit);
                    return (
                      <button
                        key={fruit}
                        onClick={() => handleToggleFruit(fruit)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                          isSelected
                            ? 'bg-nature border-nature text-white shadow-md shadow-nature/20'
                            : 'bg-white border-nature/10 text-nature-dark hover:border-nature/30'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        {fruit}
                      </button>
                    );
                  })}
                </div>

                {/* Optional input for other fruits */}
                <AnimatePresence>
                  {selectedFruits.includes("Autre fruit à préciser") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden mt-3"
                    >
                      <input
                        type="text"
                        placeholder="Précisez le(s) fruit(s) (ex: Banane, Orange...)"
                        value={customFruitsText}
                        onChange={(e) => setCustomFruitsText(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-nature/10 focus:outline-none focus:border-nature focus:ring-1 focus:ring-nature text-sm shadow-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step 2: Size */}
              <div>
                <h3 className="font-display font-bold text-lg text-nature-dark mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-nature" />
                  2. Format & Contenance
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "1 Litre", price: 2000 },
                    { label: "1,5 Litre", price: 3000 }
                  ].map((size) => {
                    const isSelected = selectedSize.label === size.label;
                    return (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        className={`p-4 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center border ${
                          isSelected
                            ? 'bg-nature border-nature text-white shadow-md shadow-nature/20'
                            : 'bg-white border-nature/10 text-nature-dark hover:border-nature/30'
                        }`}
                      >
                        <span className="text-sm">{size.label}</span>
                        <span className={`text-[11px] mt-1 ${isSelected ? 'text-white/80' : 'text-nature font-bold'}`}>
                          {size.price} FCFA
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Recipe Summary Card */}
            <div className="bg-white rounded-2xl p-6 border border-nature/5 shadow-sm flex flex-col justify-between h-full">
              <div>
                <h4 className="font-display font-bold text-md text-nature-dark border-b border-nature/10 pb-3 mb-4">
                  Votre Recette Personnalisée
                </h4>
                
                {/* Selection lists */}
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-xs text-gray-400 block mb-1">Fruits :</span>
                    {selectedFruits.length === 0 ? (
                      <p className="text-gray-400 italic text-xs">Aucun fruit sélectionné</p>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {selectedFruits.map(f => (
                          <span key={f} className="bg-nature-light/10 text-nature text-xs px-2 py-0.5 rounded-md font-medium">
                            {f === "Autre fruit à préciser" && customFruitsText.trim() !== "" ? `Autre: ${customFruitsText}` : f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between border-t border-dashed border-nature/10 pt-3">
                    <span className="text-xs text-gray-400">Contenance :</span>
                    <span className="text-xs font-bold text-nature-dark">{selectedSize.label}</span>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex justify-between items-center border-t border-dashed border-nature/10 pt-3">
                    <span className="text-xs text-gray-400">Quantité :</span>
                    <div className="flex items-center border border-nature/15 rounded-lg px-1.5 py-0.5 bg-natural-cream scale-90">
                      <button
                        onClick={() => setCustomQuantity(q => q > 1 ? q - 1 : 1)}
                        className="p-0.5 text-nature hover:text-tropical-orange transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-bold text-xs text-nature-dark">
                        {customQuantity}
                      </span>
                      <button
                        onClick={() => setCustomQuantity(q => q + 1)}
                        className="p-0.5 text-nature hover:text-tropical-orange transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Price & Checkout Button */}
              <div className="border-t border-nature/10 pt-4 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-display font-black text-lg text-nature-dark">Prix total :</span>
                  <span className="font-display font-black text-xl text-nature">
                    {(selectedSize.price * customQuantity).toLocaleString()} FCFA
                  </span>
                </div>

                <button
                  onClick={handleCustomOrder}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-tropical-orange to-tropical-red text-white font-bold text-sm rounded-xl hover:shadow-lg hover:shadow-tropical-orange/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Send className="w-4 h-4" />
                  Commander sur WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Safety & Guarantee Badge Section */}
      <section className="py-12 bg-nature text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-around gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <ShieldCheck className="w-8 h-8 text-tropical-yellow" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl">100% Naturel & Artisanal</h3>
              <p className="text-sm text-white/80">Aucun produit chimique, conservateur ou sucre raffiné.</p>
            </div>
          </div>
          <div className="h-px w-24 bg-white/20 md:h-12 md:w-px"></div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Compass className="w-8 h-8 text-tropical-orange" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl">Livraison Fraîcheur</h3>
              <p className="text-sm text-white/80">Jus livrés glacés à domicile ou au bureau dans tout Douala.</p>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
