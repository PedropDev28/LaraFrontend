import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private apiUrl = 'https://larabackend.onrender.com';
  constructor(private http: HttpClient) { }

  async getUsuarios() {
    const response = await fetch(`${this.apiUrl}/usuarios`);
    return await response.json();
  }

  getUsuarioByEmailAndPassword(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/usuarios/login`, body, { headers }) as Observable<any>;
  }
}
