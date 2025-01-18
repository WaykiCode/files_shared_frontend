import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pdfFiles: File[] = [];
  pdfFilesActive: any[] = [];
  pdfFilesInactive: any[] = [];
  isUploading: boolean = false;
  isDragging: boolean = false; // 🔥 Nueva propiedad para efectos visuales al arrastrar

  constructor(private uploadService: UploadService) {
    this.getActiveFiles();
    this.getInactiveFiles();
  }

  // Manejar archivos arrastrados
  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const files: FileList = event.dataTransfer.files;
      this.addFiles(files);
    }
  }

  // Resaltar el área de carga cuando se arrastran archivos
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  // Quitar el efecto cuando se sale del área
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  // Seleccionar archivos desde el input
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.addFiles(files);
  }

  // Agregar archivos PDF a la lista
  addFiles(files: FileList): void {    
    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        this.pdfFiles.push(file);
      } else {
        alert('Solo se permiten archivos PDF');
      }
    });
  }

  // Eliminar archivo de la lista
  removeFile(index: number): void {
    this.pdfFiles.splice(index, 1);
  }

  // Enviar archivos al servidor
  uploadFiles(): void {
    if (this.pdfFiles.length === 0) {
      alert('No hay archivos para cargar.');
      return;
    }

    this.isUploading = true;

    this.pdfFiles.forEach(file => {
      this.uploadService.uploadFile(file).subscribe({
        next: (response) => {
          console.log('Archivo subido:', response);
        },
        error: (error) => {
          console.error('Error al subir el archivo:', error);
        },
        complete: () => {
          this.isUploading = false;
          alert('Archivos subidos correctamente.');
          this.pdfFiles = [];  // Limpiar la lista después de cargar
        }
      });
    });
  }

  // Obtener archivos activos
  getActiveFiles(): void {
    this.isUploading = true;
    this.uploadService.getActiveFile().subscribe({
      next: (response: any) => {
        if(response && response.body && response.body.data) {
          this.pdfFilesActive = response.body.data;  // ✅ Asignar los datos
          console.log('Archivos activos:', this.pdfFilesActive);
        }
      },
      error: (error) => {
        console.error('Error al Obtener los Datos:', error);
      },
      complete: () => {
        this.isUploading = false;
      }
    });
  }

  getInactiveFiles(): void {
    this.isUploading = true;
    this.uploadService.getInactiveFile().subscribe({
      next: (response: any) => {
        if(response && response.body && response.body.data) {
          this.pdfFilesInactive = response.body.data;  // ✅ Asignar los datos
          console.log('Archivos inactivos:', this.pdfFilesInactive);
        }
      },
      error: (error) => {
        console.error('Error al Obtener los Datos:', error);
      },
      complete: () => {
        this.isUploading = false;
      }
    });
  }
}
