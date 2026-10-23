import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { environment } from '@config/environment.development';
import { LoginResponse } from '@core/models/loginResponse';

interface StoredSession {
  token: string;
  user: LoginResponse['data']['user'];
  expiresAt: number;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly storageKey = 'worksuite.auth.session';

  private readonly tokenSignal = signal<string | null>(null);
  private readonly userSignal =
    signal<LoginResponse['data']['user'] | null>(null);
  private readonly expiresAtSignal = signal<number | null>(null);

  readonly token = this.tokenSignal.asReadonly();
  readonly user = this.userSignal.asReadonly();

  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  readonly isAdmin = computed(() =>
    this.userSignal()?.roles?.some(
      (role) => role.name === 'admin',
    ) ?? false
  );

  constructor() {
    this.restoreSession();
  }

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
        const data = response.data;
        const token = data?.token;

        if (!token || !data.user) {
          throw new Error('Authentication data missing from response.');
        }

        const expiresAt =
          typeof data.expires_in === 'number' && data.expires_in > 0
            ? Date.now() + data.expires_in * 1000
            : Date.parse(data.expires);

        if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
          throw new Error('Invalid or expired authentication token.');
        }

        const session: StoredSession = {
          token,
          user: data.user,
          expiresAt,
        };

        this.tokenSignal.set(token);
        this.userSignal.set(data.user);
        this.expiresAtSignal.set(expiresAt);

        this.persistSession(session);
      }),
    );
  }

  hasValidSession(): boolean {
    const token = this.tokenSignal();
    const expiresAt = this.expiresAtSignal();

    if (!token || !expiresAt || expiresAt <= Date.now()) {
      this.clearSession();
      return false;
    }

    return true;
  }

  getValidToken(): string | null {
    return this.hasValidSession() ? this.tokenSignal() : null;
  }

  private restoreSession(): void {
    let raw: string | null;

    try {
      raw = sessionStorage.getItem(this.storageKey);
    } catch {
      return;
    }

    if (!raw) {
      return;
    }

    try {
      const session = JSON.parse(raw) as StoredSession;

      if (
        !session.token ||
        !session.user ||
        !Number.isFinite(session.expiresAt) ||
        session.expiresAt <= Date.now()
      ) {
        this.clearSession();
        return;
      }

      this.tokenSignal.set(session.token);
      this.userSignal.set(session.user);
      this.expiresAtSignal.set(session.expiresAt);
    } catch {
      this.clearSession();
    }
  }

  private persistSession(session: StoredSession): void {
    try {
      sessionStorage.setItem(
        this.storageKey,
        JSON.stringify(session),
      );
    } catch {
      // La session reste en mémoire, mais ne survivra pas au rafraîchissement.
    }
  }

  clearSession(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    this.expiresAtSignal.set(null);

    try {
      sessionStorage.removeItem(this.storageKey);
    } catch {
      // Le nettoyage en mémoire reste effectué.
    }
  }

  logout(): Observable<void> {
    const token = this.getValidToken();

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
      tap({
        next: () => this.clearSession(),
        error: () => this.clearSession(),
      }),
    );
  }
}