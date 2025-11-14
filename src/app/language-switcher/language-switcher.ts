import { Component, inject } from '@angular/core';
import { TranslationService, Language } from '../services/translation.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.scss',
})
export class LanguageSwitcher {
  translationService = inject(TranslationService);

  get currentLanguage() {
    return this.translationService.getLanguage();
  }

  switchLanguage(lang: Language) {
    this.translationService.setLanguage(lang);
  }
}
