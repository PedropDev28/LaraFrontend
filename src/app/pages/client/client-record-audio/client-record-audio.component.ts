import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-client-record-audio',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './client-record-audio.component.html',
  styleUrl: './client-record-audio.component.css'
})
export class ClientRecordAudioComponent {
  phraseControl = new FormControl("")
  isRecording = false
  audioURL: string | null = null
  recordingTime = 0
  mediaRecorder: MediaRecorder | null = null
  audioChunks: Blob[] = []
  timerInterval: any
  stream: MediaStream | null = null
  analyser: AnalyserNode | null = null
  audioContext: AudioContext | null = null
  dataArray: Uint8Array | null = null
  animationFrame: number | null = null

  async ngOnInit() {
    try {
      this.audioContext = new AudioContext()
    } catch (err) {
      console.error("Error creating AudioContext:", err)
    }
  }

  ngOnDestroy() {
    this.stopRecording()
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop())
    }
  }

  async toggleRecording() {
    if (!this.isRecording) {
      await this.startRecording()
    } else {
      this.stopRecording()
    }
  }

  private async startRecording() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      this.setupAudioAnalyser()

      this.mediaRecorder = new MediaRecorder(this.stream)
      this.audioChunks = []

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data)
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" })
        this.audioURL = URL.createObjectURL(audioBlob)
      }

      this.mediaRecorder.start()
      this.isRecording = true
      this.startTimer()
      this.drawWaveform()
    } catch (err) {
      console.error("Error accessing microphone:", err)
    }
  }

  private setupAudioAnalyser() {
    if (!this.stream || !this.audioContext) return

    this.analyser = this.audioContext.createAnalyser()
    this.analyser.fftSize = 256

    const source = this.audioContext.createMediaStreamSource(this.stream)
    source.connect(this.analyser)

    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
  }

  private drawWaveform() {
    if (!this.analyser || !this.dataArray) return

    const canvas = document.getElementById("waveform") as HTMLCanvasElement
    if (!canvas) return

    const canvasCtx = canvas.getContext("2d")
    if (!canvasCtx) return

    const draw = () => {
      if (!this.isRecording) return

      this.animationFrame = requestAnimationFrame(draw)

      const WIDTH = canvas.width
      const HEIGHT = canvas.height

      this.analyser!.getByteTimeDomainData(this.dataArray!)

      canvasCtx.fillStyle = "rgb(200, 200, 200)"
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
      canvasCtx.lineWidth = 2
      canvasCtx.strokeStyle = "rgb(0, 123, 255)"
      canvasCtx.beginPath()

      const sliceWidth = WIDTH / this.dataArray!.length
      let x = 0

      for (let i = 0; i < this.dataArray!.length; i++) {
        const v = this.dataArray![i] / 128.0
        const y = (v * HEIGHT) / 2

        if (i === 0) {
          canvasCtx.moveTo(x, y)
        } else {
          canvasCtx.lineTo(x, y)
        }

        x += sliceWidth
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2)
      canvasCtx.stroke()
    }

    draw()
  }

  private stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop()
      this.stream?.getTracks().forEach((track) => track.stop())
      this.isRecording = false
      this.stopTimer()
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
      }
    }
  }

  private startTimer() {
    this.recordingTime = 0
    this.timerInterval = setInterval(() => {
      this.recordingTime++
    }, 1000)
  }

  private stopTimer() {
    clearInterval(this.timerInterval)
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  async playAudio() {
    if (this.audioURL) {
      const audio = new Audio(this.audioURL)
      await audio.play()
    }
  }

  deleteRecording() {
    if (this.audioURL) {
      URL.revokeObjectURL(this.audioURL)
      this.audioURL = null
    }
  }
}
