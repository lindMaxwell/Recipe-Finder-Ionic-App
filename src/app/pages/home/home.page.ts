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
  IonIcon
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart, heartOutline, settingsOutline } from 'ionicons/icons';
import { FavouritesService } from '../../services/favourites.service';

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
    IonIcon,
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

  // User input
  ingredientsText: string = '';

  // API results
  recipes: RecipeSearchResult[] = [];

  // UI state
  isLoading = false;
  errorMessage = '';

  // Favourite recipe IDs
  favourites = new Set<number>();

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private favouritesService: FavouritesService
  ) {
    addIcons({
      heart,
      heartOutline,
      settingsOutline
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadFavourites();
  }

  /** Load favourite recipe IDs */
  private async loadFavourites(): Promise<void> {
    const ids = await this.favouritesService.getIds();
    this.favourites = new Set(ids);
  }

  /** Search Spoonacular by ingredients */
  searchRecipes(): void {
    this.errorMessage = '';

    const query = this.ingredientsText.trim();
    if (!query) {
      this.errorMessage = 'Please enter at least one ingredient.';
      this.recipes = [];
      return;
    }

    this.isLoading = true;
    this.recipes = [];

    this.recipeService.searchRecipesByIngredients(query).subscribe({
      next: async (data) => {
        this.recipes = data.results;
        this.isLoading = false;
        await this.loadFavourites(); 
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to search recipes.';
        this.isLoading = false;
      },
    });
  }

  /** Clear input + results */
  clearSearch(): void {
    this.ingredientsText = '';
    this.recipes = [];
    this.errorMessage = '';
  }

  /** Navigate to recipe details */
  openDetails(id: number): void {
    this.router.navigate(['/recipe-details', id]);
  }

  /** Is recipe favourited */
  isFav(id: number): boolean {
    return this.favourites.has(id);
  }

  /** Toggle favourite on/off */
  async toggleFav(id: number): Promise<void> {
    const nowFav = await this.favouritesService.toggle(id);
    if (nowFav) {
      this.favourites.add(id);
    } else {
      this.favourites.delete(id);
    }
  }

  /** Header navigation */
  goToFavourites(): void {
    this.router.navigate(['/favourites']);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }
}



