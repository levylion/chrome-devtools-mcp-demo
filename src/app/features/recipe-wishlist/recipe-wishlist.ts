import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RecipeService, Recipe } from '../../core/services/recipe';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-recipe-wishlist',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div class="wishlist-page">
      <h2>Recipe Wishlist</h2>
      <p>Explore community recipes for your next brew.</p>

      <div class="recipes-grid">
        @if (recipes$ | async; as recipes) {
          @for (recipe of recipes; track recipe.id) {
            <div class="card recipe-card">
              <h3>{{ recipe.name }}</h3>
              <p>{{ recipe.style }}</p>
              <div class="difficulty">{{ recipe.difficulty }}</div>
              <button class="btn btn-primary">Add to Queue</button>
            </div>
          }
          @if (recipes.length === 0) {
            <div class="loading">Loading recipes from cloud...</div>
          }
        } @else {
          <!-- We might see this if we handle error, but for the bug we want it to fail silently or log to console -->
          <div class="error-state">
            Failed to load recipes. Check console for details.
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .wishlist-page { padding: 1rem; }
    .recipes-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .recipe-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .difficulty {
      font-size: 0.8rem;
      background: rgba(255,255,255,0.1);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      align-self: flex-start;
    }
  `]
})
export class RecipeWishlistComponent {
  private recipeService = inject(RecipeService);

  // The error will be visible in Network tab and Console
  recipes$ = this.recipeService.getRecipes().pipe(
    catchError(err => {
      console.error('Error loading recipes:', err);
      return of([]); // Return empty to not crash UI, but show empty state
    })
  );
}
