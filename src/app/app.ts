import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarCodeLeaf } from "./bar-code-leaf/bar-code-leaf";

@Component({
  selector: 'app-root',
  imports: [BarCodeLeaf],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bar-code-generator');
}
