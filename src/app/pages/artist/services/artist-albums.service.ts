import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { SimplifiedAlbumPaginatedResponse } from 'src/app/shared/models/album.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistAlbumsService {
  private readonly baseUrl = environment.apiUrl;
  readonly #httpClient = inject(HttpClient);

  albums = signal<SimplifiedAlbumPaginatedResponse | null>(null);
  isLoading = signal(false);

  getArtistAlbums(artistId: string) {
    this.isLoading.set(true);

    return this.#httpClient
      .get<SimplifiedAlbumPaginatedResponse>(
        `${this.baseUrl}/artists/${artistId}/albums`,
        { params: { limit: 8 } }
      )
      .pipe(
        tap((res) => {
          this.isLoading.set(false);

          this.albums.set(res);
        })
      );
  }

  getNext() {
    return this.#httpClient
      .get<SimplifiedAlbumPaginatedResponse>(this.albums()?.next ?? '')
      .pipe(
        tap((res) =>
          this.albums.update((curr) => ({
            ...res,
            items: [...(curr?.items ?? []), ...res.items],
          }))
        )
      );
  }
}
