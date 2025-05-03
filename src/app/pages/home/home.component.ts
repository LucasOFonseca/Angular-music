import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from 'src/app/shared/services/artist.service';
import { RecentlyArtistsService } from 'src/app/shared/services/recently-artists.service';
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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HomeComponent {
  readonly #artistService = inject(ArtistService);
  readonly #recentlyArtistsService = inject(RecentlyArtistsService);

  readonly artistsData = this.#artistService.artistsData;
  readonly popularArtists = this.#artistService.popularArtists;
  readonly recentlyArtists = this.#recentlyArtistsService.recentlyArtists;
  readonly relatedArtists = this.#recentlyArtistsService.relatedArtists;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const q = params.get('q');
      const page = params.get('page');

      if (q) {
        this.#artistService.searchArtists(q, Number(page)).subscribe();
      } else this.#artistService.cleanArtistsData();
    });
  }

  ngOnInit() {
    this.#artistService.getPopularArtists().subscribe();

    if (this.#recentlyArtistsService.hasRecentlyArtists()) {
      this.#recentlyArtistsService.getArtists().subscribe(() => {
        this.#recentlyArtistsService.getRelatedArtists().subscribe();
      });
    }
  }

  trackByArtist(_: number, artist: { id: string }) {
    return artist.id;
  }
}
