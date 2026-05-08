'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  isMoving: boolean;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface SparklesHeroProps {
  className?: string;
  beamYFraction?: number;
}

export function SparklesHero({ className, beamYFraction = 0.65 }: SparklesHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamYRef = useRef(beamYFraction);

  useEffect(() => {
    beamYRef.current = beamYFraction;
  }, [beamYFraction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const stars: Star[] = [];
    let frame = 0;
    let W = 0;
    let H = 0;

    function initStars(
      c: HTMLCanvasElement,
      existingStars: Star[],
    ): void {
      const beamY = c.height * beamYRef.current;
      const count = c.width < 640 ? 250 : 500;

      // Remove static stars, keep moving ones
      const movingStars = existingStars.filter((s) => s.isMoving);
      existingStars.length = 0;
      movingStars.forEach((s) => existingStars.push(s));

      for (let i = 0; i < count; i++) {
        const distOffset = Math.random() * (c.height - beamY + 60) - 20;
        const y = beamY + distOffset;
        const distFromBeam = Math.abs(y - beamY);
        const nearFactor = Math.exp(-distFromBeam / 140);

        existingStars.push({
          x: Math.random() * c.width,
          y,
          size: 0.3 + Math.random() * 1.8 * nearFactor + 0.3,
          baseOpacity: (0.15 + Math.random() * 0.85) * (0.25 + nearFactor * 0.75),
          opacity: 0,
          twinkleSpeed: 0.004 + Math.random() * 0.018,
          twinklePhase: Math.random() * Math.PI * 2,
          isMoving: false,
          vx: 0,
          vy: 0,
          life: 0,
          maxLife: Infinity,
        });
      }
    }

    function resize(c: HTMLCanvasElement): void {
      W = c.offsetWidth;
      H = c.offsetHeight;
      c.width = W;
      c.height = H;
      initStars(c, stars);
    }

    function spawnMovingParticle(): void {
      const beamY = H * beamYRef.current;
      const lineW = W * 0.7;
      const lineX = (W - lineW) / 2;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.6;
      const speed = 0.15 + Math.random() * 0.45;

      stars.push({
        x: lineX + Math.random() * lineW,
        y: beamY + (Math.random() - 0.5) * 4,
        size: 0.8 + Math.random() * 1.8,
        baseOpacity: 0.7 + Math.random() * 0.3,
        opacity: 0,
        twinkleSpeed: 0,
        twinklePhase: 0,
        isMoving: true,
        vx: Math.cos(angle) * speed * 0.4,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 90 + Math.random() * 130,
      });
    }

    function draw(x: CanvasRenderingContext2D): void {
      frame++;
      x.clearRect(0, 0, W, H);

      const beamY = H * beamYRef.current;
      const lineW = W * 0.55;
      const lineX = (W - lineW) / 2;

      // Wide soft glow
      const glowGrad = x.createLinearGradient(lineX - 80, beamY, lineX + lineW + 80, beamY);
      glowGrad.addColorStop(0, 'rgba(6,206,255,0)');
      glowGrad.addColorStop(0.18, 'rgba(6,206,255,0.18)');
      glowGrad.addColorStop(0.5, 'rgba(80,215,255,0.45)');
      glowGrad.addColorStop(0.82, 'rgba(6,206,255,0.18)');
      glowGrad.addColorStop(1, 'rgba(6,206,255,0)');

      x.save();
      x.shadowColor = 'rgba(6,206,255,0.7)';
      x.shadowBlur = 18;
      x.beginPath();
      x.moveTo(lineX - 80, beamY);
      x.lineTo(lineX + lineW + 80, beamY);
      x.strokeStyle = glowGrad;
      x.lineWidth = 12;
      x.stroke();
      x.restore();

      // Sharp bright core
      const coreGrad = x.createLinearGradient(lineX, beamY, lineX + lineW, beamY);
      coreGrad.addColorStop(0, 'rgba(6,206,255,0)');
      coreGrad.addColorStop(0.22, 'rgba(160,235,255,0.85)');
      coreGrad.addColorStop(0.5, 'rgba(255,255,255,1)');
      coreGrad.addColorStop(0.78, 'rgba(160,235,255,0.85)');
      coreGrad.addColorStop(1, 'rgba(6,206,255,0)');

      x.beginPath();
      x.moveTo(lineX, beamY);
      x.lineTo(lineX + lineW, beamY);
      x.strokeStyle = coreGrad;
      x.lineWidth = 1.5;
      x.stroke();

      // Spawn moving particles
      const movingCount = stars.filter((s) => s.isMoving).length;
      const spawnLimit = W < 640 ? 20 : 40;
      if (frame % 3 === 0 && movingCount < spawnLimit) {
        spawnMovingParticle();
      }

      // Update + draw all stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];

        if (s.isMoving) {
          s.life++;
          s.x += s.vx;
          s.y += s.vy;

          const progress = s.life / s.maxLife;
          if (progress < 0.15) {
            s.opacity = (progress / 0.15) * s.baseOpacity;
          } else if (progress > 0.7) {
            s.opacity = ((1 - progress) / 0.3) * s.baseOpacity;
          } else {
            s.opacity = s.baseOpacity;
          }

          if (s.life >= s.maxLife || s.y > H + 20 || s.x < -10 || s.x > W + 10) {
            stars.splice(i, 1);
            continue;
          }
        } else {
          s.twinklePhase += s.twinkleSpeed;
          s.opacity = s.baseOpacity * (0.45 + 0.55 * Math.sin(s.twinklePhase));
        }

        if (s.opacity < 0.01) continue;

        x.beginPath();
        x.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        x.fillStyle = `rgba(255,255,255,${Math.min(s.opacity, 1)})`;
        x.fill();
      }

      animId = requestAnimationFrame(() => draw(x));
    }

    resize(canvas);

    const handleResize = (): void => resize(canvas);
    window.addEventListener('resize', handleResize);

    draw(ctx);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
