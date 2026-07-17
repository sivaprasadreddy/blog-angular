import { Injectable, signal } from '@angular/core';
import { CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse } from './models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly TOKEN_KEY = 'token';
  private static readonly AUTH_KEY = 'auth';
  private static readonly LOGIN_PATH = '/api/login';
  private static readonly USERS_PATH = '/api/users';

  private readonly apiBaseUrl = environment.apiBaseUrl;

  private _loggedIn = signal<boolean>(!!localStorage.getItem(AuthService.TOKEN_KEY));
  readonly loggedIn = this._loggedIn.asReadonly();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiBaseUrl}${AuthService.LOGIN_PATH}`,
      credentials,
    );
  }

  register(request: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${this.apiBaseUrl}${AuthService.USERS_PATH}`,
      request,
    );
  }

  setAuthUser(loginResponse: LoginResponse): void {
    localStorage.setItem(AuthService.TOKEN_KEY, loginResponse.token);
    localStorage.setItem(AuthService.AUTH_KEY, JSON.stringify(loginResponse));
    this._loggedIn.set(true);
  }

  isLoggedIn(): boolean {
    return this._loggedIn();
  }

  loginUserName(): string {
    const auth = localStorage.getItem(AuthService.AUTH_KEY);
    if (auth) {
      const authJson = JSON.parse(auth) as LoginResponse;
      return authJson.name;
    }
    return '';
  }

  loginUserId(): number | null {
    const auth = localStorage.getItem(AuthService.AUTH_KEY);
    if (auth) {
      const authJson = JSON.parse(auth) as LoginResponse;
      return authJson.userId;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(AuthService.AUTH_KEY);
    localStorage.removeItem(AuthService.TOKEN_KEY);
    this._loggedIn.set(false);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }
}
