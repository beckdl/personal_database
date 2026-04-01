import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private readonly loggedInSubject = new BehaviorSubject<boolean>(false);
  readonly loggedIn$ = this.loggedInSubject.asObservable();

  login(username: string, password: string): boolean {
    // For demonstration purposes, we'll just check if the username and password are "admin"
    if (username === 'admin' && password === 'admin') {
      this.loggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}
