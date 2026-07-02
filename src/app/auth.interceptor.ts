import { inject } from '@angular/core';
import { HttpRequest, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';

import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getAuthToken();

  let headers = req.headers;
  if (token) {
    headers = headers.set('Authorization', 'Bearer ' + token);
  }

  const clonedRequest = headers !== req.headers ? req.clone({ headers }) : req;

  return next(clonedRequest).pipe(
    tap({
      error: (err: unknown) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {
            authService.logout();
            router.navigate(['/login']);
          }
        }
      },
    }),
  );
}
