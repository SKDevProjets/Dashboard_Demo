import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@config/environment.development';
import { LoginResponse } from '@core/models/loginResponse';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenSignal = signal<string | null>(null);

  readonly isAuthenticated = computed(
    () => this.tokenSignal() !== null
  );
  
  getToken(): string | null {
    return this.tokenSignal();
  }
  
  login(
    email: string,
    password: string
  ): Observable<LoginResponse> {
    const body = new URLSearchParams();

    body.set('email', email);
    body.set('password', password);

    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/auth/login`,
        body.toString(),
        { headers }
      )
      .pipe(
        tap((response) => {
          console.log('LOGIN OK', response);

          const token = response.data.token;

          if (!token) {
            throw new Error(
              'Authentication token missing from response.'
            );
          }

          this.tokenSignal.set(token);

          console.log('TOKEN STORED');
        })
      );
  }
  logout(): void {
    this.tokenSignal.set(null);
  }

}