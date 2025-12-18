import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // Holds the real storage DB after it is created.
  private db: Storage | null = null;

  // Completes when storage is ready to use.
  private ready: Promise<void>;

  constructor(private storage: Storage) {
    // Start initialisation immediately and store the Promise so we can await it later.
    this.ready = this.init();
  }

  private async init(): Promise<void> {
    // Creates/opens the underlying storage.
    this.db = await this.storage.create();
  }

  async set(key: string, value: any): Promise<void> {
    // Waiting until storage is created.
    await this.ready;
    await this.db!.set(key, value);
  }

  async get<T>(key: string): Promise<T | null> {
    // Waiting until storage is created.
    await this.ready;
    const value = await this.db!.get(key);
    return value ?? null;
  }

  async remove(key: string): Promise<void> {
    // Wait until storage is created before using it.
    await this.ready;
    await this.db!.remove(key);
  }
}
