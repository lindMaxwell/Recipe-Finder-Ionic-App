import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButton, CommonModule, FormsModule]

})

export class HomePage implements OnInit {

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    // Empty for now
  }

  /**
   * Temporary test 
   */
  testApi(): void {
    // Example ingredients string 
    const ingredients = 'chicken, rice';

    this.recipeService.searchRecipesByIngredients(ingredients).subscribe({
      next: (data) => {
        console.log('Search results:', data);
      },
      error: (err) => {
        console.log('API error:', err);
      },
    });
  }
}


