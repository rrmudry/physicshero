// Interactive Physics Background (Particle & Gravitational Field)
(function () {
  const canvas = document.getElementById('physicsCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 65;

  let mouse = {
    x: null,
    y: null,
    radius: 120,
    isDown: false
  };

  function resize() {
    width = canvas.parentElement.clientWidth;
    height = canvas.parentElement.clientHeight;
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.baseRadius = Math.random() * 2 + 1.5;
      this.radius = this.baseRadius;
      this.charge = Math.random() > 0.4 ? 1 : -1;
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
      // Mouse interaction (gravity / electric field)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && dist > 5) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dir = mouse.isDown ? 1.5 : (this.charge > 0 ? 0.8 : -0.6);
          this.vx += (dx / dist) * force * 0.4 * dir;
          this.vy += (dy / dist) * force * 0.4 * dir;
        }
      }

      // Drag / air resistance
      this.vx *= 0.985;
      this.vy *= 0.985;

      this.x += this.vx;
      this.y += this.vy;

      // Wrap-around screen bounds
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.charge > 0 
        ? `rgba(0, 240, 255, ${this.alpha})` 
        : `rgba(168, 85, 247, ${this.alpha})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const maxDist = 95;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw mouse field aura if hovered
    if (mouse.x !== null && mouse.y !== null) {
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 5, mouse.x, mouse.y, mouse.radius);
      gradient.addColorStop(0, mouse.isDown ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 240, 255, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
    mouse.isDown = false;
  });

  canvas.addEventListener('mousedown', () => {
    mouse.isDown = true;
  });

  window.addEventListener('mouseup', () => {
    mouse.isDown = false;
  });

  // Init
  resize();
  initParticles();
  animate();
})();
