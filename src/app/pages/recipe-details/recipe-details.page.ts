import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';

import { RecipeService } from '../../services/recipe.service';
import { RecipeDetailsResponse } from '../../services/recipe.models';
import { SettingsService } from '../../services/settings.service';


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
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonSpinner,
  ],
})
export class RecipeDetailsPage implements OnInit {

  // Holds the recipe returned from the API
  recipe?: RecipeDetailsResponse;
  useMetric = true;

  // Loading flag
  isLoading: boolean = true;

  // Store an error message if something fails
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
  const idFromUrl = Number(this.route.snapshot.paramMap.get('id'));

  if (!idFromUrl) {
    this.errorMessage = 'Invalid recipe id in the URL.';
    this.isLoading = false;
    return;
  }

  this.loadPage(idFromUrl);
}

private async loadPage(id: number): Promise<void> {
  // Read the saved setting from storage
  const unit = await this.settingsService.getUnit();
  this.useMetric = unit === 'metric';

  // Now load recipe details
  this.recipeService.getRecipeDetailsById(id).subscribe({
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

}

