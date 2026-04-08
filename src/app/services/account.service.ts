import { Injectable } from '@angular/core';
import { Login } from './login.service';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, Observable, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  server = "http://localhost:3000/users";

  constructor(private loginService: Login, private http: HttpClient) {}

  getUserInfo(): Observable<any | null> {
    const currentUser = this.loginService.getCurrentUser();
    if (currentUser) {
      return of(currentUser);
    }

    const existingId = this.loginService.getCurrentUserId();

    if (existingId) {
      return this.http.get<any>(`${this.server}/${existingId}`).pipe(
        catchError((error) => {
          console.error('Error retrieving user info:', error);
          return of(null);
        })
      );
    }

    return this.loginService.currentUserId$.pipe(
      filter((id): id is string => !!id),
      take(1),
      switchMap((id) => {
        return this.http.get<any>(`${this.server}/${id}`).pipe(
          catchError((error) => {
            console.error('Error retrieving user info:', error);
            return of(null);
          })
        );
      })
    );
  }

  saveUserInfo(userInfo: any): Observable<any> {
    const userId = this.loginService.getCurrentUserId();
    if (!userId) {
      console.error('No user ID found. Cannot save user info.');
      return of(null);
    }

    return this.http.put<any>(`${this.server}/${userId}`, userInfo).pipe(
      catchError((error) => {
        console.error('Error saving user info:', error);
        return of(null);
      })
    );
  }

  deleteUserAccount(): Observable<boolean> {
    const userId = this.loginService.getCurrentUserId();
    if (!userId) {
      console.error('No user ID found. Cannot delete account.');
      return of(false);
    }

    return this.http.delete(`${this.server}/${userId}`).pipe(
      switchMap(() => {
        this.loginService.logout();
        return of(true);
      }),
      catchError((error) => {
        console.error('Error deleting user account:', error);
        return of(false);
      })
    );
  }
}
