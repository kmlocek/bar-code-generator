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
  
  // Mode selection
  mode: 'basic' | 'advanced' = 'basic';
  
  // Advanced mode properties
  labelInput: string = '';
  fivesInput: string = '';
  tensInput: string = '';
  
  // Basic mode properties
  codeLength: number = 10;
  prefixStrategy: 'date' | 'static' = 'date';
  staticPrefix: string = '';
  startOffset: number = 0;
  countFives: number = 0;
  countTens: number = 0;

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
      return this.staticPrefix;
    }
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
