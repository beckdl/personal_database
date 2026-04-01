import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Note } from '../note.model';

@Component({
  selector: 'pd-note-details',
  standalone: false,
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css'],
})
export class NoteDetailsComponent implements OnInit {
  note: Note;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.note = this.noteService.getNote(id);
      }
    );
  }

  onDelete() {
    this.noteService.deleteNote(this.note);
    this.router.navigate(['/notes']);
  }
}
