import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../services/login.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'pd-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class Account implements OnInit {
  name: string = 'Guest';
  email: string = 'Not logged in';
  phone: string = 'N/A';
  username: string = 'N/A';

  constructor(private loginService: Login, private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    if (!this.loginService.isLoggedIn()) {
      console.warn('User is not logged in. Redirecting to login page.');
      this.router.navigate(['/login']);
      return;
    }

    console.log('Account component initialized');

    this.accountService.getUserInfo().subscribe((user) => {
      if (!user) {
        return;
      }

      const account = user.user || user;

      this.name = account.name || account.userName || 'Guest';
      this.email = account.email || 'Not logged in';
      this.phone = account.phone || 'N/A';
      this.username = account.userName || 'N/A';
    });
  }

  logout() {
    console.log('User logged out');
    this.loginService.logout();
    this.router.navigate(['/home']);
  }
}
