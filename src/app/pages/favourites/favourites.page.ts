import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonSpinner,
  IonTitle,
  IonToolbar,
 // IonButtons,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

import { Subscription, forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { FavouritesService } from '../../services/favourites.service';
import { RecipeService } from '../../services/recipe.service';
import { RecipeDetailsResponse } from '../../services/recipe.models';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    //IonButtons,

    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonImg,
    IonSpinner,
  ],
})
export class FavouritesPage implements OnInit, OnDestroy {
  favouriteRecipes: RecipeDetailsResponse[] = [];
  isLoading = true;
  errorMessage = '';
  empty = false;

  private sub?: Subscription;

  constructor(
    private favouritesService: FavouritesService,
    private recipeService: RecipeService,
    private router: Router
  ) {
    addIcons({ trashOutline });
  }

  async ngOnInit(): Promise<void> {
    await this.favouritesService.init();

    // If user removes elsewhere, page updates too
    this.sub = this.favouritesService.ids$.subscribe(() => {
      this.loadFavourites();
    });

    await this.loadFavourites();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  async loadFavourites(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.empty = false;
    this.favouriteRecipes = [];

    const ids = await this.favouritesService.getIds();

    if (ids.length === 0) {
      this.isLoading = false;
      this.empty = true;
      return;
    }

    const calls = ids.map((id) =>
      this.recipeService.getRecipeDetailsById(id).pipe(
        catchError((err) => {
          console.error('Failed to load favourite recipe', id, err);
          return of(null);
        })
      )
    );

    forkJoin(calls).subscribe({
      next: (results) => {
        this.favouriteRecipes = (results.filter(Boolean) as RecipeDetailsResponse[])
          .sort((a, b) => a.title.localeCompare(b.title));

        this.empty = this.favouriteRecipes.length === 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load favourites.';
        this.isLoading = false;
      },
    });
  }

  openDetails(id: number): void {
    this.router.navigate(['/recipe-details', id]);
  }

  async removeFromFavourites(id: number): Promise<void> {
    await this.favouritesService.remove(id);
    // UI will refresh 
    this.favouriteRecipes = this.favouriteRecipes.filter((r) => r.id !== id);
    this.empty = this.favouriteRecipes.length === 0;
  }
}

