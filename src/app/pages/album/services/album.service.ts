import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Album } from 'src/app/shared/models/album.model';
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
}
