import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';
import { Router, ActivatedRoute } from '@angular/router';
import { File } from '../file.model';
import { WindRefService } from '../../services/wind-ref.service';

@Component({
  selector: 'pd-file-details',
  standalone: false,
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css'],
})
export class FileDetailsComponent implements OnInit {
  file: File;
  nativeWindow: any;

  constructor( private fileService: FileService,
              private router: Router,
              private route: ActivatedRoute,
              private windRefService: WindRefService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.file = this.fileService.getFile(id);
      }
    );
    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView() {
    if (!this.file?.item) {
      return;
    }

    if (typeof this.file.item === 'string') {
      this.nativeWindow.open(this.file.item, '_blank');
      return;
    }

    if (this.file.item.dataUrl) {
      this.nativeWindow.open(this.file.item.dataUrl, '_blank');
    }
  }

  get fileDisplayValue(): string {
    if (!this.file?.item) {
      return '';
    }

    if (typeof this.file.item === 'string') {
      return this.file.item;
    }

    return this.file.item.name || 'Uploaded file';
  }

  onDownload(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (!this.file?.item) {
      return;
    }

    if (typeof this.file.item === 'string') {
      const link = this.nativeWindow.document.createElement('a');
      link.href = this.file.item;
      link.target = '_blank';
      link.rel = 'noopener';
      link.download = this.file.name || 'download';
      this.nativeWindow.document.body.appendChild(link);
      link.click();
      this.nativeWindow.document.body.removeChild(link);
      return;
    }

    if (this.file.item.dataUrl) {
      const link = this.nativeWindow.document.createElement('a');
      link.href = this.file.item.dataUrl;
      link.download = this.file.item.name || this.file.name || 'download';
      this.nativeWindow.document.body.appendChild(link);
      link.click();
      this.nativeWindow.document.body.removeChild(link);
    }
  }

  onDelete() {
    this.fileService.deleteFile(this.file);
    this.router.navigate(['/files']);
  }
}

