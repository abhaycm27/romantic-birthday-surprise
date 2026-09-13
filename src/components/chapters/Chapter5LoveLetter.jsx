import React, { useState } from 'react';
import { Mail, Heart, Sparkles, BookOpen } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';

export default function Chapter5LoveLetter({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    audioManager.playHeartPop();
    setIsOpen(true);
  };

  const letter = birthdayConfig.loveLetter;

  return (
    <section id="chapter-5" className="chapter-container">
      <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
        
        <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>
          There's something I've been wanting to tell you...
        </h3>

        <h2 className="font-script text-gradient" style={{ fontSize: '3.4rem', marginBottom: '2.5rem' }}>
          A Letter From My Heart 💌
        </h2>

        {!isOpen ? (
          /* Sealed Envelope Visual */
          <div 
            onClick={handleOpenLetter}
            className="glass-card"
            style={{
              padding: '4rem 2rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed var(--border-glow)',
              transition: 'transform 0.4s ease'
            }}
          >
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'rgba(255, 117, 140, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <Mail size={48} color="var(--primary-pink)" className="animate-pulse-heart" />
            </div>

            <h3 style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '0.5rem' }}>
              For {birthdayConfig.nickname || birthdayConfig.girlfriendName} ❤️
            </h3>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Click to open & unseal your love letter
            </p>

            <button className="btn-romantic">
              Open Letter 💌
            </button>
          </div>
        ) : (
          /* Opened Parchment Handwritten Letter */
          <div className="glass-card" style={{
            padding: '3.5rem 2.5rem',
            textAlign: 'left',
            background: 'linear-gradient(135deg, rgba(45, 15, 30, 0.95) 0%, rgba(20, 5, 14, 0.98) 100%)',
            border: '1px solid var(--border-glow)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8)',
            position: 'relative'
          }}>
            {/* Candlelight glow */}
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '25px',
              color: 'var(--accent-gold)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}>
              <Sparkles size={16} /> With All My Love
            </div>

            {/* Letter Header */}
            <h3 className="font-handwriting" style={{ fontSize: '2.5rem', color: 'var(--primary-pink)', marginBottom: '1.5rem' }}>
              {letter.greeting || `Dear ${birthdayConfig.girlfriendName},`}
            </h3>

            {/* Letter Body Paragraphs */}
            <div className="font-handwriting" style={{ fontSize: '1.75rem', color: '#FFF5F7', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
              {letter.bodyParagraphs ? (
                letter.bodyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))
              ) : (
                <p>Happy Birthday to the most beautiful person in my life.</p>
              )}
            </div>

            {/* Closing & Signoff */}
            <div className="font-handwriting" style={{ fontSize: '1.8rem', color: 'var(--text-secondary)', textAlign: 'right', marginTop: '2rem' }}>
              <p>{letter.closing || "Thank you for being you."}</p>
              <p style={{ color: 'var(--primary-pink)', fontSize: '2.2rem', marginTop: '0.5rem' }}>
                {letter.signoff || "I love you. ❤️"}
              </p>
              <div style={{ fontSize: '1.5rem', color: 'var(--accent-gold)', marginTop: '0.5rem' }}>
                {letter.foreverYours || "Forever yours,"}
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFF' }}>
                  {birthdayConfig.boyfriendName}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <button onClick={onNext} className="btn-romantic">
                Explore Our Memories 📸
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
