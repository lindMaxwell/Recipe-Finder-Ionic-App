import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

import { RecipeService } from '../../services/recipe.service';
import { RecipeDetailsResponse } from '../../services/recipe.models';
import { SettingsService, MeasurementUnit } from '../../services/settings.service';
import { FavouritesService } from '../../services/favourites.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonImg,
    IonSpinner,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class RecipeDetailsPage implements OnInit {
  recipe?: RecipeDetailsResponse;

  isLoading = true;
  errorMessage = '';

  unit: MeasurementUnit = 'metric';
  isFav = false;

  private recipeId = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private settingsService: SettingsService,
    private favouritesService: FavouritesService
  ) {
    addIcons({ heart, heartOutline });
  }

  async ngOnInit(): Promise<void> {
    await this.favouritesService.init();

    const idFromUrl = Number(this.route.snapshot.paramMap.get('id'));
    if (!idFromUrl) {
      this.errorMessage = 'Invalid recipe id in the URL.';
      this.isLoading = false;
      return;
    }
    this.recipeId = idFromUrl;

    // Load unit + favourite state first (fast)
    this.unit = await this.settingsService.getUnit();
    this.isFav = await this.favouritesService.isFavourite(this.recipeId);

    // Load details using unit
    this.recipeService.getRecipeDetailsById(this.recipeId, this.unit).subscribe({
      next: (data) => {
        this.recipe = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Failed to load recipe details.';
        this.isLoading = false;
      },
    });
  }

  async toggleFavourite(): Promise<void> {
    this.isFav = await this.favouritesService.toggle(this.recipeId);
  }

  favButtonText(): string {
    return this.isFav ? 'Remove from favourites' : 'Add to favourites';
  }

  favIconName(): string {
    return this.isFav ? 'heart' : 'heart-outline';
  }

  stripHtml(html: string | undefined | null): string {
    return (html || '').replace(/<[^>]+>/g, '');
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}



