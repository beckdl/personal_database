import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:3000/users'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  register(name: string, userName: string, email: string, password: string, phone: string) {
    const user = { name, userName, email, password, phone };
    return this.http.post(this.apiUrl, user);
  }

  nameCheck(userName: string) {
    return this.http.get<{ exists: boolean }>(this.apiUrl, { params: { userName } });
  }
}
