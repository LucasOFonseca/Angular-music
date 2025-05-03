import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist, ArtistPaginatedResponse } from '../models/artist.model';

const popularArtists = [
  'Bruno Mars',
  'The Weeknd',
  'Lady Gaga',
  'Billie Eilish',
  'Coldplay',
  'Kendrick Lamar',
  'Rihanna',
  'Ed Sheeran',
  'Ariana Grande',
  'Taylor Swift',
  'Bad Bunny',
  'SZA',
  'Drake',
  'Justin Bieber',
  'David Guetta',
  'Post Malone',
  'Dua Lipa',
  'Eminem',
  'Calvin Harris',
  'BTS',
];

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly baseUrl = environment.apiUrl;
  readonly #httpClient = inject(HttpClient);

  artistsData = signal<ArtistPaginatedResponse | null>(null);
  popularArtists = signal<Artist[] | null>(null);

  cleanArtistsData() {
    this.artistsData.set(null);
  }

  searchArtists(q: string, page = 1) {
    return this.#httpClient
      .get<{ artists: ArtistPaginatedResponse }>(`${this.baseUrl}/search`, {
        params: {
          q,
          offset: (page - 1) * 20,
          type: 'artist',
        },
      })
      .pipe(tap(({ artists }) => this.artistsData.set(artists)));
  }

  getPopularArtists() {
    const randomIndex = Math.floor(Math.random() * popularArtists.length);
    const q = encodeURIComponent(popularArtists[randomIndex]);

    return this.#httpClient
      .get<{ artists: ArtistPaginatedResponse }>(`${this.baseUrl}/search`, {
        params: {
          q,
          limit: 10,
          type: 'artist',
        },
      })
      .pipe(tap(({ artists }) => this.popularArtists.set(artists.items)));
  }
}
