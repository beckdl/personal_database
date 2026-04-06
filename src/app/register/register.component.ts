import { Component } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  userName: string = '';
  password: string = '';

  usernameExists: boolean = false;

  constructor(private registerService: RegisterService, private router: Router) {}

  register(name: string, userName: string, email: string, password: string, phone: string) {
    this.registerService.register(name, userName, email, password, phone).subscribe(
      response => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        if (error.status === 400) {
          console.warn('Registration failed: Username already exists');
          this.usernameExists = true;
        } else {
          console.error('Registration error:', error);
        }
      }
    );
  }

  onUsernameChange() {
    if (!this.userName) {
      this.usernameExists = false;
      return;
    }
    this.registerService.nameCheck(this.userName).subscribe(
      response => {
        this.usernameExists = response.exists;
      },
      error => {
        console.error('Username check error:', error);
      }
    );
  }

}
