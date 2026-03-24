import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private loggedIn = false;

  login(username: string, password: string): boolean {
    // For demonstration purposes, we'll just check if the username and password are "admin"
    if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
