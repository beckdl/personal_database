import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { File } from '../file.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'pd-file-edit',
  standalone: false,
  templateUrl: './file-edit.component.html',
  styleUrl: './file-edit.component.css',
})
export class FileEditComponent implements OnInit {
  originalFile: File;
  file: File;
  editMode: boolean = false;
  fileReadError = '';

  constructor(
    private fileService: FileService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        this.file = new File('', '', '', null, '');
        return;
      }
      this.originalFile = this.fileService.getFile(id);
      if (!this.originalFile) {
        return;
      }
      this.editMode = true;
      this.file = JSON.parse(JSON.stringify(this.originalFile));
    });
  }

  onSubmit(f: NgForm) {
    if (this.fileReadError) {
      return;
    }

    const value = f.value;
    const newFile = new File(
      "",
      this.file?.userId || this.originalFile?.userId || '',
      value.name,
      this.file.item,
      value.description
    );
    if (this.editMode) {
      this.fileService.updateFile(this.originalFile, newFile);
    } else {
      this.fileService.addFile(newFile);
    }
    this.router.navigate(['/files']);
  }

  onFileSelected(event: Event) {
    const selectedFile = (event.target as HTMLInputElement).files?.[0];

    if (!selectedFile) {
      return;
    }

    this.fileReadError = '';
    const reader = new FileReader();

    reader.onload = () => {
      this.file.item = {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        dataUrl: reader.result,
      };
    };

    reader.onerror = () => {
      this.fileReadError = 'Unable to read the selected file. Please try again.';
      this.file.item = null;
    };

    reader.readAsDataURL(selectedFile);
  }

  onCancel() {
    this.router.navigate(['/files']);
  }
}
