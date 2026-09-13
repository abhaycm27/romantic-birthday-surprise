import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Activity, AlertCircle, Sparkles } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

export default function Chapter9LoveMeter({ onNext }) {
  const [percentage, setPercentage] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleCheckLove = () => {
    if (isChecking || isError) return;
    setIsChecking(true);
    audioManager.playHeartPop();

    const steps = [10, 25, 45, 70, 88, 99, 120, 150];
    let stepIdx = 0;

    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setPercentage(steps[stepIdx]);
        audioManager.playHeartPop();
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsChecking(false);
        setIsError(true);
        audioManager.playSliceChime();

        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }, 450);
  };

  return (
    <section id="chapter-9" className="chapter-container">
      <div className="glass-card" style={{
        padding: '3.5rem 2rem',
        maxWidth: '680px',
        width: '100%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(35, 12, 26, 0.95) 0%, rgba(20, 5, 14, 0.95) 100%)'
      }}>
        
        <h2 className="font-script text-gradient" style={{ fontSize: '3.4rem', marginBottom: '0.5rem' }}>
          How much do I love you? 💘
        </h2>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          Let's run a real-time romantic diagnostics test.
        </p>

        {/* Heart Meter Container */}
        <div style={{ position: 'relative', width: '220px', margin: '0 auto 2rem auto' }}>
          
          {/* Progress Bar Container */}
          <div style={{
            width: '100%',
            height: '24px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            border: '1px solid var(--border-glass)',
            overflow: 'hidden',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: `${Math.min(percentage, 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #F472B6 0%, #FF758C 50%, #FFD700 100%)',
              borderRadius: '9999px',
              transition: 'width 0.35s ease-out'
            }} />
          </div>

          {/* Large Heart Display */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Heart size={40} fill="var(--primary-pink)" color="var(--primary-pink)" className={isChecking ? "animate-pulse-heart" : ""} />
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFF' }}>
              {percentage}%
            </span>
          </div>

        </div>

        {/* Error Overflow Message */}
        {isError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '2rem',
            animation: 'pulseHeart 0.5s ease-out'
          }}>
            <div style={{ color: '#F87171', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <AlertCircle size={20} /> DIAGNOSTIC OVERFLOW ERROR ⚠️
            </div>
            <div style={{ fontSize: '1.25rem', color: '#FFF', fontWeight: 700 }}>
              My love for you cannot be measured. ❤️
            </div>
          </div>
        )}

        {/* Action Button */}
        {!isError ? (
          <button
            onClick={handleCheckLove}
            disabled={isChecking}
            className="btn-romantic"
          >
            <Activity size={20} /> {isChecking ? "Calculating..." : "Check ❤️"}
          </button>
        ) : (
          <button onClick={onNext} className="btn-romantic">
            Click if You Love Me ❤️
          </button>
        )}

      </div>
    </section>
  );
}
