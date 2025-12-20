import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  RecipeSearchResponse,
  RecipeDetailsResponse,
} from './recipe.models';

/**
 * This services will:
 * - talk to Spoonacular
 * - return data to pages (Home page, Recipe Details page)
 */
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // Spoonacular API key
  private readonly apiKey = '70759a4f7911402abcc53d3c51d3b759';

  // URL for Spoonacular API calls
  private readonly baseUrl = 'https://api.spoonacular.com';

  constructor(private http: HttpClient) {}

  
   // Search recipes by ingredients.
   
  searchRecipesByIngredients(ingredients: string): Observable<RecipeSearchResponse> {
    // Build query string parameters 
    const params = new HttpParams()
      .set('query', ingredients)
      .set('apiKey', this.apiKey);

    // Make the GET request and return the observable to the page
    return this.http.get<RecipeSearchResponse>(
      `${this.baseUrl}/recipes/complexSearch`,
      { params }
    );
  }

  
   //Get full recipe details (ingredients + instructions).
   
  getRecipeDetailsById(id: number): Observable<RecipeDetailsResponse> {
    const params = new HttpParams().set('apiKey', this.apiKey);

    return this.http.get<RecipeDetailsResponse>(
      `${this.baseUrl}/recipes/${id}/information`,
      { params }
    );
  }
}
