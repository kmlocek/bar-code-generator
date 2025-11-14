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

  generateLabels(): void {
    const labels = this.parseLabels(this.labelInput);
    this.labelService.setLabels(labels);
    this.router.navigate(['/preview']);
  }

  private parseLabels(input: string): string[] {
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
}
