import { Component, Input } from '@angular/core';
import { File } from '../file.model';

@Component({
  selector: 'pd-file-list',
  standalone: false,
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css',
})
export class FileListComponent {
  @Input() files: File[] = [];
}
