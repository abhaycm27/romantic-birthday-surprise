import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';

export default function Chapter8CoupleHero({ onNext, onHeartClick }) {
  return (
    <section id="chapter-8" className="chapter-container">
      <div className="glass-card" style={{
        padding: '3.5rem 2rem',
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(35, 12, 26, 0.95) 0%, rgba(74, 14, 23, 0.8) 100%)',
        position: 'relative'
      }}>
        
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>
          Out of all the people in this world...
        </h3>

        <h2 className="font-script text-gradient text-glow" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
          My favorite place is right beside you, Sruthi.
        </h2>

        {/* Central Couple Photo Frame */}
        <div style={{ position: 'relative', width: '280px', height: '340px', margin: '0 auto 2.5rem auto' }}>
          
          <img
            src={birthdayConfig.mainPhoto}
            alt="Couple Photo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'var(--radius-lg)',
              border: '3px solid var(--primary-pink)',
              boxShadow: 'var(--shadow-glow)'
            }}
          />

          {/* Floating Heart Button Badge on Image */}
          <div 
            onClick={onHeartClick}
            style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--primary-pink)',
              border: '3px solid #FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(255, 117, 140, 0.6)',
              cursor: 'pointer'
            }}
            title="Click me!"
          >
            <Heart size={30} fill="#FFF" color="#FFF" className="animate-pulse-heart" />
          </div>

        </div>

        <p style={{ fontSize: '1.3rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '2rem' }}>
          You are my favorite person, my peace, and my forever. ❤️
        </p>

        <button onClick={onNext} className="btn-romantic">
          Test Our Love Meter 💘
        </button>

      </div>
    </section>
  );
}
