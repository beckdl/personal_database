import { Component, signal } from '@angular/core';

@Component({
  selector: 'pd-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('personal_database');
}
