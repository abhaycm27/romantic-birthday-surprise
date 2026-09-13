import React, { useEffect, useRef } from 'react';

export default function FloatingAmbient() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle items: hearts, rose petals, glowing stars
    const particleCount = 45;
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 12 + 6;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.rotation = Math.random() * 360;
        this.rotSpeed = (Math.random() - 0.5) * 1.5;
        // Types: 'heart', 'petal', 'star'
        const types = ['heart', 'petal', 'star', 'heart'];
        this.type = types[Math.floor(Math.random() * types.length)];
        this.color = this.type === 'star' ? '#FFD700' : '#FF758C';
      }

      update() {
        this.y -= this.speedY;
        this.x += Math.sin(this.y * 0.01) * 0.4 + this.speedX;
        this.rotation += this.rotSpeed;

        if (this.y < -30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;

        if (this.type === 'heart') {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          const s = this.size * 0.5;
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.5, s * 0.5, 0, s * 1.4);
          ctx.bezierCurveTo(s * 1.5, s * 0.5, s, -s * 0.5, 0, s * 0.3);
          ctx.fill();
        } else if (this.type === 'petal') {
          ctx.fillStyle = '#F472B6';
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.4, this.size * 0.8, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      const p = new Particle();
      p.y = Math.random() * height; // initial spread
      particles.push(p);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}
