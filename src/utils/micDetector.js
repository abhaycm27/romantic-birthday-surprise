// Microphone Blow Sound Detector using Web Audio API

export class MicDetector {
  constructor(onBlowDetected) {
    this.onBlowDetected = onBlowDetected;
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.javascriptNode = null;
    this.isListening = false;
    this.threshold = 45; // Blow intensity threshold
  }

  async start() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx();
      
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;

      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.javascriptNode = this.audioContext.createScriptProcessor(2048, 1, 1);

      this.microphone.connect(this.analyser);
      this.analyser.connect(this.javascriptNode);
      this.javascriptNode.connect(this.audioContext.destination);

      this.isListening = true;

      this.javascriptNode.onaudioprocess = () => {
        if (!this.isListening) return;

        const array = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(array);

        // Average low-frequency energy (wind blowing sound)
        let values = 0;
        const length = array.length;
        for (let i = 0; i < 20; i++) { // low frequency bins
          values += array[i];
        }
        const average = values / 20;

        if (average > this.threshold) {
          if (this.onBlowDetected) {
            this.onBlowDetected(average);
          }
        }
      };

      return true;
    } catch (err) {
      console.warn("Microphone access not granted or unavailable:", err);
      return false;
    }
  }

  stop() {
    this.isListening = false;
    if (this.javascriptNode) {
      this.javascriptNode.onaudioprocess = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
