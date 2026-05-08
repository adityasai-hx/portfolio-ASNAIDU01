import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';

import v1 from '../assets/v1.jpeg';
import v2 from '../assets/v2.jpeg';
import v3 from '../assets/v3.jpeg';
import v4 from '../assets/v4.jpeg';
import v6 from '../assets/v6.jpeg';
import v7 from '../assets/v7.jpeg';
import v8 from '../assets/v8.jpeg';
import v9 from '../assets/v9.jpeg';

const IMAGES = [
  { src: v1, title: 'Urban Solitude'  },
  { src: v2, title: 'Golden Hour'     },
  { src: v3, title: 'Monochrome'      },
  { src: v4, title: 'Reflections'     },
  { src: v6, title: 'Abstract Light'  },
  { src: v7, title: 'Motion Blur'     },
  { src: v8, title: 'Candid Moments'  },
  { src: v9, title: 'Endless Roads'   },
];

const N          = IMAGES.length;
const RADIUS     = 400;   // px – orbit radius
const TILT       = 8;     // deg – axis tilt
const AUTO_SPEED = 0.3;   // deg per frame
const RESUME_MS  = 3000;
const ORBIT_Y_OFFSET = 120; // px – push orbit center downward from screen center

export default function PhotographyPage() {
  const angleRef       = useRef(0);
  const targetRef      = useRef(0);
  const rafRef         = useRef(null);
  const resumeTimerRef = useRef(null);
  const isAutoRef      = useRef(true);
  const lastPointerX   = useRef(null);
  const isDragging     = useRef(false);
  const [, forceRender]   = useState(0);
  const [lightbox, setLightbox] = useState(null); // { src, title }

  /* ─── Pause auto-play ─────────────────────────────────────── */
  const pauseAuto = useCallback(() => {
    isAutoRef.current = false;
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isAutoRef.current = true;
    }, RESUME_MS);
  }, []);

  /* ─── Animation loop ──────────────────────────────────────── */
  useEffect(() => {
    let prev = performance.now();
    const tick = (now) => {
      const dt = Math.min((now - prev) / 16.67, 3);
      prev = now;
      if (isAutoRef.current) targetRef.current += AUTO_SPEED * dt;
      angleRef.current += (targetRef.current - angleRef.current) * 0.07 * dt;
      forceRender(n => n + 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ─── Keyboard ────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox) { if (e.key === 'Escape') setLightbox(null); return; }
      if (e.key === 'ArrowLeft')  { pauseAuto(); targetRef.current -= 360 / N; }
      if (e.key === 'ArrowRight') { pauseAuto(); targetRef.current += 360 / N; }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [pauseAuto, lightbox]);

  /* ─── Wheel ───────────────────────────────────────────────── */
  useEffect(() => {
    const onWheel = (e) => { if (lightbox) return; pauseAuto(); targetRef.current += e.deltaY * 0.08; };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [pauseAuto, lightbox]);

  /* ─── Pointer drag ────────────────────────────────────────── */
  const onPointerDown = (e) => {
    lastPointerX.current = e.clientX ?? e.touches?.[0]?.clientX;
    isDragging.current   = false;
    pauseAuto();
  };
  const onPointerMove = (e) => {
    if (lastPointerX.current === null) return;
    const x  = e.clientX ?? e.touches?.[0]?.clientX;
    const dx = x - lastPointerX.current;
    if (Math.abs(dx) > 4) isDragging.current = true;
    targetRef.current -= dx * 0.25;
    lastPointerX.current = x;
  };
  const onPointerUp = () => { lastPointerX.current = null; };

  /* ─── Card click: only open lightbox if not dragging ─────── */
  const handleCardClick = (card) => {
    if (!isDragging.current) setLightbox({ src: card.src, title: card.title });
    isDragging.current = false;
  };

  /* ─── Per-card math ───────────────────────────────────────── */
  const cards = IMAGES.map((img, i) => {
    const baseAngle = (i / N) * 360;
    const theta     = ((baseAngle + angleRef.current) % 360) * (Math.PI / 180);
    const x         = Math.sin(theta) * RADIUS;
    const zRaw      = Math.cos(theta);
    const y         = -zRaw * RADIUS * Math.sin(TILT * Math.PI / 180);
    const scale     = 0.65 + 0.45 * ((zRaw + 1) / 2);
    const opacity   = 0.35 + 0.65 * ((zRaw + 1) / 2);
    const blur      = Math.max(0, (1 - (zRaw + 1) / 2) * 3);
    const zIndex    = Math.round(50 + zRaw * 40);
    return { ...img, i, x, y, scale, opacity, blur, zIndex, zRaw };
  });

  return (
    <div
      className="min-h-screen bg-white relative overflow-hidden select-none"
      onMouseMove={onPointerMove}
      onMouseUp={onPointerUp}
      onMouseLeave={onPointerUp}
      onTouchMove={e => onPointerMove(e.touches[0])}
      onTouchEnd={onPointerUp}
    >
      {/* ─── Nav ────────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-[200] flex items-center justify-between px-6 md:px-14 py-6">
        <Link to="/" className="flex items-center gap-2 text-black/40 hover:text-black transition-colors duration-300 text-[0.65rem] uppercase tracking-[0.3em] font-medium">
          <ArrowLeft size={13} />
          Portfolio
        </Link>
        <span className="font-playfair text-base tracking-widest text-black/30">ASN</span>
        <Link to="/suggestions" className="text-black/40 hover:text-black transition-colors duration-300 text-[0.65rem] uppercase tracking-[0.3em] font-medium hidden md:block">
          Suggestions
        </Link>
      </nav>

      {/* ─── Central text — top ──────────────────────────────── */}
      <div className="absolute top-28 md:top-32 inset-x-0 text-center pointer-events-none" style={{ zIndex: 50 }}>
        <p className="font-playfair text-4xl md:text-6xl lg:text-7xl leading-tight text-gray-900" style={{ letterSpacing: '-0.02em' }}>
          <em>I create;</em>
          <br />
          therefore I am
        </p>
      </div>

      {/* ─── Orbit stage ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        onMouseDown={onPointerDown}
        onTouchStart={e => onPointerDown(e.touches[0])}
        style={{ cursor: lightbox ? 'default' : 'grab' }}
      >
        {cards
          .sort((a, b) => a.zRaw - b.zRaw)
          .map(card => (
            <div
              key={card.i}
              onClick={() => handleCardClick(card)}
              style={{
                position:   'absolute',
                left:       '50%',
                top:        '50%',
                zIndex:     card.zIndex,
                // ORBIT_Y_OFFSET shifts the entire orbit down from screen center
                transform:  `translate(calc(-50% + ${card.x}px), calc(-50% + ${card.y + ORBIT_Y_OFFSET}px)) scale(${card.scale})`,
                opacity:    card.opacity,
                filter:     `blur(${card.blur}px)`,
                transition: 'filter 0.1s linear',
                willChange: 'transform, opacity, filter',
                cursor:     'pointer',
              }}
            >
              <div className="relative w-52 h-36 md:w-64 md:h-44 lg:w-72 lg:h-52 overflow-hidden rounded-sm shadow-xl">
                <img
                  src={card.src}
                  alt={card.title}
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Title on front cards */}
                <div
                  className="absolute bottom-0 inset-x-0 px-3 py-2"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
                    opacity:    card.zRaw > 0 ? 1 : 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <p className="text-white text-[0.6rem] uppercase tracking-[0.25em] font-medium truncate">{card.title}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ─── Lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <>
            {/* Backdrop */}
            <motion.div
              key="lb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-[300]"
              onClick={() => setLightbox(null)}
            />

            {/* Image */}
            <motion.div
              key="lb-img"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{    opacity: 0, scale: 0.88,  y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-4 md:inset-10 lg:inset-16 z-[310] flex flex-col items-center justify-center gap-6"
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-w-full max-h-[78vh] object-contain rounded shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
              />
              <p className="text-white/70 text-[0.65rem] uppercase tracking-[0.4em] font-medium">
                {lightbox.title}
              </p>
            </motion.div>

            {/* Close button */}
            <motion.button
              key="lb-close"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1   }}
              exit={{    opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={() => setLightbox(null)}
              className="fixed top-5 right-5 z-[320] w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
            >
              <X size={16} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* ─── Bottom hints ─────────────────────────────────────── */}
      <div className="fixed bottom-8 inset-x-0 flex flex-col items-center gap-1.5 pointer-events-none z-[200]">
        <p className="text-[0.55rem] uppercase tracking-[0.35em] text-black/30 font-medium">
          Use mouse wheel, arrow keys, or touch to navigate
        </p>
        <p className="text-[0.5rem] uppercase tracking-[0.3em] text-black/20">
          Auto-play resumes after 3 seconds of inactivity
        </p>
      </div>
    </div>
  );
}

