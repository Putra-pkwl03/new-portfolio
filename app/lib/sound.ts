// utils/sound.ts

class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientAudio: HTMLAudioElement | null = null;
  private isAmbientPlaying: boolean = false; // Menyimpan status apakah musik ambient aktif

  constructor() {
    if (typeof window !== "undefined") {
      this.setupVisibilityListener();
    }
  }

  // Listener untuk mendeteksi perpindahan tab
  private setupVisibilityListener() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // Hentikan sementara musik saat tab tidak aktif
        if (this.ambientAudio && !this.ambientAudio.paused) {
          this.ambientAudio.pause();
        }
      } else {
        // Lanjutkan musik hanya jika sebelumnya user memang mengaktifkan ambient
        if (this.isAmbientPlaying && this.ambientAudio && this.ambientAudio.paused) {
          this.ambientAudio.play().catch(() => {});
        }
      }
    });
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  // Effect SFX: Click Button (Volume 0.15)
  playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }

  // Effect SFX: Hover (Volume 0.05)
  playHover() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Ignore
    }
  }

  // Effect SFX: Portal / Transition (Volume 0.2)
  playOpenPortal() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Ignore
    }
  }

  // MULAI SUARA BACKGROUND
  startAmbient() {
    try {
      if (typeof window === "undefined") return;

      if (!this.ambientAudio) {
        this.ambientAudio = new Audio("/ambient.mp3");
        this.ambientAudio.loop = true;
      }

      this.ambientAudio.volume = 0.03;
      this.isAmbientPlaying = true; // Tandai bahwa pengguna ingin memutar musik

      // Hanya putar jika tab sedang dibuka/fokus
      if (!document.hidden && this.ambientAudio.paused) {
        const playPromise = this.ambientAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay blocked by browser
          });
        }
      }
    } catch {
      // Ignore
    }
  }

  // HENTIKAN SUARA BACKGROUND MP3
  stopAmbient() {
    try {
      this.isAmbientPlaying = false; // Matikan status bermain
      if (this.ambientAudio && !this.ambientAudio.paused) {
        this.ambientAudio.pause();
        this.ambientAudio.currentTime = 0;
      }
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundManager();