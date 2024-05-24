import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://example.com/api/login'; // Замените на ваш URL

  constructor(private http: HttpClient) {}

  login(username: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username });
  }
}
