import { Component, OnInit } from '@angular/core';
import {labels, Label} from "./labels";
import { NgxBarcode6Module } from 'ngx-barcode6';


@Component({
  selector: 'app-bar-code-leaf',
  imports: [NgxBarcode6Module],
  templateUrl: './bar-code-leaf.html',
  styleUrl: './bar-code-leaf.scss',
})
export class BarCodeLeaf implements OnInit {
  width = 1;
  height = 50;
  fontSize = 10;

  labels: Label[] = [];

  constructor() { }

  ngOnInit(): void {
    this.labels = labels;
  }
}
