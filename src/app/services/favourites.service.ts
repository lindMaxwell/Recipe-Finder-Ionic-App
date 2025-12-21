import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class FavouritesService {
  private readonly KEY = 'favouriteRecipeIds';

  // Live list of favourite IDs for the whole app
  private readonly idsSubject = new BehaviorSubject<number[]>([]);
  readonly ids$ = this.idsSubject.asObservable();

  private loaded = false;

  constructor(private storage: StorageService) {}

  /** Call once or a few times to load from Storage into memory */
  async init(): Promise<void> {
    if (this.loaded) return;
    this.loaded = true;

    const ids = await this.storage.get<number[]>(this.KEY);
    this.idsSubject.next(Array.isArray(ids) ? ids : []);
  }

  /** Always returns latest in-memory ids */
  private get currentIds(): number[] {
    return this.idsSubject.value;
  }

  async isFavourite(id: number): Promise<boolean> {
    await this.init();
    return this.currentIds.includes(id);
  }

  async getIds(): Promise<number[]> {
    await this.init();
    return this.currentIds;
  }

  async add(id: number): Promise<void> {
    await this.init();
    const ids = this.currentIds;

    if (!ids.includes(id)) {
      const next = [...ids, id];
      this.idsSubject.next(next);
      await this.storage.set(this.KEY, next);
    }
  }

  async remove(id: number): Promise<void> {
    await this.init();
    const next = this.currentIds.filter(x => x !== id);
    this.idsSubject.next(next);
    await this.storage.set(this.KEY, next);
  }

  async toggle(id: number): Promise<boolean> {
    await this.init();
    if (this.currentIds.includes(id)) {
      await this.remove(id);
      return false;
    } else {
      await this.add(id);
      return true;
    }
  }

  async clear(): Promise<void> {
    await this.init();
    this.idsSubject.next([]);
    await this.storage.set(this.KEY, []);
  }
}
