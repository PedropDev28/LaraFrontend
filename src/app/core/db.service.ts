import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private apiUrl = 'https://organic-fishstick-564pxgw9g4jh7w9w-8000.app.github.dev';
  constructor(private http: HttpClient) { }

  // Autenticación: Login
  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
  
    return this.http.post(this.apiUrl + '/login/token', body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    return this.http.get(this.apiUrl + '/login/logout', { withCredentials: true });
  }
  

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No hay token en localStorage');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/login/me`, { headers });
  }

  getTagsLess(): Observable<any> {
    return this.http.get(this.apiUrl + '/audios/five_less', { withCredentials: true });
  }

  getTagsRandom(): Observable<any> {
    return this.http.get(this.apiUrl + '/audios/five_random', { withCredentials: true });
  }

  getTwentyTags(): Observable<any> {
    return this.http.get(this.apiUrl + '/audios/twenty_audios', { withCredentials: true });
  }
}
