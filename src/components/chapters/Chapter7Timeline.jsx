import React from 'react';
import { Calendar, Heart, Sparkles, MapPin } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';

export default function Chapter7Timeline({ onNext }) {
  const milestones = birthdayConfig.timeline || [];

  return (
    <section id="chapter-7" className="chapter-container">
      <div style={{ maxWidth: '850px', width: '100%', textAlign: 'center' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,215,0,0.15)', border: '1px solid rgba(255,215,0,0.3)', padding: '0.35rem 1rem', borderRadius: '9999px', color: 'var(--accent-gold)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Sparkles size={16} /> Milestones of Us
        </div>

        <h2 className="font-script text-gradient" style={{ fontSize: '3.6rem', marginBottom: '0.5rem' }}>
          Our Story So Far... 🎞️
        </h2>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '3.5rem' }}>
          A timeline of moments that brought us right here.
        </p>

        {/* Vertical Timeline Container */}
        <div style={{ position: 'relative', padding: '1rem 0' }}>
          
          {/* Vertical Connecting Line */}
          <div style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--primary-pink), var(--accent-gold), var(--primary-pink))',
            opacity: 0.5
          }} />

          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: isEven ? 'flex-start' : 'flex-end',
                  position: 'relative',
                  marginBottom: '3rem'
                }}
              >
                {/* Node Center Marker */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--primary-pink)',
                  border: '3px solid var(--bg-deep)',
                  boxShadow: '0 0 15px var(--primary-pink)',
                  zIndex: 5
                }} />

                {/* Content Card */}
                <div 
                  className="glass-card"
                  style={{
                    width: 'calc(50% - 40px)',
                    padding: '1.5rem',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--accent-gold)', fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    <Calendar size={13} /> {item.date}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', color: '#FFF', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>

                  {item.photo && (
                    <img 
                      src={item.photo} 
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '160px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-md)',
                        margin: '0.5rem 0 0.85rem 0',
                        border: '1px solid var(--border-glass)'
                      }}
                    />
                  )}

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

        <button onClick={onNext} className="btn-romantic" style={{ marginTop: '2rem' }}>
          My Favorite Person ❤️
        </button>

      </div>
    </section>
  );
}
