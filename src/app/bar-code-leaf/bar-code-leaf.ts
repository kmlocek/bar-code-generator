import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { LabelService, PageConfig } from '../services/label.service';
import { Router } from '@angular/router';
import { TranslationService } from '../services/translation.service';

export interface Label {
  text: string;
}

@Component({
  selector: 'app-bar-code-leaf',
  standalone: true,
  imports: [CommonModule, NgxBarcode6Module],
  templateUrl: './bar-code-leaf.html',
  styleUrl: './bar-code-leaf.scss',
})
export class BarCodeLeaf implements OnInit, OnDestroy {
  private labelService = inject(LabelService);
  private router = inject(Router);
  translationService = inject(TranslationService);
  
  width = 1;
  height = 50;
  fontSize = 10;

  labels: Label[] = [];
  pageConfig: PageConfig = this.labelService.getPageConfig();
  labelsPerPage: number = 0;

  ngOnInit(): void {
    this.labels = this.labelService.getLabels();
    this.pageConfig = this.labelService.getPageConfig();
    
    // Calculate how many labels fit per page
    const pageHeight = 297; // A4 height in mm
    const availableHeight = pageHeight - this.pageConfig.paddingTop - this.pageConfig.paddingBottom;
    const rowsPerPage = Math.floor(availableHeight / this.pageConfig.labelHeight);
    this.labelsPerPage = rowsPerPage * this.pageConfig.columns;
    
    // Inject @page style rule dynamically
    const styleId = 'dynamic-page-style';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
      @page {
        size: A4 portrait;
        padding-top: ${this.pageConfig.paddingTop}mm;
        padding-left: ${this.pageConfig.paddingLeft}mm;
        padding-right: ${this.pageConfig.paddingRight}mm;
        padding-bottom: ${this.pageConfig.paddingBottom}mm;
      }
      @media print {
        .labels {
          padding: 0 !important;
          width: auto !important;
        }
      }
    `;
    
    // If no labels, redirect to config page
    if (this.labels.length === 0) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    // Clean up dynamic style element
    const styleElement = document.getElementById('dynamic-page-style');
    if (styleElement) {
      styleElement.remove();
    }
  }

  isPageBreak(index: number): boolean {
    // Show page break after every labelsPerPage labels (except after the last one)
    return (index + 1) % this.labelsPerPage === 0 && index < this.labels.length - 1;
  }

  getPageNumber(index: number): number {
    return Math.floor(index / this.labelsPerPage) + 1;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
