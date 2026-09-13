# 🌹 Romantic Birthday Experience SPA

A personalized, highly interactive, digital birthday surprise website designed as a gift from a boyfriend to his girlfriend.

---

## 📁 Project Structure

```
romantic-birthday-surprise/
├── index.html                   # HTML entry point with Google Fonts (Dancing Script, Caveat, Outfit)
├── package.json                 # Project dependencies (React, Vite, Canvas-Confetti, Lucide Icons)
├── vite.config.js               # Vite build configuration
├── public/
│   └── assets/
│       ├── music/               # Place your romantic-song.mp3 here
│       └── photos/              # Place your personal photos here
├── src/
│   ├── main.jsx                 # React root render
│   ├── App.jsx                  # Main application assembler
│   ├── index.css                # Glassmorphism & romantic dark CSS design system
│   ├── config/
│   │   └── birthdayConfig.js    <-- ⚙️ EDIT ALL PERSONAL DETAILS HERE
│   ├── utils/
│   │   ├── audioManager.js      # Music player & procedural Web Audio API SFX
│   │   └── micDetector.js       # Microphone blow sound analyzer
│   └── components/
│       ├── FloatingAmbient.jsx  # Floating rose petals & glowing particle canvas
│       ├── MusicPlayer.jsx      # Top-right fixed audio player widget
│       ├── ProgressIndicator.jsx# Top-left "Chapter X of 12" progress bar
│       ├── SecretEasterEgg.jsx  # 5-click hidden hug popup modal
│       └── chapters/
│           ├── Chapter1Landing.jsx     # "Hey Beautiful... ❤️" Landing Gate
│           ├── Chapter2Reveal.jsx      # Confetti explosion & Birthday reveal
│           ├── Chapter3Candles.jsx     # Candle blowing (Mic blow sound + Tap)
│           ├── Chapter4CakeCutting.jsx  # Drag/swipe cake cutting animation
│           ├── Chapter5LoveLetter.jsx   # Envelope & handwritten love letter
│           ├── Chapter6PhotoGallery.jsx # Polaroid cards gallery & local uploader preview
│           ├── Chapter7Timeline.jsx     # "Our Story So Far..." milestone timeline
│           ├── Chapter8CoupleHero.jsx   # Framed couple photo hero backdrop
│           ├── Chapter9LoveMeter.jsx    # >100% overflow diagnostic love meter
│           ├── Chapter10LoveButton.jsx  # "Click if you love me ❤️" growing heart
│           ├── Chapter11GiftBox.jsx     # Interactive ribbon gift box reveal
│           └── Chapter12NightSky.jsx    # Starry night & final romantic climax
```

---

## ⚙️ How to Personalize (`src/config/birthdayConfig.js`)

Open `src/config/birthdayConfig.js` to change:

1. **Changing Names**:
   ```javascript
   girlfriendName: "Sophia", // Replace with her name
   boyfriendName: "Alex",   // Replace with your name
   ```

2. **Changing Background Music**:
   - Copy your favorite song `.mp3` into `public/assets/music/song.mp3`.
   - Update `backgroundMusic: "assets/music/song.mp3"` in `birthdayConfig.js`.

3. **Changing Photos**:
   - Place image files inside `public/assets/photos/` or use any web/Unsplash URL.
   - Update `mainPhoto` and the `photos` array in `birthdayConfig.js`:
   ```javascript
   mainPhoto: "assets/photos/our-photo.jpg",
   photos: [
     {
       id: 1,
       image: "assets/photos/photo1.jpg",
       caption: "Our sunset walk 🌅",
       date: "October 14, 2024",
       location: "Beach Point"
     }
   ]
   ```

4. **Changing Love Letter**:
   - Edit `loveLetter.greeting`, `loveLetter.bodyParagraphs`, and `loveLetter.closing` in `birthdayConfig.js`.

---

## 🚀 Running Locally

1. Open your terminal in this directory:
   ```bash
   cd romantic-birthday-surprise
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser!
