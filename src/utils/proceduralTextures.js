import * as THREE from 'three';

/**
 * Procedural Marble Texture Generator for Reception Desk
 */
export function createMarbleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base off-white marble
  ctx.fillStyle = '#f8f8fa';
  ctx.fillRect(0, 0, 1024, 1024);

  // Soft cloudy shading
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, '#f2f3f7');
  grad.addColorStop(0.3, '#ffffff');
  grad.addColorStop(0.7, '#eceff3');
  grad.addColorStop(1, '#f9fafc');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Draw natural subtle marble veins
  const drawVein = (points, color, width, blur) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.filter = `blur(${blur}px)`;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.stroke();
    ctx.restore();
  };

  // Grey & subtle warm golden veins
  const veins = [
    {
      pts: [
        { x: 50, y: 0 }, { x: 220, y: 180 }, { x: 380, y: 350 },
        { x: 420, y: 520 }, { x: 580, y: 700 }, { x: 800, y: 920 }, { x: 950, y: 1024 }
      ],
      color: 'rgba(150, 155, 168, 0.35)',
      width: 5,
      blur: 3
    },
    {
      pts: [
        { x: 0, y: 300 }, { x: 180, y: 420 }, { x: 350, y: 480 },
        { x: 600, y: 650 }, { x: 820, y: 780 }, { x: 1024, y: 900 }
      ],
      color: 'rgba(180, 150, 100, 0.25)', // golden vein
      width: 3.5,
      blur: 2
    },
    {
      pts: [
        { x: 200, y: 0 }, { x: 340, y: 150 }, { x: 420, y: 280 },
        { x: 380, y: 450 }, { x: 450, y: 600 }
      ],
      color: 'rgba(140, 145, 155, 0.28)',
      width: 3,
      blur: 2
    },
    {
      pts: [
        { x: 500, y: 300 }, { x: 680, y: 420 }, { x: 740, y: 600 },
        { x: 920, y: 720 }, { x: 1024, y: 750 }
      ],
      color: 'rgba(160, 165, 175, 0.22)',
      width: 4,
      blur: 2.5
    },
    // Hairline crisp veins
    {
      pts: [
        { x: 70, y: 20 }, { x: 230, y: 190 }, { x: 390, y: 360 },
        { x: 430, y: 530 }, { x: 590, y: 710 }, { x: 810, y: 930 }
      ],
      color: 'rgba(90, 95, 110, 0.5)',
      width: 1.2,
      blur: 0.5
    }
  ];

  veins.forEach((v) => drawVein(v.pts, v.color, v.width, v.blur));

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Procedural Polished Concrete Floor Texture with tile seams
 */
export function createConcreteFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Dark slate polished concrete base
  ctx.fillStyle = '#14161a';
  ctx.fillRect(0, 0, 1024, 1024);

  // Micro concrete grain
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 14;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Large subtle architectural slab grid seams (e.g. 512px slabs)
  ctx.strokeStyle = 'rgba(40, 45, 55, 0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(512, 0);
  ctx.lineTo(512, 1024);
  ctx.moveTo(0, 512);
  ctx.lineTo(1024, 512);
  ctx.stroke();

  // Subtle gloss highlights on borders
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(513, 0);
  ctx.lineTo(513, 1024);
  ctx.moveTo(0, 513);
  ctx.lineTo(1024, 513);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

/**
 * Procedural Ceiling Dark Wood Slat Texture
 */
export function createWoodSlatTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Deep architectural walnut base
  ctx.fillStyle = '#151210';
  ctx.fillRect(0, 0, 512, 512);

  // Draw vertical wooden acoustic slats
  const slatWidth = 16;
  const gap = 6;
  for (let x = 0; x < 512; x += slatWidth + gap) {
    // Slat body with wood tone gradient
    const grad = ctx.createLinearGradient(x, 0, x + slatWidth, 0);
    grad.addColorStop(0, '#221a14');
    grad.addColorStop(0.5, '#2e231b');
    grad.addColorStop(1, '#1b140f');
    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, slatWidth, 512);

    // Slat top highlight
    ctx.fillStyle = 'rgba(255, 200, 120, 0.05)';
    ctx.fillRect(x + 1, 0, 2, 512);

    // Shadow in the gap
    ctx.fillStyle = '#0a0807';
    ctx.fillRect(x + slatWidth, 0, gap, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  return texture;
}

/**
 * Procedural City Skyline Panoramic Window View
 */
export function createCitySkylineTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Twilight sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  skyGrad.addColorStop(0, '#040711');
  skyGrad.addColorStop(0.4, '#091326');
  skyGrad.addColorStop(0.75, '#171f33');
  skyGrad.addColorStop(0.95, '#2c2936');
  skyGrad.addColorStop(1, '#3d3032');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  // Distant subtle mountain/horizon haze
  ctx.fillStyle = 'rgba(180, 140, 100, 0.08)';
  ctx.fillRect(0, 650, 2048, 150);

  // Skyscraper silhouettes
  let curX = 20;
  while (curX < 2048) {
    const width = 35 + Math.random() * 70;
    const height = 220 + Math.random() * 380;
    const y = 800 - height;

    // Building gradient
    const bGrad = ctx.createLinearGradient(curX, y, curX + width, y + height);
    bGrad.addColorStop(0, '#0c1220');
    bGrad.addColorStop(1, '#05070c');
    ctx.fillStyle = bGrad;
    ctx.fillRect(curX, y, width, height);

    // Glowing warm/cool office windows
    const winCols = Math.floor(width / 8);
    const winRows = Math.floor(height / 14);
    for (let r = 2; r < winRows - 1; r++) {
      for (let c = 1; c < winCols - 1; c++) {
        if (Math.random() > 0.45) {
          const isWarm = Math.random() > 0.35;
          ctx.fillStyle = isWarm
            ? `rgba(255, 220, 140, ${0.4 + Math.random() * 0.5})`
            : `rgba(180, 220, 255, ${0.3 + Math.random() * 0.4})`;
          ctx.fillRect(curX + c * 8, y + r * 14, 4, 6);
        }
      }
    }

    // Top rooftop antenna beacon
    if (Math.random() > 0.6) {
      ctx.fillStyle = '#ff3344';
      ctx.fillRect(curX + width / 2 - 1, y - 12, 2, 12);
      ctx.fillStyle = 'rgba(255, 50, 50, 0.8)';
      ctx.beginPath();
      ctx.arc(curX + width / 2, y - 12, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    curX += width + 10 + Math.random() * 18;
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Procedural Tech Monitor Screen Texture (for workstations)
 */
export function createMonitorTexture(variant = 0) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  // Dark IDE / dashboard background
  ctx.fillStyle = '#0b0e14';
  ctx.fillRect(0, 0, 512, 320);

  // Top header bar
  ctx.fillStyle = '#141822';
  ctx.fillRect(0, 0, 512, 24);
  ctx.fillStyle = '#ff5f56';
  ctx.beginPath(); ctx.arc(14, 12, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#ffbd2e';
  ctx.beginPath(); ctx.arc(28, 12, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#27c93f';
  ctx.beginPath(); ctx.arc(42, 12, 4, 0, Math.PI * 2); ctx.fill();

  if (variant === 0) {
    // Code editor lines
    const colors = ['#00d2ff', '#d4af37', '#98c379', '#c678dd', '#61afef', '#abb2bf'];
    let lineY = 40;
    for (let i = 0; i < 16; i++) {
      const indent = (i % 3 === 0 ? 30 : (i % 4 === 1 ? 55 : 20));
      const segments = 2 + Math.floor(Math.random() * 4);
      let curX = indent;
      for (let s = 0; s < segments; s++) {
        const segLen = 25 + Math.random() * 60;
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(curX, lineY, segLen, 7);
        curX += segLen + 8;
      }
      lineY += 16;
    }
  } else {
    // Analytics & Metrics charts
    ctx.fillStyle = 'rgba(0, 210, 255, 0.2)';
    ctx.fillRect(20, 40, 220, 120);
    ctx.fillStyle = '#00d2ff';
    ctx.font = '10px monospace';
    ctx.fillText('NETWORK TELEMETRY // AI CORE', 28, 56);

    // Chart curve
    ctx.strokeStyle = '#00d2ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 130);
    for (let x = 30; x <= 220; x += 20) {
      ctx.lineTo(x, 80 + Math.sin(x * 0.05) * 35 + (Math.random() - 0.5) * 10);
    }
    ctx.stroke();

    // Secondary panel
    ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
    ctx.fillRect(260, 40, 230, 250);
    ctx.fillStyle = '#d4af37';
    ctx.fillText('SYSTEM STATUS: ONLINE (99.98%)', 270, 60);

    for (let b = 0; b < 6; b++) {
      ctx.fillStyle = '#1a2233';
      ctx.fillRect(270, 80 + b * 26, 210, 14);
      ctx.fillStyle = b % 2 === 0 ? '#00d2ff' : '#d4af37';
      ctx.fillRect(270, 80 + b * 26, 60 + Math.random() * 130, 14);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * Procedural Wall Gracewell Logo Canvas Texture
 */
export function createGracewellWallLogoTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1024, 340);

  // Logo icon: Geometric gold tech prism
  const cx = 512;
  const cy = 90;
  ctx.save();
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 4;
  ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
  ctx.shadowBlur = 15;

  // Diamond shape
  ctx.beginPath();
  ctx.moveTo(cx, cy - 35);
  ctx.lineTo(cx + 35, cy);
  ctx.lineTo(cx, cy + 35);
  ctx.lineTo(cx - 35, cy);
  ctx.closePath();
  ctx.stroke();

  // Inner core
  ctx.fillStyle = '#f5e2a8';
  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Text: GRACEWELL
  ctx.save();
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 52px "Syne", "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '14px';
  ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
  ctx.shadowBlur = 10;
  ctx.fillText('GRACEWELL', cx, 195);

  // Text: TECHNOLOGIES
  ctx.fillStyle = '#d4af37';
  ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
  ctx.letterSpacing = '18px';
  ctx.shadowColor = 'rgba(212, 175, 55, 0.7)';
  ctx.shadowBlur = 8;
  ctx.fillText('TECHNOLOGIES', cx, 245);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

