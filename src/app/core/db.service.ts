import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private apiUrl = 'https://didactic-waffle-45px7x94grgf5q49-8000.app.github.dev';
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

  getUsersByParent(parent: any): Observable<any> {
    return this.http.get(this.apiUrl + '/login/by_parent/' + parent, { withCredentials: true });
  }

  getAudiosByUser(usermail: any): Observable<any> {
    return this.http.get(this.apiUrl + '/audios/by_user/' + usermail, { withCredentials: true });
  }
}
