import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowersPipe } from 'src/app/shared/pipes/followers.pipe';
import { ArtistDetailsService } from './services/artist-details.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [NgIf, TitleCasePipe, FollowersPipe],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent {
  readonly #artistDetailsService = inject(ArtistDetailsService);

  readonly id = this.activatedRoute.snapshot.paramMap.get('id');
  readonly artist = this.#artistDetailsService.artist;
  genres = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.artist()) {
      this.genres = this.artist()?.genres.join(' | ') || '';
    } else if (this.id && !this.artist()) {
      this.#artistDetailsService.getArtistDetails(this.id).subscribe(() => {
        this.genres = this.artist()?.genres.join(' | ') || '';
      });
    }
  }
}
