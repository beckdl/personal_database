import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Login } from '../services/login.service';

@Component({
  selector: 'pd-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private loginService: Login) {}
  
  ngOnInit() {
    console.log('Login component initialized');
  }

  get loggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  login() {
    try {
      const success = this.loginService.login('admin', 'admin');
      if (success) {
        console.log('Login successful');
      } else {
        console.warn('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

}
