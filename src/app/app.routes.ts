import { Routes } from '@angular/router';


export const routes: Routes = [
  // If the user goes to the base URL, send them to /home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Home page (search recipes)
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },

  // Recipe details page
  {
    path: 'recipe-details/:id',
    loadComponent: () =>
      import('./pages/recipe-details/recipe-details.page').then(
       (m) => m.RecipeDetailsPage
     ),
  },

  // Favourites page
  {
    path: 'favourites',
    loadComponent: () =>
      import('./pages/favourites/favourites.page').then((m) => m.FavouritesPage),
  },

  // Settings page
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
  },
];
