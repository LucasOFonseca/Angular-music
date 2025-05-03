import { NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistDetailsService } from 'src/app/pages/artist/services/artist-details.service';
import { Artist } from 'src/app/shared/models/artist.model';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss'],
})
export class ArtistCardComponent {
  readonly #artistDetailsService = inject(ArtistDetailsService);

  @Input() artist!: Artist;

  constructor(private router: Router) {}

  goToDetails() {
    this.#artistDetailsService.setArtistDetails(this.artist);
    this.router.navigate(['artist', this.artist.id], {
      queryParamsHandling: 'preserve',
    });
  }
}
