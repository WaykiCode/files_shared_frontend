// src/app/services/upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiUrl = 'https://cmas-vial-app.cmassassess.com';
  // private apiUrl = 'http://localhost:8080';
  

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/files/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  recoverFile(id: string): Observable<HttpEvent<any>> {

    const req = new HttpRequest('PUT', `${this.apiUrl}/files/recover/${id}`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getActiveFile(): Observable<HttpEvent<any>> {

    const req = new HttpRequest('GET', `${this.apiUrl}/files/get`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getInactiveFile(): Observable<HttpEvent<any>> {

    const req = new HttpRequest('GET', `${this.apiUrl}/files/getInactive`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deleteFile(id: string): Observable<HttpEvent<any>> {

    const req = new HttpRequest('DELETE', `${this.apiUrl}/files/delete/${id}`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  deletePermanentFile(id: string): Observable<HttpEvent<any>> {

    const req = new HttpRequest('DELETE', `${this.apiUrl}/files/deletePermanent/${id}`, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  downloadFile(url: string): void {

    window.open(`${this.apiUrl}/files${url}`, "_blank");
  }
}
