import { Component, Input } from '@angular/core';
import { File } from '../file.model';

@Component({
  selector: 'pd-file-item',
  standalone: false,
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.css',
})
export class FileItemComponent {
  @Input() file: File;
}
