import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LabelService } from '../services/label.service';

@Component({
  selector: 'app-label-config',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './label-config.html',
  styleUrl: './label-config.scss',
})
export class LabelConfig {
  private router = inject(Router);
  private labelService = inject(LabelService);
  
  labelInput: string = '';
  fivesInput: string = '';
  tensInput: string = '';

  generateLabels(): void {
    const regularLabels = this.parseLabels(this.labelInput);
    const fivesLabels = this.parseMotherChildLabels(this.fivesInput, 5);
    const tensLabels = this.parseMotherChildLabels(this.tensInput, 10);
    
    const allLabels = [...regularLabels, ...fivesLabels, ...tensLabels];
    this.labelService.setLabels(allLabels);
    this.router.navigate(['/preview']);
  }

  hasAnyInput(): boolean {
    return !!(this.labelInput.trim() || this.fivesInput.trim() || this.tensInput.trim());
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
