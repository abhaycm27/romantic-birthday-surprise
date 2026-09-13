import React, { useState } from 'react';
import { Camera, Image, Upload, X, MapPin, Calendar, Heart, ZoomIn } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { audioManager } from '../../utils/audioManager';

export default function Chapter6PhotoGallery({ onNext }) {
  const [photoList, setPhotoList] = useState(birthdayConfig.photos || []);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [newCaption, setNewCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Local drag & drop photo preview handler
  const handleLocalImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newPhotoObj = {
        id: Date.now(),
        image: event.target.result,
        caption: newCaption || "New beautiful memory ❤️",
        date: "Just now",
        location: "Special Moment"
      };
      setPhotoList([newPhotoObj, ...photoList]);
      setNewCaption('');
      setIsUploading(false);
      audioManager.playHeartPop();
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="chapter-6" className="chapter-container">
      <div style={{ maxWidth: '1100px', width: '100%', textAlign: 'center' }}>
        
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,117,140,0.15)', border: '1px solid var(--border-glass)', padding: '0.35rem 1rem', borderRadius: '9999px', color: 'var(--primary-pink)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <Camera size={16} /> Photo Keepsakes
        </div>

        <h2 className="font-script text-gradient" style={{ fontSize: '3.6rem', marginBottom: '0.5rem' }}>
          Our Little World ❤️
        </h2>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
          Snapshots of moments where happiness was simply being with you.
        </p>

        {/* Local Add Photo Trigger */}
        <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          {!isUploading ? (
            <button
              onClick={() => setIsUploading(true)}
              className="btn-secondary-romantic"
              style={{ fontSize: '0.9rem' }}
            >
              <Upload size={16} /> Add A Memory (Local Preview)
            </button>
          ) : (
            <div className="glass-card" style={{ padding: '1.5rem', maxWidth: '400px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF' }}>Add Photo</span>
                <button onClick={() => setIsUploading(false)} style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Caption for this memory..."
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-glass)', color: '#FFF', marginBottom: '1rem', outline: 'none' }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleLocalImageUpload}
                style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}
              />
            </div>
          )}
        </div>

        {/* Polaroid Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '2rem',
          marginBottom: '3.5rem'
        }}>
          {photoList.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => {
                setSelectedPhoto(photo);
                audioManager.playHeartPop();
              }}
              className="polaroid-card"
              style={{
                cursor: 'pointer',
                transform: `rotate(${idx % 2 === 0 ? -2.5 : 2.5}deg)`
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: '260px', borderRadius: '2px' }}>
                <img
                  src={photo.image}
                  alt={photo.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.2)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFF'
                }}>
                  <ZoomIn size={32} />
                </div>
              </div>

              <div style={{ marginTop: '12px', textAlign: 'left' }}>
                <p className="font-handwriting" style={{ fontSize: '1.4rem', color: '#1A0713', fontWeight: 700, lineHeight: 1.2, marginBottom: '4px' }}>
                  {photo.caption}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#666' }}>
                  <span><Calendar size={11} /> {photo.date}</span>
                  {photo.location && <span><MapPin size={11} /> {photo.location}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(13, 4, 10, 0.92)',
              backdropFilter: 'blur(16px)',
              zIndex: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-card"
              style={{ maxWidth: '650px', width: '100%', padding: '1.5rem', textAlign: 'center', position: 'relative' }}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#FFF', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>

              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.caption}
                style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', borderRadius: '12px', marginBottom: '1rem' }}
              />

              <h3 className="font-handwriting" style={{ fontSize: '2.2rem', color: 'var(--primary-pink)', marginBottom: '0.5rem' }}>
                {selectedPhoto.caption}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {selectedPhoto.date} • {selectedPhoto.location}
              </p>
            </div>
          </div>
        )}

        <button onClick={onNext} className="btn-romantic">
          See Our Story Timeline 🎞️
        </button>

      </div>
    </section>
  );
}
