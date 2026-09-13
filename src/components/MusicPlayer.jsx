import React, { useState } from 'react';
import { Music, Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(audioManager.isPlayingMusic);
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);

  const handleTogglePlay = () => {
    const newState = audioManager.toggleMusic();
    setIsPlaying(newState);
  };

  const handleToggleMute = () => {
    const newMute = audioManager.toggleMute();
    setIsMuted(newMute);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '1.25rem',
      right: '1.25rem',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(26, 7, 19, 0.75)',
      backdropFilter: 'blur(12px)',
      padding: '0.4rem 0.85rem',
      borderRadius: '9999px',
      border: '1px solid var(--border-glass)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
    }}>
      <button
        onClick={handleTogglePlay}
        title={isPlaying ? "Pause Music" : "Play Music"}
        style={{
          background: 'var(--primary-pink)',
          border: 'none',
          color: '#FFF',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
      </button>

      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
        <Music size={14} color="var(--primary-pink)" /> Music
      </div>

      <button
        onClick={handleToggleMute}
        title={isMuted ? "Unmute" : "Mute"}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '0.2rem',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {isMuted ? <VolumeX size={16} color="#F87171" /> : <Volume2 size={16} color="var(--primary-pink)" />}
      </button>
    </div>
  );
}
