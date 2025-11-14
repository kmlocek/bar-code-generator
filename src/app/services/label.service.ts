import { Injectable, signal } from '@angular/core';
import { Label } from '../bar-code-leaf/bar-code-leaf';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private labelsSignal = signal<Label[]>([]);

  getLabels() {
    return this.labelsSignal();
  }

  setLabels(labelTexts: string[]) {
    const labels: Label[] = labelTexts.map(text => ({ text }));
    this.labelsSignal.set(labels);
  }
}
