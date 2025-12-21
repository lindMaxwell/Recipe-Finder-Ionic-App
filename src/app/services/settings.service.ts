import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';


export type MeasurementUnit = 'metric' | 'us';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  // The key name used in ionic Storage 
  private readonly STORAGE_KEY = 'measurementUnit';

  constructor(private storageService: StorageService) {}

  
   //Get the measurement unit from storage.
   
  async getUnit(): Promise<MeasurementUnit> {
    // Try to read the saved value.
    const saved = await this.storageService.get<MeasurementUnit>(this.STORAGE_KEY);

    // Check what came back
    if (saved === 'metric' || saved === 'us') {
      return saved;
    }

    // If null (first run) or invalid, default to metric.
    return 'metric';
  }

  /**
   * Save the selected measurement unit to storage.
   * Keep the same even after the app closes.
   */
  async setUnit(newUnit: MeasurementUnit): Promise<void> {
    await this.storageService.set(this.STORAGE_KEY, newUnit);
  }
}

