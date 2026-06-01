import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

const products = [
  {
    name: "Jus de Baobab",
    description: "Un jus naturel pressé à froid, riche en vitamine C et en énergie tropicale.",
    image: "/images/Produit Phare.png",
    category: "Baobab",
    rating: 4.9,
    sizes: [
      { label: "25cl", price: 1500 },
      { label: "50cl", price: 2500 },
    ]
  },
  {
    name: "Jus de Gingembre",
    description: "Un jus piquant et rafraîchissant, parfait pour booster votre immunité.",
    image: "/images/1.png",
    category: "Gingembre",
    rating: 4.8,
    sizes: [
      { label: "25cl", price: 1200 },
      { label: "50cl", price: 2000 },
    ]
  }
]

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <section id="catalogue" className="py-16 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} onAddToCart={() => {}} />
        ))}
      </section>
      <Footer />
    </main>
  )
}