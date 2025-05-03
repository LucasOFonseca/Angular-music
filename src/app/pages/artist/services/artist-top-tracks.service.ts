import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Track } from 'src/app/shared/models/track.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistTopTracksService {
  private readonly baseUrl = environment.apiUrl;
  readonly #httpClient = inject(HttpClient);

  topTracks = signal<Track[] | null>(null);

  getArtistTopTracks(artistId: string) {
    return this.#httpClient
      .get<{ tracks: Track[] }>(
        `${this.baseUrl}/artists/${artistId}/top-tracks`
      )
      .pipe(tap(({ tracks }) => this.topTracks.set(tracks)));
  }
}
