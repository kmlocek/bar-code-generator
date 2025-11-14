import { Injectable, signal } from '@angular/core';

export type Language = 'pl' | 'en';

interface Translations {
  [key: string]: {
    pl: string;
    en: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = signal<Language>('pl');

  private translations: Translations = {
    // Header
    'app.title': {
      pl: 'Generator Etykiet Kodów Kreskowych',
      en: 'Barcode Label Generator'
    },
    'app.description': {
      pl: 'Skonfiguruj etykiety w trybie Podstawowym lub Zaawansowanym.',
      en: 'Configure your barcode labels in Basic or Advanced mode.'
    },
    
    // Mode Toggle
    'mode.basic': {
      pl: 'Podstawowy',
      en: 'Basic'
    },
    'mode.advanced': {
      pl: 'Zaawansowany',
      en: 'Advanced'
    },
    
    // Basic Mode
    'basic.codeLength': {
      pl: 'Długość Kodu',
      en: 'Code Length'
    },
    'basic.codeLengthSubtitle': {
      pl: 'Całkowita długość każdego kodu kreskowego (w tym prefiks i cyfry)',
      en: 'Total length of each barcode (including prefix and child digits)'
    },
    'basic.prefixStrategy': {
      pl: 'Strategia Prefiksu',
      en: 'Prefix Strategy'
    },
    'basic.prefixStrategySubtitle': {
      pl: 'Jak generować prefiks dla wszystkich kodów',
      en: 'How to generate the prefix for all codes'
    },
    'basic.prefixDate': {
      pl: 'Aktualna Data (format RRMMDD)',
      en: 'Current Date (YYMMDD format)'
    },
    'basic.prefixStatic': {
      pl: 'Numer Statyczny',
      en: 'Static Number'
    },
    'basic.exampleLabel': {
      pl: 'Przykład:',
      en: 'Example:'
    },
    'basic.exampleDate': {
      pl: 'Dzisiejsza data ({{ date }}) będzie użyta jako prefiks',
      en: "Today's date ({{ date }}) will be used as prefix"
    },
    'basic.exampleStatic': {
      pl: 'Twój numer statyczny będzie użyty jako prefiks',
      en: 'Your static number will be used as prefix'
    },
    'basic.startOffset': {
      pl: 'Offset Startowy',
      en: 'Start Offset'
    },
    'basic.startOffsetSubtitle': {
      pl: 'Początkowy numer licznika (domyślnie 0)',
      en: 'Starting counter number (default is 0)'
    },
    'basic.offsetExample1': {
      pl: 'Offset 0: Pierwsza grupa zaczyna się od ...00, ...01, ...02...',
      en: 'Offset 0: First group starts at ...00, ...01, ...02...'
    },
    'basic.offsetExample2': {
      pl: 'Offset 5: Pierwsza grupa zaczyna się od ...50, ...51, ...52...',
      en: 'Offset 5: First group starts at ...50, ...51, ...52...'
    },
    'basic.countFives': {
      pl: 'Liczba 5-tek',
      en: 'Count of 5s'
    },
    'basic.countFivesSubtitle': {
      pl: 'Liczba grup (po 5 etykiet: matka 0 + dzieci 1-4)',
      en: 'Number of groups (5 labels each: mother 0 + children 1-4)'
    },
    'basic.countTens': {
      pl: 'Liczba 10-tek',
      en: 'Count of 10s'
    },
    'basic.countTensSubtitle': {
      pl: 'Liczba grup (po 10 etykiet: matka 0 + dzieci 1-9)',
      en: 'Number of groups (10 labels each: mother 0 + children 1-9)'
    },
    'basic.previewTitle': {
      pl: 'Podgląd Wyniku:',
      en: 'Result Preview:'
    },
    'basic.totalLabels': {
      pl: 'Łączna liczba etykiet: {{ count }}',
      en: 'Total labels: {{ count }}'
    },
    'basic.exampleCodes': {
      pl: 'Przykładowe kody (prefiks={{ prefix }}, długość={{ length }}, offset={{ offset }}):',
      en: 'Example codes (prefix={{ prefix }}, length={{ length }}, offset={{ offset }}):'
    },
    'basic.firstFivesGroup': {
      pl: 'Pierwsza grupa 5-tek:',
      en: 'First 5s group:'
    },
    'basic.firstTensGroup': {
      pl: 'Pierwsza grupa 10-tek:',
      en: 'First 10s group:'
    },
    
    // Advanced Mode
    'advanced.regularLabels': {
      pl: 'Zwykłe Etykiety',
      en: 'Regular Labels'
    },
    'advanced.regularLabelsSubtitle': {
      pl: 'Pojedyncze numery etykiet',
      en: 'Individual label numbers'
    },
    'advanced.examples': {
      pl: 'Przykłady:',
      en: 'Examples:'
    },
    'advanced.exampleComma': {
      pl: 'Rozdzielone przecinkami',
      en: 'Comma separated'
    },
    'advanced.exampleRange': {
      pl: 'Notacja zakresu',
      en: 'Range notation'
    },
    'advanced.fivesTitle': {
      pl: '5-tki - Matka + 4 Dzieci',
      en: '5s - Mother + 4 Children'
    },
    'advanced.fivesSubtitle': {
      pl: 'Dodaje 0-4 do numerów bazowych',
      en: 'Appends 0-4 to base numbers'
    },
    'advanced.fivesExample1': {
      pl: '→ generuje 1000, 1001, 1002, 1003, 1004',
      en: '→ generates 1000, 1001, 1002, 1003, 1004'
    },
    'advanced.fivesExample2': {
      pl: '→ generuje 7008440080, 7008440081, 7008440082, 7008440083, 7008440084',
      en: '→ generates 7008440080, 7008440081, 7008440082, 7008440083, 7008440084'
    },
    'advanced.multipleBase': {
      pl: 'Wiele numerów bazowych',
      en: 'Multiple base numbers'
    },
    'advanced.rangeBase': {
      pl: 'Zakres numerów bazowych',
      en: 'Range of base numbers'
    },
    'advanced.tensTitle': {
      pl: '10-tki - Matka + 9 Dzieci',
      en: '10s - Mother + 9 Children'
    },
    'advanced.tensSubtitle': {
      pl: 'Dodaje 0-9 do numerów bazowych',
      en: 'Appends 0-9 to base numbers'
    },
    'advanced.tensExample1': {
      pl: '→ generuje 1000, 1001, 1002, ..., 1009',
      en: '→ generates 1000, 1001, 1002, ..., 1009'
    },
    'advanced.tensExample2': {
      pl: '→ generuje 7008440080 do 7008440089',
      en: '→ generates 7008440080 through 7008440089'
    },
    'advanced.rangeGenerates': {
      pl: 'Zakres generuje wszystkie sekwencje',
      en: 'Range generates all sequences'
    },
    
    // Buttons
    'button.generate': {
      pl: 'Generuj Etykiety',
      en: 'Generate Labels'
    },
    'button.backToConfig': {
      pl: '← Powrót do Konfiguracji',
      en: '← Back to Config'
    }
  };

  getLanguage() {
    return this.currentLanguage();
  }

  setLanguage(lang: Language) {
    this.currentLanguage.set(lang);
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    let text = translation[this.currentLanguage()];
    
    // Replace parameters
    if (params) {
      Object.keys(params).forEach(param => {
        text = text.replace(`{{ ${param} }}`, String(params[param]));
      });
    }

    return text;
  }

  t(key: string, params?: Record<string, string | number>): string {
    return this.translate(key, params);
  }
}
