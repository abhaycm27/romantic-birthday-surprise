import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Heart } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

export default function Chapter11GiftBox({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpen) return;
    audioManager.playSliceChime();
    setIsOpen(true);

    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="chapter-11" className="chapter-container">
      <div className="glass-card" style={{
        padding: '3.5rem 2rem',
        maxWidth: '720px',
        width: '100%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(35, 12, 26, 0.95) 0%, rgba(20, 5, 14, 0.98) 100%)'
      }}>
        
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>
          There's still one more thing...
        </h3>

        <h2 className="font-script text-gradient" style={{ fontSize: '3.4rem', marginBottom: '2.5rem' }}>
          Your Special Gift Box 🎁
        </h2>

        {/* 3D Gift Box Interactive Visual */}
        <div 
          onClick={handleOpenGift}
          style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            margin: '0 auto 2.5rem auto',
            cursor: 'pointer'
          }}
        >
          {/* Gift Box Base */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            width: '100%',
            height: '140px',
            background: 'linear-gradient(135deg, #FF758C 0%, #4A0E17 100%)',
            borderRadius: '16px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: 'var(--shadow-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Ribbon Cross */}
            <div style={{ position: 'absolute', width: '30px', height: '100%', background: '#FFD700', opacity: 0.8 }} />
            <div style={{ position: 'absolute', height: '30px', width: '100%', background: '#FFD700', opacity: 0.8 }} />
          </div>

          {/* Gift Box Lid */}
          <div style={{
            position: 'absolute',
            top: isOpen ? '-60px' : '30px',
            left: '-10px',
            width: '220px',
            height: '45px',
            background: 'linear-gradient(135deg, #F472B6 0%, #FF758C 100%)',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: isOpen ? 'rotate(-25deg)' : 'none',
            zIndex: 10
          }}>
            {/* Ribbon Bow */}
            <div style={{
              position: 'absolute',
              top: '-25px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '2.5rem'
            }}>
              🎀
            </div>
          </div>

          {/* Light Burst on Reveal */}
          {isOpen && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '180px',
              height: '180px',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'shimmerGlow 1s infinite ease-in-out'
            }} />
          )}

        </div>

        {/* Revealed Content */}
        {!isOpen ? (
          <button onClick={handleOpenGift} className="btn-romantic">
            <Gift size={20} /> Tap to Open Box 🎁
          </button>
        ) : (
          <div style={{ animation: 'pulseHeart 0.6s ease-out' }}>
            <h3 className="font-handwriting" style={{ fontSize: '2.4rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
              You're my favorite gift life ever gave me. ❤️
            </h3>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Every single day with you is a gift I cherish more than anything else.
            </p>
            <button onClick={onNext} className="btn-romantic">
              The Final Surprise ✨
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
