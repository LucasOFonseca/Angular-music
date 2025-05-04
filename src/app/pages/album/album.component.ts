import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrowLeftIcon, LucideAngularModule } from 'lucide-angular';
import { CircularLoadingComponent } from '../../shared/components/circular-loading/circular-loading.component';
import { TrackItemSkeletonComponent } from '../../shared/components/track-item-skeleton/track-item-skeleton.component';
import { TrackItemComponent } from '../../shared/components/track-item/track-item.component';
import { AlbumService } from './services/album.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    TrackItemComponent,
    LucideAngularModule,
    CircularLoadingComponent,
    TrackItemSkeletonComponent,
  ],
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent {
  readonly #albumService = inject(AlbumService);

  readonly ArrowLeftIcon = ArrowLeftIcon;

  readonly id = this.activatedRoute.snapshot.paramMap.get('id');
  readonly artistId = this.activatedRoute.snapshot.queryParamMap.get('artist');
  readonly album = this.#albumService.album;
  isLoadingAlbum = false;
  isLoadingTracks = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.id) {
      this.isLoadingAlbum = true;

      this.#albumService
        .getAlbum(this.id)
        .subscribe({ complete: () => (this.isLoadingAlbum = false) });
    }
  }

  goToArtist(id: string) {
    this.router.navigate(['artist', id]);
  }

  loadMoreTracks() {
    this.isLoadingTracks = true;

    this.#albumService.getNextTracks().subscribe({
      complete: () => (this.isLoadingTracks = false),
    });
  }

  back() {
    this.router.navigate(this.artistId ? ['artist', this.artistId] : [''], {
      queryParams: { artist: null },
      queryParamsHandling: 'merge',
    });
  }
}
