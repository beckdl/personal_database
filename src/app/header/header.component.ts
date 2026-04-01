import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Login } from '../services/login.service';

@Component({
  selector: 'pd-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class Header implements OnInit {

  constructor(private loginService: Login) {}

  get loggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  ngOnInit() {
    console.log('User logged in:', this.loginService.isLoggedIn());
  }

  get logout(): () => void {
    return () => {
      this.loginService.logout();
      window.location.reload();
      console.log('User logged out');
    }
  }

}
