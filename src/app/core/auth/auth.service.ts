import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken = 'BEE_JEE_TOKEN';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(this.authToken, token);
  }

  getToken(): string {
    try {
      return localStorage.getItem(this.authToken);
    } catch {
      return null as string;
    }
  }

  logout(): void {
    localStorage.removeItem(this.authToken);
  }
}
