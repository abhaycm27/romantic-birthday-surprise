import React, { useState } from 'react';
import { Heart, X, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { audioManager } from '../utils/audioManager';

export default function SecretEasterEgg({ clickCount, onClose }) {
  if (clickCount < 5) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(13, 4, 10, 0.85)',
      backdropFilter: 'blur(12px)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '440px',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        animation: 'pulseHeart 0.5s ease-out'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(255, 117, 140, 0.2)',
          border: '1px solid var(--primary-pink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <Heart size={36} fill="var(--primary-pink)" color="var(--primary-pink)" className="animate-pulse-heart" />
        </div>

        <h3 className="font-script text-gradient" style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>
          {birthdayConfig.easterEgg.title}
        </h3>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          {birthdayConfig.easterEgg.message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', color: 'var(--accent-gold)' }}>
          <Sparkles size={20} />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Virtual Hug Issued! 🤗</span>
          <Sparkles size={20} />
        </div>
      </div>
    </div>
  );
}
