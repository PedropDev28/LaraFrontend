import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private apiUrl = 'https://larabackend.onrender.com';
  constructor(private http: HttpClient) { }

  // Autenticación: Login
  login(username: string, password: string) {
    return this.http.post(this.apiUrl + '/login/token', { username, password }, { withCredentials: true });
  }
}
