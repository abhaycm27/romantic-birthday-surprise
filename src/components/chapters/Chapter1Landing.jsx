import React from 'react';
import { Heart, Gift, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';

export default function Chapter1Landing({ onStart }) {
  const handleOpenSurprise = () => {
    audioManager.startMusic(birthdayConfig.backgroundMusic);
    audioManager.playHeartPop();
    onStart();
  };

  return (
    <section id="chapter-1" className="chapter-container">
      <div style={{
        maxWidth: '820px',
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '28px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.5)'
      }}>
        <img
          src={birthdayConfig.mainPhoto}
          alt="Birthday surprise"
          style={{
            width: '100%',
            height: '72vh',
            minHeight: '500px',
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.75) saturate(1.1) contrast(1.05)'
          }}
        />

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15, 6, 12, 0.18) 0%, rgba(15, 6, 12, 0.68) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '680px',
            width: '100%',
            padding: '3rem 2rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255, 117, 140, 0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 0 25px rgba(255,117,140,0.35)',
              marginBottom: '1.5rem'
            }}>
              <Heart size={42} fill="var(--primary-pink)" color="var(--primary-pink)" className="animate-pulse-heart" />
            </div>

            <h1 className="font-script text-gradient text-glow" style={{ fontSize: '3.8rem', marginBottom: '1rem', lineHeight: 1.2 }}>
              Hey Ponnu... this is our story. ❤️
            </h1>

            <p style={{ fontSize: '1.25rem', color: '#F8E7EF', marginBottom: '2.5rem', fontWeight: 500, textShadow: '0 6px 18px rgba(0,0,0,0.5)' }}>
              Abhi wrote a little love story for you, with every scene made from our memories.
            </p>

            <button
              onClick={handleOpenSurprise}
              className="btn-romantic"
              style={{ fontSize: '1.25rem', padding: '1.1rem 2.8rem' }}
            >
              <Gift size={24} /> Open Your Surprise 🎁
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
