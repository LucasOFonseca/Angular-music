import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArtistPaginatedResponse } from '../models/artist.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly baseUrl = environment.apiUrl;
  readonly #httpClient = inject(HttpClient);

  artistsData = signal<ArtistPaginatedResponse | null>(null);

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
}
