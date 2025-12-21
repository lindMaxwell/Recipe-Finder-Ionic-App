import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonButtons,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart, heartOutline, settings, settingsOutline } from 'ionicons/icons';

import { RecipeService } from '../../services/recipe.service';
import { RecipeSearchResult } from '../../services/recipe.models';
import { FavouritesService } from '../../services/favourites.service';

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
    IonTitle,
    IonToolbar,
    IonButtons,

    IonItem,
    IonLabel,
    IonInput,

    IonButton,
    IonIcon,

    IonList,
    IonCard,
    IonCardContent,
    IonImg,
    IonSpinner,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  ingredientsText: string = '';
  recipes: RecipeSearchResult[] = [];

  isLoading: boolean = false;
  errorMessage: string = '';
  noResults: boolean = false;

  // For UI toggles
  favouriteIds = new Set<number>();
  private favSub?: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private favouritesService: FavouritesService
  ) {
    addIcons({ heart, heartOutline, settings, settingsOutline });
  }

  async ngOnInit(): Promise<void> {
    await this.favouritesService.init();

    this.favSub = this.favouritesService.ids$.subscribe((ids) => {
      this.favouriteIds = new Set(ids);
    });
  }

  ngOnDestroy(): void {
    this.favSub?.unsubscribe();
  }

  //Navigation
  goToFavourites(): void {
    this.router.navigate(['/favourites']);
  }

  goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  openDetails(id: number): void {
    this.router.navigate(['/recipe-details', id]);
  }

  //Search
  searchRecipes(): void {
    this.errorMessage = '';
    this.noResults = false;

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
        this.recipes = data.results ?? [];
        this.noResults = this.recipes.length === 0;
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
    this.noResults = false;
  }

  //Favourites
  isFavourite(id: number): boolean {
    return this.favouriteIds.has(id);
  }

  async toggleFavourite(id: number): Promise<void> {
    await this.favouritesService.toggle(id);
    // UI updates 
  }

  favouriteButtonText(id: number): string {
    return this.isFavourite(id) ? 'Remove from favourites' : 'Add to favourites';
  }

  favouriteIconName(id: number): string {
    return this.isFavourite(id) ? 'heart' : 'heart-outline';
  }
}
