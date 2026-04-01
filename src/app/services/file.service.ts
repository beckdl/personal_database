import { Injectable,EventEmitter, OnInit } from '@angular/core';
import { File } from '../files/file.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService implements OnInit {
  fileListChangedEvent = new BehaviorSubject<File[]>([]);
  maxFileId: number;

  server = "http://localhost:3000/files";

  fileSelectedEvent = new EventEmitter<File>();  
  files: File[] = [];

  constructor(private http: HttpClient) { 
    this.maxFileId = this.getMaxId();
  }

  ngOnInit() {
  }

  getFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.server).pipe(
      map((files: File[]) => {
        this.files = files;
        this.maxFileId = this.getMaxId();
        this.files.sort((a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return 0;
        });
        const listCopy = this.files.slice();
        this.fileListChangedEvent.next(listCopy);
        return listCopy;
      })
    );
  }

  getFile(id: string): File {
    return this.files.find(file => file.id === id)!;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const file of this.files) {
      const currentId = parseInt(file.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addFile(file: File) {
    if (!file) {
      return;
    }

    file.id = '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post<{ message: string, file: File }>(this.server, file, { headers: headers })
      .subscribe(
        (responseData) => {
          this.files.push(responseData.file);
          this.fileListChangedEvent.next(this.files.slice());
        }
      );
  }

  updateFile(originalFile: File, newFile: File) {
    if (!originalFile || !newFile) {
      return;
    }

    const pos = this.files.findIndex(f => f.id === originalFile.id);
    if (pos < 0) {
      return;
    }

    newFile.id = originalFile.id;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put(`${this.server}/${originalFile.id}`, newFile, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.files[pos] = newFile;
          this.fileListChangedEvent.next(this.files.slice());
        }
      );
  }

  deleteFile(file: File) {
    if (!file) {
      return;
    }

    const pos = this.files.indexOf(file);
    if (pos < 0) {
      return;
    }

    this.http.delete(`${this.server}/${file.id}`).subscribe(
      (response: Response) => {
        this.files.splice(pos, 1);
        this.fileListChangedEvent.next(this.files.slice());
      }
    );
  }
}
