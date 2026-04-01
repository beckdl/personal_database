import { Component, Input } from '@angular/core';
import { Note } from '../note.model';

@Component({
  selector: 'pd-note-list',
  standalone: false,
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css',
})
export class NoteListComponent {
  @Input() notes: Note[] = [];
}
