import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import { AlertService } from "@core/services/alert.service";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const alert = inject(AlertService);
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error) => {
            const isLoginRequest = req.url.includes('/auth/login');

            if (error.status === 0) {
                alert.show('Server unavailable', 'danger',);
            } else if (error.status === 401) {
                if (isLoginRequest) {
                    alert.show(error.error?.message ?? 'Incorrect credentials', 'danger',);
                } else {
                    alert.show('Session expired', 'warning');

                    authService.clearSession();
                    router.navigate(['/unauthorized']);
                }
            } else if (error.status === 403) {
                alert.show(error.error?.message ?? 'Access denied', 'danger',);
                router.navigate(['/not-authorized']);
            } else if (error.status === 404) {
                alert.show(error.error?.message ?? 'Ressource introuvable.', 'warning',);
            } else if (error.status >= 500) {
                alert.show(error.error?.message ?? 'Erreur serveur.', 'danger',);
            }

            return throwError(() => error);
        }),
    );
};