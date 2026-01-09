import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  id: number;
  name: string;
  style: string;
  difficulty: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  // INTENTIONAL BUG: Network/CORS Error
  // Pointing to a domain that doesn't exist or blocks CORS on purpose
  // For demo: Using a non-existent port/domain to cause connection refused or 404
  private apiUrl = 'http://api.wrong-domain.local:9999/v1';

  getRecipes(): Observable<Recipe[]> {
    console.log('Fetching recipes from external API...');
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`);
  }
}
