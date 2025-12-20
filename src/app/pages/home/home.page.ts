import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { RecipeSearchResult, RecipeDetailsResponse } from '../../services/recipe.models';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { RouterLink, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,

    IonItem,
    IonLabel,
    IonInput,

    IonButton,

    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,

    IonSpinner,

    RouterLink,
  ],
})
export class HomePage implements OnInit {
  ingredientsText: string = '';
  recipes: RecipeSearchResult[] = [];

  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {}

  openDetails(id: number): void {
    this.router.navigate(['/recipe-details', id]);
  }

  searchRecipes(): void {
    this.errorMessage = '';

    const query = this.ingredientsText.trim();

    if (query.length === 0) {
      this.errorMessage = 'Please enter at least one ingredient.';
      this.recipes = [];
      return;
    }

    this.isLoading = true;
    this.recipes = [];

    this.recipeService.searchRecipesByIngredients(query).subscribe({
      next: (data) => {
        
        this.recipes = data.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('API error:', err);
        this.errorMessage = 'Something went wrong contacting Spoonacular.';
        this.isLoading = false;
      },
    });
  }

  clearSearch(): void {
    this.ingredientsText = '';
    this.recipes = [];
    this.errorMessage = '';
  }
}




