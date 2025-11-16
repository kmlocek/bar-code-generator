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
  
  // Mode selection
  mode: 'basic' | 'advanced' = 'basic';
  
  // Advanced mode properties
  labelInput: string = '';
  fivesInput: string = '';
  tensInput: string = '';
  
  // Basic mode properties
  codeLength: number = this.loadCodeLength();
  prefixStrategy: 'date' | 'static' = this.loadPrefixStrategy();
  staticPrefix: number = this.loadStaticPrefix();
  startOffset: number = 0;
  countFives: number = 0;
  countTens: number = 0;

  private loadCodeLength(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY_CODE_LENGTH);
    return stored ? parseInt(stored, 10) : 10;
  }

  private loadPrefixStrategy(): 'date' | 'static' {
    const stored = localStorage.getItem(this.STORAGE_KEY_PREFIX_STRATEGY);
    return (stored === 'date' || stored === 'static') ? stored : 'date';
  }

  private loadStaticPrefix(): number {
    const stored = localStorage.getItem(this.STORAGE_KEY_STATIC_PREFIX);
    return stored ? parseInt(stored, 10) : 0;
  }

  validateCodeLength(): void {
    if (this.codeLength < 1 || isNaN(this.codeLength)) {
      this.codeLength = 1;
    }
    this.saveCodeLength();
  }

  saveCodeLength(): void {
    localStorage.setItem(this.STORAGE_KEY_CODE_LENGTH, this.codeLength.toString());
  }

  savePrefixStrategy(): void {
    localStorage.setItem(this.STORAGE_KEY_PREFIX_STRATEGY, this.prefixStrategy);
  }

  validateStaticPrefix(): void {
    if (this.staticPrefix < 0 || isNaN(this.staticPrefix)) {
      this.staticPrefix = 0;
    }
    this.saveStaticPrefix();
  }

  saveStaticPrefix(): void {
    localStorage.setItem(this.STORAGE_KEY_STATIC_PREFIX, this.staticPrefix.toString());
  }

  validateOffset(): void {
    if (this.startOffset < 0) {
      this.startOffset = 0;
    }
  }

  validateCountFives(): void {
    if (this.countFives < 0 || isNaN(this.countFives)) {
      this.countFives = 0;
    }
  }

  validateCountTens(): void {
    if (this.countTens < 0 || isNaN(this.countTens)) {
      this.countTens = 0;
    }
  }

  generateLabels(): void {
    let allLabels: string[] = [];
    
    if (this.mode === 'basic') {
      allLabels = this.generateBasicModeLabels();
    } else {
      const regularLabels = this.parseLabels(this.labelInput);
      const fivesLabels = this.parseMotherChildLabels(this.fivesInput, 5);
      const tensLabels = this.parseMotherChildLabels(this.tensInput, 10);
      allLabels = [...regularLabels, ...fivesLabels, ...tensLabels];
    }
    
    this.labelService.setLabels(allLabels);
    this.router.navigate(['/preview']);
  }

  hasAnyInput(): boolean {
    if (this.mode === 'basic') {
      return this.codeLength > 0 && (this.countFives > 0 || this.countTens > 0);
    }
    return !!(this.labelInput.trim() || this.fivesInput.trim() || this.tensInput.trim());
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
    
    // Generate 5s (mother 0 + children 1-4 = 5 labels total)
    for (let group = 0; group < this.countFives; group++) {
      for (let child = 0; child <= 4; child++) {
        // Format: counter + child digit, padded to fill remaining length
        const counterAndChild = (groupCounter * 10 + child).toString().padStart(remainingLength, '0');
        labels.push(prefix + counterAndChild);
      }
      groupCounter++;
    }
    
    // Generate 10s (mother 0 + children 1-9 = 10 labels total)
    for (let group = 0; group < this.countTens; group++) {
      for (let child = 0; child <= 9; child++) {
        // Format: counter + child digit, padded to fill remaining length
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

  private parseLabels(input: string): string[] {
    if (!input.trim()) return [];
    
    const labels: string[] = [];
    const parts = input.split(',').map(p => p.trim());

    for (const part of parts) {
      if (part.includes('-')) {
        // Handle range (e.g., "1-5")
        const [start, end] = part.split('-').map(s => s.trim());
        const startNum = parseInt(start, 10);
        const endNum = parseInt(end, 10);

        if (!isNaN(startNum) && !isNaN(endNum)) {
          for (let i = startNum; i <= endNum; i++) {
            labels.push(i.toString());
          }
        }
      } else if (part) {
        // Handle single value
        labels.push(part);
      }
    }

    return labels;
  }

  private parseMotherChildLabels(input: string, count: 5 | 10): string[] {
    if (!input.trim()) return [];
    
    const baseCodes = this.parseBaseCodes(input);
    const labels: string[] = [];
    const maxChild = count === 5 ? 4 : 9;

    for (const baseCode of baseCodes) {
      // Generate mother (ending in 0) and children (ending in 1 to maxChild)
      // Append digits to the base code: 100 -> 1000, 1001, 1002, 1003, 1004
      for (let i = 0; i <= maxChild; i++) {
        labels.push(baseCode + i);
      }
    }

    return labels;
  }

  private parseBaseCodes(input: string): string[] {
    const codes: string[] = [];
    const parts = input.split(',').map(p => p.trim());

    for (const part of parts) {
      if (part.includes('-')) {
        // Handle range (e.g., "100-105")
        const [start, end] = part.split('-').map(s => s.trim());
        const startNum = parseInt(start, 10);
        const endNum = parseInt(end, 10);
        
        if (!isNaN(startNum) && !isNaN(endNum)) {
          for (let i = startNum; i <= endNum; i++) {
            codes.push(i.toString());
          }
        }
      } else if (part) {
        codes.push(part);
      }
    }

    return codes;
  }
}
