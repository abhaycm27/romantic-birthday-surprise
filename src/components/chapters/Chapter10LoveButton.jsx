import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';

export default function Chapter10LoveButton({ onNext, onHeartClick }) {
  const [clickCount, setClickCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("Go ahead... tap the heart! 💖");

  const messages = birthdayConfig.loveButtonMessages || [
    "I knew it! 😌❤️",
    "That's my girl. ❤️",
    "One more click? 👀",
    "Okay, now I'm smiling so hard. 😊",
    "You're adorable.",
    "My heart just skipped a beat! 💖"
  ];

  const handleClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    audioManager.playHeartPop();

    // Trigger secret easter egg counter parent handler if passed
    if (onHeartClick) onHeartClick();

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMsg);
  };

  const heartScale = 1 + Math.min(clickCount * 0.1, 1.2);

  return (
    <section id="chapter-10" className="chapter-container">
      <div className="glass-card" style={{
        padding: '3.5rem 2rem',
        maxWidth: '680px',
        width: '100%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(35, 12, 26, 0.95) 0%, rgba(74, 14, 23, 0.8) 100%)'
      }}>
        
        <h2 className="font-script text-gradient" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
          Interactive Love Button 💘
        </h2>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          How many times can you press the heart?
        </p>

        {/* Dynamic Growing Heart Button */}
        <div style={{ marginBottom: '2.5rem', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            onClick={handleClick}
            style={{
              background: 'linear-gradient(135deg, #FF758C 0%, #4A0E17 100%)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              width: '110px',
              height: '110px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-glow)',
              transform: `scale(${heartScale})`,
              transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <Heart size={50} fill="#FFF" color="#FFF" />
          </button>
        </div>

        {/* Dynamic Message Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--border-glass)',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
            {currentMessage}
          </span>
        </div>

        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Total Love Taps: <strong style={{ color: 'var(--primary-pink)' }}>{clickCount}</strong>
        </div>

        <button onClick={onNext} className="btn-romantic">
          There's Still One More Thing... 🎁
        </button>

      </div>
    </section>
  );
}
