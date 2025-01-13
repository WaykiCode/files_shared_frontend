import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  selectedFile!: File;

  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe({
        next: (event) => console.log('Upload successful', event),
        error: (err) => console.error('Upload failed', err)
      });
    }
  }
}
