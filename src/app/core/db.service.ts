import { HttpClient } from '@angular/common/http';
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
    return this.http.post(this.apiUrl + '/login/token', { username, password }, { withCredentials: true });
  }

  getTagsLess(): Observable<any> {
    return this.http.get(this.apiUrl + '/audios/five_less', { withCredentials: true });
  }

  getTagsRandom(): Observable<any> {
    return this.http.get(this.apiUrl + '/audios/five_random', { withCredentials: true });
  }
}
