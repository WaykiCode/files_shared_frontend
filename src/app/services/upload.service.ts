// src/app/services/upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = 'http://localhost:8080/files/upload'; // Cambiar si es necesario

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.apiUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
