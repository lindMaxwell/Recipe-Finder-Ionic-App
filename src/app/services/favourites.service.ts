import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private readonly KEY = 'favouriteRecipeIds';

  constructor(private storage: StorageService) {}

  async getIds(): Promise<number[]> {
    const ids = await this.storage.get<number[]>(this.KEY);
    return Array.isArray(ids) ? ids : [];
  }

  async isFavourite(id: number): Promise<boolean> {
    const ids = await this.getIds();
    return ids.includes(id);
  }

  async add(id: number): Promise<void> {
    const ids = await this.getIds();
    if (!ids.includes(id)) {
      ids.push(id);
      await this.storage.set(this.KEY, ids);
    }
  }

  async remove(id: number): Promise<void> {
    const ids = await this.getIds();
    const next = ids.filter(x => x !== id);
    await this.storage.set(this.KEY, next);
  }

  async toggle(id: number): Promise<boolean> {
    const ids = await this.getIds();
    if (ids.includes(id)) {
      await this.remove(id);
      return false;
    } else {
      await this.add(id);
      return true;
    }
  }

  async clear(): Promise<void> {
    await this.storage.set(this.KEY, []);
  }
}
