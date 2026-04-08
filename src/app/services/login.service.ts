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
  private readonly currentUserSubject = new BehaviorSubject<any | null>(null);
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private readonly server = "http://localhost:3000/users";

  login(username: string, password: string): Promise<boolean> {
    if (!username || !password) {
      return Promise.resolve(false);
    }

    return this.verifyCredentials(username, password).then(user => {
      const userId = this.getUserIdFromPayload(user);
      const isValid = !!userId;

      this.loggedInSubject.next(isValid);
      this.currentUserIdSubject.next(userId);
      this.currentUserSubject.next(user);
      return isValid;
    }).catch(error => {
      console.error('Error verifying credentials:', error);
      this.loggedInSubject.next(false);
      this.currentUserIdSubject.next(null);
      this.currentUserSubject.next(null);
      return false;
    });
  }

  logout(): void {
    this.loggedInSubject.next(false);
    this.currentUserIdSubject.next(null);
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getCurrentUserId(): string | null {
    return this.currentUserIdSubject.value;
  }

  getCurrentUser(): any | null {
    return this.currentUserSubject.value;
  }

  private normalizeUserPayload(payload: any): any | null {
    if (!payload) {
      return null;
    }

    if (Array.isArray(payload)) {
      return payload[0] || null;
    }

    return payload.user || payload;
  }

  private getUserIdFromPayload(payload: any): string | null {
    const user = this.normalizeUserPayload(payload);
    const id = user?.id || user?._id || user?.userId || null;

    return id ? String(id) : null;
  }

  verifyCredentials(username: string, password: string): Promise<any | null> {
    return new Promise( (resolve, reject) => {
      this.http.get(`${this.server}/?userName=${username}&password=${password}`).subscribe(
        (response: any) => {
          const user = this.normalizeUserPayload(response);
          const userId = this.getUserIdFromPayload(user);

          if (userId) {
            console.log('User authenticated successfully:', user);
            resolve(user);
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
