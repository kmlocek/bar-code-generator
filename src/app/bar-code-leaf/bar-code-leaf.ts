import { Component, OnInit, inject } from '@angular/core';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { LabelService } from '../services/label.service';
import { Router } from '@angular/router';

export interface Label {
  text: string;
}

@Component({
  selector: 'app-bar-code-leaf',
  standalone: true,
  imports: [NgxBarcode6Module],
  templateUrl: './bar-code-leaf.html',
  styleUrl: './bar-code-leaf.scss',
})
export class BarCodeLeaf implements OnInit {
  private labelService = inject(LabelService);
  private router = inject(Router);
  
  width = 1;
  height = 50;
  fontSize = 10;

  labels: Label[] = [];

  ngOnInit(): void {
    this.labels = this.labelService.getLabels();
    
    // If no labels, redirect to config page
    if (this.labels.length === 0) {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
