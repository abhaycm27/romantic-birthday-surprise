import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Star } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';

export default function Chapter2Reveal({ onNext }) {
  useEffect(() => {
    // Fire celebratory confetti explosion
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF758C', '#FFD700', '#F472B6', '#FFF5F7']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF758C', '#FFD700', '#F472B6', '#FFF5F7']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <section id="chapter-2" className="chapter-container">
      <div className="glass-card" style={{
        padding: '4rem 2.5rem',
        maxWidth: '780px',
        width: '100%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(35, 12, 26, 0.85) 0%, rgba(74, 14, 23, 0.7) 100%)'
      }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)', padding: '0.35rem 1rem', borderRadius: '9999px', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          <Sparkles size={16} /> A Cinematic Love Story
        </div>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>
          Today isn't just another day...
        </h3>

        <h2 className="font-script text-gradient text-glow" style={{ fontSize: '3.8rem', margin: '0.5rem 0 1.5rem 0', lineHeight: 1.1 }}>
          Today is YOUR day ❤️
        </h2>

        <div style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#FFF',
          marginBottom: '2rem',
          letterSpacing: '-0.02em',
          textShadow: '0 0 30px rgba(255, 117, 140, 0.5)'
        }}>
          Happy Birthday, <span style={{ color: 'var(--primary-pink)' }}>{birthdayConfig.nickname || birthdayConfig.girlfriendName}</span>! 🎂✨
        </div>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1rem auto' }}>
          Born on 18 September 2007, you came into this world and made it brighter, softer, and more beautiful.
        </p>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
          For the girl who turns ordinary moments into unforgettable scenes, this is your day — and it deserves all the love in the universe.
        </p>

        <button onClick={onNext} className="btn-romantic">
          Make A Wish 🕯️
        </button>

      </div>
    </section>
  );
}
