import { Routes } from '@angular/router';
import { LabelConfig } from './label-config/label-config';
import { BarCodeLeaf } from './bar-code-leaf/bar-code-leaf';

export const routes: Routes = [
  { path: '', component: LabelConfig },
  { path: 'preview', component: BarCodeLeaf },
  { path: '**', redirectTo: '' }
];
