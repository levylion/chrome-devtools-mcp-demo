import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<{username: string, role: string} | null>(null);

  constructor() {
    this.checkSession();
  }

  checkSession() {
    const user = sessionStorage.getItem('user_details');
    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }

  login(password: string) {
    // INTENTIONAL SECURITY BUG: Storing sensitive data in sessionStorage
    // MCP Scenario: Security Vulnerability
    sessionStorage.setItem('api_key', 'sk-live-brewing-secret-key-12345');
    sessionStorage.setItem('user_password', password); // Plain text password!
    sessionStorage.setItem('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.unsafe.token');
    
    const user = { username: 'BrewMaster', role: 'admin' };
    sessionStorage.setItem('user_details', JSON.stringify(user));
    this.currentUser.set(user);
    
    console.log('Logged in successfully');
  }

  logout() {
    sessionStorage.clear();
    this.currentUser.set(null);
  }
}
