import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Scissors, Check } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

export default function Chapter4CakeCutting({ onNext }) {
  const [isCut, setIsCut] = useState(false);
  const [isSliceTaken, setIsSliceTaken] = useState(false);

  const handleCutCake = () => {
    if (isCut) return;
    audioManager.playSliceChime();
    setIsCut(true);

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleTakeSlice = () => {
    audioManager.playHeartPop();
    setIsSliceTaken(true);
  };

  return (
    <section id="chapter-4" className="chapter-container">
      <div className="glass-card" style={{
        padding: '3.5rem 2rem',
        maxWidth: '720px',
        width: '100%',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(35, 12, 26, 0.9) 0%, rgba(45, 10, 20, 0.9) 100%)'
      }}>
        
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.35rem' }}>
          Okay... now we have one important job.
        </h3>

        <h2 className="font-script text-gradient" style={{ fontSize: '3.2rem', marginBottom: '2rem' }}>
          Let's cut the cake! 🎂
        </h2>

        {/* Interactive Cake Split Visualizer */}
        <div style={{ position: 'relative', width: '280px', height: '180px', margin: '0 auto 2.5rem auto' }}>
          
          {/* Cake Left Half */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: isCut ? '30px' : '50%',
            transform: 'translateX(-100%)',
            width: '115px',
            height: '100px',
            background: 'linear-gradient(135deg, #FF758C 0%, #4A0E17 100%)',
            borderRadius: '20px 0 0 10px',
            border: '2px solid rgba(255,255,255,0.2)',
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}>
            <div style={{ padding: '8px', fontSize: '1.2rem' }}>🍓</div>
          </div>

          {/* Cake Right Half / Slice */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: isCut ? (isSliceTaken ? '-40px' : '30px') : '50%',
            transform: isCut ? (isSliceTaken ? 'scale(1.3) rotate(15deg)' : 'translateX(100%)') : 'translateX(100%)',
            width: '115px',
            height: '100px',
            background: 'linear-gradient(135deg, #FF758C 0%, #4A0E17 100%)',
            borderRadius: '0 20px 10px 0',
            border: '2px solid rgba(255,255,255,0.2)',
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            opacity: isSliceTaken ? 0.9 : 1,
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}>
            <div style={{ padding: '8px', fontSize: '1.2rem', textAlign: 'right' }}>🌸</div>
          </div>

          {/* Virtual Knife Overlay */}
          {!isCut && (
            <div 
              onClick={handleCutCake}
              style={{
                position: 'absolute',
                top: '10px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-45deg)',
                fontSize: '2.5rem',
                cursor: 'pointer',
                animation: 'pulseHeart 1.5s infinite',
                filter: 'drop-shadow(0 0 10px var(--accent-gold))'
              }}
              title="Click or swipe to cut cake"
            >
              🔪
            </div>
          )}

          {/* Plate */}
          <div style={{
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '270px',
            height: '18px',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }} />

        </div>

        {/* Action Controls */}
        {!isCut ? (
          <button onClick={handleCutCake} className="btn-romantic">
            <Scissors size={20} /> Cut the Cake 🍰
          </button>
        ) : !isSliceTaken ? (
          <div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              You get the first slice, obviously. ❤️
            </p>
            <button onClick={handleTakeSlice} className="btn-romantic">
              Take My Slice 🍰
            </button>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '1.5rem' }}>
              Delicious! The sweet journey continues... ✨
            </p>
            <button onClick={onNext} className="btn-romantic">
              Read My Letter 💌
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
