import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrowLeftIcon, LucideAngularModule } from 'lucide-angular';
import { FollowersPipe } from 'src/app/shared/pipes/followers.pipe';
import { RecentlyArtistsService } from 'src/app/shared/services/recently-artists.service';
import { TrackItemComponent } from '../../shared/components/track-item/track-item.component';
import { ArtistAlbumsSectionComponent } from './components/artist-albums-section/artist-albums-section.component';
import { ArtistDetailsService } from './services/artist-details.service';
import { ArtistTopTracksService } from './services/artist-top-tracks.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    TitleCasePipe,
    FollowersPipe,
    LucideAngularModule,
    ArtistAlbumsSectionComponent,
    TrackItemComponent,
  ],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent {
  readonly #artistDetailsService = inject(ArtistDetailsService);
  readonly #artistTopTracksService = inject(ArtistTopTracksService);
  readonly #recentlyArtistsService = inject(RecentlyArtistsService);

  readonly ArrowLeftIcon = ArrowLeftIcon;

  readonly id = this.activatedRoute.snapshot.paramMap.get('id');
  readonly artist = this.#artistDetailsService.artist;
  readonly topTracks = this.#artistTopTracksService.topTracks;

  genres = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.artist()) {
      this.genres = this.artist()?.genres.join(' | ') || '';
    }

    if (this.id) {
      this.#recentlyArtistsService.addArtist(this.id);

      if (!this.artist()) {
        this.#artistDetailsService.getArtistDetails(this.id).subscribe(() => {
          this.genres = this.artist()?.genres.join(' | ') || '';
        });
      }

      this.#artistTopTracksService.getArtistTopTracks(this.id).subscribe();
    }
  }

  back() {
    this.router.navigate([''], { queryParamsHandling: 'preserve' });
  }

  openSpotify() {
    window.open(this.artist()?.uri, '_blank');
  }
}
