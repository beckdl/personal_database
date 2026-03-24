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

  loggedIn: boolean = false;

  ngOnInit() {
    const loggedIn: boolean = this.loginService.isLoggedIn();
    console.log('User logged in:', loggedIn);
  }

}
