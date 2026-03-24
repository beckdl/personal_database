import { Component, signal } from '@angular/core';
import { Login } from './services/login.service';

@Component({
  selector: 'pd-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('Personal Database');

  constructor(private loginService: Login) {}

  get loggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

}
