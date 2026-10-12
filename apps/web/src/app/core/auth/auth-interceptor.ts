import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  let headers = req.headers.set(
    'X-Requested-With',
    'XMLHttpRequest'
  );

  if (token) {
    headers = headers.set(
      'Authorization',
      `Bearer ${token}`
    );
  }

  return next(
    req.clone({ headers })
  );

};
