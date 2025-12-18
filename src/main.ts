import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';


import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(IonicStorageModule.forRoot()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
});

