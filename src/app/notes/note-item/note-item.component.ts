import { Component, Input } from '@angular/core';
import { Note } from '../note.model';

@Component({
  selector: 'pd-note-item',
  standalone: false,
  templateUrl: './note-item.component.html',
  styleUrl: './note-item.component.css',
})
export class NoteItemComponent {
  @Input() note: Note;
}
