import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from 'src/app/shared/services/artist.service';
import { RecentlyArtistsService } from 'src/app/shared/services/recently-artists.service';
import { CardSkeletonComponent } from '../../shared/components/card-skeleton/card-skeleton.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ArtistCardComponent,
    SearchBarComponent,
    PaginationComponent,
    CardSkeletonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent {
  readonly #artistService = inject(ArtistService);
  readonly #recentlyArtistsService = inject(RecentlyArtistsService);

  readonly artistsData = this.#artistService.artistsData;
  isLoadingArtists = false;

  readonly popularArtists = this.#artistService.popularArtists;
  isLoadingPopularArtists = false;

  readonly recentlyArtists = this.#recentlyArtistsService.recentlyArtists;
  isLoadingRecentlyArtists = false;

  readonly relatedArtists = this.#recentlyArtistsService.relatedArtists;
  isLoadingRelatedArtists = false;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const q = params.get('q');
      const page = params.get('page');

      if (q) {
        this.isLoadingArtists = true;

        this.#artistService
          .searchArtists(q, Number(page))
          .subscribe({ complete: () => (this.isLoadingArtists = false) });
      } else this.#artistService.cleanArtistsData();
    });
  }

  ngOnInit() {
    this.isLoadingPopularArtists = true;

    this.#artistService
      .getPopularArtists()
      .subscribe({ complete: () => (this.isLoadingPopularArtists = false) });

    if (this.#recentlyArtistsService.hasRecentlyArtists()) {
      this.isLoadingRecentlyArtists = true;

      this.#recentlyArtistsService.getArtists().subscribe({
        complete: () => (this.isLoadingRecentlyArtists = false),
        next: () => {
          this.isLoadingRelatedArtists = true;

          this.#recentlyArtistsService.getRelatedArtists().subscribe({
            complete: () => (this.isLoadingRelatedArtists = false),
          });
        },
      });
    }
  }

  trackByArtist(_: number, artist: { id: string }) {
    return artist.id;
  }
}
