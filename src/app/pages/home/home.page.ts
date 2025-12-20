import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { RecipeSearchResult } from '../../services/recipe.models';
import {
  IonButton,
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
//import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';




@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonInput, IonButton,
  IonList, IonItem, IonLabel,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonImg,
  IonSpinner,
  //RouterLink,
  CommonModule, FormsModule
]

})

export class HomePage implements OnInit {

  // User types ingredients here.
  ingredientsText: string = '';

  // Holds the recipes returned from Spoonacular.
  recipes: RecipeSearchResult[] = [];

  // Simple flags feedback
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private recipeService: RecipeService, private router: Router) {}

  openDetails(id: number) {
    this.router.navigate(['/recipe-details', id]);
  }

  ngOnInit() {
    
  }

  /**
   * This will be called when the user presses Search.
   * It sends ingredients to Spoonacular and stores results in recipes.
   */
  searchRecipes(): void {
    // Clear old messages
    this.errorMessage = '';

    // Trim extra spaces 
    const query = this.ingredientsText.trim();

    // Don't call the API with empty input
    if (query.length === 0) {
      this.errorMessage = 'Please enter at least one ingredient.';
      this.recipes = [];
      return;
    }

    // Show loading
    this.isLoading = true;
    this.recipes = [];

    // Call the service 
    this.recipeService.searchRecipesByIngredients(query).subscribe({
      next: (data) => {
        // Save results so they can be displayed
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

 

  /**
   * Clears the input and results.
   */
  clearSearch(): void {
    this.ingredientsText = '';
    this.recipes = [];
    this.errorMessage = '';
  }
}



