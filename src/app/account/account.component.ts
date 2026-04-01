import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class Account implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Account component initialized');
  }

  get user() {
    return { name: 'John Doe' };
  }

  logout() {
    console.log('User logged out');
    this.router.navigate(['/home']);
  }
}
