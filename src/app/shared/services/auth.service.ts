import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthState {
  accessToken: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authStateKey = 'auth';

  private readonly url = 'https://accounts.spotify.com/api/token';
  readonly #httClient = inject(HttpClient);

  getAuthState(): AuthState | undefined {
    const authState = localStorage.getItem(this.authStateKey);

    return authState ? JSON.parse(authState) : undefined;
  }

  setAuthState(authState: AuthState) {
    localStorage.setItem(this.authStateKey, JSON.stringify(authState));
  }

  getToken() {
    return this.#httClient
      .post<{ access_token: string; expires_in: number }>(this.url, null, {
        headers: {
          Authorization: `Basic ${btoa(
            `${environment.clientId}:${environment.clientSecret}`
          )}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'client_credentials',
        },
      })
      .pipe(
        tap(({ access_token, expires_in }) =>
          this.setAuthState({
            accessToken: access_token,
            expiresIn: dayjs().add(expires_in, 's').toISOString(),
          })
        )
      );
  }
}
