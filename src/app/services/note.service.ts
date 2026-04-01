import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Note } from '../notes/note.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnInit {
  noteListChangedEvent = new BehaviorSubject<Note[]>([]);
  maxNoteId: number;

  server = "http://localhost:3000/notes";

  noteSelectedEvent = new EventEmitter<Note>();  
  notes: Note[] = [];

  constructor(private http: HttpClient) { 
    this.maxNoteId = this.getMaxId();
  }

  ngOnInit() {
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.server).pipe(
      map((notes: Note[]) => {
        this.notes = notes;
        this.maxNoteId = this.getMaxId();
        this.notes.sort((a, b) => {
          if (a.subject < b.subject) return -1;
          if (a.subject > b.subject) return 1;
          return 0;
        });
        const listCopy = this.notes.slice();
        this.noteListChangedEvent.next(listCopy);
        return listCopy;
      })
    );
  }

  getNote(id: string): Note {
    return this.notes.find(note => note.id === id)!;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const note of this.notes) {
      const currentId = parseInt(note.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addNote(note: Note) {
    if (!note) {
      return;
    }

    note.id = '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post<{ message: string, note: Note }>(this.server, note, { headers: headers })
      .subscribe(
        (responseData) => {
          this.notes.push(responseData.note);
          this.noteListChangedEvent.next(this.notes.slice());
        }
      );
  }

  updateNote(originalNote: Note, newNote: Note) {
    if (!originalNote || !newNote) {
      return;
    }

    const pos = this.notes.findIndex(n => n.id === originalNote.id);
    if (pos < 0) {
      return;
    }

    newNote.id = originalNote.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put(`${this.server}/${originalNote.id}`, newNote, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.notes[pos] = newNote;
          this.noteListChangedEvent.next(this.notes.slice());
        }
      );
  }

  deleteNote(note: Note) {
    const pos = this.notes.findIndex(n => n.id === note.id);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.delete(`${this.server}/${note.id}`, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.notes.splice(pos, 1);
          this.noteListChangedEvent.next(this.notes.slice());
        }
      );
  }
}
