import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Star, Moon } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';

export default function Chapter12NightSky() {
  const [stars, setStars] = useState([]);

  // Spawn shooting star on click
  const handleSkyClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newStar = {
      id: Date.now(),
      x,
      y
    };
    setStars(prev => [...prev.slice(-10), newStar]);
    audioManager.playSliceChime();
  };

  const handleFinalHeartBurst = () => {
    audioManager.playHeartPop();
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });
  };

  return (
    <section 
      id="chapter-12" 
      className="chapter-container"
      onClick={handleSkyClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Interactive Shooting Star Sparks */}
      {stars.map(s => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            top: s.y,
            left: s.x,
            pointerEvents: 'none',
            color: '#FFD700',
            animation: 'smokeRise 1.2s forwards ease-out',
            zIndex: 20
          }}
        >
          <Star size={24} fill="#FFD700" />
        </div>
      ))}

      <div className="glass-card" style={{
        padding: '4rem 2.5rem',
        maxWidth: '850px',
        width: '100%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(20, 5, 14, 0.95) 0%, rgba(45, 10, 20, 0.98) 100%)',
        position: 'relative'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
          <Moon size={24} />
          <Star size={20} fill="#FFD700" />
        </div>

        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>
          And now, the final scene...
        </h3>

        <h2 className="font-script text-gradient" style={{ fontSize: '3.2rem', marginBottom: '2.5rem' }}>
          I'd wish for a million more moments with you.
        </h2>

        {/* Climax Romantic Message Flow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          fontSize: '1.25rem',
          color: 'var(--text-primary)',
          lineHeight: 1.6,
          marginBottom: '3rem'
        }}>
          <p style={{ fontSize: '1.4rem', color: 'var(--primary-pink)', fontWeight: 600 }}>
            Happy Birthday, {birthdayConfig.nickname || birthdayConfig.girlfriendName}. ❤️
          </p>
          <p>Thank you for being part of my life.</p>
          <p>The day you were born, 18 September 2007, became one of the loveliest days in the world, and I am so grateful it happened.</p>
          <p>No matter how many birthdays come and go...</p>
          <p style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>
            I’ll always want to celebrate you, Ponnu.
          </p>
          <p style={{ fontSize: '1.3rem' }}>
            I love you more than words can ever explain, and I hope you always know how deeply you’re loved by me.
          </p>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#FFF',
            margin: '1rem 0'
          }}>
            Today.<br />
            Tomorrow.<br />
            And every day after that. ❤️
          </div>
        </div>

        {/* Large Interactive Pulsing Heart */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleFinalHeartBurst();
            }}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'rgba(255, 117, 140, 0.2)',
              border: '2px solid var(--primary-pink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <Heart size={54} fill="var(--primary-pink)" color="var(--primary-pink)" className="animate-pulse-heart" />
          </div>
        </div>

        {/* Signoff */}
        <div className="font-handwriting" style={{ fontSize: '2.2rem', color: 'var(--accent-gold)' }}>
          Forever yours,
          <div style={{ fontSize: '2.8rem', color: '#FFF', fontWeight: 800 }}>
            {birthdayConfig.boyfriendName}
          </div>
        </div>

      </div>
    </section>
  );
}
