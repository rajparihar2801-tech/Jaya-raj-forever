/**
 * JAYA VERMA ❤️ RAJKUMAR PARIHAR
 * A Cinematic, Emotional Marriage Proposal Website
 * Full Interactive Engine: Rose Petal & Heart Particle Canvas, Web Audio Romantic Synth,
 * Typewriter Sequence, GSAP Reveals, Celebration Fireworks, and Interactive Modals.
 */

/* ==========================================================================
   1. CENTRAL PROPOSAL CONFIGURATION DATA
   ========================================================================== */
const PROPOSAL_CONFIG = {
  partnerName: "Jaya Verma",
  proposerName: "Rajkumar Parihar",
  heroTypewriterText: "Beta... kya tu meri zindagi ka woh hissa banegi,\njiske bina meri kahaani adhuri hai?",
  secretMessage: "Jaya, sach kahun... tere saath future imagine karna mujhe kisi bhi dream se zyada beautiful lagta hai. ❤️",
  playfulResponse: "Answer toh mujhe pata hi hai... bas tere YES ka wait hai. ❤️"
};

/* ==========================================================================
   2. ROMANTIC AUDIO CONTROLLER ("I Love You" Soundtrack)
   Plays the original song cleanly with zero synthetic piano/oscillator overlays
   ========================================================================== */
class RomanticAudioPlayer {
  constructor() {
    this.audioElement = document.getElementById('proposalAudio');
    this.isPlaying = false;
    this.onStateChange = null;

    if (this.audioElement) {
      // Ensure audio is unmuted and at pleasant volume
      this.audioElement.muted = false;
      try {
        this.audioElement.volume = 0.9;
      } catch (e) {
        // iOS doesn't allow programmatic volume modifications (uses hardware keys)
      }

      // Sync playback state with physical audio playback
      this.audioElement.addEventListener('playing', () => {
        this.isPlaying = true;
        if (typeof this.onStateChange === 'function') {
          this.onStateChange(true);
        }
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        if (typeof this.onStateChange === 'function') {
          this.onStateChange(false);
        }
      });

      this.audioElement.addEventListener('ended', () => {
        this.isPlaying = false;
        if (typeof this.onStateChange === 'function') {
          this.onStateChange(false);
        }
        this.audioElement.currentTime = 0;
        this.play().catch(() => {});
      });

      this.audioElement.addEventListener('error', (e) => {
        console.warn("Audio element encountered error:", e);
        this.isPlaying = false;
        if (typeof this.onStateChange === 'function') {
          this.onStateChange(false);
        }
      });
    }
  }

  playCelebrationChimes() {
    if (this.audioElement && (!this.isPlaying || this.audioElement.paused)) {
      this.play();
    }
  }

  toggle() {
    if (!this.audioElement) return false;
    if (!this.audioElement.paused && this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  play() {
    if (!this.audioElement) return Promise.resolve(false);
    this.audioElement.muted = false;

    // If audio is already active, don't interrupt
    if (!this.audioElement.paused && this.isPlaying) {
      return Promise.resolve(true);
    }

    try {
      if (this.audioElement.readyState === 0) {
        this.audioElement.load();
      }
    } catch (e) {}

    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => {
          this.isPlaying = true;
          if (typeof this.onStateChange === 'function') {
            this.onStateChange(true);
          }
          return true;
        })
        .catch((err) => {
          console.warn("Song play blocked or awaiting gesture:", err);
          this.isPlaying = false;
          if (typeof this.onStateChange === 'function') {
            this.onStateChange(false);
          }
          return false;
        });
    } else {
      this.isPlaying = true;
      if (typeof this.onStateChange === 'function') {
        this.onStateChange(true);
      }
      return Promise.resolve(true);
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (typeof this.onStateChange === 'function') {
      this.onStateChange(false);
    }
  }
}

/* ==========================================================================
   3. AMBIENT PARTICLE ENGINE (Falling Rose Petals & Floating Hearts)
   High performance HTML5 Canvas engine with 3D petal tumble & flutter
   ========================================================================== */
class AmbientParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxPetals = 35;
    this.maxHearts = 15;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Populate rose petals
    for (let i = 0; i < this.maxPetals; i++) {
      this.particles.push(this.createPetal(true));
    }

    // Populate glowing floating hearts
    for (let i = 0; i < this.maxHearts; i++) {
      this.particles.push(this.createHeart(true));
    }

    this.render = this.render.bind(this);
    requestAnimationFrame(this.render);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  createPetal(randomY = false) {
    return {
      type: 'petal',
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -30,
      size: 14 + Math.random() * 16,
      speedY: 0.8 + Math.random() * 1.5,
      speedX: -0.5 + Math.random() * 1,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.015 + Math.random() * 0.02,
      opacity: 0.55 + Math.random() * 0.4,
      hue: Math.random() > 0.4 ? '#bd1544' : '#e11d48'
    };
  }

  createHeart(randomY = false) {
    return {
      type: 'heart',
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + 20,
      size: 10 + Math.random() * 14,
      speedY: -(0.5 + Math.random() * 0.8), // gentle upward float
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.02,
      opacity: 0.25 + Math.random() * 0.4,
      color: Math.random() > 0.5 ? 'rgba(229, 169, 125, ' : 'rgba(225, 29, 72, '
    };
  }

  drawPetal(p) {
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.angle);
    this.ctx.scale(Math.sin(p.flip), 1);
    this.ctx.globalAlpha = p.opacity;

    const grad = this.ctx.createLinearGradient(0, -p.size, 0, p.size);
    grad.addColorStop(0, '#f43f5e');
    grad.addColorStop(0.5, p.hue);
    grad.addColorStop(1, '#500719');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.moveTo(0, -p.size * 0.8);
    this.ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.8, p.size * 0.9, p.size * 0.4, 0, p.size);
    this.ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.4, -p.size * 0.7, -p.size * 0.8, 0, -p.size * 0.8);
    this.ctx.fill();

    this.ctx.restore();
  }

  drawHeart(h) {
    this.ctx.save();
    this.ctx.translate(h.x, h.y);
    this.ctx.globalAlpha = h.opacity;
    this.ctx.fillStyle = h.color + h.opacity + ')';

    const s = h.size / 20;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.bezierCurveTo(-10 * s, -12 * s, -20 * s, 4 * s, 0, 18 * s);
    this.ctx.bezierCurveTo(20 * s, 4 * s, 10 * s, -12 * s, 0, 0);
    this.ctx.fill();
    this.ctx.restore();
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      if (p.type === 'petal') {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.5;
        p.angle += p.angularSpeed;
        p.flip += p.flipSpeed;

        if (p.y > this.height + 40 || p.x < -40 || p.x > this.width + 40) {
          this.particles[i] = this.createPetal(false);
        } else {
          this.drawPetal(p);
        }
      } else if (p.type === 'heart') {
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.6;

        if (p.y < -30) {
          this.particles[i] = this.createHeart(false);
        } else {
          this.drawHeart(p);
        }
      }
    }

    requestAnimationFrame(this.render);
  }
}

/* ==========================================================================
   4. CELEBRATION FIREWORKS & CONFETTI ENGINE
   ========================================================================== */
class CelebrationFireworksEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.active = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  launch() {
    this.resize();
    this.active = true;
    this.particles = [];

    // Trigger canvas-confetti library for instant multi-angle blasts
    if (window.confetti) {
      const duration = 6 * 1000;
      const animationEnd = Date.now() + duration;

      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(confettiInterval);
        }

        const particleCount = 60 * (timeLeft / duration);
        // Left cannon
        window.confetti({
          particleCount,
          startVelocity: 35,
          spread: 70,
          origin: { x: 0.15, y: 0.7 },
          colors: ['#e11d48', '#e5a97d', '#f7dfb9', '#fbbf24', '#ffffff']
        });
        // Right cannon
        window.confetti({
          particleCount,
          startVelocity: 35,
          spread: 70,
          origin: { x: 0.85, y: 0.7 },
          colors: ['#e11d48', '#e5a97d', '#f7dfb9', '#fbbf24', '#ffffff']
        });
      }, 350);

      // Grand heart shower burst
      window.confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        shapes: ['circle'],
        colors: ['#e11d48', '#f43f5e', '#ffd1dc']
      });
    }

    // Custom Canvas Firework Bursts
    for (let burst = 0; burst < 6; burst++) {
      setTimeout(() => {
        const cx = this.width * (0.2 + Math.random() * 0.6);
        const cy = this.height * (0.2 + Math.random() * 0.4);
        this.createBurst(cx, cy);
      }, burst * 600);
    }

    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  createBurst(x, y) {
    const count = 70;
    const colors = ['#f59e0b', '#fbbf24', '#e11d48', '#f43f5e', '#e5a97d', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 2 + Math.random() * 6;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        gravity: 0.08,
        friction: 0.96,
        alpha: 1,
        fade: 0.01 + Math.random() * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3
      });
    }
  }

  loop() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vx *= p.friction;
      p.vy *= p.friction;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= p.fade;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(this.loop);
    }
  }
}

/* ==========================================================================
   5. UI CONTROLLERS & INTERACTION SYSTEM
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Engines
  const audioPlayer = new RomanticAudioPlayer();
  const ambientEngine = new AmbientParticleEngine('ambient-canvas');
  const celebrationEngine = new CelebrationFireworksEngine('celebration-canvas');

  // Spotlight mouse tracker
  const spotlight = document.getElementById('cinematic-spotlight');
  window.addEventListener('mousemove', (e) => {
    if (spotlight) {
      spotlight.style.transform = `translate(${e.clientX - window.innerWidth / 2}px, ${e.clientY - window.innerHeight / 2}px)`;
    }
  });

  // Music Player Toggle Button
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const soundWave = document.getElementById('soundWave');
  const iconPlay = document.querySelector('.icon-play');
  const iconPause = document.querySelector('.icon-pause');
  const musicStatusText = document.getElementById('musicStatusText');

  const updateMusicUI = (playing) => {
    if (playing) {
      soundWave?.classList.add('playing');
      iconPlay?.classList.add('hidden');
      iconPause?.classList.remove('hidden');
      if (musicStatusText) musicStatusText.textContent = "I Love You 🎵";
    } else {
      soundWave?.classList.remove('playing');
      iconPlay?.classList.remove('hidden');
      iconPause?.classList.add('hidden');
      if (musicStatusText) musicStatusText.textContent = "Song Paused";
    }
  };

  // Wire RomanticAudioPlayer state changes directly to the UI
  audioPlayer.onStateChange = (playing) => {
    updateMusicUI(playing);
  };

  musicToggleBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    audioPlayer.toggle();
  });

  /* --------------------------------------------------------------------------
     Guaranteed Mobile & Desktop Audio Curtain Unlock
     -------------------------------------------------------------------------- */
  const audioCurtain = document.getElementById('audioCurtain');
  const curtainEnterBtn = document.getElementById('curtainEnterBtn');

  let curtainUnlocked = false;

  function dismissCurtain() {
    if (audioCurtain && !audioCurtain.classList.contains('dismissed')) {
      audioCurtain.classList.add('dismissed');
      setTimeout(() => {
        audioCurtain.style.display = 'none';
      }, 850);
    }
  }

  function handleCurtainOpen(e) {
    if (curtainUnlocked) return;
    curtainUnlocked = true;

    // Immediately play within the synchronous callstack of the user gesture
    audioPlayer.play();

    // Smoothly animate & hide curtain
    dismissCurtain();

    // Clean up document-level fallback listener
    removeFallback();
  }

  // Fast-path for mobile: touchend fires at the exact moment of tap with no 300ms latency
  curtainEnterBtn?.addEventListener('touchend', (e) => {
    e.stopPropagation();
    handleCurtainOpen(e);
  }, { passive: true });

  curtainEnterBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    handleCurtainOpen(e);
  });

  // Tapping anywhere on the curtain overlay also unlocks & starts
  audioCurtain?.addEventListener('touchend', (e) => {
    if (e.target.closest('#curtainEnterBtn')) return;
    handleCurtainOpen(e);
  }, { passive: true });

  audioCurtain?.addEventListener('click', (e) => {
    if (e.target.closest('#curtainEnterBtn')) return;
    handleCurtainOpen(e);
  });

  // Fallback: If for any reason on a mobile browser the first touch buffered slowly,
  // the next interaction anywhere on the screen seamlessly resumes playback
  function onDocInteraction() {
    if (audioPlayer.audioElement && audioPlayer.audioElement.paused) {
      audioPlayer.play();
    }
  }

  function removeFallback() {
    document.removeEventListener('click', onDocInteraction);
    document.removeEventListener('touchend', onDocInteraction);
  }

  document.addEventListener('click', onDocInteraction, { once: true });
  document.addEventListener('touchend', onDocInteraction, { once: true, passive: true });

  /* --------------------------------------------------------------------------
     Hero Section Typewriter Animation
     -------------------------------------------------------------------------- */
  const typewriterTextElem = document.getElementById('typewriterText');
  const textToType = PROPOSAL_CONFIG.heroTypewriterText;
  let charIdx = 0;

  function typeWriter() {
    if (charIdx < textToType.length) {
      const char = textToType.charAt(charIdx);
      if (char === '\n') {
        typewriterTextElem.innerHTML += '<br>';
      } else {
        typewriterTextElem.innerHTML += char;
      }
      charIdx++;
      const delay = (char === '.' || char === '?') ? 350 : 35 + Math.random() * 25;
      setTimeout(typeWriter, delay);
    }
  }
  // Start typewriter shortly after load
  setTimeout(typeWriter, 1200);

  /* --------------------------------------------------------------------------
     Timeline Progress Scroll Tracker
     -------------------------------------------------------------------------- */
  const timelineSection = document.getElementById('story');
  const progressBar = document.getElementById('timelineProgressBar');

  window.addEventListener('scroll', () => {
    if (!timelineSection || !progressBar) return;
    const rect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const totalDist = rect.height;
      const currentProgress = Math.min(Math.max((windowHeight - rect.top) / totalDist, 0), 1);
      progressBar.style.height = `${currentProgress * 100}%`;
    }
  });

  /* --------------------------------------------------------------------------
     Quotes Carousel Deck
     -------------------------------------------------------------------------- */
  const quoteCards = Array.from(document.querySelectorAll('.quote-card'));
  const quoteDotsContainer = document.getElementById('quoteDots');
  const quotePrevBtn = document.getElementById('quotePrevBtn');
  const quoteNextBtn = document.getElementById('quoteNextBtn');
  let currentQuoteIndex = 0;
  let quoteAutoPlayTimer = null;

  // Build dots
  quoteCards.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('quote-dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => switchQuote(idx));
    quoteDotsContainer?.appendChild(dot);
  });

  function switchQuote(newIdx) {
    quoteCards[currentQuoteIndex]?.classList.remove('active');
    const dots = document.querySelectorAll('.quote-dot');
    dots[currentQuoteIndex]?.classList.remove('active');

    currentQuoteIndex = (newIdx + quoteCards.length) % quoteCards.length;

    quoteCards[currentQuoteIndex]?.classList.add('active');
    dots[currentQuoteIndex]?.classList.add('active');
  }

  quoteNextBtn?.addEventListener('click', () => {
    switchQuote(currentQuoteIndex + 1);
    resetQuoteTimer();
  });

  quotePrevBtn?.addEventListener('click', () => {
    switchQuote(currentQuoteIndex - 1);
    resetQuoteTimer();
  });

  function resetQuoteTimer() {
    if (quoteAutoPlayTimer) clearInterval(quoteAutoPlayTimer);
    quoteAutoPlayTimer = setInterval(() => {
      switchQuote(currentQuoteIndex + 1);
    }, 7500);
  }
  resetQuoteTimer();

  /* --------------------------------------------------------------------------
     Playful Interactivity: Secret Modal & Witty Toast
     -------------------------------------------------------------------------- */
  const secretBtn = document.getElementById('secretMessageBtn');
  const secretModal = document.getElementById('secretModal');
  const closeSecretBtn = document.getElementById('closeSecretModalBtn');

  secretBtn?.addEventListener('click', () => {
    if (secretModal) {
      secretModal.showModal();
      // Mini celebratory sparkle
      if (window.confetti) {
        window.confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
      }
    }
  });

  closeSecretBtn?.addEventListener('click', () => {
    secretModal?.close();
  });

  // Light dismiss on backdrop click
  secretModal?.addEventListener('click', (e) => {
    const rect = secretModal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      secretModal.close();
    }
  });

  const thinkAgainBtn = document.getElementById('thinkAgainBtn');
  const romanticToast = document.getElementById('romanticToast');
  let toastTimeout = null;

  thinkAgainBtn?.addEventListener('click', () => {
    if (romanticToast) {
      romanticToast.classList.add('show');
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        romanticToast.classList.remove('show');
      }, 5000);
    }
  });

  /* --------------------------------------------------------------------------
     THE PROPOSAL & YES BUTTON CELEBRATION
     -------------------------------------------------------------------------- */
  const yesBtn = document.getElementById('yesBtn');
  const celebrationOverlay = document.getElementById('celebrationOverlay');
  const continueToLetterBtn = document.getElementById('continueToLetterBtn');
  const replayCelebrationBtn = document.getElementById('replayCelebrationBtn');
  const downloadKeepsakeBtn = document.getElementById('downloadKeepsakeBtn');

  // YES button hover micro-interaction
  yesBtn?.addEventListener('mouseenter', () => {
    yesBtn.style.transform = 'scale(1.12)';
  });
  yesBtn?.addEventListener('mouseleave', () => {
    yesBtn.style.transform = '';
  });

  // YES Button Click Handler
  yesBtn?.addEventListener('click', () => {
    // 1. Play musical chimes & fanfare
    audioPlayer.playCelebrationChimes();

    // 2. Launch spectacular fireworks & confetti
    celebrationEngine.launch();

    // 3. Show Celebration Overlay with grand styling
    setTimeout(() => {
      celebrationOverlay?.classList.add('active');
    }, 400);
  });

  // Continue to Love Letter
  continueToLetterBtn?.addEventListener('click', () => {
    celebrationOverlay?.classList.remove('active');
    const letterSection = document.getElementById('loveLetterSection');
    if (letterSection) {
      letterSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Replay Celebration Button
  replayCelebrationBtn?.addEventListener('click', () => {
    audioPlayer.playCelebrationChimes();
    celebrationEngine.launch();
    celebrationOverlay?.classList.add('active');
  });

  // Keepsake Certificate / Love Letter Print & Save
  downloadKeepsakeBtn?.addEventListener('click', () => {
    window.print();
    setTimeout(() => {
      triggerHugKissModal();
    }, 1000);
  });

  /* --------------------------------------------------------------------------
     Dedicated Hug & Long Kiss Modal Interactivity
     -------------------------------------------------------------------------- */
  const hugKissModal = document.getElementById('hugKissModal');
  const openHugKissBtn = document.getElementById('openHugKissBtn');
  const closeHugKissModalBtn = document.getElementById('closeHugKissModalBtn');
  let hasAutoShownHugKiss = false;

  function triggerHugKissModal() {
    if (hugKissModal && !hugKissModal.open) {
      hugKissModal.showModal();
      celebrationEngine.launch();
      if (window.confetti) {
        window.confetti({ particleCount: 60, spread: 80, origin: { y: 0.55 } });
      }
    }
  }

  openHugKissBtn?.addEventListener('click', () => {
    triggerHugKissModal();
  });

  closeHugKissModalBtn?.addEventListener('click', () => {
    hugKissModal?.close();
  });

  hugKissModal?.addEventListener('click', (e) => {
    const rect = hugKissModal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      hugKissModal.close();
    }
  });

  // Automatically trigger the "Hug & Long Kiss" popup after reading the letter
  const letterSig = document.querySelector('.letter-signature');
  if (letterSig && 'IntersectionObserver' in window) {
    const sigObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAutoShownHugKiss) {
          hasAutoShownHugKiss = true;
          setTimeout(() => {
            triggerHugKissModal();
          }, 1800);
        }
      });
    }, { threshold: 0.6 });
    sigObserver.observe(letterSig);
  }

  /* --------------------------------------------------------------------------
     GSAP ScrollTrigger Reveals (with pure JS fallback)
     -------------------------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered reveals for timeline cards
    gsap.utils.toArray('.timeline-item').forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 95%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'opacity,transform'
      });
    });

    // Staggered reveals for meaning cards (Immediate responsive reveal)
    gsap.from('.meaning-card', {
      scrollTrigger: {
        trigger: '.meaning-grid',
        start: 'top 95%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 25,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'opacity,transform'
    });

    // Staggered reveals for why cards
    gsap.from('.reason-card', {
      scrollTrigger: {
        trigger: '.reasons-grid',
        start: 'top 95%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 25,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'opacity,transform'
    });

    // Dramatic entrance for Proposal Section Elements
    const proposalTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#proposal',
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    proposalTL
      .from('#ringBox', { scale: 0.5, opacity: 0, duration: 1, ease: 'back.out(1.7)', clearProps: 'all' })
      .from('#pLine1', { opacity: 0, y: 15, duration: 0.5, clearProps: 'all' }, '-=0.3')
      .from('#pLine2', { opacity: 0, y: 15, duration: 0.5, clearProps: 'all' })
      .from('.kw-tag', { opacity: 0, scale: 0.85, stagger: 0.12, duration: 0.4, clearProps: 'all' }, '-=0.2')
      .from('#pLine3', { opacity: 0, y: 15, duration: 0.5, clearProps: 'all' })
      .from('#pLine4', { opacity: 0, y: 15, duration: 0.5, clearProps: 'all' })
      .from('#pLineStandout', { opacity: 0, scale: 0.75, duration: 0.8, ease: 'power3.out', clearProps: 'all' })
      .from('#pLineName', { opacity: 0, y: 15, duration: 0.5, clearProps: 'all' })
      .from('#grandQuestion', { opacity: 0, scale: 0.85, duration: 0.9, ease: 'elastic.out(1, 0.75)', clearProps: 'all' })
      .from('#decisionArea', { opacity: 0, y: 25, duration: 0.7, ease: 'back.out(2)', clearProps: 'all' }, '-=0.3');

    // Childhood cards reveal
    gsap.from('.childhood-card', {
      scrollTrigger: {
        trigger: '.childhood-destiny-box',
        start: 'top 95%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.9,
      y: 30,
      stagger: 0.2,
      duration: 0.8,
      ease: 'back.out(1.5)',
      clearProps: 'opacity,transform'
    });

    // Refresh ScrollTrigger as images load to ensure no coordinate drift
    window.addEventListener('load', () => ScrollTrigger.refresh());
    document.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', () => ScrollTrigger.refresh());
      }
    });

    // Safety fallback: after 1.2s guarantee all cards are 100% visible
    setTimeout(() => {
      document.querySelectorAll('.meaning-card, .reason-card, .timeline-item, .childhood-card').forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
      });
      ScrollTrigger.refresh();
    }, 1200);
  } else {
    // Pure CSS / IntersectionObserver fallback if CDN is slow or offline
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.timeline-card, .meaning-card, .reason-card, .proposal-lines-box, .childhood-card').forEach(el => {
      observer.observe(el);
    });
  }

  // Interactive 3D Card Tilt Movement for memory photos
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Romantic Hero Couple Locket Micro-Interaction: Heart & Sparkle Shower on Tap
  const heroLocket = document.getElementById('heroCoupleLocket');
  if (heroLocket) {
    heroLocket.addEventListener('click', (e) => {
      const rect = heroLocket.getBoundingClientRect();
      const emojis = ['❤️', '💖', '✨', '🌹', '🥰', '💕'];
      for (let i = 0; i < 8; i++) {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.position = 'fixed';
        span.style.left = `${rect.left + rect.width / 2 + (Math.random() * 60 - 30)}px`;
        span.style.top = `${rect.top + rect.height / 2 + (Math.random() * 40 - 20)}px`;
        span.style.fontSize = `${Math.random() * 10 + 22}px`;
        span.style.pointerEvents = 'none';
        span.style.zIndex = '9999';
        span.style.transition = 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)';
        span.style.transform = 'scale(0.4)';
        span.style.opacity = '1';
        document.body.appendChild(span);

        requestAnimationFrame(() => {
          const offsetX = (Math.random() - 0.5) * 140;
          const offsetY = -(Math.random() * 90 + 60);
          span.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.3) rotate(${Math.random() * 40 - 20}deg)`;
          span.style.opacity = '0';
        });

        setTimeout(() => span.remove(), 1200);
      }
    });
  }
});
