import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LabelService } from '../services/label.service';
import { TranslationService } from '../services/translation.service';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-label-config',
  standalone: true,
  imports: [FormsModule, LanguageSwitcher],
  templateUrl: './label-config.html',
  styleUrl: './label-config.scss',
})
export class LabelConfig {
  private router = inject(Router);
  private labelService = inject(LabelService);
  translationService = inject(TranslationService);
  
  private readonly STORAGE_KEY_CODE_LENGTH = 'barcode_codeLength';
  private readonly STORAGE_KEY_PREFIX_STRATEGY = 'barcode_prefixStrategy';
  private readonly STORAGE_KEY_STATIC_PREFIX = 'barcode_staticPrefix';
  private readonly STORAGE_KEY_SHOW_HINTS = 'barcode_showHints';
  private readonly STORAGE_KEY_PAGE_CONFIG = 'barcode_pageConfig';
  
  // Form properties
  codeLength: number = this.loadCodeLength();
  prefixStrategy: 'date' | 'static' = this.loadPrefixStrategy();
  staticPrefix: number = this.loadStaticPrefix();
  startOffset: number = 0;
  countFours: number = 0;
  countFives: number = 0;
  countSixes: number = 0;
  countSevens: number = 0;
  countEights: number = 0;
  countTens: number = 0;
  
  // Page and label size configuration (in mm)
  paddingTop: number = 10.7;
  paddingBottom: number = 10.7;
  paddingLeft: number = 10;
  paddingRight: number = 10;
  columns: number = 5;
  rows: number = 13;
  labelWidth: number = 38;
  labelHeight: number = 21.2;
  
  // UI preferences
  showHints: boolean = this.loadShowHints();

  // Validation
  pageConfigErrors: string[] = [];

  private loadCodeLength(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY_CODE_LENGTH);
    return stored ? parseInt(stored, 10) : 14;
  }

  private loadPrefixStrategy(): 'date' | 'static' {
    const stored = localStorage.getItem(this.STORAGE_KEY_PREFIX_STRATEGY);
    return (stored === 'date' || stored === 'static') ? stored : 'date';
  }

  private loadStaticPrefix(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY_STATIC_PREFIX);
    return stored ? parseInt(stored, 10) : 0;
  }

  private loadShowHints(): boolean {
    const stored = localStorage.getItem(this.STORAGE_KEY_SHOW_HINTS);
    return stored !== 'false'; // Default to true if not set
  }

  private loadFormState(): void {
    const formState = this.labelService.getFormState();
    if (formState) {
      this.startOffset = formState.startOffset;
      this.countFours = formState.countFours;
      this.countFives = formState.countFives;
      this.countSixes = formState.countSixes;
      this.countSevens = formState.countSevens;
      this.countEights = formState.countEights;
      this.countTens = formState.countTens;
    }
  }

  private loadPageConfig(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY_PAGE_CONFIG);
    if (stored) {
      try {
        const config = JSON.parse(stored);
        this.paddingTop = config.paddingTop ?? 10.7;
        this.paddingBottom = config.paddingBottom ?? 10.7;
        this.paddingLeft = config.paddingLeft ?? 10;
        this.paddingRight = config.paddingRight ?? 10;
        this.columns = config.columns ?? 5;
        this.rows = config.rows ?? 13;
        this.labelWidth = config.labelWidth ?? 38;
        this.labelHeight = config.labelHeight ?? 21.2;
      } catch (e) {
        console.error('Failed to load page config', e);
      }
    }
  }

  private savePageConfig(): void {
    const config = {
      paddingTop: this.paddingTop,
      paddingBottom: this.paddingBottom,
      paddingLeft: this.paddingLeft,
      paddingRight: this.paddingRight,
      columns: this.columns,
      rows: this.rows,
      labelWidth: this.labelWidth,
      labelHeight: this.labelHeight
    };
    localStorage.setItem(this.STORAGE_KEY_PAGE_CONFIG, JSON.stringify(config));
  }

  constructor() {
    this.loadPageConfig();
    this.loadFormState();
  }

  toggleShowHints(): void {
    // Value is already updated by two-way binding, just save to localStorage
    localStorage.setItem(this.STORAGE_KEY_SHOW_HINTS, this.showHints.toString());
  }

  onPageConfigChange(): void {
    this.validatePageConfig();
    this.savePageConfig();
  }

  private validatePageConfig(): void {
    const A4_WIDTH = 210; // mm
    const A4_HEIGHT = 297; // mm
    this.pageConfigErrors = [];

    // Validate width
    const totalWidth = (this.labelWidth * this.columns) + this.paddingLeft + this.paddingRight;
    if (totalWidth > A4_WIDTH) {
      const maxWidth = A4_WIDTH - this.paddingLeft - this.paddingRight;
      const maxColumns = Math.floor(maxWidth / this.labelWidth);
      const message = this.translationService.t('page.errorWidthExceeded')
        .replace('{width}', totalWidth.toFixed(1))
        .replace('{maxColumns}', maxColumns.toString());
      this.pageConfigErrors.push(message);
    }

    // Validate height (configured rows must fit on page)
    const totalHeight = (this.labelHeight * this.rows) + this.paddingTop + this.paddingBottom;
    if (totalHeight > A4_HEIGHT) {
      const maxHeight = A4_HEIGHT - this.paddingTop - this.paddingBottom;
      const maxRows = Math.floor(maxHeight / this.labelHeight);
      const message = this.translationService.t('page.errorHeightExceeded')
        .replace('{height}', totalHeight.toFixed(1))
        .replace('{maxRows}', maxRows.toString());
      this.pageConfigErrors.push(message);
    }
  }

  restoreDefaultPageConfig(): void {
    this.paddingTop = 10.7;
    this.paddingBottom = 10.7;
    this.paddingLeft = 10;
    this.paddingRight = 10;
    this.columns = 5;
    this.rows = 13;
    this.labelWidth = 38;
    this.labelHeight = 21.2;
    this.pageConfigErrors = [];
    this.savePageConfig();
  }

  validateCodeLength(): void {
    if (this.codeLength < 1 || isNaN(this.codeLength)) {
      this.codeLength = 1;
    }
    this.saveCodeLength();
    // Re-validate offset since available space changed
    this.validateOffset();
  }

  saveCodeLength(): void {
    localStorage.setItem(this.STORAGE_KEY_CODE_LENGTH, this.codeLength.toString());
  }

  savePrefixStrategy(): void {
    localStorage.setItem(this.STORAGE_KEY_PREFIX_STRATEGY, this.prefixStrategy);
    // Re-validate offset since prefix length may have changed
    this.validateOffset();
  }

  validateStaticPrefix(): void {
    if (this.staticPrefix < 0 || isNaN(this.staticPrefix)) {
      this.staticPrefix = 0;
    }
    this.saveStaticPrefix();
    // Re-validate offset since prefix length changed
    this.validateOffset();
  }

  saveStaticPrefix(): void {
    localStorage.setItem(this.STORAGE_KEY_STATIC_PREFIX, this.staticPrefix.toString());
  }

  getMaxOffset(): number {
    const prefix = this.getPrefix();
    const remainingLength = this.codeLength - prefix.length;
    
    // Ensure there's at least 2 digits remaining (1 for offset, 1 for child)
    if (remainingLength < 2) {
      return 0;
    }
    
    // Maximum offset: (offset * 10 + 9) must fit in remainingLength digits
    // So: offset <= (10^remainingLength - 10) / 10 = 10^(remainingLength-1) - 1
    return Math.pow(10, remainingLength - 1) - 1;
  }

  validateOffset(): void {
    // Use setTimeout to ensure validation happens after Angular's change detection
    setTimeout(() => {
      // Force to number in case it's a string
      this.startOffset = Number(this.startOffset);
      
      if (this.startOffset < 0 || isNaN(this.startOffset) || !isFinite(this.startOffset)) {
        this.startOffset = 0;
        return;
      }
      
      // Round to integer
      this.startOffset = Math.floor(this.startOffset);
      
      const maxOffset = this.getMaxOffset();
      
      if (this.startOffset > maxOffset) {
        this.startOffset = maxOffset;
      }
    }, 0);
  }

  validateCountFours(): void {
    if (this.countFours < 0 || isNaN(this.countFours)) {
      this.countFours = 0;
    }
  }

  validateCountFives(): void {
    if (this.countFives < 0 || isNaN(this.countFives)) {
      this.countFives = 0;
    }
  }

  validateCountSixes(): void {
    if (this.countSixes < 0 || isNaN(this.countSixes)) {
      this.countSixes = 0;
    }
  }

  validateCountSevens(): void {
    if (this.countSevens < 0 || isNaN(this.countSevens)) {
      this.countSevens = 0;
    }
  }

  validateCountEights(): void {
    if (this.countEights < 0 || isNaN(this.countEights)) {
      this.countEights = 0;
    }
  }

  validateCountTens(): void {
    if (this.countTens < 0 || isNaN(this.countTens)) {
      this.countTens = 0;
    }
  }

  generateLabels(): void {
    const allLabels = this.generateBasicModeLabels();
    const pageConfig = {
      paddingTop: this.paddingTop,
      paddingBottom: this.paddingBottom,
      paddingLeft: this.paddingLeft,
      paddingRight: this.paddingRight,
      columns: this.columns,
      rows: this.rows,
      labelWidth: this.labelWidth,
      labelHeight: this.labelHeight
    };
    const formState = {
      startOffset: this.startOffset,
      countFours: this.countFours,
      countFives: this.countFives,
      countSixes: this.countSixes,
      countSevens: this.countSevens,
      countEights: this.countEights,
      countTens: this.countTens
    };
    this.labelService.setLabels(allLabels);
    this.labelService.setPageConfig(pageConfig);
    this.labelService.setFormState(formState);
    this.router.navigate(['/preview']);
  }

  hasAnyInput(): boolean {
    return this.codeLength > 0 && (this.countFours > 0 || this.countFives > 0 || this.countSixes > 0 || this.countSevens > 0 || this.countEights > 0 || this.countTens > 0);
  }

  isGroupDivisibleByColumns(groupSize: number): boolean {
    return this.columns > 0 && groupSize % this.columns === 0;
  }
  
  private generateBasicModeLabels(): string[] {
    const labels: string[] = [];
    const prefix = this.getPrefix();
    
    // Validate prefix length
    if (prefix.length >= this.codeLength) {
      console.error('Prefix length must be less than code length');
      return [];
    }
    
    const remainingLength = this.codeLength - prefix.length;
    let groupCounter = this.startOffset;
    
    // Generate 4s (mother 0 + children 1-3 = 4 labels total)
    for (let group = 0; group < this.countFours; group++) {
      for (let child = 0; child <= 3; child++) {
        const counterAndChild = (groupCounter * 10 + child).toString().padStart(remainingLength, '0');
        labels.push(prefix + counterAndChild);
      }
      groupCounter++;
    }
    
    // Generate 5s (mother 0 + children 1-4 = 5 labels total)
    for (let group = 0; group < this.countFives; group++) {
      for (let child = 0; child <= 4; child++) {
        const counterAndChild = (groupCounter * 10 + child).toString().padStart(remainingLength, '0');
        labels.push(prefix + counterAndChild);
      }
      groupCounter++;
    }
    
    // Generate 6s (mother 0 + children 1-5 = 6 labels total)
    for (let group = 0; group < this.countSixes; group++) {
      for (let child = 0; child <= 5; child++) {
        const counterAndChild = (groupCounter * 10 + child).toString().padStart(remainingLength, '0');
        labels.push(prefix + counterAndChild);
      }
      groupCounter++;
    }
    
    // Generate 7s (mother 0 + children 1-6 = 7 labels total)
    for (let group = 0; group < this.countSevens; group++) {
      for (let child = 0; child <= 6; child++) {
        const counterAndChild = (groupCounter * 10 + child).toString().padStart(remainingLength, '0');
        labels.push(prefix + counterAndChild);
      }
      groupCounter++;
    }
    
    // Generate 8s (mother 0 + children 1-7 = 8 labels total)
    for (let group = 0; group < this.countEights; group++) {
      for (let child = 0; child <= 7; child++) {
        const counterAndChild = (groupCounter * 10 + child).toString().padStart(remainingLength, '0');
        labels.push(prefix + counterAndChild);
      }
      groupCounter++;
    }
    
    // Generate 10s (mother 0 + children 1-9 = 10 labels total)
    for (let group = 0; group < this.countTens; group++) {
      for (let child = 0; child <= 9; child++) {
        const counterAndChild = (groupCounter * 10 + child).toString().padStart(remainingLength, '0');
        labels.push(prefix + counterAndChild);
      }
      groupCounter++;
    }
    
    return labels;
  }
  
  getPrefix(): string {
    if (this.prefixStrategy === 'date') {
      const now = new Date();
      const year = now.getFullYear().toString().slice(-2);
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      return year + month + day; // YYMMDD format
    } else {
      return this.staticPrefix.toString();
    }
  }

  getFirstCodeExample(): string {
    const prefix = this.getPrefix();
    if (prefix.length >= this.codeLength) {
      return '';
    }
    const remainingLength = this.codeLength - prefix.length;
    const counterAndChild = (this.startOffset * 10).toString().padStart(remainingLength, '0');
    return '<strong>' + prefix + '</strong>' + counterAndChild;
  }

  getOffsetExample(offset: number): string {
    const prefix = this.getPrefix();
    if (prefix.length >= this.codeLength) {
      return '';
    }
    const remainingLength = this.codeLength - prefix.length;
    const counterAndChild = (offset * 10).toString();
    const paddedCounter = counterAndChild.padStart(remainingLength, '0');
    
    // The last digit is the child (0), everything before is the offset part
    const childDigit = paddedCounter.slice(-1);
    const offsetPart = paddedCounter.slice(0, -1);
    
    // Find where the offset value appears in the offset part (skip leading zeros)
    const offsetStr = offset.toString();
    let offsetIndex = offsetPart.lastIndexOf(offsetStr);
    
    // For offset 0, we want the rightmost 0 in the offset part
    if (offset === 0) {
      offsetIndex = offsetPart.length - 1;
    }
    
    if (offsetIndex !== -1) {
      const before = offsetPart.substring(0, offsetIndex);
      const boldPart = offsetPart.substring(offsetIndex, offsetIndex + offsetStr.length);
      const after = offsetPart.substring(offsetIndex + offsetStr.length);
      return prefix + before + '<strong>' + boldPart + '</strong>' + after + childDigit;
    }
    
    return prefix + paddedCounter;
  }
}
