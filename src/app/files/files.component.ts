import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, finalize, take, timeout } from 'rxjs';
import { Login } from '../services/login.service';
import { FileService } from '../services/file.service';
import { File } from './file.model';

@Component({
  selector: 'pd-files',
  standalone: false,
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
})
export class Files implements OnInit, OnDestroy {
  files: File[] = [];
  filesLoaded = false;
  loadError = '';
  private loginSubscription: Subscription;
  private loadSubscription: Subscription;
  private fileListSubscription: Subscription;

  constructor(
    private loginService: Login,
    private fileService: FileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fileListSubscription = this.fileService.fileListChangedEvent.subscribe(
      (files: File[]) => {
        this.files = files;
        this.cdr.detectChanges();
      }
    );

    this.loginSubscription = this.loginService.loggedIn$.subscribe(
      (isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          this.files = [];
          this.filesLoaded = false;
          this.loadError = '';
          this.cdr.detectChanges();
          return;
        }

        this.loadFiles();
      }
    );
  }

  ngOnDestroy() {
    if (this.fileListSubscription) {
      this.fileListSubscription.unsubscribe();
    }

    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }

    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }
  }

  private loadFiles() {
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
    }

    this.filesLoaded = false;
    this.loadError = '';
    this.cdr.detectChanges();

    this.loadSubscription = this.fileService
      .getFiles()
      .pipe(
        take(1),
        timeout(8000),
        finalize(() => {
          this.filesLoaded = true;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (files: File[]) => {
          this.files = files;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.error('Error loading files:', error);
          this.loadError = 'Could not load files. Please try again.';
          this.files = [];
          this.cdr.detectChanges();
        },
      });
  }

  get loggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }
}
