import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from 'src/app/shared/services/artist.service';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, ArtistCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly #artistService = inject(ArtistService);

  readonly artistsData = this.#artistService.artistsData;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const q = params.get('q');

      if (q) {
        this.#artistService
          .searchArtists(q)
          .subscribe(() => console.log(this.artistsData()));
      } else this.#artistService.cleanArtistsData();
    });
  }

  trackByArtist(_: number, artist: { id: string }) {
    return artist.id;
  }
}
