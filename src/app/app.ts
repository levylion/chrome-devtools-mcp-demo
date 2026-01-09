import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavSidebarComponent } from './shared/components/nav-sidebar/nav-sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavSidebarComponent],
  template: `
    <div class="app-container">
      <app-nav-sidebar />
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: []
})
export class App {
}
