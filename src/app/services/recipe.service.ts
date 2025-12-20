import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RecipeSearchResponse, RecipeDetailsResponse } from './recipe.models';
import type { MeasurementUnit } from './settings.service'; 

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiKey: string = '70759a4f7911402abcc53d3c51d3b759';
  private readonly baseUrl = 'https://api.spoonacular.com';

  constructor(private http: HttpClient) {}

  // Search recipes 
  searchRecipesByIngredients(ingredients: string): Observable<RecipeSearchResponse> {
    const params = new HttpParams()
      .set('query', ingredients)
      .set('apiKey', this.apiKey)
      .set('number', '10')
      .set('addRecipeInformation', 'false');

    return this.http.get<RecipeSearchResponse>(
      `${this.baseUrl}/recipes/complexSearch`,
      { params }
    );
  }

  // Get full recipe details (ingredients + instructions)
  getRecipeDetailsById(
    id: number,
    unit: MeasurementUnit | 'metric' | 'us' = 'metric'
  ): Observable<RecipeDetailsResponse> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('includeNutrition', 'false')
      .set('units', unit);

    return this.http.get<RecipeDetailsResponse>(
      `${this.baseUrl}/recipes/${id}/information`,
      { params }
    );
  }
}

