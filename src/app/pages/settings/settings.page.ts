import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';


import { IonicModule } from '@ionic/angular';
import { SettingsService, MeasurementUnit } from '../../services/settings.service';



@Component({
  selector: 'app-settings',
  standalone: true,
  // Imported IonicModule for Ionic components (ion-list, ion-radio, etc.)
  // Imported FormsModule for [(ngModel)] two-way binding.
  imports: [IonicModule, FormsModule],
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  
   // When the user changes the button selection, this value updates automatically.
   
  selectedUnit: MeasurementUnit = 'metric';

  constructor(private settingsService: SettingsService) {}

  
   //This runs EVERY time the page is about to be shown.
   
  async ionViewWillEnter(): Promise<void> {
    this.selectedUnit = await this.settingsService.getUnit();
  }

  /**
   * This runs when the radio selection changes.
   * Saves the new selection to storage so it stays after closing the app.
   */
  async onUnitChanged(): Promise<void> {
    await this.settingsService.setUnit(this.selectedUnit);
  }
}