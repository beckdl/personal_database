import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private readonly loggedInSubject = new BehaviorSubject<boolean>(false);
  readonly loggedIn$ = this.loggedInSubject.asObservable();
  private readonly currentUserIdSubject = new BehaviorSubject<string | null>(null);
  readonly currentUserId$ = this.currentUserIdSubject.asObservable();

  constructor(private http: HttpClient) {}

  private readonly server = "http://localhost:3000/users";

  login(username: string, password: string): Promise<boolean> {
    if (!username || !password) {
      return Promise.resolve(false);
    }

    return this.verifyCredentials(username, password).then(userId => {
      const isValid = !!userId;
      this.loggedInSubject.next(isValid);
      this.currentUserIdSubject.next(userId);
      return isValid;
    }).catch(error => {
      console.error('Error verifying credentials:', error);
      this.loggedInSubject.next(false);
      this.currentUserIdSubject.next(null);
      return false;
    });
  }

  logout(): void {
    this.loggedInSubject.next(false);
    this.currentUserIdSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getCurrentUserId(): string | null {
    return this.currentUserIdSubject.value;
  }

  verifyCredentials(username: string, password: string): Promise<string | null> {
    return new Promise( (resolve, reject) => {
      this.http.get(`${this.server}/?userName=${username}&password=${password}`).subscribe(
        (user: any) => {
          if (user && user.id) {
            console.log('User authenticated successfully:', user);
            resolve(user.id);
          } else {
            console.warn('Authentication failed: Invalid credentials');
            resolve(null);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  
}
