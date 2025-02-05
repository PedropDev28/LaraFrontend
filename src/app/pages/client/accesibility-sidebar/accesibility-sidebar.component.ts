import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accessibility-sidebar',
  standalone: true,
  templateUrl: './accesibility-sidebar.component.html',
  styleUrls: ['./accesibility-sidebar.component.css']
})
export class AccessibilitySidebarComponent {
  fontSize: number = 16;
  contrast: string = 'normal';
  colorBlindMode: string = 'none';
  motionReduced: boolean = false;
  dyslexiaFont: boolean = false;
  screenReaderOptimized: boolean = false;
  keyboardNavigation: boolean = false;
  textToSpeechEnabled: boolean = false;
  signLanguageEnabled: boolean = false;
  @Input() isOpen: boolean = false;
  increaseFontSize() {
    if (this.fontSize < 24) {
      this.fontSize += 2;
      document.documentElement.style.fontSize = `${this.fontSize}px`;
    }
  }

  decreaseFontSize() {
    if (this.fontSize > 12) {
      this.fontSize -= 2;
      document.documentElement.style.fontSize = `${this.fontSize}px`;
    }
  }

  setContrast(mode: string) {
    this.contrast = mode;
    document.body.className = mode;
  }

  setColorBlindMode(mode: string) {
    this.colorBlindMode = mode;
    document.body.setAttribute('data-color-blind-mode', mode);
  }

  toggleMotionReduced() {
    this.motionReduced = !this.motionReduced;
    document.body.classList.toggle('reduce-motion', this.motionReduced);
  }

  toggleDyslexiaFont() {
    this.dyslexiaFont = !this.dyslexiaFont;
    document.body.classList.toggle('dyslexia-friendly', this.dyslexiaFont);
  }

  toggleScreenReaderOptimized() {
    this.screenReaderOptimized = !this.screenReaderOptimized;
    document.body.classList.toggle('screen-reader-optimized', this.screenReaderOptimized);
  }

  toggleKeyboardNavigation() {
    this.keyboardNavigation = !this.keyboardNavigation;
    document.body.classList.toggle('keyboard-navigation', this.keyboardNavigation);
  }

  toggleTextToSpeech() {
    this.textToSpeechEnabled = !this.textToSpeechEnabled;
    // Implementar lógica de texto a voz
  }

  toggleSignLanguage() {
    this.signLanguageEnabled = !this.signLanguageEnabled;
    // Implementar lógica para mostrar/ocultar intérprete de lenguaje de señas
  }
}