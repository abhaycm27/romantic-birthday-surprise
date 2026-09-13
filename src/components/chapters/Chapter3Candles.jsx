import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Mic, Flame, Sparkles, Heart, CheckCircle } from 'lucide-react';
import { MicDetector } from '../../utils/micDetector';
import { audioManager } from '../../utils/audioManager';
import { birthdayConfig } from '../../config/birthdayConfig';

export default function Chapter3Candles({ onNext }) {
  const [candles, setCandles] = useState([true, true, true]); // 3 candles blown status
  const [isBlown, setIsBlown] = useState(false);
  const [micActive, setMicActive] = useState(false);

  const extinguishCandles = () => {
    if (isBlown) return;
    audioManager.playBlowWhoosh();
    setCandles([false, false, false]);
    setIsBlown(true);

    // Fire fireworks confetti explosion
    setTimeout(() => {
      audioManager.playSliceChime();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 400);
  };

  // Start microphone listener if supported
  const enableMicrophone = async () => {
    const detector = new MicDetector(() => {
      extinguishCandles();
      detector.stop();
    });
    const success = await detector.start();
    setMicActive(success);
  };

  return (
    <section id="chapter-3" className="chapter-container">
      <div className="glass-card" style={{
        padding: '3.5rem 2rem',
        maxWidth: '720px',
        width: '100%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(35, 12, 26, 0.9) 0%, rgba(19, 7, 15, 0.95) 100%)'
      }}>
        
        <h2 className="font-script text-gradient" style={{ fontSize: '3.2rem', marginBottom: '0.5rem' }}>
          Make a wish, {birthdayConfig.nickname || birthdayConfig.girlfriendName}... ✨
        </h2>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {isBlown ? "Wish made! ❤️ I hope every little wish in your heart comes true." : "Blow on your microphone or click the candles below."}
        </p>

        {/* Realistic Birthday Cake Container */}
        <div style={{ position: 'relative', width: '280px', height: '220px', margin: '0 auto 2.5rem auto' }}>
          
          {/* Cake Candles */}
          <div style={{
            position: 'absolute',
            top: '0px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '2.5rem',
            zIndex: 10
          }}>
            {candles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={extinguishCandles}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                {/* Flame or Smoke */}
                {isLit ? (
                  <div style={{
                    width: '16px',
                    height: '24px',
                    borderRadius: '50% 50% 35% 35%',
                    background: 'linear-gradient(to top, #FF4500, #FFD700, #FFF)',
                    boxShadow: '0 0 20px #FFD700',
                    animation: 'flameFlicker 1.2s infinite ease-in-out',
                    marginBottom: '2px'
                  }} />
                ) : (
                  <div style={{
                    width: '12px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'rgba(200, 200, 200, 0.4)',
                    animation: 'smokeRise 1.5s forwards ease-out',
                    marginBottom: '2px'
                  }} />
                )}

                {/* Candle Stick */}
                <div style={{
                  width: '12px',
                  height: '45px',
                  background: 'linear-gradient(to bottom, #F472B6, #FFF)',
                  borderRadius: '3px 3px 0 0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                }} />
              </div>
            ))}
          </div>

          {/* Cake Frosting Base Structure */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '240px',
            height: '110px',
            background: 'linear-gradient(135deg, #FF758C 0%, #4A0E17 100%)',
            borderRadius: '24px 24px 12px 12px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '12px',
            overflow: 'hidden'
          }}>
            {/* Strawberries / Flower decorations */}
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <span style={{ fontSize: '1.2rem' }}>🍓</span>
              <span style={{ fontSize: '1.2rem' }}>🌸</span>
              <span style={{ fontSize: '1.2rem' }}>🍓</span>
              <span style={{ fontSize: '1.2rem' }}>🌸</span>
            </div>

            {/* Decorative Frosting Cream Wave */}
            <div style={{
              height: '12px',
              background: 'rgba(255, 255, 255, 0.4)',
              borderRadius: '9999px',
              boxShadow: '0 0 10px rgba(255,255,255,0.5)'
            }} />
          </div>

          {/* Cake Plate */}
          <div style={{
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '270px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }} />

        </div>

        {/* Interaction Actions */}
        {!isBlown ? (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={extinguishCandles} className="btn-romantic">
              <Flame size={20} /> Blow the Candles 🕯️
            </button>

            {!micActive && (
              <button onClick={enableMicrophone} className="btn-secondary-romantic">
                <Mic size={18} /> Enable Mic Blow
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ color: 'var(--accent-gold)', fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={22} color="var(--primary-pink)" /> Candles Extinguished!
            </div>
            <button onClick={onNext} className="btn-romantic">
              Let's Cut the Cake 🎂
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
