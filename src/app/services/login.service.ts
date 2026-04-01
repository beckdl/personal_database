import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private readonly loggedInSubject = new BehaviorSubject<boolean>(false);
  readonly loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  private readonly server = "http://localhost:3000/users";

  login(username: string, password: string): Promise<boolean> {
    if (!username || !password) {
      return Promise.resolve(false);
    }

    return this.verifyCredentials(username, password).then(isValid => {
      this.loggedInSubject.next(isValid);
      return isValid;
    }).catch(error => {
      console.error('Error verifying credentials:', error);
      this.loggedInSubject.next(false);
      return false;
    });
  }

  logout(): void {
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  verifyCredentials(username: string, password: string): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      this.http.get(`${this.server}/?userName=${username}&password=${password}`).subscribe(
        (user: any) => {
          if (user && user.id) {
            console.log('User authenticated successfully:', user);
            resolve(true);
          } else {
            console.warn('Authentication failed: Invalid credentials');
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  
}
