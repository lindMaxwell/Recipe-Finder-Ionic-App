import { importProvidersFrom } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { heartOutline, settingsOutline } from 'ionicons/icons';




import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

addIcons({
  'heart-outline': heartOutline,
  'settings-outline': settingsOutline,
});


bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),

    //Allows HttpClient to work services and pages
    provideHttpClient(),

    importProvidersFrom(IonicStorageModule.forRoot()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
});

