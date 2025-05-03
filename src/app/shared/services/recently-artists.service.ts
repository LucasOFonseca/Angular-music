import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist, ArtistPaginatedResponse } from '../models/artist.model';

@Injectable({
  providedIn: 'root',
})
export class RecentlyArtistsService {
  private readonly baseUrl = environment.apiUrl;
  readonly #httpClient = inject(HttpClient);

  recentlyArtistsIds: string[] = [];

  recentlyArtists = signal<Artist[] | null>(null);
  relatedArtists = signal<Artist[] | null>(null);

  constructor() {
    this.recentlyArtistsIds = JSON.parse(
      localStorage.getItem('recentlyArtistsIds') || '[]'
    );
  }

  hasRecentlyArtists() {
    return this.recentlyArtistsIds.length > 0;
  }

  addArtist(id: string) {
    this.recentlyArtistsIds = this.recentlyArtistsIds.filter(
      (artist) => artist !== id
    );

    this.recentlyArtistsIds.unshift(id);

    if (this.recentlyArtistsIds.length > 5) {
      this.recentlyArtistsIds.pop();
    }

    localStorage.setItem(
      'recentlyArtistsIds',
      JSON.stringify(this.recentlyArtistsIds)
    );
  }

  getArtists() {
    return this.#httpClient
      .get<{ artists: Artist[] }>(`${this.baseUrl}/artists`, {
        params: { ids: this.recentlyArtistsIds.join(',') },
      })
      .pipe(tap(({ artists }) => this.recentlyArtists.set(artists)));
  }

  getRelatedArtists() {
    const randomIndex = Math.floor(Math.random() * 5);
    const nameToSearch = this.recentlyArtists()?.[randomIndex].name ?? '';

    return this.#httpClient
      .get<{ artists: ArtistPaginatedResponse }>(`${this.baseUrl}/search`, {
        params: {
          q: encodeURIComponent(nameToSearch),
          limit: 5,
          offset: 1,
          type: 'artist',
        },
      })
      .pipe(tap(({ artists }) => this.relatedArtists.set(artists.items)));
  }
}
