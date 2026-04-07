import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, finalize, take, timeout } from 'rxjs';
import { Login } from '../services/login.service';
import { NoteService } from '../services/note.service';
import { Note } from './note.model';

@Component({
  selector: 'pd-notes',
  standalone: false,
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class Notes implements OnInit, OnDestroy {
  notes: Note[] = [];
  notesLoaded = false;
  loadError = '';
  private loginSubscription: Subscription;
  private loadSubscription: Subscription;
  private noteListSubscription: Subscription;

  constructor(
    private loginService: Login,
    private noteService: NoteService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.noteListSubscription = this.noteService.noteListChangedEvent.subscribe(
      (notes: Note[]) => {
        this.notes = notes;
        this.cdr.detectChanges();
      }
    );

    this.loginSubscription = this.loginService.loggedIn$.subscribe(
      (isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.notes = [];
          this.notesLoaded = false;
          this.loadError = '';
          this.cdr.detectChanges();
          return;
        }

        this.loadNotes();
      }
    );
  }

  ngOnDestroy() {
    if (this.noteListSubscription) {
      this.noteListSubscription.unsubscribe();
    }

    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }

    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }
  }

  private loadNotes() {
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }

    this.notesLoaded = false;
    this.loadError = '';
    this.cdr.detectChanges();

    this.loadSubscription = this.noteService
      .getNotes()
      .pipe(
        take(1),
        timeout(8000),
        finalize(() => {
          this.notesLoaded = true;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (notes: Note[]) => {
          this.notes = notes;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.error('Error loading notes:', error);
          this.loadError = 'Could not load notes. Please try again.';
          this.notes = [];
          this.cdr.detectChanges();
        },
      });
  }

  get loggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}
