import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '@config/environment.development';
import { LoginResponse } from '@core/models/loginResponse';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  private readonly tokenSignal = signal<string | null>(null);
  private readonly userSignal = signal<LoginResponse['data']['user'] | null>(null);

  readonly token = this.tokenSignal.asReadonly();
  readonly user = this.userSignal.asReadonly();

  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  readonly isAdmin = computed(() =>
    this.userSignal()?.roles?.some((role) => role.name === 'admin') ?? false
  );

  login(email: string, password: string): Observable<LoginResponse> {
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('password', password);

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/auth/login`,
      body.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': 'XMLHttpRequest',
        },
      },
    ).pipe(
      tap((response) => {
        const token = response.data?.token;

        if (!token) {
          throw new Error('Authentication token missing from response.');
        }

        this.tokenSignal.set(token);
        this.userSignal.set(response.data.user);
      }),
    );
  }

  clearSession(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
  }

  logout(): Observable<void> {
    const token = this.tokenSignal();

    if (!token) {
      this.clearSession();
      return of(undefined);
    }

    return this.http.post<void>(
      `${this.apiUrl}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        },
      },
    ).pipe(
      tap(() => this.clearSession()),
    );
  }
}