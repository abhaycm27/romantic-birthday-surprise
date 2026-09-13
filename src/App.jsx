import React, { useState, useEffect } from 'react';
import FloatingAmbient from './components/FloatingAmbient';
import ProgressIndicator from './components/ProgressIndicator';
import SecretEasterEgg from './components/SecretEasterEgg';

import Chapter1Landing from './components/chapters/Chapter1Landing';
import Chapter2Reveal from './components/chapters/Chapter2Reveal';
import Chapter3Candles from './components/chapters/Chapter3Candles';
import Chapter4CakeCutting from './components/chapters/Chapter4CakeCutting';
import Chapter5LoveLetter from './components/chapters/Chapter5LoveLetter';
import Chapter6PhotoGallery from './components/chapters/Chapter6PhotoGallery';
import Chapter7Timeline from './components/chapters/Chapter7Timeline';
import Chapter8CoupleHero from './components/chapters/Chapter8CoupleHero';
import Chapter9LoveMeter from './components/chapters/Chapter9LoveMeter';
import Chapter10LoveButton from './components/chapters/Chapter10LoveButton';
import Chapter11GiftBox from './components/chapters/Chapter11GiftBox';
import Chapter12NightSky from './components/chapters/Chapter12NightSky';

const CHAPTER_TITLES = [
  "Opening Scene",
  "Birthday Reveal",
  "Wish Upon a Star",
  "Sweetest Moment",
  "Love Letter",
  "Our Frames",
  "Timeline of Us",
  "The Look of Love",
  "Love Meter",
  "Heartbeats",
  "Gift of Love",
  "Final Scene"
];

export default function App() {
  const [activeChapter, setActiveChapter] = useState(1);
  const [easterEggClicks, setEasterEggClicks] = useState(0);

  const handleNextChapter = (chapterNum) => {
    setActiveChapter(chapterNum);
    const element = document.getElementById(`chapter-${chapterNum}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeartClick = () => {
    setEasterEggClicks(prev => prev + 1);
  };

  // Scroll listener to update chapter indicator based on visible section
  useEffect(() => {
    const handleScroll = () => {
      for (let i = 1; i <= 12; i++) {
        const el = document.getElementById(`chapter-${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.4) {
            setActiveChapter(i);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      
      {/* Floating Canvas Ambient Particle Layer */}
      <FloatingAmbient />

      {/* Global Fixed Widgets */}
      <ProgressIndicator 
        activeChapter={activeChapter} 
        totalChapters={12} 
        chapterTitles={CHAPTER_TITLES} 
      />

      {/* Secret Easter Egg Modal */}
      <SecretEasterEgg 
        clickCount={easterEggClicks} 
        onClose={() => setEasterEggClicks(0)} 
      />

      {/* Chapter Sequence */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Chapter1Landing onStart={() => handleNextChapter(2)} />
        <Chapter2Reveal onNext={() => handleNextChapter(3)} />
        <Chapter3Candles onNext={() => handleNextChapter(4)} />
        <Chapter4CakeCutting onNext={() => handleNextChapter(5)} />
        <Chapter5LoveLetter onNext={() => handleNextChapter(6)} />
        <Chapter6PhotoGallery onNext={() => handleNextChapter(7)} />
        <Chapter7Timeline onNext={() => handleNextChapter(8)} />
        <Chapter8CoupleHero onNext={() => handleNextChapter(9)} onHeartClick={handleHeartClick} />
        <Chapter9LoveMeter onNext={() => handleNextChapter(10)} />
        <Chapter10LoveButton onNext={() => handleNextChapter(11)} onHeartClick={handleHeartClick} />
        <Chapter11GiftBox onNext={() => handleNextChapter(12)} />
        <Chapter12NightSky />
      </div>

    </div>
  );
}
