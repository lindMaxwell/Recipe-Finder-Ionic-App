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
  IonBackButton,
  IonButtons
 
} from '@ionic/angular/standalone';



import { RecipeService } from '../../services/recipe.service';
import { RecipeDetailsResponse } from '../../services/recipe.models';
import { SettingsService, MeasurementUnit } from '../../services/settings.service';

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
    IonBackButton,
    IonButtons
  ],
})
export class RecipeDetailsPage implements OnInit {
  recipe?: RecipeDetailsResponse;

  unit: MeasurementUnit = 'metric';   
  useMetric = true;

  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private settingsService: SettingsService
  ) {}

  async ngOnInit(): Promise<void> {
    const idFromUrl = Number(this.route.snapshot.paramMap.get('id'));

    if (!idFromUrl) {
      this.errorMessage = 'Invalid recipe id in the URL.';
      this.isLoading = false;
      return;
    }

    await this.loadPage(idFromUrl);
  }

  private async loadPage(id: number): Promise<void> {
    // Read the saved setting from storage
    this.unit = await this.settingsService.getUnit();
    this.useMetric = this.unit === 'metric';

    // Now load recipe details (PASS unit into service)
    this.recipeService.getRecipeDetailsById(id, this.unit).subscribe({
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
      stripHtml(html: string | undefined | null): string {
      return (html || '').replace(/<[^>]+>/g, '');
  }

}


