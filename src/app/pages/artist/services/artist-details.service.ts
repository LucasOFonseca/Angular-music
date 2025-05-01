import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Artist } from 'src/app/shared/models/artist.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistDetailsService {
  private readonly baseUrl = environment.apiUrl;
  readonly #httpClient = inject(HttpClient);

  artist = signal<Artist | null>(null);

  setArtistDetails(artist: Artist) {
    this.artist.set(artist);
  }

  getArtistDetails(id: string) {
    return this.#httpClient
      .get<Artist>(`${this.baseUrl}/artists/${id}`)
      .pipe(tap((res) => this.artist.set(res)));
  }
}
