import React from 'react';
import { motion } from 'framer-motion';

export default function Locations() {
  return (
    <section id="sedes" className="w-full bg-[#FDFBF7] py-16 md:py-24 px-6 md:px-16">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Usamos el mismo tipo de letra font-serif y el estilo de títulos acordado */}
        <h2 className="text-3xl md:text-4xl font-serif text-[#1C1A17] font-bold mb-10 md:mb-14 text-center md:text-left tracking-wide title-with-line title-left-on-pc">
          Nuestras Sedes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sede Quirinal */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/5 group">
            <div className="h-64 overflow-hidden relative">
              <img 
                src="/images/sede-quirinal.png" 
                alt="Sede Quirinal" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 
                    className="text-xl font-medium text-[#1C1A17] mb-2 uppercase tracking-wide group-hover:text-[#B22222] transition-colors duration-300" 
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                  >
                    Sede Quirinal
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <svg className="w-4 h-4 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Avenida Tenerife Calle 21 con 7A esquina
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <a 
                  href="https://www.google.com/maps/place/Pizza+Box/@2.9378634,-75.2892592,17.45z/data=!4m6!3m5!1s0x8e3b750f74777663:0x689506a169011b80!8m2!3d2.9377415!4d-75.2887072!16s%2Fg%2F11ng21tlv6?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-transparent border border-[#1C1A17] text-[#1C1A17] font-semibold text-sm py-4 rounded-lg hover:bg-[#1C1A17] hover:text-white transition-colors duration-300 uppercase tracking-widest"
                >
                  ¡Ir Ahora!
                </a>
              </div>
            </div>
          </div>

          {/* Sede Altico */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/5 group">
            <div className="h-64 overflow-hidden relative">
              <img 
                src="/images/sede-altico.webp" 
                alt="Sede Altico" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 
                    className="text-xl font-medium text-[#1C1A17] mb-2 uppercase tracking-wide group-hover:text-[#B22222] transition-colors duration-300" 
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                  >
                    Sede Altico
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <svg className="w-4 h-4 text-[#B22222]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    Calle 6 con Carrera 14 esquina
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <a 
                  href="https://www.google.com/maps/place/Pizza+Box+-+Sede+Altico/@2.9281456,-75.2827943,17z/data=!4m8!3m7!1s0x8e3b75006bc718a7:0x8165eb678bf2b6fa!8m2!3d2.9281402!4d-75.2802194!9m1!1b1!16s%2Fg%2F11msxc98mx?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-transparent border border-[#1C1A17] text-[#1C1A17] font-semibold text-sm py-4 rounded-lg hover:bg-[#1C1A17] hover:text-white transition-colors duration-300 uppercase tracking-widest"
                >
                  ¡Ir Ahora!
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
