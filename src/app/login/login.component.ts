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

    try {
      this.loginService.login('admin', 'admin');
    } catch (error) {
      console.error('Login failed:', error);
    }

  }
}
