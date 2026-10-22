import { Component, inject, signal } from '@angular/core';
import { FormField, form, required, email, minLength } from '@angular/forms/signals';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly isLoading = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly model = signal<LoginModel>({
    email: '',
    password: '',
  });

  readonly loginForm = form(this.model, (schema) => {
    required(schema.email);
    email(schema.email);

    required(schema.password);
    minLength(schema.password, 6);
  });

  onSubmit(event: SubmitEvent): void {
    event.preventDefault();

    if (this.loginForm().invalid() || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.model();

    this.authService.login(email, password).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        console.error('Erreur de connexion', err);
        this.errorMessage.set(
          err?.error?.message ?? 'Identifiants invalides ou service indisponible.'
        );
        this.isLoading.set(false);
      },
    });
  }
}