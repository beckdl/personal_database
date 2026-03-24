import { Component } from '@angular/core';

@Component({
  selector: 'pd-files',
  standalone: false,
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class Files {
  loggedIn: boolean = false;
}
