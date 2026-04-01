import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Note } from '../note.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'pd-note-edit',
  standalone: false,
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.css',
})
export class NoteEditComponent implements OnInit {
  originalNote: Note;
  note: Note;
  editMode: boolean = false;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        this.note = new Note('', '', '');
        return;
      }
      this.originalNote = this.noteService.getNote(id);
      if (!this.originalNote) {
        return;
      }
      this.editMode = true;
      this.note = JSON.parse(JSON.stringify(this.originalNote));
    });
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    const newNote = new Note(
      "",
      value.subject,
      value.note
    );
    if (this.editMode) {
      this.noteService.updateNote(this.originalNote, newNote);
    } else {
      this.noteService.addNote(newNote);
    }
    this.router.navigate(['/notes']);
  }

  onCancel() {
    this.router.navigate(['/notes']);
  }
}
