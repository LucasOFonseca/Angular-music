import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimplifiedAlbum } from 'src/app/shared/models/album.model';
import { CardSkeletonComponent } from '../../../../shared/components/card-skeleton/card-skeleton.component';
import { CircularLoadingComponent } from '../../../../shared/components/circular-loading/circular-loading.component';
import { ArtistAlbumsService } from '../../services/artist-albums.service';
import { AlbumCardComponent } from '../album-card/album-card.component';

@Component({
  selector: 'app-artist-albums-section',
  standalone: true,
  imports: [
    AlbumCardComponent,
    NgIf,
    NgFor,
    AsyncPipe,
    CircularLoadingComponent,
    CardSkeletonComponent,
  ],
  templateUrl: './artist-albums-section.component.html',
  styleUrls: ['./artist-albums-section.component.scss'],
})
export class ArtistAlbumsSectionComponent {
  readonly #artistAlbumsService = inject(ArtistAlbumsService);

  artistId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

  albums$ = this.#artistAlbumsService.getArtistAlbums(this.artistId);
  albums = this.#artistAlbumsService.albums;
  isLoadingAlbums = this.#artistAlbumsService.isLoading;
  isLoadingMore = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  trackByAlbum(_: number, { id }: SimplifiedAlbum) {
    return id;
  }

  loadMore() {
    this.isLoadingMore = true;

    this.#artistAlbumsService.getNext().subscribe({
      complete: () => (this.isLoadingMore = false),
    });
  }
}
