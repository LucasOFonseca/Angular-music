import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import * as dayjs from 'dayjs';
import { map, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/token')) return next(req);

  const authService = inject(AuthService);

  const authState = authService.getAuthState();

  const token$ =
    !authState || (authState.expiresIn && dayjs(authState.expiresIn).isBefore())
      ? authService.getToken().pipe(map(({ access_token }) => access_token))
      : of(authState.accessToken);

  return token$.pipe(
    switchMap((token) =>
      next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
    )
  );
};
