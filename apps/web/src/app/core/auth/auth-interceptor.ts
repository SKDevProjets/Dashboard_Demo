import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '@config/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isApiRequest = req.url.startsWith(environment.apiUrl);

  let headers = req.headers.set(
    'X-Requested-With',
    'XMLHttpRequest',
  );

  const token = authService.getValidToken();

  if (isApiRequest && token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return next(req.clone({ headers }));
};