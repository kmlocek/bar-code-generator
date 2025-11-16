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
      pl: 'Całkowita długość każdego kodu kreskowego. Długość już uwzględnia cyfrę matki (0) i dzieci (1-9). Dłuższe kody ułatwiają utrzymanie unikalności.',
      en: 'Total length of each barcode. The length already includes the mother (0) and children (1-9) digit. Longer codes make it easier to maintain uniqueness.'
    },
    'basic.prefixStrategy': {
      pl: 'Strategia Prefiksu',
      en: 'Prefix Strategy'
    },
    'basic.prefixStrategySubtitle': {
      pl: 'Jak generować prefiks dla wszystkich kodów. Strategia daty zapewnia unikalność kodów drukowanych w różnych dniach dzięki zmiennemu prefiksowi. Numer statyczny pozwala na ręczne ustawienie prefiksu.',
      en: 'How to generate the prefix for all codes. Date strategy ensures uniqueness when printing on different days through changing prefix. Static number allows manual prefix setting.'
    },
    'basic.prefixDate': {
      pl: 'Aktualna Data (format RRMMDD)',
      en: 'Current Date (YYMMDD format)'
    },
    'basic.prefixStatic': {
      pl: 'Numer Statyczny',
      en: 'Static Number'
    },
    'basic.descriptionLabel': {
      pl: 'Opis:',
      en: 'Description:'
    },
    'basic.exampleLabel': {
      pl: 'Przykład:',
      en: 'Example:'
    },
    'basic.exampleDate': {
      pl: 'Dzisiejsza data ({{ date }}) będzie użyta jako prefiks → {{ code }}',
      en: "Today's date ({{ date }}) will be used as prefix → {{ code }}"
    },
    'basic.exampleStatic': {
      pl: 'Twój numer statyczny będzie użyty jako prefiks → {{ code }}',
      en: 'Your static number will be used as prefix → {{ code }}'
    },
    'basic.startOffset': {
      pl: 'Offset Startowy',
      en: 'Start Offset'
    },
    'basic.startOffsetSubtitle': {
      pl: 'Offset służy do drukowania kolejnych kodów, gdy kody z tym samym prefiksem zostały już dziś wydrukowane. Wystarczy wpisać numer ostatniego wydrukowanego kodu lub wyższy, aby generowanie rozpoczęło się od tej wartości.',
      en: 'Offset is used to print subsequent codes when codes with the same prefix were already printed today. Enter the last printed code number or higher to start generation from that value.'
    },
    'basic.offsetExampleDynamic': {
      pl: 'Twój offset ({{ offset }}) → {{ code }}',
      en: 'Your offset ({{ offset }}) → {{ code }}'
    },
    'basic.groupCountsTitle': {
      pl: 'Grupy Etykiet',
      en: 'Label Groups'
    },
    'basic.groupCountsSubtitle': {
      pl: 'Określ liczbę grup dla każdego rozmiaru. Każda grupa zawiera matkę (0) i dzieci.',
      en: 'Specify the number of groups for each size. Each group contains mother (0) and children.'
    },
    'basic.groupCountsHint': {
      pl: 'Każda grupa generuje etykiety z matką (końcówka 0) i dziećmi (kolejne cyfry). Na przykład: grupa 5-tek tworzy etykiety z końcówkami 0, 1, 2, 3, 4. Możesz łączyć różne rozmiary grup - zostaną wygenerowane w kolejności 4s → 5s → 6s → 7s → 8s → 10s.\n\nWażne: Jeśli planujesz wycinać pojedyncze wiersze z wydruku, wybieraj grupy podzielne przez liczbę kolumn (np. 5-ki lub 10-ki przy 5 kolumnach). Używanie grup niepodzielnych przez liczbę kolumn spowoduje, że etykiety będą rozdzielone między wiersze - np. przy grupach 6-tek i 5 kolumnach, ostatnia etykieta z grupy znajdzie się w nowym wierszu, a z następnej grupy już dwie etykiety przejdą do kolejnego wiersza.\n\nGrupy podzielne przez liczbę kolumn są wyróżnione pogrubioną czcionką i zielonym kolorem.',
      en: 'Each group generates labels with a mother (ending 0) and children (sequential digits). For example: a group of 5s creates labels ending with 0, 1, 2, 3, 4. You can mix different group sizes - they will be generated in order 4s → 5s → 6s → 7s → 8s → 10s.\n\nImportant: If you plan to cut individual rows from the printout, choose groups divisible by the number of columns (e.g., 5s or 10s with 5 columns). Using groups not divisible by the column count will cause labels to split across rows - for example, with 6s groups and 5 columns, the last label from a group will end up on a new row, and from the next group, two labels will already be on the following row.\n\nGroups divisible by the number of columns are highlighted in bold and green.'
    },
    'basic.countFours': {
      pl: '4-ki (0-3)',
      en: '4s (0-3)'
    },
    'basic.countFives': {
      pl: '5-ki (0-4)',
      en: '5s (0-4)'
    },
    'basic.countSixes': {
      pl: '6-ki (0-5)',
      en: '6s (0-5)'
    },
    'basic.countSevens': {
      pl: '7-ki (0-6)',
      en: '7s (0-6)'
    },
    'basic.countEights': {
      pl: '8-ki (0-7)',
      en: '8s (0-7)'
    },
    'basic.countTens': {
      pl: '10-ki (0-9)',
      en: '10s (0-9)'
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
    },
    
    // UI Preferences
    'ui.showHints': {
      pl: 'Pokaż podpowiedzi',
      en: 'Show hints'
    },
    
    // Page Configuration
    'page.title': {
      pl: 'Konfiguracja Strony i Etykiet',
      en: 'Page and Label Configuration'
    },
    'page.paddingTop': {
      pl: 'Margines górny (mm)',
      en: 'Top padding (mm)'
    },
    'page.paddingBottom': {
      pl: 'Margines dolny (mm)',
      en: 'Bottom padding (mm)'
    },
    'page.paddingLeft': {
      pl: 'Margines lewy (mm)',
      en: 'Left padding (mm)'
    },
    'page.paddingRight': {
      pl: 'Margines prawy (mm)',
      en: 'Right padding (mm)'
    },
    'page.columns': {
      pl: 'Liczba kolumn',
      en: 'Number of columns'
    },
    'page.rows': {
      pl: 'Liczba wierszy',
      en: 'Number of rows'
    },
    'page.labelWidth': {
      pl: 'Szerokość etykiety (mm)',
      en: 'Label width (mm)'
    },
    'page.labelHeight': {
      pl: 'Wysokość etykiety (mm)',
      en: 'Label height (mm)'
    },
    'page.subtitle': {
      pl: 'Rozmiary strony i etykiet w milimetrach. Dostosuj do swojego arkusza etykiet. Pamiętaj o drukowaniu etykiet bez marginesów w oknie wydruku. Te wartości należy starannie zmierzyć i przetestować. Zmienione ustawienia są przechowywane w przeglądarce, ale mogą zostać przypadkowo usunięte – warto je zapisać osobno.',
      en: 'Page and label sizes in millimeters. Adjust to match your label sheet. Remember to print labels without margins in the print dialog. These values need to be carefully measured and tested. Changed settings are stored in the browser but can be accidentally cleared – it\'s worth saving them separately.'
    },
    'page.restoreDefaults': {
      pl: 'Przywróć domyślne',
      en: 'Restore defaults'
    },
    'page.errorWidthExceeded': {
      pl: 'Konfiguracja przekracza szerokość A4 (210mm).\nCałkowita szerokość: {width}mm\nZmniejsz liczbę kolumn do {maxColumns} lub dostosuj szerokość etykiety/marginesy.',
      en: 'Configuration exceeds A4 width (210mm).\nTotal width: {width}mm\nReduce columns to {maxColumns} or adjust label width/padding.'
    },
    'page.errorHeightExceeded': {
      pl: 'Konfiguracja przekracza wysokość A4 (297mm).\nCałkowita wysokość: {height}mm\nZmniejsz liczbę wierszy do {maxRows} lub dostosuj wysokość etykiety/marginesy.',
      en: 'Configuration exceeds A4 height (297mm).\nTotal height: {height}mm\nReduce rows to {maxRows} or adjust label height/padding.'
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
