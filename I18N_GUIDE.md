# Internationalization (i18n) Guide

## Overview
The barcode label generator now supports multiple languages with easy switching between them.

## Supported Languages
- **Polish (PL)** - Default language
- **English (EN)**

## Features

### Language Switcher
- Located in the top-right corner of the configuration page
- Click PL or EN to switch languages instantly
- Language selection persists during the session

### Translated Sections
All user-facing text is translated, including:

#### Configuration Page
- App title and description
- Mode toggle (Basic/Advanced)
- All form labels and subtitles
- Examples and instructions
- Button texts

#### Preview Page
- Back to Config button

## Technical Implementation

### Translation Service
Located at: `src/app/services/translation.service.ts`

The service provides:
- `getLanguage()` - Returns current language
- `setLanguage(lang)` - Changes language
- `translate(key, params?)` - Translates a key with optional parameters
- `t(key, params?)` - Shorthand for translate

### Adding New Translations

To add a new translation key:

1. Open `src/app/services/translation.service.ts`
2. Add the key to the `translations` object:

```typescript
'your.key': {
  pl: 'Polish translation',
  en: 'English translation'
}
```

3. Use in template:
```html
{{ translationService.t('your.key') }}
```

### Translations with Parameters

For dynamic content:

```typescript
'message.with.param': {
  pl: 'Witaj, {{ name }}!',
  en: 'Hello, {{ name }}!'
}
```

Usage:
```html
{{ translationService.t('message.with.param', { name: userName }) }}
```

## Adding More Languages

To add a new language (e.g., German):

1. Update the `Language` type in `translation.service.ts`:
```typescript
export type Language = 'pl' | 'en' | 'de';
```

2. Add German translations to each key:
```typescript
'app.title': {
  pl: 'Generator Etykiet Kodów Kreskowych',
  en: 'Barcode Label Generator',
  de: 'Barcode-Etikettengenerator'
}
```

3. Update language switcher in `language-switcher.html`:
```html
<button 
  class="lang-btn" 
  [class.active]="currentLanguage === 'de'"
  (click)="switchLanguage('de')"
  title="Deutsch"
>
  DE
</button>
```

## Default Language

The default language is set to **Polish (PL)** in the `TranslationService`:

```typescript
private currentLanguage = signal<Language>('pl');
```

To change the default language, modify this line.
