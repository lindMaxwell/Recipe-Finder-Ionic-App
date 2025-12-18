import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Holds the real storage object after I initialise it.
  private db: Storage | null = null;

  constructor(private storage: Storage) {
    // Start initialising storage when service is created.
    this.init();
  }

  private async init(): Promise<void> {
    // Creates underlying storage.
    this.db = await this.storage.create();
  }

  async set(key: string, value: any): Promise<void> {
    // Save a value using a string key.
    await this.db?.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    // Read a value back. Returns null if it doesn't exist.
    const value = await this.db?.get(key);
    return value ?? null;
  }

  async remove(key: string): Promise<void> {
    // Remove one item from storage.
    await this.db?.remove(key);
  }
}
