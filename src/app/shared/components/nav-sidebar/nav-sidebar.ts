import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-nav-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="sidebar">
      <div class="logo">
        <span class="icon">🍺</span>
        <h1>BrewMaster<span class="highlight">Pro</span></h1>
      </div>

      <div class="user-info">
        @if (auth.currentUser(); as user) {
          <div class="avatar">BM</div>
          <div class="details">
            <span class="name">{{ user.username }}</span>
            <span class="role">{{ user.role }}</span>
          </div>
        } @else {
          <button class="btn btn-primary w-full" (click)="login()">Login</button>
        }
      </div>

      <ul class="nav-links">
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <span class="icon">📊</span> Dashboard
          </a>
        </li>
        <li>
          <a routerLink="/brew-log" routerLinkActive="active">
            <span class="icon">📜</span> Brew Log
          </a>
        </li>
        <li>
          <a routerLink="/recipe-wishlist" routerLinkActive="active">
            <span class="icon">📖</span> Recipes
          </a>
        </li>
        <li>
          <!-- Empty router link for demo page creation -->
          <a routerLink="/ingredients" routerLinkActive="active" class="demo-link">
            <span class="icon">🌾</span> Ingredients
          </a>
        </li>
        <li>
          <a routerLink="/secret-batch" routerLinkActive="active">
            <span class="icon">🎁</span> Secret Batch
          </a>
        </li>
      </ul>

      <div class="footer">
        <button class="btn btn-outline w-full" (click)="auth.logout()">
          <span class="icon">🚪</span> Logout
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .sidebar {
      height: 100vh;
      background: var(--bg-secondary);
      border-right: 1px solid var(--glass-border);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 2.5rem;
    }

    .logo h1 {
      font-size: 1.5rem;
      margin: 0;
      color: var(--text-primary);
    }

    .logo .highlight {
      color: var(--primary);
    }

    .user-info {
      background: rgba(0,0,0,0.2);
      padding: 1rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .avatar {
      width: 40px;
      height: 40px;
      background: var(--primary);
      color: #121212;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .details {
      display: flex;
      flex-direction: column;
    }

    .name { font-weight: 500; }
    .role { font-size: 0.8rem; color: var(--text-secondary); }

    .nav-links {
      list-style: none;
      flex: 1;
    }

    .nav-links li { margin-bottom: 0.5rem; }

    .nav-links a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.85rem 1rem;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: 8px;
      transition: all var(--transition-fast);
      border-left: 3px solid transparent;
    }

    .nav-links a:hover {
      background: rgba(255, 255, 255, 0.03);
      color: var(--text-primary);
    }

    .nav-links a.active {
      background: rgba(244, 162, 97, 0.1);
      color: var(--primary);
      border-left-color: var(--primary);
    }

    .demo-link {
      opacity: 0.5;
    }
    
    .w-full { width: 100%; }
  `]
})
export class NavSidebarComponent {
  auth = inject(AuthService);

  login() {
    this.auth.login('password123'); // Demo login
  }
}
