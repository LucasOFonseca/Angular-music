import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Album } from 'src/app/shared/models/album.model';
import { PaginatedData } from 'src/app/shared/models/paginated-data.model';
import { SimplifiedTrack } from 'src/app/shared/models/track.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private readonly baseUrl = environment.apiUrl;
  readonly #httpClient = inject(HttpClient);

  album = signal<Album | null>(null);

  getAlbum(id: string) {
    return this.#httpClient
      .get<Album>(`${this.baseUrl}/albums/${id}`)
      .pipe(tap((res) => this.album.set(res)));
  }

  getNextTracks() {
    return this.#httpClient
      .get<PaginatedData<SimplifiedTrack>>(this.album()?.tracks.next ?? '')
      .pipe(
        tap((res) =>
          this.album.update((curr) =>
            curr
              ? {
                  ...curr,
                  tracks: {
                    ...res,
                    items: [...(curr?.tracks.items ?? []), ...res.items],
                  },
                }
              : null
          )
        )
      );
  }
}
