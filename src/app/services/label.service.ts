import { Injectable, signal } from '@angular/core';
import { Label } from '../bar-code-leaf/bar-code-leaf';

export interface PageConfig {
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  columns: number;
  rows: number;
  labelWidth: number;
  labelHeight: number;
}

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private labelsSignal = signal<Label[]>([]);
  private pageConfigSignal = signal<PageConfig>({
    paddingTop: 10.7,
    paddingBottom: 10.7,
    paddingLeft: 10,
    paddingRight: 10,
    columns: 5,
    rows: 13,
    labelWidth: 38,
    labelHeight: 21.2
  });

  getLabels() {
    return this.labelsSignal();
  }

  setLabels(labelTexts: string[]) {
    const labels: Label[] = labelTexts.map(text => ({ text }));
    this.labelsSignal.set(labels);
  }

  getPageConfig() {
    return this.pageConfigSignal();
  }

  setPageConfig(config: PageConfig) {
    this.pageConfigSignal.set(config);
  }
}
