import React from 'react';
import { Heart } from 'lucide-react';

export default function ProgressIndicator({ activeChapter, totalChapters, chapterTitles }) {
  return (
    <div style={{
      position: 'fixed',
      top: '1.25rem',
      left: '1.25rem',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      background: 'rgba(26, 7, 19, 0.75)',
      backdropFilter: 'blur(12px)',
      padding: '0.45rem 1rem',
      borderRadius: '9999px',
      border: '1px solid var(--border-glass)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
    }}>
      <Heart size={16} fill="var(--primary-pink)" color="var(--primary-pink)" className="animate-pulse-heart" />
      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        Chapter {activeChapter} of {totalChapters}
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'none', mdDisplay: 'inline' }}>
        • {chapterTitles[activeChapter - 1] || 'Surprise'}
      </span>
    </div>
  );
}
