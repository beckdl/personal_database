import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-account-edit',
  standalone: false,
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css'],
})
export class AccountEditComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';
  username: string = '';
  password: string = '';

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    console.log('AccountEdit component initialized');
    this.accountService.getUserInfo().subscribe((user) => {
      if (!user) {
        return;
      }

      const account = user.user || user;

      this.name = account.name || account.userName || 'Guest';
      this.email = account.email || 'Not logged in';
      this.phone = account.phone || 'N/A';
      this.username = account.userName || 'N/A';
      this.password = account.password || '';
    });
    
  }

  saveChanges() {
    // Implement save changes logic here
    console.log('Changes saved');
    const updatedInfo = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      userName: this.username,
      password: this.password
    };
    this.accountService.saveUserInfo(updatedInfo).subscribe((response) => {
      if (response) {
        console.log('User info updated successfully');
        this.router.navigate(['/account']);
      } else {
        console.error('Failed to update user info');
      }
    });
  }

  cancel() {
    // Implement cancellation logic here, such as navigating back to the account page
    console.log('Edit cancelled');
    this.router.navigate(['/account']);
  }

}
