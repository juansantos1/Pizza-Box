import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import Cart from './components/Cart'
import Home from './pages/Home'
import Menu from './pages/Menu'
import { CartProvider } from './context/CartContext'
import EasterEgg from './components/EasterEgg'

function Layout({ scrolled }) {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] selection:bg-[#B22222] selection:text-white pb-[60px] md:pb-0">
      <Header scrolled={scrolled} onCartClick={() => setCartOpen(true)} />
      
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </main>

      <Footer />
      <BottomNav onCartClick={() => setCartOpen(true)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <CartProvider>
      <Router>
        <Layout scrolled={scrolled} />
        <EasterEgg />
      </Router>
    </CartProvider>
  )
}

export default App
