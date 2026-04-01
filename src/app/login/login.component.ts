import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Login } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private loginService: Login, private router: Router) {}
  
  ngOnInit() {
    console.log('Login component initialized');
  }

  get loggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  async login(username: string, password: string): Promise<void> {
    try {
      const success = await this.loginService.login(username, password);
      if (success) {
        console.log('Login successful');
        this.router.navigate(['/account']);
      } else {
        console.warn('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

}
