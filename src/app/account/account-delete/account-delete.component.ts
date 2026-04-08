import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-account-delete',
  standalone: false,
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css'],
})
export class AccountDeleteComponent {
  
  constructor(private router: Router, private accountService: AccountService) {}
  
  deleteAccount() {
    // Implement account deletion logic here
    console.log('Account deletion initiated');
    this.accountService.deleteUserAccount().subscribe((response) => {
      if (response) {
        console.log('Account deleted successfully');
        this.router.navigate(['/account']);
      } else {
        console.error('Failed to delete account');
      }
    });
  }

  cancel() {
    // Implement cancellation logic here, such as navigating back to the account page
    console.log('Account deletion cancelled');
    this.router.navigate(['/account']);
  }
}