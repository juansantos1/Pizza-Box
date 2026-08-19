import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const pizzas = [
  {
    title: 'La Roma',
    description: 'Salsa blanca, queso mozzarella, salami, jamón serrano, tomate cherry, queso stracciatella, queso parmesano, peras caramelizadas y vinagre balsámico.',
    image: '/images/la_roma-pizza.jpg',
    stamp: '/images/pizza-master-estampa_2025.png'
  },
  {
    title: 'La Torino',
    description: 'Salsa blanca, queso mozzarella, chorizo español, pepperoni, tomates cherry, salsa nikkei, tocineta crispy, rúcula y queso parmesano.',
    image: '/images/pizza-torino.jpg',
    stamp: '/images/pizza-master-estampa_2024.png'
  },
  {
    title: 'Vesubio',
    description: 'Salsa pomodoro, queso mozarella, peperoni, crocantes de tocineta, cebolla morada, rúcula, tomates confitados, ricotta de pimentón tatemado y reducción de vinagre balsámico.',
    image: '/images/pizza-vesubio.webp',
    stamp: '/images/pizza-master-estampa_2023.png'
  },
  {
    title: 'Master',
    description: 'Salsa pomodoro, queso mozarella, pepperoni, chorizo, stracciatella de la casa, crocantes de cebolla en julianas y nuestro original pesto con maní.',
    image: '/images/pizza-master.webp',
    stamp: '/images/pizza-master-estampa_2022.png'
  },
];

export default function Specialties() {
  return (
    <section id="especialidades" className="bg-[#FDFBF7] py-16 md:py-24 px-6 md:px-16 w-full">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 
          className="text-3xl md:text-4xl text-[#1C1A17] mb-10 md:mb-14 text-center md:text-left font-bold tracking-wide font-serif title-with-line title-left-on-pc"
        >
          Especialidades de la Casa
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pizzas.map((pizza, index) => (
            <div key={index} className="relative flex flex-col group cursor-pointer bg-[#FDFBF7]">
              <img 
                src={pizza.stamp} 
                alt="Sello Competencia" 
                className="absolute -top-5 -left-5 w-20 h-20 md:w-24 md:h-24 z-20 drop-shadow-xl rounded-full object-contain"
              />
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-gray-200 shadow-sm border border-black/5">
                {pizza.title !== 'Vesubio' && (
                  <img 
                    src="/images/trofeo.png" 
                    alt="Trofeo" 
                    className="absolute top-3 right-3 w-7 h-7 md:w-8 md:h-8 z-20 drop-shadow-md object-contain"
                  />
                )}
                <img 
                  src={pizza.image} 
                  alt={pizza.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="mt-4 text-left">
                <h3 
                  className="text-xl font-medium text-[#1C1A17] group-hover:text-[#B22222] transition-colors duration-300"
                  style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                >
                  {pizza.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {pizza.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link to="/menu" className="inline-block bg-[#1C1A17] text-white px-8 py-4 rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-[#B22222] transition-colors duration-300">
            Ver Más
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
