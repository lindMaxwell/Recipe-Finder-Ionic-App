import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
  IonIcon,
  IonSpinner,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

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
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonImg, IonButton, IonIcon, IonSpinner,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent
  ],
})
export class FavouritesPage implements OnInit {
  isLoading = true;
  errorMessage = '';
  recipes: RecipeDetailsResponse[] = [];

  constructor(
    private favouritesService: FavouritesService,
    private recipeService: RecipeService,
    private router: Router
  ) {
    addIcons({ trashOutline });
  }

  async ngOnInit() {
    await this.loadFavourites();
  }

  // Refresh page
  async ionViewWillEnter() {
    await this.loadFavourites();
  }

  async loadFavourites(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.recipes = [];

    try {
      const ids = await this.favouritesService.getIds();

      if (ids.length === 0) {
        this.isLoading = false;
        return;
      }

      // Load details for each favourite
      const requests = ids.map((id) =>
        this.recipeService.getRecipeDetailsById(id).toPromise()
      );

      const results = await Promise.all(requests);
      this.recipes = results.filter(Boolean) as RecipeDetailsResponse[];
    } catch (e) {
      console.error(e);
      this.errorMessage = 'Failed to load favourites.';
    } finally {
      this.isLoading = false;
    }
  }

  openDetails(id: number): void {
    this.router.navigate(['/recipe-details', id]);
  }

  async remove(id: number): Promise<void> {
    await this.favouritesService.remove(id);
    this.recipes = this.recipes.filter(r => r.id !== id);
  }
}

