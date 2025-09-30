import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'wedding_auth_state';
  
  isAuthenticated = signal<boolean>(false);

  constructor() {
    this.loadAuthState();
    // Effect to save state changes to localStorage
    effect(() => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(this.isAuthenticated()));
      }
    });
  }

  private loadAuthState() {
    if (typeof localStorage !== 'undefined') {
      const authState = localStorage.getItem(this.AUTH_KEY);
      if (authState) {
        this.isAuthenticated.set(JSON.parse(authState));
      }
    }
  }

  // Simulate login
  login(email: string, password: string):boolean {
    // In a real app, this would be an API call
    if (email === 'olivia@example.com' && password === 'password123') {
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
  }
}
